import { sessionLabel } from "./domain/labels";
import { filterCandidates } from "./engine/candidateFilter";
import { formatRupees } from "./domain/time";
import type { RescueCase } from "./domain/types";
import type { Store } from "./store/memoryStore";

/** Outcome ladder: never mix identified money with realised money. */
export function metrics(store: Store) {
  const sum = (filter: (c: RescueCase) => boolean) =>
    [...store.cases.values()].filter(filter).reduce((acc, c) => acc + (store.payments.get(c.paymentId)?.amountPaise ?? 0), 0);
  const eligible = (c: RescueCase) => c.state !== "NO_ACTION";
  return {
    eligiblePaise: sum(eligible),
    offeredPaise: sum((c) => ["OFFER_SENT", "EXECUTING", "RESCUED", "PENDING_RESOLUTION"].includes(c.state)),
    rescuedPaise: sum((c) => c.state === "RESCUED"),
    releasedPaise: sum((c) => c.state === "RELEASED" || c.state === "AUTO_REFUNDED"),
    counts: Object.fromEntries(
      [...store.cases.values()].reduce((m, c) => m.set(c.state, (m.get(c.state) ?? 0) + 1), new Map<string, number>()),
    ),
  };
}

export function caseSummary(store: Store, c: RescueCase) {
  const payment = store.payments.get(c.paymentId);
  const customer = store.customers.get(c.customerId);
  const original = store.sessions.get(c.originalSessionId);
  return {
    id: c.id,
    state: c.state,
    decision: c.decision,
    reason: c.reason,
    customerName: customer?.name,
    amount: payment ? formatRupees(payment.amountPaise) : undefined,
    amountPaise: payment?.amountPaise,
    originalSession: original ? sessionLabel(original) : undefined,
    deadline: c.deadline,
    msToDeadline: Date.parse(c.deadline) - store.now().getTime(),
    moneyMode: c.moneyMode,
    summary: c.recommendation?.merchant_summary,
    flags: c.flags,
    updatedAt: c.updatedAt,
  };
}

export function caseDetail(store: Store, c: RescueCase) {
  const sessionInfo = (id: string) => {
    const s = store.sessions.get(id);
    return s ? { ...s, label: sessionLabel(s), seatsLeft: s.capacity - s.booked } : { id };
  };
  return {
    ...caseSummary(store, c),
    case: c,
    payment: store.payments.get(c.paymentId),
    booking: store.bookings.get(c.bookingId),
    customer: store.customers.get(c.customerId),
    candidates: (c.candidates ?? []).map((cand) => ({ ...cand, session: sessionInfo(cand.sessionId) })),
    offered: (c.offeredSessionIds ?? []).map(sessionInfo),
    messages: store.messagesFor(c.customerId).filter((m) => !m.caseId || m.caseId === c.id),
    audit: store.audit.filter((a) => a.caseId === c.id),
    ledger: [...store.ledger.values()].filter((l) => l.key.includes(c.id) || l.key.includes(c.paymentId)),
    ruleBaselineSessionId: ruleBaseline(store, c),
  };
}

/** What a fixed rule ("offer the next same-price, same-type slot", ignoring the customer's words) would pick. */
function ruleBaseline(store: Store, c: RescueCase): string | null {
  const original = store.sessions.get(c.originalSessionId);
  const booking = store.bookings.get(c.bookingId);
  if (!original || !booking) return null;
  const { candidates } = filterCandidates({
    sessions: [...store.sessions.values()], original, policy: store.policy, hard: [], seatsNeeded: booking.seats, now: store.now(),
  });
  return candidates.find((x) => x.feasible)?.sessionId ?? null;
}
