import { animate } from "motion";
import { play } from "../../../shared/sound";
import { hide, moveTo, tap } from "./ghost";

// Signature animations for the guided tour (technical plan §6.3). Pure DOM + Motion so they work
// on top of any page without changing component state. Every effect degrades to a no-op if its
// targets aren't on screen.

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const $$ = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

function layer(): HTMLDivElement {
  let el = $<HTMLDivElement>(".fx-layer");
  if (!el) {
    el = document.createElement("div");
    el.className = "fx-layer";
    document.body.appendChild(el);
  }
  return el;
}

/** Rect of the first occurrence of `word` inside `root`'s text (case-insensitive), via the Range API. */
function wordRect(root: Element, word: string): DOMRect | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const needle = word.toLowerCase();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent ?? "";
    const i = text.toLowerCase().indexOf(needle);
    if (i >= 0) {
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + word.length);
      return range.getBoundingClientRect();
    }
  }
  return null;
}

/**
 * Step 4: Priya's own words lift out of her chat bubble and fly into the "What she needs" chips.
 * Chips carry data-chip-word (the keyword to find in her message).
 */
export async function flyWordsToChips(): Promise<void> {
  const chips = $$("[data-chip-word]");
  const bubble = $$("[data-tour='phone'] .bubble.me").pop();
  if (!chips.length) return;
  chips.forEach((c) => (c.style.opacity = "0"));
  for (const chip of chips) {
    const word = chip.dataset.chipWord ?? "";
    const from = bubble ? wordRect(bubble, word) : null;
    const to = chip.getBoundingClientRect();
    if (from && !reduced()) {
      const clone = document.createElement("span");
      clone.className = "fx-word";
      clone.textContent = word;
      clone.style.left = `${from.left}px`;
      clone.style.top = `${from.top}px`;
      layer().appendChild(clone);
      play("sparkle");
      await animate(clone, { backgroundColor: ["rgba(122,90,248,0)", "rgba(122,90,248,0.25)"] }, { duration: 0.25 });
      await animate(clone, { x: to.left - from.left + 10, y: to.top - from.top + 8, scale: 1.15 }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      clone.remove();
    }
    chip.style.opacity = "";
    animate(chip, { scale: [0.8, 1.06, 1], opacity: [0, 1] }, { duration: 0.35 });
    await wait(reduced() ? 0 : 120);
  }
}

/** Step 5: the simple rule grabs the wrong row; SeatSaver glides to the right one. */
export async function ruleRace(ruleSessionId: string | null, bestSessionId: string | undefined): Promise<void> {
  const ruleRow = ruleSessionId ? $(`[data-row-session="${ruleSessionId}"]`) : null;
  const bestRow = bestSessionId ? $(`[data-row-session="${bestSessionId}"]`) : null;
  if (ruleRow) {
    await moveTo(ruleRow, "rule", "race-rule");
    for (const bad of Array.from(ruleRow.querySelectorAll<HTMLElement>(".cell-bad"))) {
      play("buzzWrong");
      animate(bad, { scale: [1, 1.6, 1], x: [0, -3, 3, 0] }, { duration: 0.35 });
      await wait(240);
    }
    animate(ruleRow, { opacity: [1, 0.45] }, { duration: 0.4 });
    await wait(500);
  }
  if (bestRow) {
    await moveTo(bestRow, "seatsaver", "race-best");
    for (const ok of Array.from(bestRow.querySelectorAll<HTMLElement>(".cell-ok"))) {
      play("tickRight");
      animate(ok, { scale: [1, 1.5, 1] }, { duration: 0.3 });
      await wait(200);
    }
    animate(bestRow, { boxShadow: ["0 0 0 0 rgba(48,94,255,0)", "0 0 0 3px rgba(48,94,255,.5)", "0 0 0 0 rgba(48,94,255,0)"] }, { duration: 1 });
  }
  await wait(700);
  if (ruleRow) animate(ruleRow, { opacity: 1 }, { duration: 0.3 });
  hide("race-rule");
  hide("race-best");
}

/** A character "taps" a real button (the click is real: the caller runs the API action). */
export async function ghostTap(target: Element | null, who: "ritu" | "priya"): Promise<void> {
  if (!target) return;
  await moveTo(target, who, who);
  play("tap");
  await tap(who);
}

export function hideGhost(who: "ritu" | "priya"): void {
  hide(who);
}

/** Step 6: the approved offer flies from Ritu's card to Priya's phone. */
export async function offerFlight(): Promise<void> {
  const from = $("[data-tour='offer-preview']")?.getBoundingClientRect();
  const to = $("[data-tour='phone'] .chat")?.getBoundingClientRect();
  if (!from || !to || reduced()) return;
  const env = document.createElement("div");
  env.className = "fx-envelope";
  env.innerHTML = "✉";
  const sx = from.left + from.width / 2, sy = from.top + from.height / 2;
  const ex = to.left + to.width / 2, ey = to.top + to.height * 0.6;
  env.style.left = `${sx}px`;
  env.style.top = `${sy}px`;
  layer().appendChild(env);
  play("whoosh");
  const midY = Math.min(sy, ey) - 120;
  await animate(env, { x: [0, (ex - sx) / 2, ex - sx], y: [0, midY - sy, ey - sy], scale: [1, 1.15, 0.6], rotate: [0, -8, 0] }, { duration: 0.8, ease: "easeInOut" });
  env.remove();
  play("ding");
}

/** Step 7: seat locks first, then the held money is captured. Real order, shown big. */
export async function seatThenMoney(amount: string): Promise<void> {
  const box = document.createElement("div");
  box.className = "fx-sequence";
  box.innerHTML = `<div class="fx-badge fx-lock"><span class="fx-ico">🔒</span><span>Seat reserved</span></div><div class="fx-arrow">then</div><div class="fx-badge fx-money"><span class="fx-ico">₹</span><span>${amount} captured · once</span></div>`;
  layer().appendChild(box);
  const [lock, arrow, money] = Array.from(box.children) as HTMLElement[];
  await animate(lock, { opacity: [0, 1], y: [16, 0], scale: [0.9, 1] }, { duration: 0.4 });
  play("padlock");
  await wait(reduced() ? 0 : 450);
  await animate(arrow, { opacity: [0, 1] }, { duration: 0.25 });
  await animate(money, { opacity: [0, 1], y: [16, 0], scale: [0.9, 1] }, { duration: 0.45 });
  play("coin");
  await wait(reduced() ? 600 : 1600);
  await animate(box, { opacity: 0 }, { duration: 0.35 });
  box.remove();
}

/** Step 8: "ONCE" stamps on each ledger row. */
export async function stampLedger(): Promise<void> {
  for (const row of $$("[data-ledger-row]")) {
    if (row.querySelector(".fx-stamp")) continue;
    const stamp = document.createElement("span");
    stamp.className = "fx-stamp";
    stamp.textContent = "ONCE";
    row.querySelector("td:last-child")?.appendChild(stamp);
    play("stamp");
    await animate(stamp, { scale: [1.6, 1], rotate: [-12, -6], opacity: [0, 1] }, { duration: 0.25 });
    await wait(250);
  }
}

/** Step 9: small, tasteful confetti. */
export function confetti(): void {
  if (reduced()) return;
  const colors = ["#305eff", "#4d7fff", "#009e5c", "#f5a623", "#7a5af8"];
  const L = layer();
  for (let i = 0; i < 44; i++) {
    const p = document.createElement("i");
    p.className = "fx-confetti";
    p.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
    p.style.background = colors[i % colors.length];
    L.appendChild(p);
    const dx = (Math.random() - 0.5) * 700;
    const dy = -200 - Math.random() * 300;
    animate(p, { x: [0, dx], y: [0, dy, dy + 650], rotate: [0, Math.random() * 720], opacity: [1, 1, 0] }, { duration: 1.4 + Math.random() * 0.4, ease: "easeOut" }).then(() => p.remove());
  }
}
