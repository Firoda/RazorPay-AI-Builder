import request from "supertest";
import { describe, expect, it } from "vitest";
import type { RazorpayTestGateway } from "../server/adapters/razorpay";
import { FakeProvider } from "../server/ai/fake";
import { createApp } from "../server/app";
import { buildContainer } from "../server/container";
import { liveLine } from "../server/live";
import { PaymentPool } from "../server/paymentPool";
import { applyScenario, getScenario } from "../server/scenarios";

const settle = () => new Promise((r) => setTimeout(r, 30));

function setup(env: Record<string, string> = {}) {
  const container = buildContainer({ AI_MODE: "fake", ...env } as NodeJS.ProcessEnv, new FakeProvider());
  return { container, app: createApp(container) };
}

async function startSession(app: ReturnType<typeof createApp>) {
  const res = await request(app).post("/api/session/start").expect(200);
  const cookie = String(res.headers["set-cookie"]).split(";")[0];
  await settle();
  return { cookie, caseId: res.body.caseId as string, body: res.body };
}

describe("per-visitor sandboxes", () => {
  it("each visitor gets an isolated store; actions in one never affect another or the default", async () => {
    const { app, container } = setup();
    const a = await startSession(app);
    const b = await startSession(app);
    expect(a.cookie).not.toEqual(b.cookie);
    expect(a.body.payment.source).toBe("simulated"); // no pool configured → honest fallback

    await request(app).post(`/api/cases/${a.caseId}/merchant`).set("cookie", a.cookie).send({ type: "approve" }).expect(200);
    const doneA = await request(app).post(`/api/cases/${a.caseId}/customer-choice`).set("cookie", a.cookie).send({ choice: "accept", sessionId: "S-1018-AM" }).expect(200);
    expect(doneA.body.state).toBe("RESCUED");

    const caseB = await request(app).get(`/api/cases/${b.caseId}`).set("cookie", b.cookie).expect(200);
    expect(caseB.body.state).toBe("MERCHANT_REVIEW");
    expect(caseB.body.candidates.find((c: { sessionId: string }) => c.sessionId === "S-1018-AM").session.seatsLeft).toBe(1);

    expect(container.store.cases.size).toBe(0); // default sandbox untouched
    expect(container.sessions.size).toBe(2);
  });

  it("start over reuses the visitor's id but gives a fresh sandbox", async () => {
    const { app } = setup();
    const a = await startSession(app);
    const again = await request(app).post("/api/session/start").set("cookie", a.cookie).expect(200);
    expect(String(again.headers["set-cookie"]).split(";")[0]).toEqual(a.cookie);
    await settle();
    const list = await request(app).get("/api/cases").set("cookie", a.cookie).expect(200);
    expect(list.body).toHaveLength(1);
  });

  it("visitors can load scenarios in their own sandbox without the admin token; the default still needs it", async () => {
    const { app } = setup({ DEMO_ADMIN_TOKEN: "secret" });
    await request(app).post("/api/demo/inject/G04").expect(401);
    const a = await startSession(app);
    await request(app).post("/api/demo/inject/G04").set("cookie", a.cookie).expect(200);
    const res = await request(app).post("/api/session/scenario").set("cookie", a.cookie).send({ id: "G05" }).expect(200);
    await settle();
    const c = await request(app).get(`/api/cases/${res.body.caseId}`).set("cookie", a.cookie).expect(200);
    expect([c.body.state, c.body.reason]).toEqual(["RELEASED", "duplicate_payment"]);
    await request(app).post("/api/demo/real-order").set("cookie", a.cookie).send({ pool: true }).expect(401); // stocking the pool is operator-only
  });

  it("re-runs Priya's case with auto-send: the offer goes out without Ritu, the money stays held", async () => {
    const { app } = setup();
    const a = await startSession(app);
    const res = await request(app).post("/api/session/scenario").set("cookie", a.cookie).send({ id: "G01", autonomy: "L2" }).expect(200);
    await settle();
    const c = await request(app).get(`/api/cases/${res.body.caseId}`).set("cookie", a.cookie).expect(200);
    expect(c.body.state).toBe("OFFER_SENT");
    expect(c.body.ledger.filter((l: { key: string }) => l.key.startsWith("capture:"))).toEqual([]); // nothing captured before she accepts
  });

  it("caps AI calls per visitor and escalates honestly when the cap is reached", async () => {
    const { app } = setup({ AI_CALLS_PER_SESSION: "1" });
    const a = await startSession(app);
    const c = await request(app).get(`/api/cases/${a.caseId}`).set("cookie", a.cookie).expect(200);
    expect([c.body.state, c.body.reason]).toEqual(["ESCALATED", "demo_ai_limit"]);
  });
});

describe("live AI feed lines", () => {
  it("derives plain-English lines from real audit entries", async () => {
    const { container } = setup();
    const { store, engine } = container;
    const ev = applyScenario(store, getScenario("G01")!);
    const { caseId } = await engine.ingestPaymentEvent(ev);
    const lines = store.audit.filter((e) => e.caseId === caseId).map((e) => liveLine(store, e)).filter(Boolean);
    const texts = lines.map((l) => l!.text);
    expect(texts[0]).toMatch(/New late payment · ₹2,000 · Priya/);
    expect(texts).toEqual(expect.arrayContaining([
      expect.stringMatching(/authorised ✓/),
      expect.stringMatching(/Gemini reading Priya's message/),
      expect.stringMatching(/Must-haves: Sunday · Morning · with Arjun/),
      expect.stringMatching(/sessions → 2 fit/),
      expect.stringMatching(/Ranked: Sun 18 Oct, 10 AM with Arjun · Sun 25 Oct, 10 AM with Arjun/),
    ]));
    expect(lines.find((l) => l!.pending === "intent")).toBeTruthy();
    expect(lines.find((l) => l!.resolves === "intent")).toBeTruthy();
  });

  it("streams over SSE for the visitor's case", async () => {
    const { app } = setup();
    const a = await startSession(app);
    const res = await request(app)
      .get(`/api/live/${a.caseId}`)
      .set("cookie", a.cookie)
      .buffer(true)
      .parse((r, cb) => {
        let data = "";
        r.on("data", (chunk: Buffer) => {
          data += chunk.toString();
          if (data.includes("Ranked:")) (r as unknown as { destroy: () => void }).destroy();
        });
        r.on("close", () => cb(null, data));
        r.on("end", () => cb(null, data));
      });
    expect(String(res.body)).toMatch(/event: line/);
    expect(String(res.body)).toMatch(/Ranked:/);
  });
});

describe("real payment pool", () => {
  const fakeGateway = (statuses: Record<string, string>) =>
    ({ fetchPaymentEntity: async (id: string) => ({ id, status: statuses[id], amount: 200000, currency: "INR", method: "netbanking", created_at: Math.floor(Date.now() / 1000) }) }) as unknown as RazorpayTestGateway;

  it("claims only authorised payments, never the same one twice", async () => {
    const pool = new PaymentPool("pay_a,pay_b,pay_c", "/nonexistent/pool.json");
    const gw = fakeGateway({ pay_a: "captured", pay_b: "authorized", pay_c: "authorized" });
    expect((await pool.claim(gw))?.id).toBe("pay_b");
    expect((await pool.claim(gw))?.id).toBe("pay_c");
    expect(await pool.claim(gw)).toBeNull();
    expect(pool.status()).toMatchObject({ total: 3, available: 0 });
  });
});

describe("live time for visitors", () => {
  it("lays the case out relative to now, with the original class on the next Sunday and real timestamps", async () => {
    const { Store } = await import("../server/store/memoryStore");
    const store = new Store();
    store.liveTime = true;
    const before = Date.now();
    const ev = applyScenario(store, getScenario("G01")!);
    const payment = store.payments.get(ev.paymentId)!;
    const booking = [...store.bookings.values()][0];
    const original = store.sessions.get(booking.sessionId)!;
    const classStart = Date.parse(`${original.date}T${original.start}:00+05:30`);

    expect(new Date(`${original.date}T12:00:00+05:30`).getUTCDay()).toBe(0); // still a Sunday
    expect(classStart).toBeGreaterThan(before); // upcoming, not in the past
    expect(original.id).toBe(`S-${original.date.slice(5, 7)}${original.date.slice(8, 10)}-AM`); // id matches its date
    expect(Date.parse(payment.createdAt)).toBeLessThan(before); // paid last night
    expect(Math.abs(store.now().getTime() - Date.now())).toBeLessThan(2000); // the clock is real
    expect(Date.parse(store.messages[0].at)).toBeLessThanOrEqual(Date.now()); // messaged earlier this morning
  });
});
