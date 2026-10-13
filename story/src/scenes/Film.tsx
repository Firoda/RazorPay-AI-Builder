import { useEffect, useRef, useState } from "react";
import { ChevronDown, Lock, LockOpen, Play, RotateCcw, SkipForward } from "lucide-react";
import { isMuted, onMuteChange, play, type Cue } from "../../../shared/sound";
import { gsap } from "../engine/scroll";
import { useStory } from "../engine/storyState";
import { Checkout, ChatHeader, ClassCard, Phone, SeatRow, SmsNotification } from "../mockups/Mockups";
import { COPY, DEMO_URL } from "../story.config";
import { RazorpayMark } from "../ui/Brand";
import { LensNotes } from "../ui/Lens";

// Portal 1, short cut: a short film, then "How it works today", then the cliffhanger.
// The viewer sets the pace: each part waits for a scroll (or swipe / arrow key) before moving on.
// The film alternates title cards and Google Flow clips, so every cut explains how the next scene
// connects to the last. Overlays are tied to each part's own clock so they land on the beats in the
// footage (the buzz, the chime, the ping).

type Screen = "film" | "today" | "end";

type PartDef =
  | { kind: "card"; id: "open" | "release" | "night"; dur: number; clock: string }
  | { kind: "clip"; clip: 0 | 1 | 2; dur: number; clock: string };

const CLIPS = ["film/FLOW-01.mp4", "film/FLOW-02.mp4", "film/FLOW-03.mp4"];

const PARTS: PartDef[] = [
  { kind: "card", id: "open", dur: 6, clock: "Sat · 8:55 PM · Bengaluru" },
  { kind: "clip", clip: 0, dur: 8, clock: "Sat · 9:00 PM" },
  { kind: "card", id: "release", dur: 5, clock: "Sat · 9:15 PM" },
  { kind: "clip", clip: 1, dur: 8, clock: "Sat · 9:28 PM" },
  { kind: "card", id: "night", dur: 6, clock: "Sat · 11:00 PM" },
  { kind: "clip", clip: 2, dur: 8, clock: "Sun · 8:00 AM" },
];
/** When the "Scroll to continue" hint appears in each part (seconds into the part). */
const READY_AT = [3.4, 7.9, 3.4, 7.9, 4.2, 7.9];
/** The earliest a scroll moves on, for fast readers: once the part's key line is on screen. */
const ADVANCE_FROM = [2.6, 4.6, 2.8, 4.2, 3.0, 5.4];

/** Sound cues fired once per part when its local time passes `at` (seconds). */
const CUES: [number, Cue][][] = [
  [[1.0, "pop"]],
  [[0.9, "tap"], [2.9, "errorThud"], [4.3, "smsDing"]],
  [[1.0, "countdown"], [1.6, "countdown"], [2.2, "countdown"], [2.6, "unlock"]],
  [[4.0, "booked"]],
  [[0.9, "ding"], [2.6, "buzzWrong"]],
  [[2.1, "ding"], [3.1, "ding2"], [4.2, "buzzWrong"]],
];

/** Who is on screen in each clip: name and role. */
const NAMETAGS: [string, string][] = [
  ["Priya", "the customer"],
  ["Rohan", "another customer"],
  ["Ritu", "owner of Clay & Co., the pottery studio"],
];

/** Full-sentence captions for each clip, switched at moments that match the footage. */
const CLIP_CAPTIONS: [number, string][][] = [
  [
    [0, "Priya taps Pay to book the last seat for ₹2,000."],
    [2.9, "Her phone buzzes. The app says the payment has failed."],
    [4.6, "A moment later, her bank texts her: ₹2,000 has been debited from her account."],
  ],
  [
    [0, "Across the city, Rohan is working late. He sees one seat open up in the same class."],
    [4.2, "He books it. Sunday's class is now full, and Priya's seat belongs to Rohan."],
  ],
  [
    [0, "Sunday, 8 AM. Ritu, the owner of Clay & Co., opens her studio for the day."],
    [2.0, "Her phone fills with worried messages from Priya."],
    [5.4, "Ritu, the studio owner, is holding Priya's ₹2,000, but she has no seat left to give her."],
  ],
];

export function FilmStory() {
  const { started } = useStory();
  const [screen, setScreen] = useState<Screen>("film");
  const [run, setRun] = useState(0); // bump to replay

  return (
    <div className="film-root">
      {screen === "film" && <Film key={run} active={started} onDone={() => setScreen("today")} />}
      {screen === "today" && <Today onNext={() => setScreen("end")} onReplay={() => { setRun((r) => r + 1); setScreen("film"); }} />}
      {screen === "end" && <End />}
    </div>
  );
}

function Film({ active, onDone }: { active: boolean; onDone: () => void }) {
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const [t, setT] = useState(0);
  const fired = useRef(new Set<string>());
  const partStart = useRef(0);
  const part = PARTS[idx];

  // Keep the footage's own audio (the spoken lines) in step with the mute button.
  useEffect(() => {
    const apply = (m: boolean) => vids.current.forEach((v) => v && (v.muted = m));
    apply(isMuted());
    return onMuteChange(apply);
  }, []);

  const next = () => (idx + 1 < PARTS.length ? setIdx(idx + 1) : onDone());
  const prev = () => idx > 0 && setIdx(idx - 1);
  const ready = t >= READY_AT[idx];

  // The viewer moves the story on: scroll / swipe / arrow keys, one step per gesture.
  const stateRef = useRef({ idx, t });
  stateRef.current = { idx, t };
  const nav = useRef({ next, prev });
  nav.current = { next, prev };
  useEffect(() => {
    if (!active) return;
    let lockedUntil = 0;
    const step = (dir: 1 | -1) => {
      const now = performance.now();
      if (now < lockedUntil) return;
      const { idx: i, t: pt } = stateRef.current;
      if (dir === 1 && pt < ADVANCE_FROM[i]) return; // too early: let the key line land first
      lockedUntil = now + 900;
      if (dir === 1) nav.current.next();
      else nav.current.prev();
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 24) return;
      step(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); step(1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); step(-1); }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // Start the current part.
  useEffect(() => {
    if (!active) return;
    setT(0);
    partStart.current = performance.now();
    vids.current.forEach((v, i) => v && !(part.kind === "clip" && part.clip === i) && v.pause());
    // Cues may play again when the viewer steps back into a part.
    fired.current.forEach((k) => k.startsWith(`${idx}:`) && fired.current.delete(k));
    if (part.kind !== "clip") return;
    const v = vids.current[part.clip];
    if (!v) return;
    v.currentTime = 0;
    v.muted = isMuted();
    v.play().catch(() => {
      v.muted = true; // autoplay with sound refused: carry on silently rather than stall
      v.play().catch(() => undefined);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, active]);

  // A 10 Hz clock for the overlays: the video's own time for clips, wall time for cards.
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      const now = part.kind === "clip" ? vids.current[part.clip]?.currentTime ?? 0 : (performance.now() - partStart.current) / 1000;
      setT(now);
      for (const [at, cue] of CUES[idx]) {
        const key = `${idx}:${at}`;
        if (now >= at && !fired.current.has(key)) {
          fired.current.add(key);
          play(cue);
        }
      }
    }, 100);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, active]);

  const clipOn = (clip: number, at: number) => part.kind === "clip" && part.clip === clip && t >= at;
  const cardOn = (id: string, at: number) => part.kind === "card" && part.id === id && t >= at;
  const isCard = (id: string) => part.kind === "card" && part.id === id;
  const checkoutState = t < 1.2 ? "ready" : t < 2.9 ? "processing" : "failed";
  const progress = (idx + Math.min(1, t / part.dur)) / PARTS.length;
  const holdLeft = Math.max(0, 3 - Math.floor(Math.max(0, t - 0.6) / 0.6));
  const caption = part.kind === "clip" ? [...CLIP_CAPTIONS[part.clip]].reverse().find(([at]) => t >= at)?.[1] ?? "" : "";

  return (
    <section className="film" aria-label="The story, as a short film">
      {CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { vids.current[i] = el; }}
          className={`film-video clip-${i} ${part.kind === "clip" && part.clip === i ? "show" : ""}`}
          src={src}
          preload="auto"
          playsInline
          aria-hidden
        />
      ))}
      <div className={`film-night ${part.kind === "card" ? "show" : ""}`} />
      <div className="film-scrim-top" />
      <div className="film-scrim-bottom" />

      <div className="film-progress" aria-hidden><span style={{ width: `${progress * 100}%` }} /></div>
      <div className="film-clock num" key={idx}>🕘 {part.clock}</div>

      {/* Card · the set-up: what Priya wants, and the one seat left */}
      <div className={`film-titlecard ${isCard("open") ? "in" : ""}`}>
        <p className={`tc-line ${cardOn("open", 0.2) ? "in" : ""}`}>It's Saturday night in Bengaluru. All week, Priya has been looking forward to Sunday's 10 AM pottery class at Clay &amp; Co.</p>
        <div className={`tc-visual ${cardOn("open", 1.0) ? "in" : ""}`}>
          <ClassCard {...COPY.s02.card} />
        </div>
        <p className={`tc-line tc-sub ${cardOn("open", 2.6) ? "in" : ""}`}>Only one seat is left, and she is about to book it.</p>
      </div>

      {/* Shot 1 · Priya: the checkout fails, then the bank says debited */}
      <div className={`film-phone left ${part.kind === "clip" && part.clip === 0 && t > 0.4 ? "in" : ""}`}>
        <Phone time="9:00">
          <Checkout merchant={COPY.s04.merchant} item={COPY.s04.item} amount={COPY.s04.amount} state={checkoutState} />
          <div className={`sms-wrap ${clipOn(0, 4.3) ? "in" : ""}`}><SmsNotification from={COPY.s05.sms.from} text={COPY.s05.sms.text} /></div>
        </Phone>
      </div>

      {/* Card · the bridge: her seat hold runs out while the payment is stuck */}
      <div className={`film-titlecard ${isCard("release") ? "in" : ""}`}>
        <p className={`tc-line ${cardOn("release", 0.2) ? "in" : ""}`}>While her payment is stuck, the seat Clay &amp; Co. was holding for Priya runs out of time.</p>
        <div className={`tc-visual ${cardOn("release", 0.6) ? "in" : ""}`}>
          <div className={`tc-hold ${holdLeft === 0 ? "released" : ""}`}>
            {holdLeft > 0 ? <><Lock size={16} /> Seat held for Priya · <span className="num">0:0{holdLeft}</span></> : <><LockOpen size={16} /> Hold expired · seat back on sale</>}
          </div>
        </div>
        <p className={`tc-line tc-sub ${cardOn("release", 2.8) ? "in" : ""}`}>The seat goes back on sale, and anyone can book it now.</p>
      </div>

      {/* Shot 2 · Rohan: the last seat goes */}
      <div className={`film-card right ${part.kind === "clip" && part.clip === 1 && t > 0.6 ? "in" : ""}`}>
        <div className="class-card">
          <div className="class-title">{COPY.s02.card.title}</div>
          <div className="class-when num">{COPY.s02.card.when} · {COPY.s02.card.who}</div>
          <SeatRow className="class-seats" filled={clipOn(1, 4.0) ? 8 : 7} />
          <div className={`film-soldout ${clipOn(1, 4.0) ? "in" : ""}`}>Sold out · Rohan booked the last seat</div>
          <div className={`class-left ${clipOn(1, 4.0) ? "gone" : ""}`}>{COPY.s02.card.left}</div>
        </div>
      </div>

      {/* Card · 11 PM: the bank finally says yes, too late */}
      <div className={`film-titlecard split ${isCard("night") ? "in" : ""}`}>
        {/* Priya's lock screen: the payment goes through, the booking does not */}
        <div className={`tc-phone ${cardOn("night", 0.3) ? "in" : ""}`}>
          <Phone time="11:00" dark>
            <div className="lockscreen">
              <div className="ls-clock num">11:00</div>
              <div className="ls-date">Saturday, 10 October</div>
              <div className={`ls-notif ok ${cardOn("night", 0.9) ? "in" : ""}`}>
                <span className="ls-icon">✓</span>
                <div>
                  <div className="ls-app">Payments · now</div>
                  <div className="ls-title">Payment successful</div>
                  <div className="ls-text">₹2,000 paid to Clay &amp; Co. for Wheel Basics, Sunday 10 AM.</div>
                </div>
              </div>
              <div className={`ls-notif bad ${cardOn("night", 2.6) ? "in" : ""}`}>
                <span className="ls-icon">C</span>
                <div>
                  <div className="ls-app">Clay &amp; Co. · now</div>
                  <div className="ls-title">Booking not confirmed</div>
                  <div className="ls-text">Sorry, Sunday's 10 AM class is now full. We could not confirm your seat.</div>
                </div>
              </div>
            </div>
          </Phone>
        </div>
        <div className="tc-text">
          <p className={`tc-line ${cardOn("night", 0.2) ? "in" : ""}`}>At 11 PM, two hours late, Priya's bank finally confirms her payment.</p>
          <p className={`tc-line tc-sub ${cardOn("night", 1.4) ? "in" : ""}`}>Priya is told that her payment of ₹2,000 to Clay &amp; Co. was successful.</p>
          <p className={`tc-line tc-sub ${cardOn("night", 3.0) ? "in" : ""}`}>But her booking was never confirmed: the seat she paid for has already been sold. Razorpay is now holding her money for Clay &amp; Co., with no seat to show for it.</p>
        </div>
      </div>

      {/* Shot 3 · Ritu: Priya's messages, and a full class */}
      <div className={`film-phone right sm ${part.kind === "clip" && part.clip === 2 && t > 1.6 ? "in" : ""}`}>
        <Phone time="8:00">
          <div className="chat">
            <ChatHeader name="Priya" />
            <div className="chat-body">
              <div className={`bubble ${clipOn(2, 2.1) ? "in" : ""}`}>{COPY.s08.bubbles[0]}</div>
              <div className={`bubble ${clipOn(2, 3.1) ? "in" : ""}`}>I can only do Sunday mornings, and I really want Arjun sir 🙏</div>
            </div>
          </div>
        </Phone>
        <div className={`film-full ${clipOn(2, 4.2) ? "in" : ""}`}><SeatRow filled={8} /> <b className="num">Sun 10 AM · 8/8 FULL</b></div>
      </div>

      {/* Name tags: who is who, the first time each person is on screen */}
      {part.kind === "clip" && (
        <div className={`film-nametag ${t > 0.5 && t < 6.5 ? "in" : ""} tag-${part.clip}`} key={`tag-${part.clip}`}>
          <b>{NAMETAGS[part.clip][0]}</b><span>{NAMETAGS[part.clip][1]}</span>
        </div>
      )}

      {caption && <p className="film-caption" key={caption}>{caption}</p>}

      <button className={`film-hint ${ready ? "in" : ""}`} onClick={next} tabIndex={ready ? 0 : -1} aria-hidden={!ready}>
        <span>{idx === PARTS.length - 1 ? "Scroll to see what Ritu can do" : "Scroll to continue"}</span>
        <ChevronDown size={18} className="film-hint-arrow" />
      </button>

      <div className="film-controls">
        <button className="chrome-btn" onClick={onDone}><SkipForward size={15} /> Skip film</button>
      </div>
      <div className="film-credit">Film generated with Google Flow (Veo) · characters are fictional</div>
      <LensNotes anchor="s05" />
    </section>
  );
}

function Today({ onNext, onReplay }: { onNext: () => void; onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const T = COPY.s09.today;

  useEffect(() => {
    const q = gsap.utils.selector(ref);
    const tl = gsap.timeline()
      .fromTo(q(".today-card"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" })
      .fromTo(q(".today-option"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.35 }, 0.5)
      .call(() => play("buzzWrong"), [], 0.55)
      .call(() => play("buzzWrong"), [], 0.9)
      .fromTo(q(".today-line"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.3)
      .fromTo(q(".today-next"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 1.7);
    let remaining = (2 * 24 + 13) * 3600 + 58 * 60;
    const id = window.setInterval(() => {
      remaining -= 1;
      const d = Math.floor(remaining / 86400), h = Math.floor((remaining % 86400) / 3600), m = Math.floor((remaining % 3600) / 60), s = remaining % 60;
      if (countRef.current) countRef.current.textContent = `${d}d ${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
    }, 1000);
    // Same pacing as the film: scroll, swipe or arrow keys move on once the card has landed.
    const shownAt = performance.now();
    const go = () => performance.now() - shownAt > 1800 && onNext();
    const onKey = (e: KeyboardEvent) => ["Enter", "ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key) && go();
    const onWheel = (e: WheelEvent) => e.deltaY > 24 && go();
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => touchY - e.changedTouches[0].clientY > 40 && go();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      tl.kill();
      window.clearInterval(id);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onNext]);

  return (
    <section className="film-screen today-screen" ref={ref}>
      <div className="today-card">
        <div className="today-head">
          <RazorpayMark tone="dark" />
          <span className="today-kicker">{T.kicker}</span>
        </div>
        <div className="today-status"><span className="dot-held" />{T.status}<span className="today-amount num">{T.amount}</span></div>
        <div className="today-timer">
          <div className="today-timer-label">{T.timerLabel}</div>
          <div className="today-count num" ref={countRef}>2d 13h 58m 00s</div>
        </div>
        <div className="today-options-title">{T.optionsTitle}</div>
        {T.options.map((o) => (
          <div key={o.act} className="today-option">
            <span className="today-x" aria-hidden>✕</span>
            <span><strong>{o.act}</strong> · {o.result}</span>
          </div>
        ))}
        <div className="today-note">{T.note}</div>
      </div>
      <p className="story-h2 today-line">Either way, Ritu, the studio owner, loses a customer, and Priya loses the class she was looking forward to.</p>
      <div className="today-next">
        <button className="film-next" onClick={onNext} autoFocus>Continue <ChevronDown size={16} /></button>
        <button className="film-replay" onClick={onReplay}><RotateCcw size={14} /> Replay film</button>
      </div>
      <LensNotes anchor="s09" />
    </section>
  );
}

function End() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const q = gsap.utils.selector(ref);
    const tl = gsap.timeline();
    q(".s10-line").forEach((l, i) => {
      tl.fromTo(l, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, i * 0.4);
      tl.call(() => play("heartbeat"), [], i * 0.4);
    });
    tl.to(q(".s10-line"), { autoAlpha: 0.3, duration: 0.4 }, 2.1);
    tl.fromTo(q(".s10-question"), { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" }, 2.3);
    tl.fromTo(q(".s10-cta"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.9);
    tl.call(() => play("rising"), [], 2.9);
    return () => { tl.kill(); };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const veil = document.createElement("div");
    veil.className = "veil";
    veil.style.setProperty("--x", `${r.left + r.width / 2}px`);
    veil.style.setProperty("--y", `${r.top + r.height / 2}px`);
    document.body.appendChild(veil);
    play("whoosh");
    gsap.fromTo(veil, { clipPath: "circle(0px at var(--x) var(--y))" }, {
      clipPath: "circle(150vmax at var(--x) var(--y))", duration: 0.7, ease: "power2.in",
      onComplete: () => window.location.assign(DEMO_URL),
    });
  };

  return (
    <section className="film-screen s10 ink" ref={ref}>
      <div className="s10-stack">
        {COPY.s10.lines.map((l) => <p key={l} className="s10-line">{l}</p>)}
      </div>
      <h2 className="s10-question">{COPY.s10.question}</h2>
      <a href={DEMO_URL} className="s10-cta" onClick={go}><Play size={16} /> {COPY.s10.cta}</a>
    </section>
  );
}
