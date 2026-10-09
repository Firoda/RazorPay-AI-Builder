import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import {
  INTENT_SYSTEM,
  PROMPT_VERSION,
  RECOMMEND_SYSTEM,
  REPLY_SYSTEM,
  intentUserContent,
  recommendUserContent,
  replyUserContent,
  type IntentPromptInput,
  type RecommendPromptInput,
  type ReplyPromptInput,
} from "./prompts";
import { AiUnavailableError, type AiProvider, type AiResult } from "./provider";
import { intentJsonSchema, recommendationJsonSchema, replyJsonSchema } from "./schemas";

export interface GeminiOptions {
  apiKey: string;
  /** Ordered fallback chain. The free tier has a separate daily quota per model. */
  models?: string[];
  minIntervalMs?: number;
  timeoutMs?: number;
  maxRetries?: number;
  /** Gemini 3.x thinks before answering by default; lower levels are faster and cheaper. */
  thinkingLevel?: "minimal" | "low" | "medium" | "high";
}

// Pinned to one model by the owner's cost decision; set GEMINI_MODELS to a comma list to enable a fallback chain.
export const DEFAULT_MODELS = ["gemini-3.8-flash"];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Live Gemini calls with structured JSON output.
 * - Calls are serialised and spaced to respect per-minute limits.
 * - A per-day quota error marks that model exhausted and falls through to the next model in the chain
 *   (no retries wasted on a quota that won't reset for hours).
 * - Transient errors (per-minute 429, 503, timeouts) retry with backoff on the same model.
 */
export class GeminiProvider implements AiProvider {
  readonly name = "gemini";
  readonly models: string[];
  private client: GoogleGenAI;
  private minIntervalMs: number;
  private timeoutMs: number;
  private maxRetries: number;
  private queue: Promise<unknown> = Promise.resolve();
  private lastCallAt = 0;
  private exhaustedUntil = new Map<string, number>();
  private thinkingLevel?: ThinkingLevel;

  constructor(opts: GeminiOptions) {
    this.client = new GoogleGenAI({ apiKey: opts.apiKey });
    this.models = opts.models?.length ? opts.models : DEFAULT_MODELS;
    this.minIntervalMs = opts.minIntervalMs ?? 4000;
    this.timeoutMs = opts.timeoutMs ?? 120_000;
    this.maxRetries = opts.maxRetries ?? 2;
    if (opts.thinkingLevel) this.thinkingLevel = opts.thinkingLevel.toUpperCase() as ThinkingLevel;
  }

  get model(): string {
    return this.models.join(" → ");
  }

  extractIntent(input: IntentPromptInput): Promise<AiResult> {
    return this.call(INTENT_SYSTEM, intentUserContent(input), intentJsonSchema, 0.2);
  }

  recommend(input: RecommendPromptInput): Promise<AiResult> {
    return this.call(RECOMMEND_SYSTEM, recommendUserContent(input), recommendationJsonSchema, 0.4);
  }

  interpretReply(input: ReplyPromptInput): Promise<AiResult> {
    return this.call(REPLY_SYSTEM, replyUserContent(input), replyJsonSchema, 0.2);
  }

  private call(system: string, user: string, schema: object, temperature: number): Promise<AiResult> {
    const run = this.queue.then(() => this.callChain(system, user, schema, temperature));
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async callChain(system: string, user: string, schema: object, temperature: number): Promise<AiResult> {
    const errors: string[] = [];
    for (const model of this.models) {
      if ((this.exhaustedUntil.get(model) ?? 0) > Date.now()) continue;
      try {
        return await this.callModel(model, system, user, schema, temperature);
      } catch (err) {
        const msg = String((err as Error)?.message ?? err);
        errors.push(`${model}: ${msg.slice(0, 160)}`);
        if (/PerDay/i.test(msg)) {
          const retry = Number(msg.match(/"retryDelay":\s*"(\d+)s"/)?.[1] ?? 3600);
          this.exhaustedUntil.set(model, Date.now() + retry * 1000);
          continue; // daily quota gone: try the next model
        }
        throw new AiUnavailableError(`Gemini call failed: ${errors.join(" | ")}`);
      }
    }
    throw new AiUnavailableError(`All Gemini models unavailable (daily free-tier quotas): ${errors.join(" | ") || "all exhausted"}`);
  }

  private async callModel(model: string, system: string, user: string, schema: object, temperature: number): Promise<AiResult> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const wait = this.lastCallAt + this.minIntervalMs - Date.now();
      if (wait > 0) await sleep(wait);
      this.lastCallAt = Date.now();
      const started = Date.now();
      try {
        const res = await Promise.race([
          this.client.models.generateContent({
            model,
            contents: user,
            config: {
              systemInstruction: system,
              temperature,
              responseMimeType: "application/json",
              responseJsonSchema: schema,
              ...(this.thinkingLevel ? { thinkingConfig: { thinkingLevel: this.thinkingLevel } } : {}),
            },
          }),
          sleep(this.timeoutMs).then(() => {
            throw new Error(`Gemini timeout after ${this.timeoutMs}ms`);
          }),
        ]);
        return {
          data: JSON.parse(res.text ?? ""),
          meta: { provider: this.name, model, promptVersion: PROMPT_VERSION, latencyMs: Date.now() - started, cached: false },
        };
      } catch (err) {
        lastError = err;
        const msg = String((err as Error)?.message ?? err);
        if (/PerDay/i.test(msg)) throw err; // handled by the chain
        const retryable = /429|RESOURCE_EXHAUSTED|503|UNAVAILABLE|timeout|overloaded/i.test(msg);
        if (!retryable || attempt === this.maxRetries) break;
        await sleep(Math.min(30_000, 5000 * 2 ** attempt));
      }
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }
}
