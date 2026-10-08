import { describe, expect, it } from "vitest";
import { verifyWebhookSignature } from "../server/adapters/razorpay";
import { createHmac } from "node:crypto";
import { filterCandidates, satisfies } from "../server/engine/candidateFilter";
import { customerMessageIssues, validateRecommendation, validateReply } from "../server/engine/validator";
import { Store } from "../server/store/memoryStore";
import type { Constraint } from "../server/domain/types";

const store = new Store();
const S = (id: string) => store.sessions.get(id)!;
const c = (type: Constraint["type"], value: string): Constraint => ({ type, value, evidence_quote: "" });

describe("satisfies()", () => {
  it("checks day, weekend/weekday and multi-day values", () => {
    expect(satisfies(S("S-1018-AM"), c("day_of_week", "sunday"))).toBe(true);
    expect(satisfies(S("S-1017-AM"), c("day_of_week", "sunday"))).toBe(false);
    expect(satisfies(S("S-1017-AM"), c("day_of_week", "saturday|sunday"))).toBe(true);
    expect(satisfies(S("S-1014-EVE"), c("day_of_week", "weekday"))).toBe(true);
    expect(satisfies(S("S-1018-AM"), c("day_of_week", "weekend"))).toBe(true);
  });
  it("checks time windows and instructor (ignoring honorifics)", () => {
    expect(satisfies(S("S-1018-AM"), c("time_window", "morning"))).toBe(true);
    expect(satisfies(S("S-1018-PM"), c("time_window", "morning"))).toBe(false);
    expect(satisfies(S("S-1018-PM"), c("time_window", "evening"))).toBe(true);
    expect(satisfies(S("S-1018-AM"), c("instructor", "Arjun sir"))).toBe(true);
    expect(satisfies(S("S-1011-PM"), c("instructor", "Arjun"))).toBe(false);
  });
  it("returns null for constraints code cannot verify", () => {
    expect(satisfies(S("S-1018-AM"), c("other", "near metro"))).toBeNull();
    expect(satisfies(S("S-1018-AM"), c("day_of_week", "festival day"))).toBeNull();
    expect(satisfies(S("S-1018-AM"), c("exact_date", "next sunday"))).toBeNull();
  });
});

describe("filterCandidates()", () => {
  const now = new Date("2026-10-11T07:30:00+05:30");
  const run = (hard: Constraint[]) =>
    filterCandidates({ sessions: [...store.sessions.values()], original: S("S-1011-AM"), policy: store.policy, hard, seatsNeeded: 1, now });

  it("hero case: Sunday + morning + Arjun → only S-1018-AM and S-1025-AM", () => {
    const { candidates } = run([c("day_of_week", "sunday"), c("time_window", "morning"), c("instructor", "Arjun")]);
    expect(candidates.filter((x) => x.feasible).map((x) => x.sessionId)).toEqual(["S-1018-AM", "S-1025-AM"]);
  });
  it("excludes original, different price, different type, outside window", () => {
    const { candidates } = run([]);
    const reasons = Object.fromEntries(candidates.map((x) => [x.sessionId, x.reasons]));
    expect(reasons["S-1011-AM"]).toContain("original_session");
    expect(reasons["S-1011-HB"]).toEqual(expect.arrayContaining(["price_differs", "different_class_type"]));
    expect(reasons["S-1018-GL"]).toContain("price_differs");
    expect(reasons["S-1031-AM"]).toContain("outside_policy_window");
  });
  it("needs enough seats for the party", () => {
    const { candidates } = filterCandidates({
      sessions: [...store.sessions.values()], original: S("S-1011-AM"), policy: store.policy,
      hard: [c("instructor", "Arjun"), c("day_of_week", "sunday")], seatsNeeded: 2, now,
    });
    expect(candidates.find((x) => x.sessionId === "S-1018-AM")!.reasons).toContain("no_seats");
  });
  it("reports unverifiable constraints instead of silently ignoring them", () => {
    expect(run([c("other", "near the metro")]).unverified).toHaveLength(1);
  });
});

describe("validator", () => {
  const base = {
    decision: "offer_alternative", merchant_summary: "x", confidence: "high",
    customer_message: "Hi {{NAME}}, {{SESSION_1}} works at no extra charge, or a full refund.",
    ranked_options: [{ session_id: "S-1018-AM", fit_explanation: "fits" }],
  };
  it("accepts a valid recommendation", () => {
    const v = validateRecommendation(base, ["S-1018-AM", "S-1025-AM"]);
    expect(v.ok).toBe(true);
  });
  it("rejects options outside the feasible set", () => {
    const v = validateRecommendation({ ...base, ranked_options: [{ session_id: "S-1011-PM", fit_explanation: "" }] }, ["S-1018-AM"]);
    expect(v.ok).toBe(false);
  });
  it("overrides an offer with no options", () => {
    const v = validateRecommendation({ ...base, ranked_options: [] }, []);
    expect(v.ok && v.value.decision).toBe("release_refund");
  });
  it("flags money, dates and unknown placeholders in customer text", () => {
    expect(customerMessageIssues("Pay ₹2,000 now")).toContain("money_in_text");
    expect(customerMessageIssues("See you at 10 AM on 18th")).toEqual(expect.arrayContaining(["time_in_text", "date_in_text"]));
    expect(customerMessageIssues("{{DISCOUNT}} applied")).toContain("unknown_placeholder:DISCOUNT");
    expect(customerMessageIssues("Hi {{NAME}}, {{SESSION_1}} or {{SESSION_2}}?")).toEqual([]);
  });
  it("downgrades an accept that points at a session that was not offered", () => {
    const v = validateReply({ intent: "accept", selected_session_id: "S-1011-PM", evidence_quote: "x", injection_detected: false }, ["S-1018-AM"]);
    expect(v.ok && v.value.intent).toBe("unclear");
  });
});

describe("webhook signature", () => {
  it("verifies HMAC-SHA256 of the raw body", () => {
    const body = '{"event":"payment.authorized"}';
    const sig = createHmac("sha256", "whsec").update(body).digest("hex");
    expect(verifyWebhookSignature(body, sig, "whsec")).toBe(true);
    expect(verifyWebhookSignature(body + " ", sig, "whsec")).toBe(false);
    expect(verifyWebhookSignature(body, undefined, "whsec")).toBe(false);
  });
});
