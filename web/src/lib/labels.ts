import type { AuditEntry, CaseDetail, CaseState, Constraint } from "./types";

export type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "ai";

export const STATE_LABEL: Record<CaseState, { label: string; tone: Tone; icon: string }> = {
  DETECTED: { label: "Checking", tone: "neutral", icon: "…" },
  RESTORE_PROPOSED: { label: "Original seat free", tone: "info", icon: "↺" },
  AWAITING_CUSTOMER: { label: "Waiting for customer", tone: "neutral", icon: "⏳" },
  MERCHANT_REVIEW: { label: "Needs your approval", tone: "warning", icon: "●" },
  OFFER_SENT: { label: "Offer sent", tone: "info", icon: "➜" },
  EXECUTING: { label: "Booking…", tone: "info", icon: "…" },
  PENDING_RESOLUTION: { label: "Needs retry", tone: "danger", icon: "!" },
  ESCALATED: { label: "Needs you", tone: "danger", icon: "!" },
  RESCUED: { label: "Rescued", tone: "success", icon: "✓" },
  RELEASED: { label: "Released · refunding", tone: "neutral", icon: "↩" },
  AUTO_REFUNDED: { label: "Auto-refunded", tone: "neutral", icon: "↩" },
  NO_ACTION: { label: "No action needed", tone: "neutral", icon: "–" },
};

const REASONS: Record<string, string> = {
  duplicate_payment: "The customer already paid for this seat with another payment, so this one won't be captured.",
  identity_unverified: "A message came from a number that isn't on the booking. A human should check before anything happens.",
  injection_detected: "The customer's message tried to instruct the system (e.g. 'ignore policy'). A human should look.",
  injection_in_reply: "The reply tried to add instructions (e.g. a discount 'approved by admin'). Nothing was executed.",
  extra_seats_requested: "The customer wants more seats than they paid for. That needs a new payment, which is out of scope.",
  deadline_too_close: "Less than 6 hours before Razorpay auto-refunds. Too little time for the customer loop.",
  deadline_approaching: "Less than 6 hours before Razorpay auto-refunds. Decide now or the money returns automatically.",
  deadline_passed: "The capture window has closed.",
  amount_mismatch: "The payment amount doesn't match the booking price.",
  booking_not_found: "The payment doesn't point to a known booking.",
  payment_state_unverified: "Razorpay couldn't confirm the payment's current state, so the webhook alone isn't trusted.",
  payment_not_authorized: "The payment isn't authorised. A screenshot isn't proof that money arrived. Waiting.",
  refund_in_flight: "A refund is already in progress for this payment.",
  booking_already_confirmed: "This booking is already confirmed.",
  original_seat_free: "The original seat became free again. Restore it with one tap (no AI needed).",
  customer_requested_refund: "The customer asked for their money back.",
  customer_requested_stop: "The customer asked not to be contacted. No further messages will be sent.",
  original_slot_only: "The customer only wants the original slot, which is full.",
  no_feasible_option: "No session meets the customer's requirements within policy.",
  ai_recommended_release: "The AI recommended not capturing.",
  merchant_released: "You chose to release the payment.",
  merchant_rejected: "You rejected the AI's proposal. Handle this case manually.",
  ai_unavailable: "The AI didn't respond (model unavailable or timed out). Decide manually or retry later.",
  ai_error: "The AI call failed. Decide manually.",
  ai_output_invalid: "The AI's answer failed validation twice, so it was not used.",
  ai_escalated: "The AI flagged this for a human.",
  contact_limit_reached: "The customer hasn't replied to 2 messages. SeatSaver won't send more.",
  customer_unresponsive: "The customer hasn't replied. SeatSaver won't keep messaging.",
  customer_unclear: "The customer's reply was unclear.",
  calendar_write_failed: "Reserving the seat failed. Nothing was charged.",
  capture_failed: "Capturing the payment failed after reserving the seat. Nothing was charged twice; the seat is held.",
  payment_fetch_failed: "Couldn't re-check the payment with Razorpay. Nothing was charged.",
  refund_review_needed: "The payment was already captured, so a refund needs your review.",
  seat_lost: "The seat was taken before it could be reserved.",
  seat_lost_refreshing: "The seat was taken just before booking. Finding the next best option.",
  captured_after_acceptance: "Seat reserved, then the held payment was captured once.",
  rebooked_already_captured: "Rebooked onto the new session; the payment was already captured.",
  capture_window_expired: "Razorpay's capture window passed, so the money returned automatically.",
  offer_contradicts_request: "The AI's offer contradicted a month, date or class the customer asked for, so it was blocked. Decide manually.",
  unverified_constraints: "Some of the customer's needs can't be checked automatically. Please review.",
  intent_unclear: "Asked the customer whether they want another session or a refund.",
  customer_requested_other: "The customer wants a different option.",
  merchant_approved: "You approved the offer.",
  merchant_edited: "You edited the offer.",
  auto_approved_by_policy: "Sent automatically under your auto-approve policy.",
};

export function reasonText(reason?: string): string {
  if (!reason) return "";
  if (REASONS[reason]) return REASONS[reason];
  if (reason.startsWith("payment_") && reason.endsWith("_cannot_capture")) return "The payment can no longer be captured.";
  return reason.replace(/_/g, " ");
}

const SESSION_REASONS: Record<string, string> = {
  original_session: "Original (full)",
  no_seats: "No seats",
  price_differs: "Different price",
  different_class_type: "Different class",
  outside_policy_window: "Beyond policy window",
  too_soon_or_past: "Too soon / past",
  previously_failed: "Declined / lost",
};

export function sessionReason(r: string): string {
  if (SESSION_REASONS[r]) return SESSION_REASONS[r];
  const m = r.match(/^violates:([a-z_]+):(.*)$/);
  if (m) return `Not ${constraintText({ type: m[1], value: m[2], evidence_quote: "" })}`;
  return r;
}

export function constraintText(c: Constraint): string {
  const v = c.value.replace(/\|/g, " or ");
  switch (c.type) {
    case "day_of_week":
      return v.replace(/\b\w/g, (x) => x.toUpperCase());
    case "time_window":
      return v.charAt(0).toUpperCase() + v.slice(1);
    case "instructor":
      return `With ${c.value}`;
    case "exact_date":
      return `On ${c.value}`;
    case "date_range":
      return `Between ${c.value.replace("..", " and ")}`;
    case "workshop_type":
      return c.value.replace(/_/g, " ");
    default:
      return c.value;
  }
}

export const LANGUAGE_LABEL: Record<string, string> = { en: "English", hi: "Hindi", "en-hi": "Hinglish" };

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "Window closed";
  const h = Math.floor(ms / 3_600_000);
  const d = Math.floor(h / 24);
  const rem = h % 24;
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (d > 0) return `${d}d ${rem}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function countdownTone(ms: number, closed: boolean): Tone {
  if (closed) return "neutral";
  if (ms < 6 * 3_600_000) return "danger";
  if (ms < 24 * 3_600_000) return "warning";
  return "neutral";
}

export function formatIST(iso: string, withDate = true): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    ...(withDate ? { weekday: "short", day: "numeric", month: "short" } : {}),
    hour: "numeric",
    minute: "2-digit",
  });
}

export function rupees(paise?: number): string {
  if (paise === undefined) return "";
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export interface TimelineItem {
  at: string;
  label: string;
  detail?: string;
  icon: string;
  tone: Tone;
  tag?: "SIMULATED" | "TEST MODE" | "AI";
}

/** Builds the human timeline from payment, booking, messages and audit entries. */
export function buildTimeline(d: CaseDetail): TimelineItem[] {
  const items: TimelineItem[] = [];
  const p = d.payment;
  const real = p?.source === "razorpay_test";
  const moneyTag = real ? "TEST MODE" : "SIMULATED";
  if (p) {
    items.push({ at: p.createdAt, label: `Customer paid ${rupees(p.amountPaise)}`, detail: `${p.method.toUpperCase()} · ${p.id}`, icon: "₹", tone: "neutral", tag: moneyTag });
    if (!real) {
      items.push({ at: new Date(Date.parse(p.createdAt) + 10 * 60_000).toISOString(), label: "Marked failed (no bank reply in ~10 min)", icon: "✕", tone: "danger", tag: "SIMULATED" });
    }
  }
  if (d.booking && !real) {
    items.push({ at: d.booking.holdExpiresAt, label: "Seat hold expired · seat released and resold", icon: "⌛", tone: "warning", tag: "SIMULATED" });
  }
  if (p?.authorizedAt) {
    items.push({ at: p.authorizedAt, label: "Bank confirmed late · payment authorised, held", detail: `Razorpay auto-refunds if not captured by ${formatIST(p.captureDeadline)}`, icon: "🏦", tone: "info", tag: moneyTag });
  }
  for (const m of d.messages) {
    if (m.direction === "inbound") {
      items.push({ at: m.at, label: "Customer message", detail: `“${m.text.length > 90 ? m.text.slice(0, 90) + "…" : m.text}”`, icon: "💬", tone: "neutral" });
    }
  }
  for (const a of d.audit) {
    const t = auditToTimeline(a);
    if (t) items.push(t);
  }
  return items.sort((x, y) => x.at.localeCompare(y.at));
}

function auditToTimeline(a: AuditEntry): TimelineItem | null {
  const det = (a.detail ?? {}) as Record<string, unknown>;
  switch (a.action) {
    case "ai.intent":
      return { at: a.at, label: "AI read the customer's needs", icon: "✦", tone: "ai", tag: "AI" };
    case "ai.recommend":
      return { at: a.at, label: "AI ranked feasible sessions", icon: "✦", tone: "ai", tag: "AI" };
    case "ai.reply":
      return { at: a.at, label: "AI interpreted the reply", icon: "✦", tone: "ai", tag: "AI" };
    case "merchant.approve":
      return { at: a.at, label: "You approved", icon: "✓", tone: "info" };
    case "merchant.edit":
      return { at: a.at, label: "You edited the offer", icon: "✎", tone: "info" };
    case "merchant.reject":
      return { at: a.at, label: "You rejected the proposal", icon: "✕", tone: "warning" };
    case "merchant.release":
      return { at: a.at, label: "You released the payment", icon: "↩", tone: "neutral" };
    case "execute.seat_reserved":
      return { at: a.at, label: "Seat reserved", detail: String(det.sessionId ?? ""), icon: "🪑", tone: "success" };
    case "execute.seat_gone":
      return { at: a.at, label: "Seat taken before booking. Refreshing options.", icon: "!", tone: "warning" };
    case "payment.captured":
      return { at: a.at, label: "Payment captured once", detail: String(det.paymentId ?? ""), icon: "₹", tone: "success", tag: det.source === "razorpay_test" ? "TEST MODE" : "SIMULATED" };
    case "capture.attempt_failed":
      return { at: a.at, label: "Capture attempt failed", icon: "!", tone: "danger" };
    case "payment.auto_refunded":
      return { at: a.at, label: "Razorpay auto-refunded the held amount", icon: "↩", tone: "neutral" };
    case "event.duplicate_ignored":
      return { at: a.at, label: "Duplicate event ignored", icon: "≡", tone: "neutral" };
    case "state.changed": {
      const to = det.to as CaseState;
      if (["ESCALATED", "RELEASED", "RESCUED", "PENDING_RESOLUTION", "AUTO_REFUNDED", "NO_ACTION", "RESTORE_PROPOSED"].includes(to)) {
        return { at: a.at, label: STATE_LABEL[to].label, detail: reasonText(det.reason as string), icon: STATE_LABEL[to].icon, tone: STATE_LABEL[to].tone };
      }
      return null;
    }
    default:
      return null;
  }
}

export const ACTOR_LABEL: Record<string, string> = {
  system: "System", ai: "AI", merchant: "Merchant", customer: "Customer", razorpay: "Razorpay",
};
