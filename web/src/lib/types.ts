// View types mirroring server/views.ts and server/domain/types.ts.

export type CaseState =
  | "DETECTED" | "RESTORE_PROPOSED" | "AWAITING_CUSTOMER" | "MERCHANT_REVIEW" | "OFFER_SENT" | "EXECUTING"
  | "RESCUED" | "RELEASED" | "ESCALATED" | "PENDING_RESOLUTION" | "AUTO_REFUNDED" | "NO_ACTION";

export const TERMINAL: CaseState[] = ["RESCUED", "RELEASED", "AUTO_REFUNDED", "NO_ACTION"];

export interface Session {
  id: string;
  workshopType: string;
  date: string;
  start: string;
  end: string;
  instructor: string;
  pricePaise: number;
  capacity: number;
  booked: number;
  label: string;
  seatsLeft: number;
}

export interface Constraint {
  type: string;
  value: string;
  evidence_quote: string;
}

export interface Intent {
  wants: "alternative" | "refund" | "original_only" | "unclear";
  seats_needed: number;
  hard_constraints: Constraint[];
  soft_preferences: Constraint[];
  customer_language: "en" | "hi" | "en-hi";
  sentiment?: string;
  stop_contact_requested: boolean;
  injection_detected: boolean;
  open_questions: string[];
}

export interface Recommendation {
  decision: "offer_alternative" | "release_refund" | "ask_customer" | "escalate";
  ranked_options: { session_id: string; fit_explanation: string; hard_constraints_met?: string[]; soft_preferences_met?: string[] }[];
  rejected_highlight?: { session_id: string; reason: string };
  merchant_summary: string;
  customer_message: string;
  escalation_reason?: string;
  confidence: "low" | "medium" | "high";
}

export interface CaseSummary {
  id: string;
  state: CaseState;
  decision?: string;
  reason?: string;
  customerName?: string;
  amount?: string;
  amountPaise?: number;
  originalSession?: string;
  deadline: string;
  msToDeadline: number;
  moneyMode: "capture" | "already_captured";
  summary?: string;
  flags: string[];
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  direction: "inbound" | "outbound";
  fromContact?: string;
  text: string;
  at: string;
  kind?: "template" | "ai_offer" | "merchant" | "system";
}

export interface AuditEntry {
  id: string;
  at: string;
  actor: "system" | "ai" | "merchant" | "customer" | "razorpay";
  action: string;
  detail?: unknown;
}

export interface Payment {
  id: string;
  amountPaise: number;
  status: string;
  method: string;
  createdAt: string;
  authorizedAt?: string;
  capturedAt?: string;
  captureDeadline: string;
  source: "simulated" | "razorpay_test";
}

export interface CaseDetail extends CaseSummary {
  case: {
    id: string;
    originalSessionId: string;
    intent?: Intent;
    unverifiedConstraints?: Constraint[];
    recommendation?: Recommendation;
    offeredSessionIds?: string[];
    offerMessage?: string;
    rescuedSessionId?: string;
    targetSessionId?: string;
    learnedFrom?: string[];
    stopContact: boolean;
    unansweredContacts: number;
    replyInterpretation?: { intent: string; selected_session_id?: string; evidence_quote: string; injection_detected: boolean };
  };
  payment?: Payment;
  booking?: { id: string; sessionId: string; seats: number; status: string; holdExpiresAt: string };
  customer?: { id: string; name: string; contact: string; language: string };
  candidates: { sessionId: string; feasible: boolean; reasons: string[]; session: Session }[];
  offered: Session[];
  messages: ChatMessage[];
  audit: AuditEntry[];
  ledger: { key: string; status: string; at: string; detail?: string }[];
  ruleBaselineSessionId: string | null;
}

export interface Metrics {
  eligiblePaise: number;
  offeredPaise: number;
  rescuedPaise: number;
  releasedPaise: number;
  counts: Record<string, number>;
}

export interface Health {
  ok: boolean;
  aiMode: string;
  model: string;
  razorpayTest: boolean;
  now: string;
}

export interface Policy {
  maxDaysAhead: number;
  samePriceOnly: boolean;
  maxUnansweredContacts: number;
  escalateBeforeDeadlineHours: number;
  minHoursBeforeStart: number;
  autonomy: "L1" | "L2";
  autoApprovePatterns: string[];
  restoreOriginalIfFree: boolean;
}

export interface Studio {
  studio: { name: string; city: string; owner: string };
  policy: Policy;
  sessions: Omit<Session, "label" | "seatsLeft">[];
}

export interface ScenarioInfo {
  id: string;
  group: "ai" | "reply" | "system";
  title: string;
  heldOut: boolean;
}
