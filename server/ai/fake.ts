import type { Constraint, ExtractedIntent, Recommendation, ReplyInterpretation } from "../domain/types";
import { PROMPT_VERSION, type IntentPromptInput, type RecommendPromptInput, type ReplyPromptInput } from "./prompts";
import type { AiProvider, AiResult } from "./provider";

export interface FeasibleView {
  id: string;
  label: string;
  date: string;
  day: string;
  time_window: string;
  instructor: string;
}

type Overrides = {
  intent?: (i: IntentPromptInput) => ExtractedIntent;
  recommend?: (i: RecommendPromptInput) => Recommendation;
  reply?: (i: ReplyPromptInput) => ReplyInterpretation;
};

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/**
 * Offline, deterministic stand-in for Gemini. Used by unit tests and when no API key is set.
 * It is a crude keyword heuristic — NOT the product's intelligence; the eval measures Gemini.
 */
export class FakeProvider implements AiProvider {
  readonly name = "fake";
  constructor(private overrides: Overrides = {}) {}

  private wrap(data: unknown): AiResult {
    return { data, meta: { provider: this.name, model: "fake-heuristic", promptVersion: PROMPT_VERSION, latencyMs: 0, cached: false } };
  }

  async extractIntent(input: IntentPromptInput): Promise<AiResult> {
    if (this.overrides.intent) return this.wrap(this.overrides.intent(input));
    const text = input.customerMessages.join(" ");
    const t = text.toLowerCase();
    const hard: Constraint[] = [];
    const soft: Constraint[] = [];
    const strict = /\b(only|must|has to|need|sirf|hi ho)\b/.test(t);
    const bucket = strict ? hard : soft;
    const days = DAYS.filter((d) => t.includes(d));
    if (days.length) bucket.push({ type: "day_of_week", value: days.join("|"), evidence_quote: text });
    if (/weekday/.test(t)) bucket.push({ type: "day_of_week", value: "weekday", evidence_quote: text });
    if (/morning|subah/.test(t)) (/prefer|if possible/.test(t) ? soft : bucket).push({ type: "time_window", value: "morning", evidence_quote: text });
    if (/evening|shaam/.test(t)) bucket.push({ type: "time_window", value: "evening", evidence_quote: text });
    for (const name of input.instructors) {
      if (t.includes(name.toLowerCase())) hard.push({ type: "instructor", value: name, evidence_quote: text });
    }
    const intent: ExtractedIntent = {
      wants: /refund|money back|return the money/.test(t)
        ? "refund"
        : hard.length || soft.length || /any (slot|day|time)/.test(t)
          ? "alternative"
          : "unclear",
      seats_needed: /friend|both|two of us/.test(t) ? 2 : 1,
      hard_constraints: hard,
      soft_preferences: soft,
      customer_language: /[ऀ-ॿ]/.test(text) ? "hi" : /\b(hai|nahi|chahiye|wala|bhai)\b/.test(t) ? "en-hi" : "en",
      stop_contact_requested: /stop messaging|don't message|do not message/.test(t),
      injection_detected: /system override|admin mode|ignore (the )?(studio )?policy/.test(t),
      open_questions: [],
    };
    return this.wrap(intent);
  }

  async recommend(input: RecommendPromptInput): Promise<AiResult> {
    if (this.overrides.recommend) return this.wrap(this.overrides.recommend(input));
    const intent = input.intent as ExtractedIntent;
    const feasible = (input.feasible as FeasibleView[]).slice().sort((a, b) => {
      const score = (f: FeasibleView) =>
        intent.soft_preferences.filter((p) => p.value.toLowerCase().split("|").some((v) => [f.day, f.time_window].includes(v))).length;
      return score(b) - score(a) || a.date.localeCompare(b.date);
    });
    const options = feasible.slice(0, 2);
    const rec: Recommendation = options.length
      ? {
          decision: "offer_alternative",
          ranked_options: options.map((o) => ({ session_id: o.id, fit_explanation: `Matches stated preferences: ${o.label}` })),
          merchant_summary: `Offer ${options.map((o) => o.label).join(" or ")} at the same price.`,
          customer_message:
            options.length > 1
              ? "Hi {{NAME}}, your payment of {{AMOUNT}} is safe. We can offer {{SESSION_1}} or {{SESSION_2}} at no extra charge, or a full refund if you prefer."
              : "Hi {{NAME}}, your payment of {{AMOUNT}} is safe. We can offer {{SESSION_1}} at no extra charge, or a full refund if you prefer.",
          confidence: "medium",
        }
      : {
          decision: "release_refund",
          ranked_options: [],
          merchant_summary: "No session meets the customer's requirements; let the payment refund.",
          customer_message: "Hi {{NAME}}, sorry, no session matches what you need. Your {{AMOUNT}} will be refunded in full.",
          confidence: "medium",
        };
    return this.wrap(rec);
  }

  async interpretReply(input: ReplyPromptInput): Promise<AiResult> {
    if (this.overrides.reply) return this.wrap(this.overrides.reply(input));
    const t = input.reply.toLowerCase();
    let r: ReplyInterpretation = { intent: "unclear", evidence_quote: input.reply, injection_detected: /admin|approved .*off|ignore/.test(t) };
    if (/refund|money back|nah/.test(t)) r = { ...r, intent: "refund" };
    else if (/\?$/.test(t.trim())) r = { ...r, intent: "question" };
    else if (/first|pehla|1st/.test(t)) r = { ...r, intent: "accept", selected_session_id: input.offered[0]?.session_id };
    else if (/second|doosra|2nd/.test(t)) r = { ...r, intent: "accept", selected_session_id: input.offered[1]?.session_id };
    else {
      const match = input.offered.filter((o) => t.match(/\d+/g)?.some((n) => o.label.includes(` ${n} `)));
      if (match.length === 1) r = { ...r, intent: "accept", selected_session_id: match[0].session_id };
    }
    return this.wrap(r);
  }
}
