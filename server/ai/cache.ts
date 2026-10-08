import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { PROMPT_VERSION, type IntentPromptInput, type RecommendPromptInput, type ReplyPromptInput } from "./prompts";
import { AiUnavailableError, type AiKind, type AiProvider, type AiResult } from "./provider";

/**
 * Caches AI responses by input hash. "read-write" saves free-tier quota while judges click around;
 * "cache-only" (demo-safe mode) replays recorded responses and never calls the model.
 */
export class CachedProvider implements AiProvider {
  readonly name: string;
  private entries: Record<string, AiResult["data"]> = {};

  constructor(
    private inner: AiProvider | null,
    private file: string,
    private mode: "read-write" | "cache-only" = "read-write",
  ) {
    this.name = `${inner?.name ?? "none"}+cache(${mode})`;
    if (existsSync(file)) this.entries = JSON.parse(readFileSync(file, "utf8"));
  }

  extractIntent(input: IntentPromptInput) {
    return this.get("intent", input, () => this.inner!.extractIntent(input));
  }
  recommend(input: RecommendPromptInput) {
    return this.get("recommend", input, () => this.inner!.recommend(input));
  }
  interpretReply(input: ReplyPromptInput) {
    return this.get("reply", input, () => this.inner!.interpretReply(input));
  }

  private async get(kind: AiKind, input: unknown, fetcher: () => Promise<AiResult>): Promise<AiResult> {
    const key = createHash("sha256").update(`${kind}|${PROMPT_VERSION}|${JSON.stringify(input)}`).digest("hex");
    if (key in this.entries) {
      return {
        data: structuredClone(this.entries[key]),
        meta: { provider: this.name, model: "cache", promptVersion: PROMPT_VERSION, latencyMs: 0, cached: true },
      };
    }
    if (this.mode === "cache-only" || !this.inner) throw new AiUnavailableError("No cached AI response for this input");
    const result = await fetcher();
    this.entries[key] = result.data;
    mkdirSync(dirname(this.file), { recursive: true });
    writeFileSync(this.file, JSON.stringify(this.entries, null, 1));
    return result;
  }
}
