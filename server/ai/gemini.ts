import { GoogleGenAI } from "@google/genai";
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
  model?: string;
  minIntervalMs?: number;
  timeoutMs?: number;
  maxRetries?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Live Gemini calls with structured JSON output, free-tier throttling and retry on rate limits. */
export class GeminiProvider implements AiProvider {
  readonly name = "gemini";
  readonly model: string;
  private client: GoogleGenAI;
  private minIntervalMs: number;
  private timeoutMs: number;
  private maxRetries: number;
  private queue: Promise<unknown> = Promise.resolve();
  private lastCallAt = 0;

  constructor(opts: GeminiOptions) {
    this.client = new GoogleGenAI({ apiKey: opts.apiKey });
    this.model = opts.model ?? "gemini-2.5-flash";
    this.minIntervalMs = opts.minIntervalMs ?? 4000;
    this.timeoutMs = opts.timeoutMs ?? 30_000;
    this.maxRetries = opts.maxRetries ?? 3;
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

  // Calls are serialised so the free-tier requests-per-minute limit is respected.
  private call(system: string, user: string, schema: object, temperature: number): Promise<AiResult> {
    const run = this.queue.then(() => this.callWithRetry(system, user, schema, temperature));
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async callWithRetry(system: string, user: string, schema: object, temperature: number): Promise<AiResult> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const wait = this.lastCallAt + this.minIntervalMs - Date.now();
      if (wait > 0) await sleep(wait);
      this.lastCallAt = Date.now();
      const started = Date.now();
      try {
        const res = await Promise.race([
          this.client.models.generateContent({
            model: this.model,
            contents: user,
            config: {
              systemInstruction: system,
              temperature,
              responseMimeType: "application/json",
              responseJsonSchema: schema,
            },
          }),
          sleep(this.timeoutMs).then(() => {
            throw new Error(`Gemini timeout after ${this.timeoutMs}ms`);
          }),
        ]);
        const text = res.text ?? "";
        return {
          data: JSON.parse(text),
          meta: {
            provider: this.name,
            model: this.model,
            promptVersion: PROMPT_VERSION,
            latencyMs: Date.now() - started,
            cached: false,
          },
        };
      } catch (err) {
        lastError = err;
        const msg = String((err as Error)?.message ?? err);
        const retryable = /429|RESOURCE_EXHAUSTED|503|UNAVAILABLE|timeout|overloaded/i.test(msg);
        if (!retryable || attempt === this.maxRetries) break;
        await sleep(Math.min(30_000, 2000 * 2 ** attempt));
      }
    }
    throw new AiUnavailableError(`Gemini call failed: ${String((lastError as Error)?.message ?? lastError)}`);
  }
}
