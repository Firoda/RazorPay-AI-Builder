import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register once at module scope (avoids duplicate registration under React Strict Mode).
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

let lenis: Lenis | null = null;

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = () => window.matchMedia("(pointer: coarse)").matches;

/**
 * Smooth wheel/trackpad scrolling on desktop only (native scroll on touch and under reduced motion),
 * driven from GSAP's ticker so ScrollTrigger stays perfectly in sync.
 */
export function startSmoothScroll(): void {
  if (lenis || prefersReducedMotion() || isTouch()) return;
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3), wheelMultiplier: 0.9 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToElement(el: Element): void {
  if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

let refreshTimer: number | undefined;
/** Debounced ScrollTrigger refresh (after images/fonts load and change layout). */
export function refreshSoon(): void {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
}
