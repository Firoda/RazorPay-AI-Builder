import { IntentZ, RecommendationZ, ReplyZ } from "../ai/schemas";
import type { ExtractedIntent, Recommendation, ReplyInterpretation } from "../domain/types";

export type Validated<T> = { ok: true; value: T; issues: string[] } | { ok: false; issues: string[] };

const ALLOWED_PLACEHOLDERS = new Set(["NAME", "AMOUNT", "SESSION_1", "SESSION_2", "DEADLINE"]);

// Money or concrete dates/times written by the model are forbidden in customer-facing text:
// code fills those in via placeholders so the model can never misquote an amount or a slot.
const FORBIDDEN_FACTS: [RegExp, string][] = [
  [/₹|\brs\.?\s*\d|\binr\b|\d+\s*(rupees?|rs\b)|रुपये|रुपए/i, "money_in_text"],
  [/\b\d{1,2}(:\d{2})?\s*(am|pm)\b/i, "time_in_text"],
  [/\b\d{1,2}(st|nd|rd|th)\b/i, "date_in_text"],
  [/\b\d{1,2}\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i, "date_in_text"],
  [/\b\d{4}-\d{2}-\d{2}\b/, "date_in_text"],
  [/\d{3,}/, "number_in_text"],
];

export function customerMessageIssues(text: string): string[] {
  const issues = FORBIDDEN_FACTS.filter(([re]) => re.test(text)).map(([, code]) => code);
  for (const m of text.matchAll(/\{\{\s*([A-Z_0-9]+)\s*\}\}/g)) {
    if (!ALLOWED_PLACEHOLDERS.has(m[1])) issues.push(`unknown_placeholder:${m[1]}`);
  }
  if (text.length > 600) issues.push("message_too_long");
  return [...new Set(issues)];
}

export function validateIntent(raw: unknown): Validated<ExtractedIntent> {
  const parsed = IntentZ.safeParse(raw);
  if (!parsed.success) return { ok: false, issues: parsed.error.issues.map((i) => `schema:${i.path.join(".")}:${i.message}`) };
  return { ok: true, value: parsed.data, issues: [] };
}

/**
 * Validates a recommendation against what code already established (build plan §2.3).
 * Hard failures reject the output; soft problems are corrected and reported as issues.
 */
export function validateRecommendation(raw: unknown, feasibleIds: string[]): Validated<Recommendation> {
  const parsed = RecommendationZ.safeParse(raw);
  if (!parsed.success) return { ok: false, issues: parsed.error.issues.map((i) => `schema:${i.path.join(".")}:${i.message}`) };
  const rec = structuredClone(parsed.data);
  const issues: string[] = [];

  const unknown = rec.ranked_options.filter((o) => !feasibleIds.includes(o.session_id));
  if (unknown.length) return { ok: false, issues: unknown.map((o) => `infeasible_option:${o.session_id}`) };

  const ids = rec.ranked_options.map((o) => o.session_id);
  if (new Set(ids).size !== ids.length) {
    rec.ranked_options = rec.ranked_options.filter((o, i) => ids.indexOf(o.session_id) === i);
    issues.push("duplicate_options_removed");
  }

  if (rec.decision === "offer_alternative" && rec.ranked_options.length === 0) {
    rec.decision = feasibleIds.length ? "ask_customer" : "release_refund";
    issues.push("offer_without_options_overridden");
  }
  if (rec.decision !== "offer_alternative" && rec.ranked_options.length) {
    rec.ranked_options = [];
    issues.push("options_dropped_for_non_offer");
  }
  if (rec.decision === "offer_alternative" && rec.ranked_options.length < 2 && /\{\{\s*SESSION_2\s*\}\}/.test(rec.customer_message)) {
    issues.push("session2_placeholder_without_option");
  }

  issues.push(...customerMessageIssues(rec.customer_message).map((i) => `customer_message:${i}`));
  return { ok: true, value: rec, issues };
}

export function validateReply(raw: unknown, offeredIds: string[]): Validated<ReplyInterpretation> {
  const parsed = ReplyZ.safeParse(raw);
  if (!parsed.success) return { ok: false, issues: parsed.error.issues.map((i) => `schema:${i.path.join(".")}:${i.message}`) };
  const r = structuredClone(parsed.data);
  const issues: string[] = [];
  if (r.intent === "accept" && (!r.selected_session_id || !offeredIds.includes(r.selected_session_id))) {
    issues.push(`accept_without_valid_selection:${r.selected_session_id ?? "none"}`);
    r.intent = "unclear";
    delete r.selected_session_id;
  }
  return { ok: true, value: r, issues };
}

/** True if any customer-message issue means the AI draft must be replaced by a safe template. */
export function messageNeedsFallback(issues: string[]): boolean {
  return issues.some((i) => i.startsWith("customer_message:") || i === "session2_placeholder_without_option");
}
