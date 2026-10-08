import express, { type NextFunction, type Request, type Response } from "express";
import { paymentFromRazorpayEntity, verifyWebhookSignature } from "./adapters/razorpay";
import type { Container } from "./container";
import { EngineError, type MerchantAction } from "./engine/caseEngine";
import { applyScenario, getScenario, loadScenarios } from "./scenarios";
import { caseDetail, caseSummary, metrics } from "./views";

type Handler = (req: Request, res: Response) => Promise<unknown> | unknown;
const wrap = (fn: Handler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

export function createApp(container: Container) {
  const { store, engine, config } = container;
  const app = express();

  // Webhook needs the raw body for signature verification, so it is registered before express.json().
  app.post("/webhooks/razorpay", express.raw({ type: "*/*" }), wrap(async (req, res) => {
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

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!config.adminToken) return next();
    const token = req.header("x-admin-token") ?? (req.query.admin as string | undefined);
    if (token === config.adminToken) return next();
    res.status(401).json({ error: "admin token required" });
  };

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, aiMode: config.aiMode, model: config.model, razorpayTest: config.razorpayTest, now: store.nowIso() });
  });

  app.get("/api/studio", (_req, res) => {
    res.json({ studio: store.studio, policy: store.policy, sessions: [...store.sessions.values()] });
  });

  app.get("/api/metrics", (_req, res) => res.json(metrics(store)));

  app.get("/api/cases", (_req, res) => {
    engine.tick();
    const list = [...store.cases.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    res.json(list.map((c) => caseSummary(store, c)));
  });

  app.get("/api/cases/:id", (req, res) => {
    engine.tick();
    res.json(caseDetail(store, engine.getCase(req.params.id)));
  });

  app.post("/api/cases/:id/merchant", wrap(async (req, res) => {
    const c = await engine.merchantAction(req.params.id as string, req.body as MerchantAction);
    res.json(caseDetail(store, c));
  }));

  app.post("/api/cases/:id/customer-message", wrap(async (req, res) => {
    const { text, fromContact } = req.body ?? {};
    if (typeof text !== "string" || !text.trim() || text.length > 2000) throw new EngineError("text is required (max 2000 chars)");
    const c = await engine.customerMessage(req.params.id as string, text.trim(), fromContact);
    res.json(caseDetail(store, c));
  }));

  app.post("/api/cases/:id/customer-choice", wrap(async (req, res) => {
    const { choice, sessionId } = req.body ?? {};
    if (!["accept", "refund", "other"].includes(choice)) throw new EngineError("choice must be accept | refund | other");
    const c = await engine.customerChoice(req.params.id as string, choice, sessionId);
    res.json(caseDetail(store, c));
  }));

  // ── Demo controls (simulated events, clearly labelled) ──
  const demo = express.Router();
  demo.use(requireAdmin);

  demo.get("/scenarios", (_req, res) => {
    res.json(loadScenarios().map(({ id, group, title, heldOut }) => ({ id, group, title, heldOut: Boolean(heldOut) })));
  });

  demo.post("/reset", (_req, res) => {
    store.reset();
    res.json({ ok: true });
  });

  demo.post("/inject/:scenarioId", wrap(async (req, res) => {
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

  demo.post("/replay/:eventId", wrap(async (req, res) => {
    const eventId = req.params.eventId as string;
    const paymentId = eventId.replace(/^evt_/, "pay_").replace(/_authorized$/, "");
    res.json(await engine.ingestPaymentEvent({ id: eventId, type: "payment.authorized", paymentId, source: "simulated" }));
  }));

  demo.post("/capacity", (req, res) => {
    const { sessionId, booked } = req.body ?? {};
    const s = store.sessions.get(sessionId);
    if (!s || typeof booked !== "number" || booked < 0 || booked > s.capacity) throw new EngineError("sessionId and 0 ≤ booked ≤ capacity required");
    s.booked = booked;
    store.log("system", "demo.capacity_changed", undefined, { sessionId, booked, simulated: true });
    res.json(s);
  });

  demo.post("/faults", (req, res) => {
    const { reserveFailures, captureFailures } = req.body ?? {};
    if (typeof reserveFailures === "number") store.faults.reserveFailures = reserveFailures;
    if (typeof captureFailures === "number") store.faults.captureFailures = captureFailures;
    res.json(store.faults);
  });

  demo.post("/clock", (req, res) => {
    const { advanceHours, set } = req.body ?? {};
    if (typeof set === "string") store.setNow(set);
    if (typeof advanceHours === "number") store.advance(advanceHours * 3_600_000);
    engine.tick();
    res.json({ now: store.nowIso() });
  });

  demo.put("/policy", (req, res) => {
    const allowed = ["autonomy", "autoApprovePatterns", "maxDaysAhead", "maxUnansweredContacts"] as const;
    for (const k of allowed) if (k in (req.body ?? {})) (store.policy as unknown as Record<string, unknown>)[k] = req.body[k];
    res.json(store.policy);
  });

  app.use("/api/demo", demo);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof EngineError) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "internal error" });
  });

  return app;
}
