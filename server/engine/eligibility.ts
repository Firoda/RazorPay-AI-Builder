import { HOUR_MS, sessionStart } from "../domain/time";
import type { Payment } from "../domain/types";
import type { Store } from "../store/memoryStore";

export type EligibilityResult =
  | { kind: "eligible"; moneyMode: "capture" | "already_captured" }
  | { kind: "restore" }
  | { kind: "no_action"; reason: string }
  | { kind: "release"; reason: string }
  | { kind: "escalate"; reason: string };

/**
 * Deterministic gate run on every payment event (build plan §2.1).
 * The AI never sees a case that fails these checks.
 */
export function checkEligibility(store: Store, payment: Payment): EligibilityResult {
  const now = store.now().getTime();

  // E3: authoritative payment state
  if (payment.status === "failed" || payment.status === "created") {
    return { kind: "no_action", reason: "payment_not_authorized" };
  }
  if (payment.status === "refunded") return { kind: "no_action", reason: "payment_refunded" };

  // E8: refund already in flight
  if (payment.refundStatus !== "none") return { kind: "no_action", reason: "refund_in_flight" };

  // E4: payment must map to a booking
  const booking = store.bookings.get(payment.notes.booking_id);
  if (!booking) return { kind: "escalate", reason: "booking_not_found" };
  const session = store.sessions.get(booking.sessionId);
  if (!session) return { kind: "escalate", reason: "session_not_found" };

  // E6: customer already holds a confirmed seat for this session through another payment
  const duplicate = [...store.bookings.values()].some(
    (b) =>
      b.id !== booking.id &&
      b.customerId === booking.customerId &&
      b.sessionId === booking.sessionId &&
      (b.status === "confirmed" || b.status === "rescued") &&
      b.paymentId !== payment.id &&
      store.payments.get(b.paymentId ?? "")?.status === "captured",
  );
  if (duplicate) {
    return payment.status === "authorized"
      ? { kind: "release", reason: "duplicate_payment" }
      : { kind: "escalate", reason: "double_capture_refund_needed" };
  }

  // E5: booking already fulfilled by this payment
  if (booking.status === "confirmed" || booking.status === "rescued") {
    return { kind: "no_action", reason: "booking_already_confirmed" };
  }

  // E7: amount must match what the booking costs
  if (payment.amountPaise !== session.pricePaise * booking.seats) {
    return { kind: "escalate", reason: "amount_mismatch" };
  }

  // E9: enough time left before Razorpay auto-refunds the authorised amount
  if (payment.status === "authorized") {
    const deadline = Date.parse(payment.captureDeadline);
    if (now >= deadline) return { kind: "no_action", reason: "deadline_passed" };
    if (deadline - now < store.policy.escalateBeforeDeadlineHours * HOUR_MS) {
      return { kind: "escalate", reason: "deadline_too_close" };
    }
  }

  // Original seat free again and session not about to start → restore (no AI needed)
  const startsAt = sessionStart(session.date, session.start).getTime();
  if (
    store.policy.restoreOriginalIfFree &&
    store.seatsLeft(session.id) >= booking.seats &&
    startsAt - now >= store.policy.minHoursBeforeStart * HOUR_MS
  ) {
    return { kind: "restore" };
  }

  return { kind: "eligible", moneyMode: payment.status === "captured" ? "already_captured" : "capture" };
}
