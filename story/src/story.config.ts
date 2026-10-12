// The storyboard as data (storyboard.md §4). Copy and pacing live here so edits never touch animation code.
// lengthVh = how many viewport heights the scene stays pinned while its animation plays.

export interface SceneConfig {
  id: string;
  title: string; // chapter-dot label
  clock?: string;
  lengthVh: number;
}

export const SCENES: SceneConfig[] = [
  { id: "s01", title: "Meet Priya", clock: "Sat · 8:55 PM · Bengaluru", lengthVh: 1.5 },
  { id: "s02", title: "The class", clock: "Sat · 8:56 PM", lengthVh: 1.5 },
  { id: "s03", title: "Meet Ritu", clock: "Sat · 8:58 PM", lengthVh: 1.5 },
  { id: "s04", title: "She pays", clock: "Sat · 9:00 PM", lengthVh: 2 },
  { id: "s05", title: "Failed, or not", clock: "Sat · 9:10 PM", lengthVh: 2 },
  { id: "s06a", title: "Meanwhile", clock: "Sat · 9:28 PM", lengthVh: 1 },
  { id: "s06b", title: "Rohan", clock: "Sat · 9:30 PM", lengthVh: 2 },
  { id: "s07", title: "11 PM", clock: "Sat · 11:00 PM", lengthVh: 1.5 },
  { id: "s08", title: "Sunday morning", clock: "Sun · 8:00 AM", lengthVh: 2 },
  { id: "s09", title: "The clock", clock: "Sun · 8:02 AM", lengthVh: 2 },
  { id: "s10", title: "What if?", lengthVh: 2 },
];

export const COPY = {
  s01: { a: "Meet Priya.", b: "She's been waiting all week for tomorrow." },
  s02: { line: "One seat left. With the instructor everyone asks for.", card: { title: "Wheel Basics", when: "Sun 11 Oct · 10:00 AM", who: "with Arjun", left: "1 seat left" } },
  s03: { a: "Ritu runs Clay & Co.", b: "Eight wheels. Every seat counts." },
  s04: { line: "She pays. And waits.", merchant: "Clay & Co.", item: "Wheel Basics · Sun 10 AM", amount: "₹2,000" },
  s05: {
    line: "Failed, says the app. Debited, says her bank.",
    sms: { from: "VM-YOURBK", text: "₹2,000 debited from A/c XX4821 on 10-Oct. UPI Ref 472918. Not you? Call 1800-000-000." },
  },
  s06a: { word: "Meanwhile…" },
  s06b: {
    lines: ["Rohan has wanted this class for weeks.", "Priya's seat hold runs out.", "Rohan taps Book."],
    close: "Her seat went back on sale. Rohan took it.",
  },
  s07: { a: "Two hours late, the bank says yes.", b: "Nobody's awake.", notif: "Payment authorised · ₹2,000 · Priya" },
  s08: {
    line: "Ritu has a payment, a customer and no seat.",
    bubbles: ["Money got debited but no booking!!", "I can only do Sunday mornings", "and I really want Arjun sir 🙏"],
  },
  s09: { line: "Do nothing, and the money quietly goes back. So does Priya.", bubbles: ["Refund her?", "Find another class?", "Which one would she even want?"] },
  s10: {
    lines: ["Payment failed.", "Money debited.", "Seat gone.", "Customer waiting."],
    question: "What if the money could still find her a seat?",
    cta: "Let's find out →",
  },
};

/** Where the story hands over to Portal 2. */
export const DEMO_URL = "/app/#/welcome?from=story";
