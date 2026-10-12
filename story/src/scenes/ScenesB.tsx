import { useRef } from "react";
import { play } from "../../../shared/sound";
import { gsap } from "../engine/scroll";
import { useScene } from "../engine/useScene";
import { BookingLaptop, ChatHeader, LockNotification, Phone, TypingDots, Vault } from "../mockups/Mockups";
import { COPY, DEMO_URL } from "../story.config";
import { LensNotes } from "../ui/Lens";
import { Picture } from "../ui/Picture";

const lines = (q: (s: string) => Element[], sel: string, stagger = 0.7) =>
  gsap.fromTo(q(sel), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger });

/* ── Scene 6a · Meanwhile… ────────────────────────────────────────── */
export function Scene06a() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s06a",
    scrub: (tl, q) => {
      tl.to(q(".s06a-word"), { xPercent: -140, autoAlpha: 0, duration: 0.35, ease: "power1.in" }, 0.65);
    },
    beats: [
      { at: 0.02, build: (q) => gsap.timeline().fromTo(q(".s06a-word"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }) },
      { at: 0.68, build: () => gsap.timeline().call(() => play("whoosh")) },
    ],
  });
  return (
    <section ref={ref} className="scene s06a ink" id="s06a">
      <div className="s06a-word">{COPY.s06a.word}</div>
    </section>
  );
}

/* ── Scene 6b · Rohan ─────────────────────────────────────────────── */
export function Scene06b() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s06b",
    scrub: (tl, q) => {
      // Priya's seat hold drains 0:59 → 0:00 between 25% and 52% of the scene.
      const timer = q(".hold-timer")[0] as HTMLElement | undefined;
      const counter = { v: 59 };
      tl.fromTo(counter, { v: 59 }, {
        v: 0, duration: 0.27,
        onUpdate: () => { if (timer) timer.textContent = `0:${String(Math.round(counter.v)).padStart(2, "0")}`; },
      }, 0.25);
      tl.fromTo(q(".s06b-img"), { scale: 1.06 }, { scale: 1, duration: 1 }, 0);
    },
    beats: [
      { at: 0.04, build: (q) => gsap.timeline().add(lines(q, ".s06b-l1")) },
      { at: 0.22, build: (q) => gsap.timeline().add(lines(q, ".s06b-l2")) },
      {
        at: 0.53,
        build: (q) =>
          gsap.timeline()
            .set(q(".booking"), { attr: { "data-state": "available" } }, 0.02)
            .set(q(".booking-seats .seat-free"), { attr: { "data-glow": "1" } }, 0.02)
            .call(() => play("unlock"), [], 0.02),
      },
      {
        at: 0.66,
        build: (q) =>
          gsap.timeline()
            .add(lines(q, ".s06b-l3"))
            .fromTo(q(".booking-cursor"), { autoAlpha: 0, x: 90, y: 60 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: "power2.inOut" }, 0.2)
            .fromTo(q(".booking-btn"), { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, 0.95)
            .set(q(".booking"), { attr: { "data-state": "booked" } }, 1.1)
            .set(q(".booking-seats .seat-free"), { attr: { "data-glow": "0", "data-taken": "1" } }, 1.1)
            .call(() => play("booked"), [], 1.1)
            .fromTo(q(".s06b-count-before"), { autoAlpha: 1, yPercent: 0 }, { autoAlpha: 0, yPercent: -100, duration: 0.3 }, 1.2)
            .fromTo(q(".s06b-count-after"), { autoAlpha: 0, yPercent: 100 }, { autoAlpha: 1, yPercent: 0, duration: 0.3 }, 1.2),
      },
      { at: 0.86, build: (q) => gsap.timeline().add(lines(q, ".s06b-close")) },
    ],
  });
  return (
    <section ref={ref} className="scene s06b split" id="s06b">
      <div className="split-left s06b-left">
        <div className="s06b-photo">
          <Picture id="P1-06" alt="Rohan at his office desk late at night, booking on his laptop" className="s06b-img fill rounded" />
        </div>
        <div className="s06b-laptop">
          <BookingLaptop />
        </div>
      </div>
      <div className="split-right copy s06b-copy">
        <p className="story-p s06b-l1">{COPY.s06b.lines[0]}</p>
        <p className="story-p s06b-l2">{COPY.s06b.lines[1]}</p>
        <p className="story-p s06b-l3">{COPY.s06b.lines[2]}</p>
        <div className="s06b-count" aria-live="polite">
          <span className="s06b-count-before num">7 / 8 seats</span>
          <span className="s06b-count-after num">8 / 8 · FULL</span>
        </div>
        <p className="story-h2 s06b-close">{COPY.s06b.close}</p>
      </div>
      <LensNotes anchor="s06b" />
    </section>
  );
}

/* ── Scene 7 · 11 PM ──────────────────────────────────────────────── */
export function Scene07() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s07",
    beats: [
      {
        at: 0.04,
        build: (q) =>
          gsap.timeline()
            .fromTo(q(".s07-img"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power1.out" })
            .fromTo(q(".lock-notif"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.0)
            .call(() => play("faint"), [], 1.0)
            .fromTo(q(".lock-notif"), { boxShadow: "0 0 0px rgba(255,214,150,0)" }, { boxShadow: "0 0 36px rgba(255,214,150,.55)", duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.6)
            .add(lines(q, ".s07-line", 0.8), 1.6),
      },
    ],
  });
  return (
    <section ref={ref} className="scene s07" id="s07">
      <div className="fill overflow-hidden">
        <Picture id="P1-07" alt="The pottery studio at night, a phone glowing on the counter" className="s07-img fill" />
        <div className="scrim scrim-bottom" />
      </div>
      <div className="s07-notif"><LockNotification text={COPY.s07.notif} /></div>
      <div className="copy copy-lower-left">
        <h2 className="story-h s07-line">{COPY.s07.a}</h2>
        <p className="story-p s07-line">{COPY.s07.b}</p>
      </div>
    </section>
  );
}

/* ── Scene 8 · Sunday, 8:00 AM ────────────────────────────────────── */
export function Scene08() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s08",
    scrub: (tl, q) => {
      tl.fromTo(q(".s08-photo"), { filter: "brightness(0.7) saturate(0.8)" }, { filter: "brightness(1) saturate(1)", duration: 0.4 }, 0);
    },
    beats: [
      {
        at: 0.06,
        build: (q) => {
          const tl = gsap.timeline();
          tl.fromTo(q(".s08-phone"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
          tl.call(() => play("ding"), [], 0.4);
          const cues = ["ding", "ding2", "ding3"] as const;
          q(".bubble").forEach((b, i) => {
            const t = 0.8 + i * 1.8;
            tl.fromTo(q(".typing")[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, t);
            tl.to(q(".typing")[0], { autoAlpha: 0, duration: 0.1 }, t + 1.2);
            tl.fromTo(b, { autoAlpha: 0, y: 10, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, t + 1.25);
            tl.call(() => play(cues[i]), [], t + 1.25);
          });
          tl.fromTo(q(".s08-worried"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 6.4);
          tl.add(lines(q, ".s08-line"), 6.6);
          return tl;
        },
      },
    ],
  });
  return (
    <section ref={ref} className="scene s08 split" id="s08">
      <div className="split-left s08-photo-wrap">
        <div className="s08-photo fill">
          <Picture id="P1-08" alt="Ritu opening her studio in the morning, reading her phone" className="fill rounded" />
          <div className="s08-worried fill"><Picture id="P1-08b" alt="Ritu looking worried at her phone" className="fill rounded" /></div>
        </div>
      </div>
      <div className="split-right center s08-right">
        <Phone className="s08-phone" time="8:00">
          <div className="chat">
            <ChatHeader name="Priya" />
            <div className="chat-body">
              {COPY.s08.bubbles.map((b) => <div key={b} className="bubble">{b}</div>)}
              <TypingDots />
            </div>
          </div>
        </Phone>
        <p className="story-h2 s08-line">{COPY.s08.line}</p>
      </div>
      <LensNotes anchor="s08" />
    </section>
  );
}

/* ── Scene 9 · The clock ──────────────────────────────────────────── */
export function Scene09() {
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useScene(ref, {
    id: "s09",
    onActive: (active) => {
      window.clearInterval(timer.current);
      if (!active || !ref.current) return;
      const el = ref.current.querySelector("[data-countdown]");
      let remaining = (2 * 24 + 13) * 3600 + 58 * 60; // 2d 13h 58m
      let n = 0;
      timer.current = window.setInterval(() => {
        remaining -= 1;
        const d = Math.floor(remaining / 86400), h = Math.floor((remaining % 86400) / 3600), m = Math.floor((remaining % 3600) / 60), s = remaining % 60;
        if (el) el.textContent = `${d}d ${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
        if (++n % 2 === 0) play("countdown");
      }, 1000);
    },
    scrub: (tl, q) => {
      tl.fromTo(q(".s09-bg"), { yPercent: 0 }, { yPercent: -5, duration: 1 }, 0);
    },
    beats: [
      {
        at: 0.06,
        build: (q) =>
          gsap.timeline()
            .fromTo(q(".vault"), { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" })
            .fromTo(q(".thought"), { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.25, stagger: 0.4, ease: "back.out(2)" }, 0.7)
            .call(() => play("pop"), [], 0.7)
            .call(() => play("pop"), [], 1.1)
            .call(() => play("pop"), [], 1.5)
            .add(lines(q, ".s09-line"), 2.0),
      },
    ],
  });
  return (
    <section ref={ref} className="scene s09" id="s09">
      <div className="fill overflow-hidden">
        <Picture id="P1-09" alt="Students arriving at the studio on Sunday morning" className="s09-bg tall blur" />
        <div className="scrim scrim-even" />
      </div>
      <div className="s09-stage">
        <Vault />
        {COPY.s09.bubbles.map((b, i) => (
          <span key={b} className={`thought thought-${i}`}>{b}</span>
        ))}
      </div>
      <div className="copy copy-lower-center">
        <p className="story-h2 s09-line">{COPY.s09.line}</p>
      </div>
      <LensNotes anchor="s09" />
    </section>
  );
}

/* ── Scene 10 · The cliffhanger ───────────────────────────────────── */
export function Scene10() {
  const ref = useRef<HTMLElement>(null);
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const veil = document.createElement("div");
    veil.className = "veil";
    veil.style.setProperty("--x", `${r.left + r.width / 2}px`);
    veil.style.setProperty("--y", `${r.top + r.height / 2}px`);
    document.body.appendChild(veil);
    play("whoosh");
    gsap.fromTo(veil, { clipPath: `circle(0px at var(--x) var(--y))` }, {
      clipPath: `circle(150vmax at var(--x) var(--y))`, duration: 0.7, ease: "power2.in",
      onComplete: () => window.location.assign(DEMO_URL),
    });
  };
  useScene(ref, {
    id: "s10",
    beats: [
      {
        at: 0.04,
        build: (q) => {
          const tl = gsap.timeline();
          q(".s10-line").forEach((l, i) => {
            tl.fromTo(l, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, i * 0.7);
            tl.call(() => play("heartbeat"), [], i * 0.7);
          });
          tl.to(q(".s10-line"), { autoAlpha: 0.3, duration: 0.6 }, 4 * 0.7 + 1.2);
          tl.fromTo(q(".s10-question"), { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 4 * 0.7 + 1.8);
          tl.fromTo(q(".s10-cta"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 4 * 0.7 + 2.6);
          tl.call(() => play("rising"), [], 4 * 0.7 + 2.6);
          return tl;
        },
      },
    ],
  });
  return (
    <section ref={ref} className="scene s10 ink" id="s10">
      <div className="s10-stack">
        {COPY.s10.lines.map((l) => <p key={l} className="s10-line">{l}</p>)}
      </div>
      <h2 className="s10-question">{COPY.s10.question}</h2>
      <a href={DEMO_URL} className="s10-cta" onClick={go}>{COPY.s10.cta}</a>
    </section>
  );
}
