import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isMuted, onMuteChange, play, setMuted, unlock } from "../../../shared/sound";
import { gsap, nudgeScroll, prefersReducedMotion, ScrollTrigger, scrollToElement, startSmoothScroll } from "../engine/scroll";
import { setStory, useStory } from "../engine/storyState";
import { DEMO_URL, SCENES } from "../story.config";
import { BuilderBadge } from "./Brand";

/** "Tap to begin": the deliberate gesture that unlocks sound (scrolling can't). */
export function IntroGate() {
  const { started } = useStory();
  const ref = useRef<HTMLDivElement>(null);
  const begin = async (withSound: boolean) => {
    if (withSound) {
      await unlock();
      setMuted(false);
      play("start");
    } else {
      setMuted(true);
    }
    gsap.to(ref.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out", onComplete: () => setStory({ started: true }) });
    document.documentElement.classList.remove("locked");
    startSmoothScroll();
  };
  useEffect(() => {
    document.documentElement.classList.add("locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        begin(true);
      }
    };
    window.addEventListener("keydown", onKey, { once: true });
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (started) return null;
  return (
    <div className="gate" ref={ref} role="dialog" aria-label="Start the story">
      <div className="gate-brand"><BuilderBadge /></div>
      <button className="gate-begin" onClick={() => begin(true)} autoFocus>
        <span className="gate-title">Tap to begin</span>
        <span className="gate-sub"><Volume2 size={16} /> best with sound</span>
      </button>
      <button className="gate-mute" onClick={() => begin(false)}>Continue without sound</button>
      <div className="gate-foot">A 2-minute story · Razorpay × ISB Build Challenge</div>
    </div>
  );
}

export function ClockPill() {
  const { clock, started, activeScene } = useStory();
  const [shown, setShown] = useState(clock);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (clock === shown) return;
    if (started) play("tick");
    gsap.fromTo(ref.current, { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.25 });
    setShown(clock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock]);
  if (activeScene === "s10" || !shown) return null;
  return <div className="clock-pill num" ref={ref} aria-live="polite">🕘 {shown}</div>;
}

export function ProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(ref.current, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);
  return <div className="progress-line" ref={ref} aria-hidden />;
}

export function ChapterDots() {
  const { activeScene } = useStory();
  return (
    <nav className="chapter-dots" aria-label="Chapters">
      {SCENES.map((s) => (
        <button
          key={s.id}
          className={s.id === activeScene ? "active" : ""}
          aria-label={s.title}
          title={s.title}
          onClick={() => {
            const el = document.getElementById(s.id);
            if (el) scrollToElement(el);
          }}
        />
      ))}
    </nav>
  );
}

export function MuteToggle() {
  const [muted, setM] = useState(isMuted);
  useEffect(() => onMuteChange(setM), []);
  return (
    <button
      className="chrome-btn"
      onClick={async () => {
        await unlock();
        setMuted(!muted);
      }}
      aria-label={muted ? "Turn sound on" : "Mute sound"}
      title={muted ? "Sound off" : "Sound on"}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}

export function SkipLink() {
  return <a className="skip-link" href={DEMO_URL}>Skip to the demo →</a>;
}

/**
 * If the viewer hasn't scrolled for a while, show "Keep scrolling" and gently glide the page forward
 * (reduced motion: the hint only). Never on the final scene.
 */
export function IdleNudge({ idleMs = 10_000, repeatMs = 15_000 }: { idleMs?: number; repeatMs?: number }) {
  const { started, activeScene } = useStory();
  const [visible, setVisible] = useState(false);
  const last = useRef(Date.now());
  const lastNudge = useRef(0);
  const sceneRef = useRef(activeScene);
  sceneRef.current = activeScene;

  useEffect(() => {
    if (!started) return;
    last.current = Date.now(); // the idle clock starts when the story starts, not on page load
    const reset = () => {
      last.current = Date.now();
      setVisible(false);
    };
    const events = ["wheel", "touchmove", "keydown", "pointerdown"] as const;
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    const timer = window.setInterval(() => {
      const now = Date.now();
      if (sceneRef.current === "s10" || document.visibilityState !== "visible") return setVisible(false);
      if (now - last.current < idleMs || now - lastNudge.current < repeatMs) return;
      lastNudge.current = now;
      setVisible(true);
      if (!prefersReducedMotion()) nudgeScroll(window.innerHeight * 0.3);
      window.setTimeout(() => setVisible(false), 3500);
    }, 1000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      window.clearInterval(timer);
    };
  }, [started, idleMs, repeatMs]);

  return (
    <div className={`idle-nudge ${visible ? "show" : ""}`} aria-live="polite">
      {visible ? "Keep scrolling ↓" : ""}
    </div>
  );
}
