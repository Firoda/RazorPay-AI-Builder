import { join } from "node:path";
import express, { type NextFunction, type Request, type Response } from "express";
import { paymentFromRazorpayEntity, verifyWebhookSignature } from "./adapters/razorpay";
import type { Container, Sandbox } from "./container";
import { EngineError, type MerchantAction } from "./engine/caseEngine";
import { liveLine } from "./live";
import { applyScenario, getScenario, loadScenarios } from "./scenarios";
import { caseDetail, caseSummary, metrics } from "./views";

type Handler = (req: Request, res: Response) => Promise<unknown> | unknown;
const wrap = (fn: Handler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

const COOKIE = "ss_sid";

function readSessionId(req: Request): string | undefined {
  const header = req.header("x-ss-session");
  if (header) return header;
  const cookie = req.header("cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)ss_sid=([A-Za-z0-9-]+)/);
  return m?.[1];
}

/** Loads a scenario into a sandbox and starts it. The AI work continues in the background. */
function startScenario(sb: Sandbox, scenarioId: string) {
  const sc = getScenario(scenarioId);
  if (!sc) throw new EngineError("Unknown scenario", 404);
  const event = applyScenario(sb.store, sc);
  void sb.engine.ingestPaymentEvent(event).catch((err) => sb.store.log("system", "ingest.failed", undefined, { error: String(err) }));
  return { caseId: sb.store.caseForPayment(event.paymentId)?.id, eventId: event.id };
}

export function createApp(container: Container) {
  const { config } = container;
  const app = express();

  /** The caller's sandbox: their visitor session if they have one, otherwise the shared default. */
  const sbFor = (req: Request): Sandbox => container.sessions.get(readSessionId(req)) ?? container;
  const hasSession = (req: Request) => Boolean(container.sessions.get(readSessionId(req)));

  // Webhook needs the raw body for signature verification, so it is registered before express.json().
  app.post("/webhooks/razorpay", express.raw({ type: "*/*" }), wrap(async (req, res) => {
    const { store, engine } = container;
    const raw = req.body as Buffer;
    if (!verifyWebhookSignature(raw, req.header("x-razorpay-signature"), config.webhookSecret)) {
      store.log("razorpay", "webhook.rejected_bad_signature");
      return res.status(400).json({ error: "invalid signature" });
    }
    const body = JSON.parse(raw.toString("utf8"));
    const entity = body?.payload?.payment?.entity;
    if (!entity || !["payment.authorized", "payment.captured"].includes(body.event)) return res.json({ ignored: true });
    const incoming = paymentFromRazorpayEntity(entity);
    const prior = store.payments.get(incoming.id);
    store.payments.set(incoming.id, { ...prior, ...incoming });
    const result = await engine.ingestPaymentEvent({
      id: req.header("x-razorpay-event-id") ?? `${body.event}:${incoming.id}`,
      type: body.event,
      paymentId: incoming.id,
      source: "razorpay_webhook",
    });
    res.json(result);
  }));

  app.use(express.json({ limit: "100kb" }));

  const isAdmin = (req: Request) => {
    if (!config.adminToken) return true;
    const token = req.header("x-admin-token") ?? (req.query.admin as string | undefined);
    return token === config.adminToken;
  };
  const requireAdmin = (req: Request, res: Response, next: NextFunction) =>
    isAdmin(req) ? next() : res.status(401).json({ error: "admin token required" });
  /** Visitors may freely change their own sandbox; the shared default needs the admin token. */
  const requireSessionOrAdmin = (req: Request, res: Response, next: NextFunction) =>
    hasSession(req) || isAdmin(req) ? next() : res.status(401).json({ error: "admin token required" });

  app.get("/api/health", (req, res) => {
    res.json({
      ok: true, aiMode: config.aiMode, model: config.model, razorpayTest: config.razorpayTest,
      now: sbFor(req).store.nowIso(), session: hasSession(req), pool: container.pool.status(),
    });
  });

  // ── Visitor sessions (Portal 2's guided tour) ──
  app.post("/api/session/start", wrap(async (req, res) => {
    const { id, value: sb } = container.sessions.start(readSessionId(req));
    const secure = req.secure || req.header("x-forwarded-proto") === "https";
    res.setHeader("Set-Cookie", `${COOKIE}=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200${secure ? "; Secure" : ""}`);
    // Prefer a real pre-made Razorpay test payment; fall back to an honest simulated replay.
    let started: { caseId?: string; paymentId: string } | null = null;
    try {
      started = await sb.realPayments.startFromPool("G01");
    } catch (err) {
      sb.store.log("system", "pool.claim_failed", undefined, { error: String(err) });
    }
    if (started) return res.json({ sessionId: id, caseId: started.caseId, payment: { source: "razorpay_test", id: started.paymentId } });
    const { caseId } = startScenario(sb, "G01");
    res.json({ sessionId: id, caseId, payment: { source: "simulated", id: sb.store.cases.get(caseId ?? "")?.paymentId } });
  }));

  app.post("/api/session/scenario", wrap(async (req, res) => {
    if (!hasSession(req)) throw new EngineError("Start a session first", 400);
    const sb = sbFor(req);
    const id = String(req.body?.id ?? "");
    const sc = getScenario(id);
    if (!sc || sc.group === "system" && !["G05", "G02", "G26"].includes(id)) throw new EngineError("Unknown scenario", 404);
    sb.store.reset();
    res.json(startScenario(sb, id));
  }));

  app.post("/api/session/reset", (req, res) => {
    if (!hasSession(req)) throw new EngineError("No session", 400);
    sbFor(req).store.reset();
    res.json({ ok: true });
  });

  // ── Live AI feed (Server-Sent Events) ──
  app.get("/api/live/:caseId", (req, res) => {
    const { store } = sbFor(req);
    const caseId = req.params.caseId;
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
    const send = (event: string, data: unknown) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    for (const e of store.audit) if (e.caseId === caseId) {
      const line = liveLine(store, e);
      if (line) send("line", line);
    }
    const off = store.onLog((e) => {
      if (e.caseId !== caseId) return;
      const line = liveLine(store, e);
      if (line) send("line", line);
    });
    const beat = setInterval(() => res.write(": keep-alive\n\n"), 15_000);
    req.on("close", () => {
      off();
      clearInterval(beat);
    });
  });

  app.get("/api/studio", (req, res) => {
    const { store } = sbFor(req);
    res.json({ studio: store.studio, policy: store.policy, sessions: [...store.sessions.values()] });
  });

  app.get("/api/metrics", (req, res) => res.json(metrics(sbFor(req).store)));

  app.get("/api/cases", (req, res) => {
    const { store, engine } = sbFor(req);
    engine.tick();
    const list = [...store.cases.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    res.json(list.map((c) => caseSummary(store, c)));
  });

  app.get("/api/cases/:id", (req, res) => {
    const { store, engine } = sbFor(req);
    engine.tick();
    res.json(caseDetail(store, engine.getCase(req.params.id)));
  });

  app.post("/api/cases/:id/merchant", wrap(async (req, res) => {
    const { store, engine } = sbFor(req);
    const c = await engine.merchantAction(req.params.id as string, req.body as MerchantAction);
    res.json(caseDetail(store, c));
  }));

  app.post("/api/cases/:id/customer-message", wrap(async (req, res) => {
    const { store, engine } = sbFor(req);
    const { text, fromContact } = req.body ?? {};
    if (typeof text !== "string" || !text.trim() || text.length > 2000) throw new EngineError("text is required (max 2000 chars)");
    const c = await engine.customerMessage(req.params.id as string, text.trim(), fromContact);
    res.json(caseDetail(store, c));
  }));

  app.post("/api/cases/:id/customer-choice", wrap(async (req, res) => {
    const { store, engine } = sbFor(req);
    const { choice, sessionId } = req.body ?? {};
    if (!["accept", "refund", "other"].includes(choice)) throw new EngineError("choice must be accept | refund | other");
    const c = await engine.customerChoice(req.params.id as string, choice, sessionId);
    res.json(caseDetail(store, c));
  }));

  // ── Demo controls (simulated events, clearly labelled) ──
  const demo = express.Router();

  demo.get("/scenarios", (_req, res) => {
    res.json(loadScenarios().map(({ id, group, title, heldOut }) => ({ id, group, title, heldOut: Boolean(heldOut) })));
  });

  demo.post("/reset", requireSessionOrAdmin, (req, res) => {
    sbFor(req).store.reset();
    res.json({ ok: true });
  });

  demo.post("/inject/:scenarioId", requireSessionOrAdmin, wrap(async (req, res) => {
    const { store, engine } = sbFor(req);
    const sc = getScenario(req.params.scenarioId as string);
    if (!sc) throw new EngineError("Unknown scenario", 404);
    if (req.query.reset === "1") store.reset();
    let event;
    try {
      event = applyScenario(store, sc);
    } catch (err) {
      throw new EngineError(String((err as Error).message), 409);
    }
    const result = await engine.ingestPaymentEvent(event);
    res.json({ ...result, eventId: event.id, simulated: true });
  }));

  demo.post("/replay/:eventId", requireSessionOrAdmin, wrap(async (req, res) => {
    const eventId = req.params.eventId as string;
    const paymentId = eventId.replace(/^evt_/, "pay_").replace(/_authorized$/, "");
    res.json(await sbFor(req).engine.ingestPaymentEvent({ id: eventId, type: "payment.authorized", paymentId, source: "simulated" }));
  }));

  demo.post("/capacity", requireSessionOrAdmin, (req, res) => {
    const { store } = sbFor(req);
    const { sessionId, booked } = req.body ?? {};
    const s = store.sessions.get(sessionId);
    if (!s || typeof booked !== "number" || booked < 0 || booked > s.capacity) throw new EngineError("sessionId and 0 ≤ booked ≤ capacity required");
    s.booked = booked;
    store.log("system", "demo.capacity_changed", undefined, { sessionId, booked, simulated: true });
    res.json(s);
  });

  demo.post("/faults", requireSessionOrAdmin, (req, res) => {
    const { store } = sbFor(req);
    const { reserveFailures, captureFailures } = req.body ?? {};
    if (typeof reserveFailures === "number") store.faults.reserveFailures = reserveFailures;
    if (typeof captureFailures === "number") store.faults.captureFailures = captureFailures;
    res.json(store.faults);
  });

  demo.post("/clock", requireSessionOrAdmin, (req, res) => {
    const { store, engine } = sbFor(req);
    const { advanceHours, set } = req.body ?? {};
    if (typeof set === "string") store.setNow(set);
    if (typeof advanceHours === "number") store.advance(advanceHours * 3_600_000);
    engine.tick();
    res.json({ now: store.nowIso() });
  });

  demo.put("/policy", requireSessionOrAdmin, (req, res) => {
    const { store } = sbFor(req);
    const allowed = ["autonomy", "autoApprovePatterns", "maxDaysAhead", "maxUnansweredContacts"] as const;
    for (const k of allowed) if (k in (req.body ?? {})) (store.policy as unknown as Record<string, unknown>)[k] = req.body[k];
    res.json(store.policy);
  });

  // Real Razorpay TEST-mode payments (see server/realPayment.ts). Stocking the pool is operator-only.
  demo.post("/real-order", requireSessionOrAdmin, wrap(async (req, res) => {
    const pool = req.body?.pool === true;
    if (pool && !isAdmin(req)) throw new EngineError("admin token required to stock the payment pool", 401);
    res.json(await sbFor(req).realPayments.createOrder((req.body?.scenarioId as string) ?? "G01", { pool }));
  }));

  demo.post("/real-payment", requireSessionOrAdmin, wrap(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
    if (![razorpay_order_id, razorpay_payment_id, razorpay_signature].every((v) => typeof v === "string" && v)) {
      throw new EngineError("razorpay_order_id, razorpay_payment_id and razorpay_signature are required");
    }
    res.json(await sbFor(req).realPayments.confirmPayment({
      orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature,
    }));
  }));

  demo.get("/pool", requireAdmin, (_req, res) => res.json(container.pool.status()));

  app.use("/api/demo", demo);

  app.get("/pay-test", (_req, res) => {
    res.sendFile(join(process.cwd(), "server", "static", "pay-test.html"));
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof EngineError) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "internal error" });
  });

  return app;
}
