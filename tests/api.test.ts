import { createHmac } from "node:crypto";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { FakeProvider } from "../server/ai/fake";
import { createApp } from "../server/app";
import { buildContainer } from "../server/container";

function app(env: Record<string, string> = {}) {
  const container = buildContainer({ AI_MODE: "fake", ...env } as NodeJS.ProcessEnv, new FakeProvider());
  return { container, http: request(createApp(container)) };
}

describe("HTTP API", () => {
  it("runs the hero flow end-to-end over HTTP", async () => {
    const { http } = app();
    const inj = await http.post("/api/demo/inject/G01").expect(200);
    expect(inj.body.simulated).toBe(true);
    const id = inj.body.caseId;

    const list = await http.get("/api/cases").expect(200);
    expect(list.body[0]).toMatchObject({ id, state: "MERCHANT_REVIEW", customerName: "Priya", amount: "₹2,000" });

    await http.post(`/api/cases/${id}/merchant`).send({ type: "approve" }).expect(200);
    const done = await http.post(`/api/cases/${id}/customer-choice`).send({ choice: "accept", sessionId: "S-1018-AM" }).expect(200);
    expect(done.body.state).toBe("RESCUED");
    expect(done.body.payment.status).toBe("captured");
    expect(done.body.ledger.map((l: { key: string }) => l.key)).toEqual(expect.arrayContaining([`capture:pay_G01`]));

    const m = await http.get("/api/metrics").expect(200);
    expect(m.body.rescuedPaise).toBe(200000);
  });

  it("returns 4xx for invalid actions instead of crashing", async () => {
    const { http } = app();
    const { body } = await http.post("/api/demo/inject/G01").expect(200);
    await http.post(`/api/cases/${body.caseId}/customer-choice`).send({ choice: "accept", sessionId: "S-1018-AM" }).expect(400);
    await http.post(`/api/cases/nope/merchant`).send({ type: "approve" }).expect(404);
    await http.post("/api/demo/inject/G01").expect(409); // already loaded
  });

  it("protects demo endpoints when an admin token is configured", async () => {
    const { http } = app({ DEMO_ADMIN_TOKEN: "secret" });
    await http.post("/api/demo/reset").expect(401);
    await http.post("/api/demo/reset").set("x-admin-token", "secret").expect(200);
  });

  it("accepts a correctly signed Razorpay webhook and rejects a bad signature", async () => {
    const { http, container } = app({ RAZORPAY_WEBHOOK_SECRET: "whsec_test" });
    // a booking the webhook payment refers to
    container.store.customers.set("C-W", { id: "C-W", name: "Web", contact: "+911", language: "en" });
    container.store.bookings.set("B-W", { id: "B-W", customerId: "C-W", sessionId: "S-1011-AM", seats: 1, status: "released", holdExpiresAt: "" });
    container.store.setNow("2026-10-11T07:30:00+05:30");
    const body = JSON.stringify({
      event: "payment.authorized",
      payload: { payment: { entity: {
        id: "pay_web1", amount: 200000, currency: "INR", status: "authorized", method: "upi",
        created_at: Math.floor(Date.parse("2026-10-10T21:00:00+05:30") / 1000),
        notes: { booking_id: "B-W", customer_id: "C-W" },
      } } },
    });
    const sig = createHmac("sha256", "whsec_test").update(body).digest("hex");
    await http.post("/webhooks/razorpay").set("content-type", "application/json").set("x-razorpay-signature", "bad").send(body).expect(400);
    const ok = await http.post("/webhooks/razorpay").set("content-type", "application/json")
      .set("x-razorpay-signature", sig).set("x-razorpay-event-id", "evt_web_1").send(body).expect(200);
    expect(ok.body.status).toBe("case_created");
    // No Razorpay keys in tests, so the payment can't be re-fetched from the API: the engine must
    // refuse to trust the webhook snapshot alone and escalate.
    const c = container.store.cases.get(ok.body.caseId)!;
    expect([c.state, c.reason]).toEqual(["ESCALATED", "payment_state_unverified"]);
  });
});
