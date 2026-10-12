import { animate } from "motion";

// Ghost cursors: a labelled pointer that glides to an element and taps it, so the viewer *watches*
// Ritu approve and Priya book (storyboard §5 "the viewer navigates; the characters act").

type Variant = "ritu" | "priya" | "rule" | "seatsaver";
const cursors = new Map<string, HTMLDivElement>();
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const LABEL: Record<Variant, string> = { ritu: "Ritu", priya: "Priya", rule: "Simple rule", seatsaver: "SeatSaver" };

function ensure(id: string, variant: Variant): HTMLDivElement {
  let el = cursors.get(id);
  if (!el) {
    el = document.createElement("div");
    el.className = `ghost-cursor ghost-${variant}`;
    el.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 2l16 10-7 1.6L9.6 21z" /></svg><span class="ghost-label">${LABEL[variant]}</span><span class="ghost-ripple"></span>`;
    el.style.transform = `translate(${window.innerWidth - 80}px, ${window.innerHeight - 60}px)`;
    document.body.appendChild(el);
    cursors.set(id, el);
  }
  el.className = `ghost-cursor ghost-${variant}`;
  el.querySelector(".ghost-label")!.textContent = LABEL[variant];
  return el;
}

function centre(target: Element) {
  const r = target.getBoundingClientRect();
  return { x: r.left + Math.min(r.width * 0.55, r.width - 10), y: r.top + r.height * 0.55 };
}

/** Glides a cursor to the target (scrolling it into view first). */
export async function moveTo(target: Element, variant: Variant, id: string = variant): Promise<void> {
  target.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" });
  await wait(reduced() ? 50 : 420);
  const el = ensure(id, variant);
  const { x, y } = centre(target);
  await animate(el, { opacity: 1, x, y }, reduced() ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 19, mass: 1 });
}

/** Press + ripple at the cursor's position. */
export async function tap(id: string): Promise<void> {
  const el = cursors.get(id);
  if (!el) return;
  const ripple = el.querySelector(".ghost-ripple") as HTMLElement;
  await animate(el.querySelector("svg")!, { scale: [1, 0.82, 1] }, { duration: 0.18 });
  animate(ripple, { scale: [0, 2.6], opacity: [0.6, 0] }, { duration: 0.4 });
  await wait(200);
}

export function hide(id?: string): void {
  for (const [key, el] of cursors) {
    if (id && key !== id) continue;
    animate(el, { opacity: 0 }, { duration: 0.25 });
  }
}

export function removeAll(): void {
  cursors.forEach((el) => el.remove());
  cursors.clear();
}
