import { join } from "node:path";
import { CalendarAdapter } from "./adapters/calendar";
import { GatewayRouter, RazorpayTestGateway, SimulatedGateway } from "./adapters/razorpay";
import { CachedProvider } from "./ai/cache";
import { FakeProvider } from "./ai/fake";
import { DEFAULT_MODELS, GeminiProvider } from "./ai/gemini";
import type { AiProvider } from "./ai/provider";
import { LimitedProvider } from "./ai/limited";
import { CaseEngine } from "./engine/caseEngine";
import { PaymentPool } from "./paymentPool";
import { RealPaymentFlow } from "./realPayment";
import { SessionRegistry } from "./sessions";
import { Store } from "./store/memoryStore";

/** One isolated demo world: its own store, engine and real-payment flow. */
export interface Sandbox {
  store: Store;
  engine: CaseEngine;
  realPayments: RealPaymentFlow;
}

export interface Container extends Sandbox {
  ai: AiProvider;
  /** Per-visitor sandboxes (judges trying the demo at once never collide). */
  sessions: SessionRegistry<Sandbox>;
  pool: PaymentPool;
  config: { aiMode: string; model: string; razorpayTest: boolean; webhookSecret: string; adminToken: string; aiCallsPerSession: number };
}

export function buildAi(env: NodeJS.ProcessEnv = process.env): { ai: AiProvider; mode: string; model: string } {
  const models = (env.GEMINI_MODELS || env.GEMINI_MODEL || DEFAULT_MODELS.join(","))
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const model = models.join(" → ");
  const cacheFile = join(process.cwd(), ".cache", "ai-cache.json");
  const requested = env.AI_MODE || (env.GEMINI_API_KEY ? "gemini" : "fake");
  if (requested === "fake") return { ai: new FakeProvider(), mode: "fake", model: "fake-heuristic" };
  if (requested === "cache-only") return { ai: new CachedProvider(null, cacheFile, "cache-only"), mode: "cache-only", model };
  if (!env.GEMINI_API_KEY) throw new Error("AI_MODE=gemini requires GEMINI_API_KEY (or set AI_MODE=fake)");
  const gemini = new GeminiProvider({
    apiKey: env.GEMINI_API_KEY,
    models,
    minIntervalMs: Number(env.GEMINI_MIN_INTERVAL_MS || 4000),
    timeoutMs: Number(env.GEMINI_TIMEOUT_MS || 120_000),
    thinkingLevel: (env.GEMINI_THINKING || "low") as "minimal" | "low" | "medium" | "high" | undefined,
  });
  const ai = env.AI_CACHE === "off" ? gemini : new CachedProvider(gemini, cacheFile, "read-write");
  return { ai, mode: "gemini", model };
}

export function buildContainer(env: NodeJS.ProcessEnv = process.env, aiOverride?: AiProvider): Container {
  const built = aiOverride ? { ai: aiOverride, mode: aiOverride.name, model: aiOverride.name } : buildAi(env);
  const keyId = env.RAZORPAY_KEY_ID ?? "";
  const keySecret = env.RAZORPAY_KEY_SECRET ?? "";
  const hasRazorpay = Boolean(keyId && keySecret);
  const pool = new PaymentPool(env.PAYMENT_POOL || "");
  const aiCallsPerSession = Number(env.AI_CALLS_PER_SESSION || 25);

  const makeSandbox = (ai: AiProvider): Sandbox => {
    const store = new Store();
    const real = hasRazorpay ? new RazorpayTestGateway(keyId, keySecret, store) : null;
    const gateway = new GatewayRouter(new SimulatedGateway(store), real);
    const engine = new CaseEngine({ store, ai, gateway, calendar: new CalendarAdapter(store) });
    return { store, engine, realPayments: new RealPaymentFlow(store, engine, real, keyId, keySecret, pool) };
  };

  // The default sandbox serves operator tools, webhooks and requests without a visitor session.
  const main = makeSandbox(built.ai);
  return {
    ...main,
    ai: built.ai,
    pool,
    sessions: new SessionRegistry<Sandbox>(() => makeSandbox(new LimitedProvider(built.ai, aiCallsPerSession))),
    config: {
      aiMode: built.mode,
      model: built.model,
      razorpayTest: hasRazorpay,
      webhookSecret: env.RAZORPAY_WEBHOOK_SECRET || "",
      adminToken: env.DEMO_ADMIN_TOKEN || "",
      aiCallsPerSession,
    },
  };
}
