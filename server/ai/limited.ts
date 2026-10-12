import type { IntentPromptInput, RecommendPromptInput, ReplyPromptInput } from "./prompts";
import { AiLimitError, type AiProvider, type AiResult } from "./provider";

/** Wraps the shared AI provider with a per-sandbox call allowance (cost guard for public visitors). */
export class LimitedProvider implements AiProvider {
  readonly name: string;
  private used = 0;

  constructor(private inner: AiProvider, private limit: number) {
    this.name = inner.name;
  }

  get callsUsed(): number {
    return this.used;
  }

  private take<T>(fn: () => Promise<T>): Promise<T> {
    if (this.used >= this.limit) return Promise.reject(new AiLimitError(`Demo AI limit reached (${this.limit} calls)`));
    this.used++;
    return fn();
  }

  extractIntent(input: IntentPromptInput): Promise<AiResult> {
    return this.take(() => this.inner.extractIntent(input));
  }
  recommend(input: RecommendPromptInput): Promise<AiResult> {
    return this.take(() => this.inner.recommend(input));
  }
  interpretReply(input: ReplyPromptInput): Promise<AiResult> {
    return this.take(() => this.inner.interpretReply(input));
  }
}
