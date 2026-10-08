import { join } from "node:path";
import { CalendarAdapter } from "./adapters/calendar";
import { GatewayRouter, RazorpayTestGateway, SimulatedGateway } from "./adapters/razorpay";
import { CachedProvider } from "./ai/cache";
import { FakeProvider } from "./ai/fake";
import { GeminiProvider } from "./ai/gemini";
import type { AiProvider } from "./ai/provider";
import { CaseEngine } from "./engine/caseEngine";
import { Store } from "./store/memoryStore";

export interface Container {
  store: Store;
  engine: CaseEngine;
  ai: AiProvider;
  config: { aiMode: string; model: string; razorpayTest: boolean; webhookSecret: string; adminToken: string };
}

export function buildAi(env: NodeJS.ProcessEnv = process.env): { ai: AiProvider; mode: string; model: string } {
  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const cacheFile = join(process.cwd(), ".cache", "ai-cache.json");
  const requested = env.AI_MODE || (env.GEMINI_API_KEY ? "gemini" : "fake");
  if (requested === "fake") return { ai: new FakeProvider(), mode: "fake", model: "fake-heuristic" };
  if (requested === "cache-only") return { ai: new CachedProvider(null, cacheFile, "cache-only"), mode: "cache-only", model };
  if (!env.GEMINI_API_KEY) throw new Error("AI_MODE=gemini requires GEMINI_API_KEY (or set AI_MODE=fake)");
  const gemini = new GeminiProvider({
    apiKey: env.GEMINI_API_KEY,
    model,
    minIntervalMs: Number(env.GEMINI_MIN_INTERVAL_MS ?? 4000),
  });
  const ai = env.AI_CACHE === "off" ? gemini : new CachedProvider(gemini, cacheFile, "read-write");
  return { ai, mode: "gemini", model };
}

export function buildContainer(env: NodeJS.ProcessEnv = process.env, aiOverride?: AiProvider): Container {
  const store = new Store();
  const built = aiOverride ? { ai: aiOverride, mode: aiOverride.name, model: aiOverride.name } : buildAi(env);
  const real = env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
    ? new RazorpayTestGateway(env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET, store)
    : null;
  const gateway = new GatewayRouter(new SimulatedGateway(store), real);
  const engine = new CaseEngine({ store, ai: built.ai, gateway, calendar: new CalendarAdapter(store) });
  return {
    store,
    engine,
    ai: built.ai,
    config: {
      aiMode: built.mode,
      model: built.model,
      razorpayTest: Boolean(real),
      webhookSecret: env.RAZORPAY_WEBHOOK_SECRET ?? "",
      adminToken: env.DEMO_ADMIN_TOKEN ?? "",
    },
  };
}
