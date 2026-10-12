import type { CaseDetail } from "../lib/types";

// The guided walkthrough (storyboard §5.2). The viewer navigates (clicks / Next);
// Ritu's and Priya's actions are played by ghost cursors but execute for real.

export type Persona = "ritu" | "priya";

export interface TourStep {
  id: string;
  persona: Persona;
  /** Page the step lives on; the engine navigates there if needed (except for click steps). */
  route?: "queue" | "case" | "policy";
  /** The chapter the step belongs to (drives the mission bar). */
  chapter?: "rescue" | "guardrails";
  /** Shows the "You rescued ₹2,000" card instead of a spotlight; its button continues the tour. */
  celebrate?: boolean;
  target: string;
  title: string;
  body: string;
  /** Advance when the viewer performs a real click in the product. */
  advance?: { event: string; hint: string };
  /** Case data that must exist before the step is shown (e.g. the AI has answered). */
  waitFor?: (d: CaseDetail) => boolean;
  waitText?: string;
  /** Effect to play once the spotlight is on. */
  fx?: "words" | "race" | "stamps";
  /** A character acts when the viewer presses the button. */
  action?: "approve" | "book";
  nextText?: string;
  /** Where the popover sits relative to the spotlight (default: below). */
  side?: "top" | "bottom" | "left" | "right";
}

export const STEPS: TourStep[] = [
  {
    id: "queue", persona: "ritu", target: '[data-tour="queue-nav"]',
    title: "Your rescue queue",
    body: "Every payment that arrived after its seat was sold lands here.",
    advance: { event: "nav:queue", hint: "Click “Rescue queue”" },
  },
  {
    id: "case", persona: "ritu", route: "queue", target: '[data-tour="case-card"]',
    title: "Here's Priya",
    body: "Money held, seat gone. Click her card to see what SeatSaver suggests.",
    advance: { event: "nav:case", hint: "Click Priya's card" },
  },
  {
    id: "timeline", persona: "ritu", route: "case", target: '[data-tour="timeline"]',
    title: "What happened, in order",
    body: "Paid at 9 PM. Marked failed. Seat resold. The bank confirmed at 11 PM. The money is held, not lost.",
  },
  {
    id: "needs", persona: "ritu", route: "case", target: '[data-tour="needs"]',
    title: "Gemini reads her words",
    body: "It finds her must-haves in her own message and quotes her exactly, so you can check.",
    waitFor: (d) => Boolean(d.case.intent),
    waitText: "Gemini is reading her message live… this takes a few seconds.",
    fx: "words",
  },
  {
    id: "race", persona: "ritu", route: "case", target: '[data-tour="matrix"]',
    title: "A rule would get this wrong",
    body: "A simple rule offers the next open slot. SeatSaver offers the one she'll actually take.",
    waitFor: (d) => d.state === "MERCHANT_REVIEW" && d.offered.length > 0,
    waitText: "Gemini is ranking the sessions that fit…",
    fx: "race",
  },
  {
    id: "approve", persona: "ritu", route: "case", target: '[data-tour="decision"]',
    title: "Nothing moves without Ritu",
    body: "SeatSaver drafted the offer. Ritu stays in control. Watch her approve.",
    waitFor: (d) => d.state === "MERCHANT_REVIEW",
    action: "approve",
    nextText: "▶ Watch Ritu approve",
  },
  {
    id: "book", persona: "priya", route: "case", target: '[data-tour="phone"]',
    title: "Now it's Priya's turn",
    body: "Same price. No extra charge. A refund is still available. Watch her choose.",
    waitFor: (d) => d.state === "OFFER_SENT",
    action: "book",
    nextText: "▶ Watch Priya book",
  },
  {
    id: "audit", persona: "ritu", route: "case", target: '[data-tour="audit-tab"]',
    title: "Every action, recorded",
    body: "Open the audit trail to see the proof.",
    advance: { event: "nav:audit", hint: "Click “Audit trail”" },
  },
  {
    id: "ledger", persona: "ritu", route: "case", target: '[data-tour="ledger"]',
    title: "Proof it happened once",
    body: "Each money action can only happen once, so a double click or a repeated alert can never charge twice.",
    fx: "stamps",
  },
  { id: "done", persona: "ritu", target: "", title: "", body: "", celebrate: true },
  {
    id: "g-traces", persona: "ritu", chapter: "guardrails", route: "policy", target: '[data-tour="g-traces"]',
    title: "Every outcome comes from a guardrail",
    body: "Priya was rescued because of these rules. The same rules release, refund or escalate when that's the right call, and the AI can't skip them.",
  },
  {
    id: "g-locks", persona: "ritu", chapter: "guardrails", route: "policy", target: '[data-tour="g-locks"]',
    title: "Hard guardrails, locked in code",
    body: "These live in code, not in the AI's prompt, so no clever message can talk them away.",
    advance: { event: "g:lock", hint: "Try to switch one off" },
  },
  {
    id: "g-dial", persona: "ritu", chapter: "guardrails", route: "policy", target: '[data-tour="g-dial"]',
    title: "Ritu decides how much the AI does alone",
    body: "Review-first by default. She can let offers auto-send for patterns she trusts. Capturing the money still waits for the customer's yes, always.",
  },
  {
    id: "g-plugs", persona: "ritu", chapter: "guardrails", route: "policy", target: '[data-tour="g-plugs"]',
    title: "Razorpay owns the money, not the seats",
    body: "SeatSaver needs three calls to wherever the seats already live. No booking system at all? Ritu's approval is the seat check.",
  },
  {
    id: "g-close", persona: "ritu", chapter: "guardrails", route: "policy", target: '[data-tour="g-close"]',
    title: "That's SeatSaver",
    body: "The AI suggests. The guardrails decide. Ritu stays in charge. Watch the guardrails hold it back in three live cases, or explore on your own.",
    nextText: "Finish ✓",
    side: "top",
  },
];

/** States where the main story can't continue (e.g. live AI unavailable) — the tour says so honestly. */
export const BLOCKED_STATES = ["ESCALATED", "RELEASED", "AUTO_REFUNDED", "NO_ACTION", "PENDING_RESOLUTION"];
