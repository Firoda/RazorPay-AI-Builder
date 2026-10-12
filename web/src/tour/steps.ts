import type { CaseDetail } from "../lib/types";

// The guided walkthrough (storyboard §5.2). The viewer navigates (clicks / Next);
// Ritu's and Priya's actions are played by ghost cursors but execute for real.

export type Persona = "ritu" | "priya";

export interface TourStep {
  id: string;
  persona: Persona;
  /** Page the step lives on; the engine navigates there if needed (except for click steps). */
  route?: "queue" | "case";
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
];

/** States where the main story can't continue (e.g. live AI unavailable) — the tour says so honestly. */
export const BLOCKED_STATES = ["ESCALATED", "RELEASED", "AUTO_REFUNDED", "NO_ACTION", "PENDING_RESOLUTION"];
