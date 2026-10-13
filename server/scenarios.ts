import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DAY_MS } from "./domain/time";
import type { BookingStatus, Lang, Payment, PaymentEvent, PaymentStatus } from "./domain/types";
import type { Store } from "./store/memoryStore";

export interface ScenarioExpected {
  decision?: string[];
  allowedOptions?: string[];
  topAnyOf?: string[];
  mustNotOffer?: string[];
  hard?: string[];
  injection?: boolean;
  stopContact?: boolean;
  replyIntent?: string[];
  replySelected?: string;
  finalOfferIncludes?: string;
  state?: string[];
  reason?: string;
  moneyMode?: string;
}

export interface Scenario {
  id: string;
  group: "ai" | "reply" | "system";
  title: string;
  heldOut?: boolean;
  customer: { name: string; language: Lang };
  overrides?: {
    now?: string;
    payment?: Partial<Pick<Payment, "status" | "amountPaise" | "refundStatus">>;
    sessions?: { id: string; booked: number }[];
    otherBookings?: { id: string; sessionId: string; seats: number; status: BookingStatus; paymentId: string }[];
    otherPayments?: { id: string; status: PaymentStatus; bookingId: string }[];
  };
  messages: { text: string; fromContact?: string }[];
  offer?: string[];
  reply?: string;
  expected: ScenarioExpected;
}

export const DEFAULTS = {
  createdAt: "2026-10-10T21:00:00+05:30",
  authorizedAt: "2026-10-10T23:00:00+05:30",
  now: "2026-10-11T07:30:00+05:30",
  messageAt: "2026-10-11T07:00:00+05:30",
  originalSessionId: "S-1011-AM",
};

/** Start of the original class in the fixtures (Sunday 10 AM); live mode moves it to the next upcoming Sunday. */
const ORIGINAL_CLASS_START = "2026-10-11T10:00:00+05:30";
const WEEK_MS = 7 * DAY_MS;

/**
 * Sets the store's clock for a scenario and returns a function that places a fixture timestamp in time.
 * Fixed mode (tests, evals): the clock is frozen at the fixture's "now". Live mode (visitors): the clock is
 * real, the calendar moves forward in whole weeks so the original class is the next Sunday, and each event
 * keeps its distance from "now" (paid last night, confirmed two hours later, messaged this morning).
 */
function layOut(store: Store, scenarioNow: string | undefined): (fixtureTime: string) => string {
  if (!store.liveTime) {
    store.setNow(scenarioNow ?? DEFAULTS.now);
    return (t) => new Date(t).toISOString();
  }
  const realNow = Date.now();
  store.shiftCalendarWeeks(Math.max(0, Math.ceil((realNow + 2 * 3600_000 - Date.parse(ORIGINAL_CLASS_START)) / WEEK_MS)));
  const base = Date.parse(DEFAULTS.now);
  store.setLiveOffset(scenarioNow ? Date.parse(scenarioNow) - base : 0);
  return (t) => new Date(realNow - (base - Date.parse(t))).toISOString();
}

let cache: Scenario[] | null = null;

export function loadScenarios(): Scenario[] {
  if (!cache) {
    const raw = JSON.parse(readFileSync(join(process.cwd(), "fixtures", "scenarios.json"), "utf8"));
    cache = raw.scenarios as Scenario[];
  }
  return cache;
}

export function getScenario(id: string): Scenario | undefined {
  return loadScenarios().find((s) => s.id === id);
}

export function contactFor(scenarioId: string): string {
  const digits = [...scenarioId].map((ch) => ch.charCodeAt(0) % 10).join("").padStart(5, "0").slice(-5);
  return `+9198765${digits}`;
}

/**
 * Sets up a scenario's customer, released booking and messages, but no payment.
 * Used for real Razorpay test payments, where the payment comes from Checkout.
 */
export function prepareBooking(store: Store, sc: Scenario, suffix: string): { customerId: string; bookingId: string } {
  const key = `${sc.id}${suffix}`;
  const customerId = `C-${key}`;
  const bookingId = `B-${key}`;
  const contact = contactFor(key);
  layOut(store, sc.overrides?.now);
  store.customers.set(customerId, { id: customerId, name: sc.customer.name, contact, language: sc.customer.language });
  for (const so of sc.overrides?.sessions ?? []) {
    const sess = store.sessions.get(store.sessionIdFor(so.id));
    if (sess) sess.booked = so.booked;
  }
  store.bookings.set(bookingId, {
    id: bookingId, customerId, sessionId: store.sessionIdFor(DEFAULTS.originalSessionId), seats: 1, status: "released",
    holdExpiresAt: store.nowIso(),
  });
  for (const m of sc.messages) {
    store.messages.push({
      id: store.nextId("msg"), customerId, direction: "inbound", fromContact: m.fromContact ?? contact,
      text: m.text, at: store.nowIso(),
    });
  }
  store.log("system", "demo.real_booking_prepared", undefined, { scenarioId: sc.id, bookingId });
  return { customerId, bookingId };
}

/** Writes a scenario's synthetic records into the store and returns the late-authorisation event. */
export function applyScenario(store: Store, sc: Scenario): PaymentEvent {
  const paymentId = `pay_${sc.id}`;
  if (store.payments.has(paymentId)) throw new Error(`Scenario ${sc.id} is already loaded; reset first`);

  const customerId = `C-${sc.id}`;
  const bookingId = `B-${sc.id}`;
  const contact = contactFor(sc.id);
  const o = sc.overrides ?? {};
  const at = layOut(store, o.now);

  store.customers.set(customerId, { id: customerId, name: sc.customer.name, contact, language: sc.customer.language });
  for (const so of o.sessions ?? []) {
    const sess = store.sessions.get(store.sessionIdFor(so.id));
    if (sess) sess.booked = so.booked;
  }

  const original = store.sessions.get(store.sessionIdFor(DEFAULTS.originalSessionId))!;
  store.bookings.set(bookingId, {
    id: bookingId,
    customerId,
    sessionId: original.id,
    seats: 1,
    status: "released",
    holdExpiresAt: new Date(Date.parse(at(DEFAULTS.createdAt)) + 10 * 60_000).toISOString(),
  });

  const createdAt = at(DEFAULTS.createdAt);
  const status = o.payment?.status ?? "authorized";
  store.payments.set(paymentId, {
    id: paymentId,
    amountPaise: o.payment?.amountPaise ?? original.pricePaise,
    currency: "INR",
    status,
    method: "upi",
    createdAt,
    authorizedAt: status === "failed" ? undefined : at(DEFAULTS.authorizedAt),
    capturedAt: status === "captured" ? at(DEFAULTS.authorizedAt) : undefined,
    captureDeadline: new Date(Date.parse(createdAt) + 3 * DAY_MS).toISOString(),
    notes: { booking_id: bookingId, customer_id: customerId },
    refundStatus: o.payment?.refundStatus ?? "none",
    source: "simulated",
  });

  for (const ob of o.otherBookings ?? []) {
    store.bookings.set(ob.id, { ...ob, sessionId: store.sessionIdFor(ob.sessionId), customerId, holdExpiresAt: createdAt });
  }
  for (const op of o.otherPayments ?? []) {
    store.payments.set(op.id, {
      id: op.id, amountPaise: original.pricePaise, currency: "INR", status: op.status, method: "upi",
      createdAt, captureDeadline: new Date(Date.parse(createdAt) + 3 * DAY_MS).toISOString(),
      notes: { booking_id: op.bookingId, customer_id: customerId }, refundStatus: "none", source: "simulated",
    });
  }

  for (const m of sc.messages) {
    store.messages.push({
      id: store.nextId("msg"), customerId, direction: "inbound", fromContact: m.fromContact ?? contact,
      text: m.text, at: at(DEFAULTS.messageAt),
    });
  }

  store.log("system", "demo.scenario_loaded", undefined, { scenarioId: sc.id, simulated: true });
  return { id: `evt_${sc.id}_authorized`, type: "payment.authorized", paymentId, source: "simulated" };
}
