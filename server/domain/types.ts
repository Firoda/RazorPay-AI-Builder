// Core domain model for SeatSaver. Money is always integer paise; times are ISO strings.

export type WorkshopType = "wheel_basics" | "hand_building" | "glazing_masterclass";
export type Lang = "en" | "hi" | "en-hi";

export interface Session {
  id: string;
  workshopType: WorkshopType;
  date: string; // YYYY-MM-DD (IST)
  start: string; // HH:MM (IST)
  end: string;
  instructor: string;
  pricePaise: number;
  capacity: number;
  booked: number;
  language: Lang;
}

export interface Customer {
  id: string;
  name: string;
  contact: string; // the verified contact on the booking/payment
  language: Lang;
}

export type BookingStatus = "held" | "expired" | "released" | "confirmed" | "rescued" | "cancelled";

export interface Booking {
  id: string;
  customerId: string;
  sessionId: string;
  seats: number;
  status: BookingStatus;
  holdExpiresAt: string;
  paymentId?: string;
}

export type PaymentStatus = "created" | "failed" | "authorized" | "captured" | "refunded";

export interface Payment {
  id: string;
  orderId?: string;
  amountPaise: number;
  currency: "INR";
  status: PaymentStatus;
  method: "upi" | "card" | "netbanking";
  createdAt: string;
  authorizedAt?: string;
  capturedAt?: string;
  /** Razorpay auto-refunds an uncaptured authorised payment 3 days after creation. */
  captureDeadline: string;
  notes: { booking_id: string; customer_id: string };
  refundStatus: "none" | "pending" | "processed";
  source: "simulated" | "razorpay_test";
}

export interface Policy {
  maxDaysAhead: number;
  samePriceOnly: boolean;
  equivalentTypes: Record<string, string[]>;
  /** Max outbound messages sent without the customer replying. */
  maxUnansweredContacts: number;
  escalateBeforeDeadlineHours: number;
  minHoursBeforeStart: number;
  autonomy: "L1" | "L2";
  autoApprovePatterns: string[];
  restoreOriginalIfFree: boolean;
}

export interface ChatMessage {
  id: string;
  caseId?: string;
  customerId: string;
  direction: "inbound" | "outbound";
  fromContact?: string;
  text: string;
  at: string;
  kind?: "template" | "ai_offer" | "merchant" | "system";
}

export type ConstraintType =
  | "day_of_week"
  | "time_window"
  | "instructor"
  | "exact_date"
  | "date_range"
  | "workshop_type"
  | "language"
  | "other";

export interface Constraint {
  type: ConstraintType;
  value: string;
  evidence_quote: string;
}

export interface ExtractedIntent {
  wants: "alternative" | "refund" | "original_only" | "unclear";
  seats_needed: number;
  hard_constraints: Constraint[];
  soft_preferences: Constraint[];
  customer_language: Lang;
  sentiment?: "calm" | "anxious" | "angry";
  stop_contact_requested: boolean;
  injection_detected: boolean;
  open_questions: string[];
}

export type AiDecision = "offer_alternative" | "release_refund" | "ask_customer" | "escalate";

export interface Recommendation {
  decision: AiDecision;
  ranked_options: {
    session_id: string;
    fit_explanation: string;
    hard_constraints_met?: string[];
    soft_preferences_met?: string[];
  }[];
  rejected_highlight?: { session_id: string; reason: string };
  merchant_summary: string;
  customer_message: string;
  escalation_reason?: string;
  confidence: "low" | "medium" | "high";
}

export interface ReplyInterpretation {
  intent: "accept" | "refund" | "request_other" | "question" | "stop" | "unclear";
  selected_session_id?: string;
  new_constraints?: string[];
  evidence_quote: string;
  injection_detected: boolean;
}

export type CaseState =
  | "DETECTED"
  | "RESTORE_PROPOSED"
  | "AWAITING_CUSTOMER"
  | "MERCHANT_REVIEW"
  | "OFFER_SENT"
  | "EXECUTING"
  | "RESCUED"
  | "RELEASED"
  | "ESCALATED"
  | "PENDING_RESOLUTION"
  | "AUTO_REFUNDED"
  | "NO_ACTION";

export const TERMINAL_STATES: CaseState[] = ["RESCUED", "RELEASED", "AUTO_REFUNDED", "NO_ACTION"];

export type CaseDecision =
  | "restore_original"
  | "offer_alternative"
  | "release_refund"
  | "ask_customer"
  | "escalate"
  | "no_action";

export interface CandidateResult {
  sessionId: string;
  feasible: boolean;
  reasons: string[];
}

export interface RescueCase {
  id: string;
  paymentId: string;
  bookingId: string;
  customerId: string;
  originalSessionId: string;
  state: CaseState;
  decision?: CaseDecision;
  reason?: string;
  /** "capture": payment is authorised and we decide whether to capture.
   *  "already_captured": merchant config auto-captured it; we can only rebook or route to refund review. */
  moneyMode: "capture" | "already_captured";
  deadline: string;
  createdAt: string;
  updatedAt: string;
  intent?: ExtractedIntent;
  unverifiedConstraints?: Constraint[];
  candidates?: CandidateResult[];
  recommendation?: Recommendation;
  offeredSessionIds?: string[];
  offerMessage?: string;
  replyInterpretation?: ReplyInterpretation;
  /** Session being executed (kept while PENDING_RESOLUTION so the merchant can retry). */
  targetSessionId?: string;
  rescuedSessionId?: string;
  unansweredContacts: number;
  stopContact: boolean;
  flags: string[];
  learnedFrom?: string[];
}

export type Actor = "system" | "ai" | "merchant" | "customer" | "razorpay";

export interface AuditEntry {
  id: string;
  caseId?: string;
  at: string;
  actor: Actor;
  action: string;
  detail?: unknown;
}

export interface LedgerEntry {
  key: string;
  status: "started" | "succeeded" | "failed";
  at: string;
  detail?: string;
}

export interface LearningRecord {
  id: string;
  caseId: string;
  constraintTags: string[];
  offered: string[];
  merchantChoice: string[] | null;
  action: "edit" | "reject";
  reasonChip?: string;
  note?: string;
  at: string;
}

export interface PaymentEvent {
  id: string;
  type: "payment.authorized" | "payment.captured";
  paymentId: string;
  source: "simulated" | "razorpay_webhook";
}
