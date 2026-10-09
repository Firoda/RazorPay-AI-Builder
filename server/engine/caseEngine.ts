import type { CalendarAdapter } from "../adapters/calendar";
import type { PaymentGateway } from "../adapters/razorpay";
import { AiUnavailableError, type AiProvider, type AiResult } from "../ai/provider";
import { WORKSHOP_NAMES, sessionLabelForCustomer, sessionView } from "../domain/labels";
import { HOUR_MS, dayName, formatInstantIST, formatRupees, istDateOf } from "../domain/time";
import {
  TERMINAL_STATES,
  type CaseState,
  type ChatMessage,
  type Customer,
  type ExtractedIntent,
  type LearningRecord,
  type Payment,
  type Recommendation,
  type RescueCase,
  type PaymentEvent,
} from "../domain/types";
import type { Store } from "../store/memoryStore";
import { filterCandidates, satisfies } from "./candidateFilter";
import { checkEligibility } from "./eligibility";
import { fillPlaceholders, template } from "./messages";
import { messageNeedsFallback, validateIntent, validateRecommendation, validateReply } from "./validator";

export interface EngineDeps {
  store: Store;
  ai: AiProvider;
  gateway: PaymentGateway;
  calendar: CalendarAdapter;
}

export type MerchantAction =
  | { type: "approve" }
  | { type: "edit"; sessionIds: string[]; message?: string }
  | { type: "reject"; reasonChip?: string; note?: string }
  | { type: "release" }
  | { type: "retry" };

export class EngineError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

/**
 * The SeatSaver case engine: a state machine where AI proposes and code decides.
 * Only three methods call the AI (extract, recommend, interpret); none of them move money.
 */
export class CaseEngine {
  constructor(private d: EngineDeps) {}

  private get s(): Store {
    return this.d.store;
  }

  // ───────────────────────────── Intake ─────────────────────────────

  async ingestPaymentEvent(evt: PaymentEvent): Promise<{ status: string; caseId?: string }> {
    const s = this.s;
    const existing = s.caseForPayment(evt.paymentId);
    if (s.seenEvents.has(evt.id)) {
      s.log("system", "event.duplicate_ignored", existing?.id, { eventId: evt.id });
      return { status: "duplicate_event", caseId: existing?.id };
    }
    s.seenEvents.add(evt.id);
    s.log("razorpay", `event.${evt.type}`, existing?.id, { eventId: evt.id, paymentId: evt.paymentId, source: evt.source });

    const local = s.payments.get(evt.paymentId);
    if (!local) return { status: "unknown_payment" };
    if (existing) {
      s.log("system", "event.attached_to_existing_case", existing.id, { eventId: evt.id });
      return { status: "existing_case", caseId: existing.id };
    }

    const booking = s.bookings.get(local.notes.booking_id);
    const c: RescueCase = {
      id: s.nextId("case"),
      paymentId: local.id,
      bookingId: local.notes.booking_id,
      customerId: booking?.customerId ?? local.notes.customer_id,
      originalSessionId: booking?.sessionId ?? "",
      state: "DETECTED",
      moneyMode: local.status === "captured" ? "already_captured" : "capture",
      deadline: local.captureDeadline,
      createdAt: s.nowIso(),
      updatedAt: s.nowIso(),
      unansweredContacts: 0,
      stopContact: false,
      flags: [],
    };
    s.cases.set(c.id, c);
    s.log("system", "case.detected", c.id, { paymentId: c.paymentId, bookingId: c.bookingId });

    let payment: Payment;
    try {
      payment = await this.d.gateway.getPayment(local);
    } catch (err) {
      this.escalate(c, "payment_state_unverified", String(err));
      return { status: "case_created", caseId: c.id };
    }

    const elig = checkEligibility(s, payment);
    s.log("system", "eligibility.checked", c.id, elig);
    switch (elig.kind) {
      case "no_action":
        this.transition(c, "NO_ACTION", { decision: "no_action", reason: elig.reason });
        break;
      case "release":
        this.release(c, elig.reason, true);
        break;
      case "escalate":
        this.escalate(c, elig.reason);
        break;
      case "restore":
        c.offeredSessionIds = [c.originalSessionId];
        this.transition(c, "RESTORE_PROPOSED", { decision: "restore_original", reason: "original_seat_free" });
        break;
      case "eligible":
        c.moneyMode = elig.moneyMode;
        this.send(c, this.fill(c, template("notice", this.lang(c))), "template");
        this.transition(c, "AWAITING_CUSTOMER");
        await this.runProposal(c);
        break;
    }
    return { status: "case_created", caseId: c.id };
  }

  // ───────────────────────────── Proposal ─────────────────────────────

  /** Extract intent → filter → recommend → validate. Ends in MERCHANT_REVIEW or a terminal/escalated state. */
  async runProposal(c: RescueCase, opts: { reuseIntent?: boolean; exclude?: string[] } = {}): Promise<void> {
    const { verified, unverified } = this.inbound(c);
    if (unverified.length) {
      if (!c.flags.includes("identity_unverified")) c.flags.push("identity_unverified");
      return this.escalate(c, "identity_unverified");
    }
    if (!verified.length && !opts.reuseIntent) return; // keep waiting for the customer

    const intent = opts.reuseIntent && c.intent ? c.intent : await this.extractIntent(c, verified);
    if (!intent) return;

    if (intent.injection_detected) {
      c.flags.push("injection_detected");
      return this.escalate(c, "injection_detected");
    }
    if (intent.stop_contact_requested) {
      c.stopContact = true;
      return this.release(c, "customer_requested_stop", false);
    }
    if (intent.wants === "refund") return this.release(c, "customer_requested_refund", true);
    if (intent.wants === "original_only") return this.release(c, "original_slot_only", true);

    const booking = this.s.bookings.get(c.bookingId)!;
    if (intent.seats_needed > booking.seats) return this.escalate(c, "extra_seats_requested");
    if (intent.wants === "unclear" && !intent.hard_constraints.length && !intent.soft_preferences.length) {
      return this.ask(c);
    }

    const original = this.s.sessions.get(c.originalSessionId)!;
    const { candidates, unverified: unverifiedConstraints } = filterCandidates({
      sessions: [...this.s.sessions.values()],
      original,
      policy: this.s.policy,
      hard: intent.hard_constraints,
      seatsNeeded: booking.seats,
      now: this.s.now(),
      exclude: opts.exclude,
    });
    c.candidates = candidates;
    c.unverifiedConstraints = unverifiedConstraints;
    this.s.log("system", "candidates.filtered", c.id, {
      feasible: candidates.filter((x) => x.feasible).map((x) => x.sessionId),
      unverifiedConstraints,
    });

    const rec = await this.recommend(c, intent);
    if (!rec) return;
    c.recommendation = rec;

    switch (rec.decision) {
      case "offer_alternative": {
        const contradicted = this.contradictsExplicitRequest(intent, rec.ranked_options.map((o) => o.session_id));
        if (contradicted.length) {
          this.s.log("system", "guard.offer_contradicts_request", c.id, { contradicted });
          return this.escalate(c, "offer_contradicts_request");
        }
        c.offeredSessionIds = rec.ranked_options.map((o) => o.session_id);
        c.offerMessage = this.composeOffer(c, c.offeredSessionIds, rec);
        this.transition(c, "MERCHANT_REVIEW", { decision: "offer_alternative", reason: unverifiedConstraints.length ? "unverified_constraints" : undefined });
        if (this.autoApproves(c)) await this.sendOffer(c, "auto_approved_by_policy");
        return;
      }
      case "release_refund":
        return this.release(c, candidates.some((x) => x.feasible) ? "ai_recommended_release" : "no_feasible_option", true);
      case "ask_customer":
        return this.ask(c);
      case "escalate":
        return this.escalate(c, rec.escalation_reason || "ai_escalated");
    }
  }

  private async extractIntent(c: RescueCase, messages: ChatMessage[]): Promise<ExtractedIntent | null> {
    const booking = this.s.bookings.get(c.bookingId)!;
    const original = this.s.sessions.get(c.originalSessionId)!;
    const sessions = [...this.s.sessions.values()];
    const today = istDateOf(this.s.nowIso());
    const input = {
      originalSessionLabel: sessionLabelForCustomer(original),
      originalDate: original.date,
      workshopType: original.workshopType,
      instructor: original.instructor,
      seats: booking.seats,
      today: `${today} (${dayName(today)})`,
      instructors: [...new Set(sessions.map((x) => x.instructor))],
      workshopTypes: Object.keys(WORKSHOP_NAMES),
      customerMessages: messages.map((m) => m.text),
    };
    for (let attempt = 1; attempt <= 2; attempt++) {
      const res = await this.callAi(c, "intent", () => this.d.ai.extractIntent(input));
      if (!res) return null;
      const v = validateIntent(res.data);
      this.s.log("system", "ai.intent.validated", c.id, { attempt, ok: v.ok, issues: v.issues });
      if (v.ok) {
        c.intent = v.value;
        return v.value;
      }
    }
    this.escalate(c, "ai_output_invalid");
    return null;
  }

  private async recommend(c: RescueCase, intent: ExtractedIntent): Promise<Recommendation | null> {
    const original = this.s.sessions.get(c.originalSessionId)!;
    const feasibleIds = c.candidates!.filter((x) => x.feasible).map((x) => x.sessionId);
    const view = (id: string) => sessionView(this.s.sessions.get(id)!, this.s.seatsLeft(id));
    const fewShot = this.fewShotFor(c, intent);
    const input = {
      intent,
      original: view(original.id),
      feasible: feasibleIds.map(view),
      excluded: c.candidates!.filter((x) => !x.feasible).map((x) => ({ ...view(x.sessionId), reasons: x.reasons })),
      maxDaysAhead: this.s.policy.maxDaysAhead,
      fewShot: fewShot.map((r) => ({
        customer_constraints: r.constraintTags,
        ai_offered: r.offered,
        merchant_changed_to: r.merchantChoice,
        merchant_reason: r.reasonChip ?? r.note,
      })),
    };
    c.learnedFrom = fewShot.map((r) => r.caseId);
    for (let attempt = 1; attempt <= 2; attempt++) {
      const res = await this.callAi(c, "recommend", () => this.d.ai.recommend(input));
      if (!res) return null;
      const v = validateRecommendation(res.data, feasibleIds);
      this.s.log("system", "ai.recommend.validated", c.id, { attempt, ok: v.ok, issues: v.issues });
      if (v.ok) return v.value;
    }
    this.escalate(c, "ai_output_invalid");
    return null;
  }

  private async callAi(c: RescueCase, kind: string, fn: () => Promise<AiResult>): Promise<AiResult | null> {
    try {
      const res = await fn();
      this.s.log("ai", `ai.${kind}`, c.id, { output: res.data, meta: res.meta });
      return res;
    } catch (err) {
      this.s.log("system", `ai.${kind}.failed`, c.id, { error: String(err) });
      this.escalate(c, err instanceof AiUnavailableError ? "ai_unavailable" : "ai_error");
      return null;
    }
  }

  // ───────────────────────────── Merchant ─────────────────────────────

  async merchantAction(caseId: string, action: MerchantAction): Promise<RescueCase> {
    const c = this.getCase(caseId);
    this.s.log("merchant", `merchant.${action.type}`, c.id, action);
    switch (action.type) {
      case "approve":
        if (c.state === "RESTORE_PROPOSED") {
          await this.executeRescue(c, c.originalSessionId);
        } else if (c.state === "MERCHANT_REVIEW") {
          await this.sendOffer(c, "merchant_approved");
        } else throw new EngineError(`Cannot approve a case in state ${c.state}`);
        break;
      case "edit": {
        if (!["MERCHANT_REVIEW", "ESCALATED", "RESTORE_PROPOSED"].includes(c.state)) {
          throw new EngineError(`Cannot edit a case in state ${c.state}`);
        }
        this.assertMerchantSessionsValid(c, action.sessionIds);
        this.recordLearning(c, "edit", action.sessionIds, undefined, undefined);
        c.offeredSessionIds = action.sessionIds;
        c.offerMessage = action.message?.trim()
          ? this.fill(c, action.message, action.sessionIds)
          : this.composeOffer(c, action.sessionIds, undefined);
        c.decision = "offer_alternative";
        await this.sendOffer(c, "merchant_edited");
        break;
      }
      case "reject":
        if (TERMINAL_STATES.includes(c.state)) throw new EngineError(`Case already closed (${c.state})`);
        this.recordLearning(c, "reject", null, action.reasonChip, action.note);
        this.escalate(c, "merchant_rejected");
        break;
      case "release":
        if (TERMINAL_STATES.includes(c.state)) throw new EngineError(`Case already closed (${c.state})`);
        this.release(c, "merchant_released", true);
        break;
      case "retry":
        if (c.state !== "PENDING_RESOLUTION" || !c.targetSessionId) throw new EngineError("Nothing to retry");
        await this.executeRescue(c, c.targetSessionId);
        break;
    }
    return c;
  }

  private assertMerchantSessionsValid(c: RescueCase, ids: string[]): void {
    if (!ids.length || ids.length > 2) throw new EngineError("Offer 1 or 2 sessions");
    if (c.moneyMode === "capture" && Date.parse(c.deadline) <= this.s.now().getTime()) {
      throw new EngineError("Capture deadline has passed");
    }
    const booking = this.s.bookings.get(c.bookingId)!;
    const original = this.s.sessions.get(c.originalSessionId)!;
    for (const id of ids) {
      const sess = this.s.sessions.get(id);
      if (!sess) throw new EngineError(`Unknown session ${id}`);
      // Merchant may override customer preferences, but never money correctness or capacity.
      if (sess.pricePaise !== original.pricePaise) throw new EngineError(`${id} has a different price (same-price only in v1)`);
      if (this.s.seatsLeft(id) < booking.seats) throw new EngineError(`${id} has no seats left`);
    }
  }

  private async sendOffer(c: RescueCase, via: string): Promise<void> {
    if (!this.send(c, c.offerMessage!, "ai_offer")) return this.escalate(c, "contact_limit_reached");
    this.transition(c, "OFFER_SENT", { reason: via });
  }

  // ───────────────────────────── Customer ─────────────────────────────

  async customerMessage(caseId: string, text: string, fromContact?: string): Promise<RescueCase> {
    const c = this.getCase(caseId);
    const customer = this.customer(c);
    const contact = fromContact ?? customer.contact;
    const verified = contact === customer.contact;
    this.s.messages.push({
      id: this.s.nextId("msg"), caseId: c.id, customerId: c.customerId, direction: "inbound",
      fromContact: contact, text, at: this.s.nowIso(),
    });
    this.s.log("customer", "customer.message", c.id, { verified });
    if (TERMINAL_STATES.includes(c.state)) return c;
    if (!verified) {
      if (!c.flags.includes("identity_unverified")) c.flags.push("identity_unverified");
      this.escalate(c, "identity_unverified");
      return c;
    }
    c.unansweredContacts = 0;

    if (c.state === "OFFER_SENT") await this.interpretReply(c, text);
    else if (c.state === "AWAITING_CUSTOMER" || c.state === "MERCHANT_REVIEW") await this.runProposal(c);
    return c;
  }

  private async interpretReply(c: RescueCase, text: string): Promise<void> {
    const offered = (c.offeredSessionIds ?? []).map((id, i) => ({
      option: i + 1,
      session_id: id,
      label: sessionLabelForCustomer(this.s.sessions.get(id)!),
    }));
    const res = await this.callAi(c, "reply", () => this.d.ai.interpretReply({ offered, reply: text }));
    if (!res) return;
    const v = validateReply(res.data, offered.map((o) => o.session_id));
    this.s.log("system", "ai.reply.validated", c.id, { ok: v.ok, issues: v.issues });
    if (!v.ok) return this.escalate(c, "ai_output_invalid");
    const r = v.value;
    c.replyInterpretation = r;

    if (r.injection_detected) {
      c.flags.push("injection_detected");
      return this.escalate(c, "injection_in_reply");
    }
    switch (r.intent) {
      case "accept":
        return this.executeRescue(c, r.selected_session_id!);
      case "refund":
        return this.release(c, "customer_requested_refund", true);
      case "stop":
        c.stopContact = true;
        return this.release(c, "customer_requested_stop", false);
      case "request_other":
        this.transition(c, "AWAITING_CUSTOMER", { reason: "customer_requested_other" });
        return this.runProposal(c, { exclude: c.offeredSessionIds });
      case "question":
        if (!c.flags.includes("customer_question")) c.flags.push("customer_question");
        this.send(c, this.fill(c, template("question_ack", this.lang(c))), "template");
        return;
      case "unclear": {
        const key = (c.offeredSessionIds?.length ?? 0) > 1 ? "which_option" : "clarify";
        if (!this.send(c, this.fill(c, template(key, this.lang(c))), "template")) this.escalate(c, "customer_unclear");
        return;
      }
    }
  }

  async customerChoice(caseId: string, choice: "accept" | "refund" | "other", sessionId?: string): Promise<RescueCase> {
    const c = this.getCase(caseId);
    this.s.log("customer", `customer.choice.${choice}`, c.id, { sessionId });
    if (c.state !== "OFFER_SENT") throw new EngineError(`No open offer (state ${c.state})`);
    c.unansweredContacts = 0;
    if (choice === "accept") {
      if (!sessionId || !c.offeredSessionIds?.includes(sessionId)) throw new EngineError("Choose one of the offered sessions");
      await this.executeRescue(c, sessionId);
    } else if (choice === "refund") {
      this.release(c, "customer_requested_refund", true);
    } else {
      this.transition(c, "AWAITING_CUSTOMER", { reason: "customer_requested_other" });
      this.send(c, this.fill(c, template("clarify", this.lang(c))), "template");
    }
    return c;
  }

  // ───────────────────────────── Execution ─────────────────────────────

  /** Order of operations (build plan §2.4): re-verify money → re-check seat → reserve → capture → confirm. */
  private async executeRescue(c: RescueCase, sessionId: string): Promise<void> {
    const s = this.s;
    const booking = s.bookings.get(c.bookingId)!;
    c.targetSessionId = sessionId;
    this.transition(c, "EXECUTING");

    // 1. Authoritative money state
    let payment: Payment;
    try {
      payment = await this.d.gateway.getPayment(s.payments.get(c.paymentId)!);
    } catch (err) {
      return this.pending(c, "payment_fetch_failed", String(err));
    }
    const captureKey = `capture:${payment.id}`;
    if (c.moneyMode === "capture" && s.ledger.get(captureKey)?.status !== "succeeded") {
      if (payment.status !== "authorized") return this.escalate(c, `payment_${payment.status}_cannot_capture`);
      if (Date.parse(c.deadline) <= s.now().getTime()) return this.escalate(c, "deadline_passed");
    }

    // 2–3. Re-check and reserve the seat (reversible) before touching money (irreversible)
    const reserveKey = `reserve:${c.id}:${sessionId}`;
    if (s.ledger.get(reserveKey)?.status !== "succeeded") {
      if (this.d.calendar.seatsLeft(sessionId) < booking.seats) {
        s.log("system", "execute.seat_gone", c.id, { sessionId });
        c.flags.push("refreshed_after_seat_loss");
        this.send(c, this.fill(c, template("seat_lost", this.lang(c))), "template", { force: true });
        if (!c.intent) return this.escalate(c, "seat_lost");
        this.transition(c, "AWAITING_CUSTOMER", { reason: "seat_lost_refreshing" });
        return this.runProposal(c, { reuseIntent: true, exclude: [sessionId] });
      }
      this.ledger(reserveKey, "started");
      try {
        this.d.calendar.reserve(sessionId, booking.seats);
        this.ledger(reserveKey, "succeeded");
        s.log("system", "execute.seat_reserved", c.id, { sessionId, seats: booking.seats });
      } catch (err) {
        this.ledger(reserveKey, "failed", String(err));
        return this.pending(c, "calendar_write_failed", String(err));
      }
    }

    // 4. Capture (once, idempotent by payment id). One retry with the same key on failure.
    if (c.moneyMode === "capture" && s.ledger.get(captureKey)?.status !== "succeeded") {
      this.ledger(captureKey, "started");
      let lastError = "";
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          payment = await this.d.gateway.capture(payment, payment.amountPaise);
          if (payment.status === "captured") break;
          lastError = `unexpected status ${payment.status}`;
        } catch (err) {
          lastError = String((err as Error).message ?? err);
          s.log("razorpay", "capture.attempt_failed", c.id, { attempt, error: lastError });
        }
      }
      if (payment.status !== "captured") {
        this.ledger(captureKey, "failed", lastError);
        this.send(c, this.fill(c, template("pending", this.lang(c))), "template", { force: true });
        return this.pending(c, "capture_failed", lastError);
      }
      this.ledger(captureKey, "succeeded");
      s.log("razorpay", "payment.captured", c.id, { paymentId: payment.id, amountPaise: payment.amountPaise, source: payment.source });
    }

    // 5. Confirm
    booking.sessionId = sessionId;
    booking.status = "rescued";
    booking.paymentId = payment.id;
    c.rescuedSessionId = sessionId;
    this.transition(c, "RESCUED", { reason: c.moneyMode === "capture" ? "captured_after_acceptance" : "rebooked_already_captured" });
    this.send(c, this.fill(c, template("rescued", this.lang(c)), [sessionId]), "template", { force: true });
  }

  // ───────────────────────────── Deadline watcher ─────────────────────────────

  /** Escalate cases near Razorpay's auto-refund deadline; mark auto-refunds when it passes. */
  tick(): void {
    const s = this.s;
    const now = s.now().getTime();
    for (const c of s.cases.values()) {
      if (c.moneyMode !== "capture" || c.state === "RESCUED" || c.state === "NO_ACTION" || c.state === "AUTO_REFUNDED") continue;
      const payment = s.payments.get(c.paymentId)!;
      const deadline = Date.parse(c.deadline);
      if (now >= deadline && payment.status === "authorized") {
        if (payment.source === "simulated") {
          payment.status = "refunded";
          payment.refundStatus = "processed";
        }
        s.log("razorpay", "payment.auto_refunded", c.id, { paymentId: payment.id });
        if (c.targetSessionId && s.ledger.get(`reserve:${c.id}:${c.targetSessionId}`)?.status === "succeeded") {
          this.d.calendar.release(c.targetSessionId, s.bookings.get(c.bookingId)!.seats);
          s.log("system", "seat.released_after_auto_refund", c.id, { sessionId: c.targetSessionId });
        }
        if (c.state !== "RELEASED") this.transition(c, "AUTO_REFUNDED", { reason: "capture_window_expired" });
      } else if (
        !["ESCALATED", "RELEASED", "PENDING_RESOLUTION", "EXECUTING"].includes(c.state) &&
        deadline - now <= s.policy.escalateBeforeDeadlineHours * HOUR_MS &&
        deadline > now
      ) {
        this.escalate(c, "deadline_approaching");
      }
    }
  }

  // ───────────────────────────── Helpers ─────────────────────────────

  getCase(id: string): RescueCase {
    const c = this.s.cases.get(id);
    if (!c) throw new EngineError(`Case ${id} not found`, 404);
    return c;
  }

  private customer(c: RescueCase): Customer {
    return this.s.customers.get(c.customerId)!;
  }

  private lang(c: RescueCase) {
    return c.intent?.customer_language ?? this.customer(c).language;
  }

  private inbound(c: RescueCase): { verified: ChatMessage[]; unverified: ChatMessage[] } {
    const contact = this.customer(c).contact;
    const msgs = this.s.messagesFor(c.customerId).filter((m) => m.direction === "inbound" && (!m.caseId || m.caseId === c.id));
    return {
      verified: msgs.filter((m) => (m.fromContact ?? contact) === contact),
      unverified: msgs.filter((m) => (m.fromContact ?? contact) !== contact),
    };
  }

  private transition(c: RescueCase, to: CaseState, patch: Partial<RescueCase> = {}): void {
    const from = c.state;
    Object.assign(c, patch, { state: to, updatedAt: this.s.nowIso() });
    this.s.log("system", "state.changed", c.id, { from, to, reason: patch.reason });
  }

  private escalate(c: RescueCase, reason: string, detail?: string): void {
    this.transition(c, "ESCALATED", { decision: "escalate", reason });
    if (detail) this.s.log("system", "escalation.detail", c.id, { detail });
  }

  private pending(c: RescueCase, reason: string, detail?: string): void {
    this.transition(c, "PENDING_RESOLUTION", { reason });
    if (detail) this.s.log("system", "pending.detail", c.id, { detail });
  }

  /** Don't capture. Razorpay returns the authorised amount automatically at the deadline. */
  private release(c: RescueCase, reason: string, notify: boolean): void {
    if (c.moneyMode === "already_captured") return this.escalate(c, "refund_review_needed");
    this.transition(c, "RELEASED", { decision: "release_refund", reason });
    if (notify) this.send(c, this.fill(c, template("released", this.lang(c))), "template", { force: true });
  }

  private ask(c: RescueCase): void {
    if (!this.send(c, this.fill(c, template("clarify", this.lang(c))), "template")) {
      return this.escalate(c, "customer_unresponsive");
    }
    this.transition(c, "AWAITING_CUSTOMER", { decision: "ask_customer", reason: "intent_unclear" });
  }

  /**
   * Outbound message with contact guardrails: never after "stop", and at most N unanswered messages.
   * `force` is for confirmations of an action the customer asked for (still blocked by "stop").
   */
  private send(c: RescueCase, text: string, kind: ChatMessage["kind"], opts: { force?: boolean } = {}): boolean {
    if (c.stopContact) {
      this.s.log("system", "message.suppressed", c.id, { reason: "stop_contact" });
      return false;
    }
    if (!opts.force && c.unansweredContacts >= this.s.policy.maxUnansweredContacts) {
      this.s.log("system", "message.suppressed", c.id, { reason: "contact_limit" });
      return false;
    }
    if (!opts.force) c.unansweredContacts++;
    this.s.messages.push({
      id: this.s.nextId("msg"), caseId: c.id, customerId: c.customerId, direction: "outbound", text, at: this.s.nowIso(), kind,
    });
    return true;
  }

  private composeOffer(c: RescueCase, sessionIds: string[], rec: Recommendation | undefined): string {
    const draft = rec?.customer_message;
    const fromAi = draft && rec && sessionIds.join() === rec.ranked_options.map((o) => o.session_id).join();
    const issues = fromAi ? validateRecommendation(rec, sessionIds).issues : ["not_ai"];
    const text = fromAi && !messageNeedsFallback(issues)
      ? this.fill(c, draft, sessionIds)
      : this.fill(c, template(sessionIds.length > 1 ? "offer2" : "offer1", this.lang(c)), sessionIds);
    if (/\{\{/.test(text)) return this.fill(c, template(sessionIds.length > 1 ? "offer2" : "offer1", this.lang(c)), sessionIds);
    if (fromAi && messageNeedsFallback(issues)) this.s.log("system", "ai.message_replaced_by_template", c.id, { issues });
    return text;
  }

  private fill(c: RescueCase, text: string, sessionIds: string[] = c.offeredSessionIds ?? []): string {
    const payment = this.s.payments.get(c.paymentId)!;
    const original = this.s.sessions.get(c.originalSessionId);
    const label = (id?: string) => (id && this.s.sessions.get(id) ? sessionLabelForCustomer(this.s.sessions.get(id)!) : "");
    return fillPlaceholders(text, {
      NAME: this.customer(c).name,
      AMOUNT: formatRupees(payment.amountPaise),
      ORIGINAL: original ? sessionLabelForCustomer(original) : "your booking",
      SESSION_1: label(sessionIds[0]),
      SESSION_2: label(sessionIds[1]),
      DEADLINE: formatInstantIST(c.deadline),
    });
  }

  private ledger(key: string, status: "started" | "succeeded" | "failed", detail?: string): void {
    this.s.ledger.set(key, { key, status, at: this.s.nowIso(), detail });
  }

  private autoApproves(c: RescueCase): boolean {
    if (this.s.policy.autonomy !== "L2" || c.unverifiedConstraints?.length) return false;
    const tags = (c.intent?.hard_constraints ?? []).map((h) => h.type).sort().join("+");
    return this.s.policy.autoApprovePatterns.includes(tags);
  }

  private constraintTags(c: RescueCase): string[] {
    const i = c.intent;
    if (!i) return [];
    return [...i.hard_constraints.map((h) => `hard:${h.type}:${h.value}`), ...i.soft_preferences.map((p) => `soft:${p.type}:${p.value}`)];
  }

  private recordLearning(c: RescueCase, action: "edit" | "reject", choice: string[] | null, reasonChip?: string, note?: string): void {
    const rec: LearningRecord = {
      id: this.s.nextId("learn"),
      caseId: c.id,
      constraintTags: this.constraintTags(c),
      offered: c.offeredSessionIds ?? [],
      merchantChoice: choice,
      action,
      reasonChip,
      note,
      at: this.s.nowIso(),
    };
    this.s.learning.push(rec);
    this.s.log("system", "learning.recorded", c.id, rec);
  }

  /**
   * Safety net: a month, date or workshop type the customer named must never be contradicted by an offer,
   * even when the AI recorded it as a soft preference. Returns the offending (sessionId, constraint) pairs.
   */
  private contradictsExplicitRequest(intent: ExtractedIntent, sessionIds: string[]): { sessionId: string; constraint: string }[] {
    const explicit = intent.soft_preferences.filter((p) => ["exact_date", "date_range", "workshop_type"].includes(p.type));
    const out: { sessionId: string; constraint: string }[] = [];
    for (const id of sessionIds) {
      const sess = this.s.sessions.get(id);
      if (!sess) continue;
      for (const p of explicit) if (satisfies(sess, p) === false) out.push({ sessionId: id, constraint: `${p.type}:${p.value}` });
    }
    return out;
  }

  /** Retrieve up to 3 past merchant corrections that share a constraint type with this case. */
  private fewShotFor(c: RescueCase, intent: ExtractedIntent): LearningRecord[] {
    const types = new Set([...intent.hard_constraints, ...intent.soft_preferences].map((x) => x.type));
    return this.s.learning
      .filter((r) => r.caseId !== c.id && r.constraintTags.some((t) => types.has(t.split(":")[1] as never)))
      .slice(-3);
  }
}
