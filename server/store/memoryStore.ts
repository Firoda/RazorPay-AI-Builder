import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
  Actor,
  AuditEntry,
  Booking,
  ChatMessage,
  Customer,
  LearningRecord,
  LedgerEntry,
  Payment,
  Policy,
  RescueCase,
  Session,
} from "../domain/types";

const FIXTURES_DIR = join(process.cwd(), "fixtures");

function readFixture<T>(name: string): T {
  return JSON.parse(readFileSync(join(FIXTURES_DIR, name), "utf8")) as T;
}

/**
 * In-memory store seeded from fixtures. The prototype runs as a single instance
 * (Cloud Run max-instances = 1), so state lives here and is resettable for demos.
 */
export class Store {
  studio = { name: "", city: "", owner: "" };
  policy!: Policy;
  sessions = new Map<string, Session>();
  customers = new Map<string, Customer>();
  bookings = new Map<string, Booking>();
  payments = new Map<string, Payment>();
  cases = new Map<string, RescueCase>();
  messages: ChatMessage[] = [];
  audit: AuditEntry[] = [];
  ledger = new Map<string, LedgerEntry>();
  learning: LearningRecord[] = [];
  seenEvents = new Set<string>();
  /** Demo fault injection: number of upcoming failures to simulate. */
  faults = { reserveFailures: 0, captureFailures: 0 };

  private clock: Date | null = null;
  /** Offset added to the real clock when it is running (live mode). */
  private offsetMs = 0;
  /**
   * Visitor sandboxes run on the real clock: scenarios are laid out relative to now and the calendar
   * moves forward in whole weeks, so dates and timestamps are real. Tests and evals keep fixed dates.
   */
  liveTime = false;
  /** Whole weeks the calendar has been moved forward, and fixture session id → shifted id. */
  calendarWeeks = 0;
  private sessionIds = new Map<string, string>();
  private counters = new Map<string, number>();

  constructor() {
    this.reset();
  }

  reset(): void {
    const { studio, policy } = readFixture<{ studio: Store["studio"]; policy: Policy }>("policy.json");
    this.studio = studio;
    this.policy = structuredClone(policy);
    this.sessions = new Map(readFixture<Session[]>("sessions.json").map((s) => [s.id, s]));
    this.customers.clear();
    this.bookings.clear();
    this.payments.clear();
    this.cases.clear();
    this.messages = [];
    this.audit = [];
    this.ledger.clear();
    this.learning = [];
    this.seenEvents.clear();
    this.faults = { reserveFailures: 0, captureFailures: 0 };
    this.clock = null;
    this.offsetMs = 0;
    this.calendarWeeks = 0;
    this.sessionIds.clear();
    this.counters.clear();
  }

  now(): Date {
    return this.clock ? new Date(this.clock) : new Date(Date.now() + this.offsetMs);
  }

  nowIso(): string {
    return this.now().toISOString();
  }

  setNow(iso: string | null): void {
    this.clock = iso ? new Date(iso) : null;
  }

  advance(ms: number): void {
    if (this.clock) this.clock = new Date(this.clock.getTime() + ms);
    else this.offsetMs += ms;
  }

  /** Runs the clock in real time, shifted by `ms` (live mode). */
  setLiveOffset(ms: number): void {
    this.clock = null;
    this.offsetMs = ms;
  }

  /** Moves every class in the calendar forward by whole weeks (weekdays and times stay the same). */
  shiftCalendarWeeks(weeks: number): void {
    if (weeks === this.calendarWeeks) return;
    this.sessions = new Map();
    this.sessionIds.clear();
    for (const s of readFixture<Session[]>("sessions.json")) {
      const [y, m, d] = s.date.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d + 7 * weeks)).toISOString().slice(0, 10);
      const id = s.id.replace(/^S-\d{4}/, `S-${date.slice(5, 7)}${date.slice(8, 10)}`);
      this.sessionIds.set(s.id, id);
      this.sessions.set(id, { ...s, id, date });
    }
    this.calendarWeeks = weeks;
  }

  /** The current id of a session named in the fixtures (it changes when the calendar is shifted). */
  sessionIdFor(fixtureId: string): string {
    return this.sessionIds.get(fixtureId) ?? fixtureId;
  }

  nextId(prefix: string): string {
    const n = (this.counters.get(prefix) ?? 0) + 1;
    this.counters.set(prefix, n);
    return `${prefix}_${n}`;
  }

  private logListeners = new Set<(entry: AuditEntry) => void>();

  log(actor: Actor, action: string, caseId?: string, detail?: unknown): void {
    const entry: AuditEntry = { id: this.nextId("aud"), caseId, at: this.nowIso(), actor, action, detail };
    this.audit.push(entry);
    for (const fn of this.logListeners) {
      try {
        fn(entry);
      } catch {
        /* a broken listener must never break the engine */
      }
    }
  }

  /** Subscribe to new audit entries (used by the Live AI feed). Returns an unsubscribe function. */
  onLog(fn: (entry: AuditEntry) => void): () => void {
    this.logListeners.add(fn);
    return () => this.logListeners.delete(fn);
  }

  seatsLeft(sessionId: string): number {
    const s = this.sessions.get(sessionId);
    return s ? s.capacity - s.booked : 0;
  }

  caseForPayment(paymentId: string): RescueCase | undefined {
    for (const c of this.cases.values()) if (c.paymentId === paymentId) return c;
    return undefined;
  }

  messagesFor(customerId: string): ChatMessage[] {
    return this.messages.filter((m) => m.customerId === customerId);
  }
}
