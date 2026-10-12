// "Judge lens": optional annotations that map each story moment to what the Razorpay brief evaluates
// (storyboard §6). Off by default; the toggle is persisted and shared by both portals.

export interface LensNote {
  portal: 1 | 2;
  anchor: string; // scene id (portal 1) or tour step id (portal 2)
  label: string;
  text: string;
}

export const LENS_NOTES: LensNote[] = [
  { portal: 1, anchor: "s05", label: "Problem importance", text: "Failed but debited is common enough that Razorpay publishes a guide on it. Each one is a lost sale or a support ticket." },
  { portal: 1, anchor: "s06b", label: "The real mechanism", text: "Banks can confirm up to 3 days late. Razorpay holds the money as 'authorised' until it's captured or auto-refunded." },
  { portal: 1, anchor: "s03", label: "Merchant understanding", text: "Owner-run studio, 8 perishable seats, runs on WhatsApp. No ops team to untangle payments." },
  { portal: 1, anchor: "s08", label: "Merchant understanding", text: "The problem lands on the owner's phone first thing in the morning, with a class about to start." },
  { portal: 1, anchor: "s09", label: "Cost of doing nothing", text: "Default today: a silent auto-refund (sale lost) or a blind capture (customer harmed)." },
  { portal: 2, anchor: "needs", label: "Why AI, not a rule", text: "Free-text, often Hinglish needs. AI extracts them with quotes as evidence; code checks every fact." },
  { portal: 2, anchor: "race", label: "Product judgement", text: "Same price only. Max 2 options. A refund is always offered. The AI can only pick from what code allowed." },
  { portal: 2, anchor: "approve", label: "Merchant control", text: "Review-first by default, like Razorpay Agent Studio. Approve, edit, reject or release." },
  { portal: 2, anchor: "book", label: "Trust and safety", text: "Seat reserved before money moves. The capture happens once. The AI never writes amounts." },
  { portal: 2, anchor: "audit", label: "Accuracy", text: "Golden set: dev 17/18, new held-out 3/3, simple rule 0%, zero wrong charges." },
  { portal: 2, anchor: "done", label: "Business outcome", text: "North Star: rescued-revenue rate. Guardrails: zero charges without an accepted seat." },
  { portal: 2, anchor: "policy", label: "Guardrails and control", text: "Hard limits live in code, not in the prompt. Autonomy is opt-in per pattern, and capture always waits for the customer's yes." },
  { portal: 2, anchor: "notact", label: "What we left out", text: "No price differences, no extra seats, no real WhatsApp sending: deliberately out of v1." },
];

const KEY = "ss.judgeLens";
const listeners = new Set<(on: boolean) => void>();

export function lensOn(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setLens(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(on));
}

export function onLensChange(fn: (on: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function notesFor(portal: 1 | 2, anchor: string): LensNote[] {
  return LENS_NOTES.filter((n) => n.portal === portal && n.anchor === anchor);
}
