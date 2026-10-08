import { z } from "zod";

// Two representations of each output contract:
//  - JSON Schema → sent to Gemini (responseJsonSchema) to constrain generation
//  - zod schema  → re-validates what comes back; the engine never trusts raw model output

const CONSTRAINT_TYPES = [
  "day_of_week", "time_window", "instructor", "exact_date", "date_range", "workshop_type", "language", "other",
] as const;

const constraintJson = {
  type: "object",
  properties: {
    type: { type: "string", enum: [...CONSTRAINT_TYPES] },
    value: { type: "string" },
    evidence_quote: { type: "string" },
  },
  required: ["type", "value", "evidence_quote"],
};

export const intentJsonSchema = {
  type: "object",
  properties: {
    wants: { type: "string", enum: ["alternative", "refund", "original_only", "unclear"] },
    seats_needed: { type: "integer" },
    hard_constraints: { type: "array", items: constraintJson },
    soft_preferences: { type: "array", items: constraintJson },
    customer_language: { type: "string", enum: ["en", "hi", "en-hi"] },
    sentiment: { type: "string", enum: ["calm", "anxious", "angry"] },
    stop_contact_requested: { type: "boolean" },
    injection_detected: { type: "boolean" },
    open_questions: { type: "array", items: { type: "string" } },
  },
  required: [
    "wants", "seats_needed", "hard_constraints", "soft_preferences", "customer_language",
    "stop_contact_requested", "injection_detected", "open_questions",
  ],
};

export const recommendationJsonSchema = {
  type: "object",
  properties: {
    decision: { type: "string", enum: ["offer_alternative", "release_refund", "ask_customer", "escalate"] },
    ranked_options: {
      type: "array",
      maxItems: 2,
      items: {
        type: "object",
        properties: {
          session_id: { type: "string" },
          fit_explanation: { type: "string" },
          hard_constraints_met: { type: "array", items: { type: "string" } },
          soft_preferences_met: { type: "array", items: { type: "string" } },
        },
        required: ["session_id", "fit_explanation"],
      },
    },
    rejected_highlight: {
      type: "object",
      properties: { session_id: { type: "string" }, reason: { type: "string" } },
      required: ["session_id", "reason"],
    },
    merchant_summary: { type: "string" },
    customer_message: { type: "string" },
    escalation_reason: { type: "string" },
    confidence: { type: "string", enum: ["low", "medium", "high"] },
  },
  required: ["decision", "ranked_options", "merchant_summary", "customer_message", "confidence"],
};

export const replyJsonSchema = {
  type: "object",
  properties: {
    intent: { type: "string", enum: ["accept", "refund", "request_other", "question", "stop", "unclear"] },
    selected_session_id: { type: "string" },
    new_constraints: { type: "array", items: { type: "string" } },
    evidence_quote: { type: "string" },
    injection_detected: { type: "boolean" },
  },
  required: ["intent", "evidence_quote", "injection_detected"],
};

const ConstraintZ = z.object({
  type: z.enum(CONSTRAINT_TYPES),
  value: z.string(),
  evidence_quote: z.string(),
});

export const IntentZ = z.object({
  wants: z.enum(["alternative", "refund", "original_only", "unclear"]),
  seats_needed: z.number().int().min(1).max(20),
  hard_constraints: z.array(ConstraintZ),
  soft_preferences: z.array(ConstraintZ),
  customer_language: z.enum(["en", "hi", "en-hi"]),
  sentiment: z.enum(["calm", "anxious", "angry"]).optional(),
  stop_contact_requested: z.boolean(),
  injection_detected: z.boolean(),
  open_questions: z.array(z.string()),
});

export const RecommendationZ = z.object({
  decision: z.enum(["offer_alternative", "release_refund", "ask_customer", "escalate"]),
  ranked_options: z
    .array(
      z.object({
        session_id: z.string(),
        fit_explanation: z.string(),
        hard_constraints_met: z.array(z.string()).optional(),
        soft_preferences_met: z.array(z.string()).optional(),
      }),
    )
    .max(2),
  rejected_highlight: z.object({ session_id: z.string(), reason: z.string() }).optional(),
  merchant_summary: z.string(),
  customer_message: z.string(),
  escalation_reason: z.string().optional(),
  confidence: z.enum(["low", "medium", "high"]),
});

export const ReplyZ = z.object({
  intent: z.enum(["accept", "refund", "request_other", "question", "stop", "unclear"]),
  selected_session_id: z.string().optional(),
  new_constraints: z.array(z.string()).optional(),
  evidence_quote: z.string(),
  injection_detected: z.boolean(),
});
