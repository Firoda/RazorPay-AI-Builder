import { formatClock, formatDate, formatRupees } from "./domain/time";
import type { AuditEntry, Constraint, ExtractedIntent, Recommendation, ReplyInterpretation } from "./domain/types";
import type { Store } from "./store/memoryStore";

// Live AI panel lines (Portal 2). Every line is derived from a real audit entry. Nothing is scripted.

export type LiveKind = "ai" | "check" | "razorpay" | "merchant" | "customer" | "warn" | "success" | "info";

export interface LiveLine {
  id: string;
  at: string;
  kind: LiveKind;
  text: string;
  /** An AI call is in flight (the client shows a spinner + live seconds until the matching result arrives). */
  pending?: "intent" | "recommend" | "reply";
  /** Closes a pending line of this kind. */
  resolves?: "intent" | "recommend" | "reply";
  ms?: number;
  cached?: boolean;
  reason?: string;
}

const short = (store: Store, sessionId?: string) => {
  const s = sessionId ? store.sessions.get(sessionId) : undefined;
  return s ? `${formatDate(s.date)}, ${formatClock(s.start)} with ${s.instructor}` : (sessionId ?? "");
};

const cText = (c: Constraint) => {
  const v = c.value.replace(/\|/g, " or ");
  if (c.type === "instructor") return `with ${c.value}`;
  if (c.type === "day_of_week" || c.type === "time_window") return v.charAt(0).toUpperCase() + v.slice(1);
  return v;
};

export function liveLine(store: Store, e: AuditEntry): LiveLine | null {
  const c = e.caseId ? store.cases.get(e.caseId) : undefined;
  const name = c ? (store.customers.get(c.customerId)?.name ?? "the customer") : "the customer";
  const pay = c ? store.payments.get(c.paymentId) : undefined;
  const d = (e.detail ?? {}) as Record<string, unknown>;
  const base = { id: e.id, at: e.at };
  const meta = d.meta as { latencyMs?: number; cached?: boolean } | undefined;

  switch (e.action) {
    case "case.detected":
      return { ...base, kind: "info", text: `New late payment · ${pay ? formatRupees(pay.amountPaise) : ""} · ${name}` };
    case "eligibility.checked": {
      const k = d.kind as string;
      if (k === "eligible") return { ...base, kind: "check", text: "Code check: authorised ✓ · amount matches ✓ · not a duplicate ✓" };
      if (k === "restore") return { ...base, kind: "check", text: "Original seat is free again: no AI needed" };
      if (k === "release") return { ...base, kind: "check", text: "Duplicate payment found: this one won't be captured" };
      if (k === "escalate") return { ...base, kind: "warn", text: "Needs Ritu", reason: d.reason as string };
      return { ...base, kind: "info", text: "Nothing to do", reason: d.reason as string };
    }
    case "ai.call.started": {
      const kind = d.kind as "intent" | "recommend" | "reply";
      const text = kind === "intent" ? `Gemini reading ${name}'s message…` : kind === "recommend" ? "Gemini ranking the sessions that fit…" : `Gemini reading ${name}'s reply…`;
      return { ...base, kind: "ai", text, pending: kind };
    }
    case "ai.intent": {
      const i = d.output as ExtractedIntent;
      let text: string;
      if (i?.injection_detected) text = "⚠ The message tried to instruct the system: flagged";
      else if (i?.stop_contact_requested) text = "Asked not to be contacted";
      else if (i?.wants === "refund") text = "Wants a refund";
      else if (i?.wants === "original_only") text = "Only wants the original slot";
      else if (i?.hard_constraints?.length) text = `Must-haves: ${i.hard_constraints.map(cText).join(" · ")}`;
      else if (i?.soft_preferences?.length) text = `Preferences: ${i.soft_preferences.map(cText).join(" · ")}`;
      else text = "No clear preference yet";
      if (i?.seats_needed > 1) text += ` · ${i.seats_needed} seats`;
      return { ...base, kind: "ai", text, resolves: "intent", ms: meta?.latencyMs, cached: meta?.cached };
    }
    case "candidates.filtered": {
      const feasible = (d.feasible as string[]) ?? [];
      return { ...base, kind: "check", text: `Code check: ${store.sessions.size} sessions → ${feasible.length} fit (seats · same price · policy · must-haves)` };
    }
    case "ai.recommend": {
      const r = d.output as Recommendation;
      const text =
        r?.decision === "offer_alternative"
          ? `Ranked: ${r.ranked_options.map((o) => short(store, o.session_id)).join(" · ")}`
          : r?.decision === "release_refund"
            ? "Recommends not capturing: nothing fits"
            : r?.decision === "escalate"
              ? "Recommends a human decides"
              : "Recommends asking the customer";
      return { ...base, kind: "ai", text, resolves: "recommend", ms: meta?.latencyMs, cached: meta?.cached };
    }
    case "ai.reply": {
      const r = d.output as ReplyInterpretation;
      const text = r?.intent === "accept" ? `Reply understood: books ${short(store, r.selected_session_id)}` : `Reply understood: ${r?.intent}`;
      return { ...base, kind: "ai", text, resolves: "reply", ms: meta?.latencyMs, cached: meta?.cached };
    }
    case "ai.intent.validated":
    case "ai.recommend.validated":
    case "ai.reply.validated":
      if (d.ok === false) return { ...base, kind: "warn", text: "Validator rejected the AI's answer: retrying" };
      if (e.action === "ai.recommend.validated") return { ...base, kind: "check", text: "Validator: offer allowed ✓ · no amounts written by AI ✓" };
      return null;
    case "guard.offer_contradicts_request":
      return { ...base, kind: "warn", text: "Guard: offer contradicted what the customer asked for: blocked" };
    case "ai.intent.failed":
    case "ai.recommend.failed":
    case "ai.reply.failed":
      return { ...base, kind: "warn", text: "The AI didn't respond: handed to Ritu", resolves: e.action.split(".")[1] as "intent" | "recommend" | "reply" };
    case "merchant.approve":
      return { ...base, kind: "merchant", text: `Ritu approved → offer sent to ${name}` };
    case "merchant.edit":
      return { ...base, kind: "merchant", text: "Ritu edited the offer" };
    case "merchant.reject":
      return { ...base, kind: "merchant", text: "Ritu rejected the proposal" };
    case "merchant.release":
      return { ...base, kind: "merchant", text: "Ritu released the payment" };
    case "customer.message":
      return { ...base, kind: "customer", text: `${name} replied` };
    case "customer.choice.accept":
      return { ...base, kind: "customer", text: `${name} chose ${short(store, d.sessionId as string)}` };
    case "customer.choice.refund":
      return { ...base, kind: "customer", text: `${name} chose a refund` };
    case "execute.seat_reserved":
      return { ...base, kind: "success", text: `Seat reserved ✓ · ${short(store, d.sessionId as string)}` };
    case "execute.seat_gone":
      return { ...base, kind: "warn", text: "That seat was just taken: refreshing options" };
    case "payment.captured":
      return { ...base, kind: "razorpay", text: `${formatRupees(Number(d.amountPaise))} captured ✓ · once · ${d.source === "razorpay_test" ? "Razorpay test mode" : "simulated"}` };
    case "capture.attempt_failed":
      return { ...base, kind: "warn", text: "Capture attempt failed: nothing charged" };
    case "event.duplicate_ignored":
      return { ...base, kind: "check", text: "Duplicate event ignored: nothing changed" };
    case "state.changed": {
      const to = d.to as string;
      if (to === "RESCUED") return { ...base, kind: "success", text: `Rescued ✓ · ${name} is booked` };
      if (to === "RELEASED") return { ...base, kind: "info", text: "Released: not captured. The money returns automatically", reason: d.reason as string };
      if (to === "ESCALATED") return { ...base, kind: "warn", text: "Handed to Ritu", reason: d.reason as string };
      if (to === "PENDING_RESOLUTION") return { ...base, kind: "warn", text: "A step failed: waiting for a retry", reason: d.reason as string };
      return null;
    }
    default:
      return null;
  }
}
