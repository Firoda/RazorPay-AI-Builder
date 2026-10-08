import { describe, expect, it } from "vitest";
import { FakeProvider } from "../server/ai/fake";
import { AiUnavailableError } from "../server/ai/provider";
import { HOUR_MS } from "../server/domain/time";
import type { Recommendation } from "../server/domain/types";
import { setup } from "./helpers";

const captures = (store: ReturnType<typeof setup>["store"]) =>
  store.audit.filter((a) => a.action === "payment.captured");

describe("hero flow (G01)", () => {
  it("offer → merchant approves → customer accepts → seat reserved, then payment captured exactly once", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G01");
    expect(c().state).toBe("MERCHANT_REVIEW");
    expect(c().offeredSessionIds).toEqual(["S-1018-AM", "S-1025-AM"]);
    expect(store.payments.get("pay_G01")!.status).toBe("authorized"); // nothing captured before acceptance

    await engine.merchantAction(caseId, { type: "approve" });
    expect(c().state).toBe("OFFER_SENT");
    const offer = store.messages.filter((m) => m.kind === "ai_offer").at(-1)!.text;
    expect(offer).toContain("₹2,000");
    expect(offer).not.toMatch(/\{\{/);

    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    expect(c().state).toBe("RESCUED");
    expect(store.payments.get("pay_G01")!.status).toBe("captured");
    expect(store.sessions.get("S-1018-AM")!.booked).toBe(8);
    expect(store.bookings.get("B-G01")!.status).toBe("rescued");

    const actions = store.audit.filter((a) => a.caseId === caseId).map((a) => a.action);
    expect(actions.indexOf("execute.seat_reserved")).toBeLessThan(actions.indexOf("payment.captured"));
    expect(captures(store)).toHaveLength(1);
  });

  it("rejects accepting a session that was not offered", async () => {
    const { engine, inject } = setup();
    const { caseId } = await inject("G01");
    await engine.merchantAction(caseId, { type: "approve" });
    await expect(engine.customerChoice(caseId, "accept", "S-1011-PM")).rejects.toThrow(/offered/);
  });
});

describe("system scenarios", () => {
  it("G02: original seat free → restore proposal, approve captures without AI", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G02");
    expect(c().state).toBe("RESTORE_PROPOSED");
    expect(store.audit.some((a) => a.actor === "ai")).toBe(false);
    await engine.merchantAction(caseId, { type: "approve" });
    expect(c().state).toBe("RESCUED");
    expect(store.payments.get("pay_G02")!.status).toBe("captured");
  });

  it("G05: duplicate payment → released, never captured", async () => {
    const { store, inject } = setup();
    const { c } = await inject("G05");
    expect(c().state).toBe("RELEASED");
    expect(c().reason).toBe("duplicate_payment");
    expect(store.payments.get("pay_G05")!.status).toBe("authorized");
  });

  it("G06: replayed event and a second event for the same payment change nothing", async () => {
    const { store, engine, inject } = setup();
    const { event, caseId } = await inject("G06");
    await engine.merchantAction(caseId, { type: "approve" });
    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    const before = JSON.stringify([...store.cases.values()]);
    expect((await engine.ingestPaymentEvent(event)).status).toBe("duplicate_event");
    expect((await engine.ingestPaymentEvent({ ...event, id: "evt_other" })).status).toBe("existing_case");
    expect(JSON.stringify([...store.cases.values()])).toBe(before);
    expect(store.cases.size).toBe(1);
    expect(captures(store)).toHaveLength(1);
  });

  it("G07: payment still failed (screenshot only) → no action", async () => {
    const { inject } = setup();
    const { c } = await inject("G07");
    expect([c().state, c().reason]).toEqual(["NO_ACTION", "payment_not_authorized"]);
  });

  it("G08: amount mismatch → escalate", async () => {
    const { inject } = setup();
    const { c } = await inject("G08");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "amount_mismatch"]);
  });

  it("G09: already captured → rebook without capture; refund request goes to merchant review", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G09");
    expect(c().moneyMode).toBe("already_captured");
    expect(c().state).toBe("MERCHANT_REVIEW");
    await engine.merchantAction(caseId, { type: "approve" });
    await engine.customerChoice(caseId, "accept", "S-1025-AM");
    expect(c().state).toBe("RESCUED");
    expect(captures(store)).toHaveLength(0);

    const second = setup();
    const g = await second.inject("G09");
    await second.engine.merchantAction(g.caseId, { type: "approve" });
    await second.engine.customerChoice(g.caseId, "refund");
    expect([g.c().state, g.c().reason]).toEqual(["ESCALATED", "refund_review_needed"]);
  });

  it("G10: under 6h to deadline → escalate immediately", async () => {
    const { inject } = setup();
    const { c } = await inject("G10");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "deadline_too_close"]);
  });

  it("G19: no reply → escalate at T-6h → auto-refund at T-0", async () => {
    const { store, engine, inject } = setup();
    const { c } = await inject("G19");
    expect(c().state).toBe("AWAITING_CUSTOMER");
    store.setNow(new Date(Date.parse(c().deadline) - 5 * HOUR_MS).toISOString());
    engine.tick();
    expect([c().state, c().reason]).toEqual(["ESCALATED", "deadline_approaching"]);
    store.setNow(c().deadline);
    engine.tick();
    expect(c().state).toBe("AUTO_REFUNDED");
    expect(store.payments.get("pay_G19")!.status).toBe("refunded");
  });

  it("G20: last seat sold before execution → no capture, refreshed proposal without that seat", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G20");
    await engine.merchantAction(caseId, { type: "approve" });
    store.sessions.get("S-1018-AM")!.booked = 8; // someone else takes the last seat
    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    expect(c().state).toBe("MERCHANT_REVIEW");
    expect(c().offeredSessionIds).toEqual(["S-1025-AM"]);
    expect(c().flags).toContain("refreshed_after_seat_loss");
    expect(store.payments.get("pay_G20")!.status).toBe("authorized");
  });

  it("G21: calendar write fails → pending resolution, no capture; retry succeeds", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G21");
    await engine.merchantAction(caseId, { type: "approve" });
    store.faults.reserveFailures = 1;
    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    expect([c().state, c().reason]).toEqual(["PENDING_RESOLUTION", "calendar_write_failed"]);
    expect(store.payments.get("pay_G21")!.status).toBe("authorized");
    await engine.merchantAction(caseId, { type: "retry" });
    expect(c().state).toBe("RESCUED");
  });

  it("G22: capture fails twice after reserving → pending, seat held, no false success; retry captures once", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G22");
    await engine.merchantAction(caseId, { type: "approve" });
    store.faults.captureFailures = 2;
    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    expect([c().state, c().reason]).toEqual(["PENDING_RESOLUTION", "capture_failed"]);
    expect(store.sessions.get("S-1018-AM")!.booked).toBe(8); // seat held
    expect(store.messages.some((m) => /You're booked/.test(m.text))).toBe(false);
    await engine.merchantAction(caseId, { type: "retry" });
    expect(c().state).toBe("RESCUED");
    expect(store.sessions.get("S-1018-AM")!.booked).toBe(8); // not reserved twice
    expect(captures(store)).toHaveLength(1);
  });

  it("G22b: pending case reaching the deadline releases the held seat", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G22");
    await engine.merchantAction(caseId, { type: "approve" });
    store.faults.captureFailures = 2;
    await engine.customerChoice(caseId, "accept", "S-1018-AM");
    store.setNow(c().deadline);
    engine.tick();
    expect(c().state).toBe("AUTO_REFUNDED");
    expect(store.sessions.get("S-1018-AM")!.booked).toBe(7);
  });

  it("G23: refund already in flight → no action", async () => {
    const { inject } = setup();
    const { c } = await inject("G23");
    expect([c().state, c().reason]).toEqual(["NO_ACTION", "refund_in_flight"]);
  });

  it("G26: message from an unknown number → escalate, AI never called", async () => {
    const { store, inject } = setup();
    const { c } = await inject("G26");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "identity_unverified"]);
    expect(store.audit.some((a) => a.actor === "ai")).toBe(false);
  });
});

describe("guardrails", () => {
  it("injection flagged by AI → escalate, no money action", async () => {
    const { store, inject } = setup();
    const { c } = await inject("G17");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "injection_detected"]);
    expect(store.payments.get("pay_G17")!.status).toBe("authorized");
  });

  it("refund request ends the flow with a release (no persuasion)", async () => {
    const { store, inject } = setup();
    const { c } = await inject("G04");
    expect(c().state).toBe("RELEASED");
    expect(store.messages.filter((m) => m.direction === "outbound" && m.kind === "ai_offer")).toHaveLength(0);
  });

  it("stop request → released and no further messages are sent", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G24");
    expect(c().state).toBe("RELEASED");
    expect(c().stopContact).toBe(true);
    const outboundBefore = store.messages.filter((m) => m.direction === "outbound").length;
    await engine.customerMessage(caseId, "hello?");
    expect(store.messages.filter((m) => m.direction === "outbound").length).toBe(outboundBefore);
  });

  it("extra seats → escalate", async () => {
    const { inject } = setup();
    const { c } = await inject("G14");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "extra_seats_requested"]);
  });

  it("AI proposing an infeasible session is rejected; after retry the case escalates", async () => {
    const bad: Recommendation = {
      decision: "offer_alternative", merchant_summary: "x", customer_message: "x", confidence: "high",
      ranked_options: [{ session_id: "S-1011-PM", fit_explanation: "same day" }],
    };
    const { store, inject } = setup(new FakeProvider({ recommend: () => bad }));
    const { c } = await inject("G01");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "ai_output_invalid"]);
    expect(store.audit.filter((a) => a.action === "ai.recommend")).toHaveLength(2);
  });

  it("AI draft containing an amount is replaced by a safe template", async () => {
    const leaky: Recommendation = {
      decision: "offer_alternative", merchant_summary: "x", confidence: "high",
      customer_message: "Hi {{NAME}}! Pay just ₹1,500 more for {{SESSION_1}}!",
      ranked_options: [{ session_id: "S-1018-AM", fit_explanation: "fits" }],
    };
    const { inject } = setup(new FakeProvider({ recommend: () => leaky }));
    const { c } = await inject("G01");
    expect(c().state).toBe("MERCHANT_REVIEW");
    expect(c().offerMessage).not.toContain("₹1,500");
    expect(c().offerMessage).toContain("no extra charge");
  });

  it("AI unavailable → escalate instead of guessing", async () => {
    const down = new FakeProvider();
    down.extractIntent = async () => {
      throw new AiUnavailableError("quota");
    };
    const { inject } = setup(down);
    const { c } = await inject("G01");
    expect([c().state, c().reason]).toEqual(["ESCALATED", "ai_unavailable"]);
  });

  it("merchant edit cannot pick a different-priced session; valid edit is recorded for learning", async () => {
    const { store, engine, inject } = setup();
    const { caseId } = await inject("G01");
    await expect(engine.merchantAction(caseId, { type: "edit", sessionIds: ["S-1018-GL"] })).rejects.toThrow(/price/);
    await engine.merchantAction(caseId, { type: "edit", sessionIds: ["S-1025-AM"] });
    expect(store.learning).toHaveLength(1);
    expect(store.cases.get(caseId)!.state).toBe("OFFER_SENT");
  });

  it("contact limit: at most 2 unanswered outbound messages", async () => {
    const { store, engine, inject } = setup();
    const { c, caseId } = await inject("G01"); // notice already sent (1 unanswered)
    await engine.merchantAction(caseId, { type: "approve" }); // offer (2 unanswered)
    expect(c().unansweredContacts).toBe(2);
    const sent = store.messages.filter((m) => m.direction === "outbound").length;
    // a "question" reply resets the counter; an unclear reply after that is answered once
    await engine.customerMessage(caseId, "is there parking?");
    expect(store.messages.filter((m) => m.direction === "outbound").length).toBe(sent + 1);
  });

  it("learning: a merchant correction is retrieved as a few-shot example for the next similar case", async () => {
    const { engine, inject, store } = setup();
    const first = await inject("G01");
    await engine.merchantAction(first.caseId, { type: "edit", sessionIds: ["S-1025-AM"] });
    const second = await inject("G11");
    expect(second.c().learnedFrom).toEqual([first.caseId]);
    const call = store.audit.find((a) => a.caseId === second.caseId && a.action === "ai.recommend");
    expect(call).toBeTruthy();
  });
});
