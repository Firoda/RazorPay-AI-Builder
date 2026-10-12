import { useEffect, useRef } from "react";
import { play } from "../../../shared/sound";
import { gsap } from "../engine/scroll";
import { useStory } from "../engine/storyState";
import { useScene } from "../engine/useScene";
import { Checkout, ClassCard, Phone, SmsNotification } from "../mockups/Mockups";
import { COPY } from "../story.config";
import { LensNotes } from "../ui/Lens";
import { Picture } from "../ui/Picture";

const lines = (q: (s: string) => Element[], sel: string, at = 0, stagger = 0.7) =>
  gsap.fromTo(q(sel), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger, delay: at });

/* ── Scene 1 · Meet Priya ─────────────────────────────────────────── */
export function Scene01() {
  const ref = useRef<HTMLElement>(null);
  const { started } = useStory();
  useScene(ref, {
    id: "s01",
    scrub: (tl, q) => {
      tl.fromTo(q(".s01-img"), { scale: 1 }, { scale: 1.15, duration: 1 }, 0);
      tl.to(q(".s01-copy"), { autoAlpha: 0, y: -24, duration: 0.25 }, 0.72);
    },
  });
  // Opening beats play in real time once the viewer taps "begin".
  useEffect(() => {
    if (!started || !ref.current) return;
    const q = gsap.utils.selector(ref.current);
    const tl = gsap.timeline();
    tl.fromTo(q(".s01-wrap"), { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.1)
      .fromTo(q(".s01-line"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.8, ease: "power2.out" }, 1.2)
      .fromTo(q(".scroll-hint"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 2.6);
    return () => {
      tl.kill();
    };
  }, [started]);
  return (
    <section ref={ref} className="scene s01" id="s01">
      <div className="s01-wrap fill">
        <Picture id="P1-01" alt="Priya on her sofa at night, smiling at her phone" className="s01-img fill" priority sizes="100vw" />
        <div className="scrim scrim-left" />
      </div>
      <div className="s01-copy copy copy-lower-left">
        <h1 className="story-h s01-line">{COPY.s01.a}</h1>
        <p className="story-p s01-line">{COPY.s01.b}</p>
      </div>
      <div className="scroll-hint" aria-hidden>Scroll ↓</div>
    </section>
  );
}

/* ── Scene 2 · The class ──────────────────────────────────────────── */
export function Scene02() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s02",
    scrub: (tl, q) => {
      tl.fromTo(q(".s02-img"), { rotate: 0, scale: 1.08 }, { rotate: 6, scale: 1.12, duration: 1 }, 0);
    },
    beats: [
      {
        at: 0.06,
        build: (q) =>
          gsap
            .timeline()
            .fromTo(q(".class-card"), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" })
            .fromTo(q(".class-seats .seat-filled"), { opacity: 0.15 }, { opacity: 1, duration: 0.2, stagger: 0.08 }, 0.4)
            .set(q(".class-seats .seat-free"), { attr: { "data-glow": "1" } }, 1.1)
            .call(() => play("pop"), [], 1.1)
            .fromTo(q(".class-avatar"), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(2)" }, 0.5)
            .add(lines(q, ".s02-line"), 1.4),
      },
    ],
  });
  return (
    <section ref={ref} className="scene s02" id="s02">
      <div className="fill overflow-hidden">
        <Picture id="P1-02" alt="Clay spinning on a pottery wheel" className="s02-img fill" />
        <div className="scrim scrim-bottom" />
      </div>
      <div className="s02-card-wrap">
        <ClassCard {...COPY.s02.card} />
      </div>
      <div className="copy copy-lower-left">
        <p className="story-h2 s02-line">{COPY.s02.line}</p>
      </div>
    </section>
  );
}

/* ── Scene 3 · Meet Ritu ──────────────────────────────────────────── */
export function Scene03() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s03",
    scrub: (tl, q) => {
      tl.fromTo(q(".s03-img"), { yPercent: 0 }, { yPercent: -6, duration: 1 }, 0);
      tl.fromTo(q(".s03-copy"), { y: 30 }, { y: -30, duration: 1 }, 0);
    },
    beats: [
      {
        at: 0.1,
        build: (q) =>
          gsap
            .timeline()
            .call(() => play("hum"))
            .add(lines(q, ".s03-line"), 0)
            .fromTo(q(".s03-badge"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.3),
      },
    ],
  });
  return (
    <section ref={ref} className="scene s03" id="s03">
      <div className="fill overflow-hidden">
        <Picture id="P1-03" alt="Ritu behind the counter of her pottery studio" className="s03-img tall" />
        <div className="scrim scrim-right" />
      </div>
      <div className="s03-copy copy copy-right">
        <h2 className="story-h s03-line">{COPY.s03.a}</h2>
        <p className="story-p s03-line">{COPY.s03.b}</p>
        <span className="s03-badge pill-badge">8 wheels · 8 seats per class</span>
      </div>
      <LensNotes anchor="s03" />
    </section>
  );
}

/* ── Scene 4 · She pays. And waits. ───────────────────────────────── */
export function Scene04() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s04",
    clockAt: [
      { at: 0.35, clock: "Sat · 9:01 PM" },
      { at: 0.6, clock: "Sat · 9:05 PM" },
      { at: 0.85, clock: "Sat · 9:09 PM" },
    ],
    scrub: (tl, q) => {
      tl.fromTo(q(".s04-bg"), { scale: 1.08 }, { scale: 1, duration: 1 }, 0);
    },
    beats: [
      {
        at: 0.05,
        build: (q) =>
          gsap
            .timeline()
            .fromTo(q(".s04-phone"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
            .fromTo(q(".s04-phone .tap-ripple"), { scale: 0, autoAlpha: 0.6 }, { scale: 3, autoAlpha: 0, duration: 0.4 }, 1.0)
            .call(() => play("tap"), [], 1.0)
            .set(q(".s04-phone .checkout"), { attr: { "data-state": "processing" } }, 1.3),
      },
      { at: 0.45, build: (q) => gsap.timeline().add(lines(q, ".s04-line")) },
    ],
  });
  return (
    <section ref={ref} className="scene s04 split" id="s04">
      <div className="fill overflow-hidden">
        <Picture id="P1-04" alt="Priya's hands holding her phone" className="s04-bg fill dim" />
      </div>
      <div className="split-left center">
        <Phone className="s04-phone" time="9:00">
          <Checkout merchant={COPY.s04.merchant} item={COPY.s04.item} amount={COPY.s04.amount} />
        </Phone>
      </div>
      <div className="split-right copy">
        <p className="story-h2 s04-line">{COPY.s04.line}</p>
        <p className="illustration-note s04-line">Illustration</p>
      </div>
    </section>
  );
}

/* ── Scene 5 · Failed, says the app. Debited, says her bank. ──────── */
export function Scene05() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, {
    id: "s05",
    beats: [
      {
        at: 0.08,
        build: (q) =>
          gsap
            .timeline()
            .set(q(".s05-phone .checkout"), { attr: { "data-state": "failed" } }, 0.02)
            .fromTo(q(".s05-phone"), { x: 0 }, { keyframes: { x: [0, -10, 10, -8, 8, -4, 0] }, duration: 0.4, ease: "none" }, 0)
            .call(() => play("errorThud"), [], 0)
            .fromTo(q(".s05-face"), { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" }, 0.2)
            .fromTo(q(".s05-phone .sms"), { y: -130, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: "back.out(1.6)" }, 1.4)
            .call(() => play("smsDing"), [], 1.4)
            .fromTo(q(".hl"), { textShadow: "0 0 0px rgba(0,0,0,0)" }, { textShadow: "0 0 14px currentColor", duration: 0.4, yoyo: true, repeat: 1 }, 2.0)
            .add(lines(q, ".s05-line"), 2.4),
      },
    ],
  });
  return (
    <section ref={ref} className="scene s05 split" id="s05">
      <div className="split-left center">
        <Phone className="s05-phone" time="9:10">
          <Checkout merchant={COPY.s04.merchant} item={COPY.s04.item} amount={COPY.s04.amount} state="processing" />
          <div className="sms-wrap">
            <SmsNotification
              from={COPY.s05.sms.from}
              text={COPY.s05.sms.text}
            />
          </div>
        </Phone>
      </div>
      <div className="split-right">
        <div className="s05-face-wrap">
          <Picture id="P1-05" alt="Priya looking worried at her phone" className="s05-face fill rounded" />
        </div>
        <div className="copy">
          <p className="story-h2 s05-line">
            <span className="hl hl-red">Failed</span>, says the app. <span className="hl hl-green">Debited</span>, says her bank.
          </p>
        </div>
      </div>
      <LensNotes anchor="s05" />
    </section>
  );
}
