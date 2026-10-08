import type { IntentPromptInput, RecommendPromptInput, ReplyPromptInput } from "./prompts";

export interface AiCallMeta {
  provider: string;
  model: string;
  promptVersion: string;
  latencyMs: number;
  cached: boolean;
}

export interface AiResult {
  /** Raw parsed JSON from the model. Always re-validated by the engine before use. */
  data: unknown;
  meta: AiCallMeta;
}

export type AiKind = "intent" | "recommend" | "reply";

export interface AiProvider {
  readonly name: string;
  extractIntent(input: IntentPromptInput): Promise<AiResult>;
  recommend(input: RecommendPromptInput): Promise<AiResult>;
  interpretReply(input: ReplyPromptInput): Promise<AiResult>;
}

export class AiUnavailableError extends Error {}
