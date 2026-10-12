import type { RefObject } from "react";
import { SCENES } from "../story.config";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./scroll";
import { setStory } from "./storyState";

/**
 * A beat is a real-time animation (notification drop, shake, typing bubbles…) fired once when the
 * scroll crosses `at` (0–1 of the scene's pinned progress). Scrolling back above `at` resets it, so
 * the story replays correctly in both directions. Beat timelines must use fromTo/set so pause(0) resets them.
 */
export interface Beat {
  at: number;
  build: (q: (sel: string) => Element[]) => gsap.core.Timeline;
}

export interface SceneSpec {
  id: string;
  /** Scrubbed animation tied to scroll position (plays backwards when scrolling up). Receives a 0→1 timeline. */
  scrub?: (tl: gsap.core.Timeline, q: (sel: string) => Element[]) => void;
  beats?: Beat[];
  /** Called when the scene becomes active / inactive (e.g. to start a live countdown). */
  onActive?: (active: boolean) => void;
  /** Mid-scene clock changes, e.g. Scene 4's 9:01 → 9:05 → 9:09. */
  clockAt?: { at: number; clock: string }[];
}

/** Global pacing knob: the storyboard pin lengths × this = how long each scene holds (≈16 screens total). */
const PIN_SCALE = 0.55;

export function useScene(ref: RefObject<HTMLElement | null>, spec: SceneSpec): void {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const cfg = SCENES.find((s) => s.id === spec.id)!;
      const q = (sel: string) => Array.from(el.querySelectorAll(sel));
      const reduced = prefersReducedMotion();
      const mobile = window.matchMedia("(max-width: 899px)").matches;
      const length = reduced ? 0.6 : Math.max(0.6, cfg.lengthVh * PIN_SCALE * (mobile ? 0.8 : 1));

      const beats = (spec.beats ?? []).map((b) => ({ at: b.at, tl: b.build(q).pause(0), fired: false }));
      const clocks = (spec.clockAt ?? []).slice().sort((a, b) => a.at - b.at);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          pin: true,
          start: "top top",
          end: `+=${length * 100}%`,
          scrub: reduced ? true : 0.6,
          onToggle: (self) => {
            if (self.isActive) setStory({ activeScene: spec.id, ...(cfg.clock ? { clock: cfg.clock } : {}) });
            spec.onActive?.(self.isActive);
          },
          onUpdate: (self) => {
            const p = self.progress;
            for (const b of beats) {
              if (!b.fired && p >= b.at) {
                b.fired = true;
                b.tl.play(0);
              } else if (b.fired && p < b.at - 0.02) {
                b.fired = false;
                b.tl.pause(0);
              }
            }
            if (clocks.length && self.isActive) {
              const current = clocks.filter((c) => p >= c.at).pop();
              setStory({ clock: current?.clock ?? cfg.clock ?? "" });
            }
          },
        },
      });
      if (spec.scrub && !reduced) spec.scrub(tl, q);
      // Keep the timeline's duration normalised to 1 so scrub maps cleanly to the pinned distance.
      if (tl.duration() < 1) tl.to({}, { duration: 1 - tl.duration() });
      return () => {
        beats.forEach((b) => b.tl.kill());
      };
    },
    { scope: ref },
  );
}

/** Masked line reveal used for story copy. Returns a paused timeline (for beats). */
export function revealLines(targets: Element[] | string, opts: { delay?: number; stagger?: number } = {}) {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: opts.stagger ?? 0.7, delay: opts.delay ?? 0 },
  );
}

export { ScrollTrigger };
