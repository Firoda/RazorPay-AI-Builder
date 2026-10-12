# SeatSaver: Technical Implementation Plan (Portals 1 and 2)

This is the engineering plan for `storyboard.md`. The storyboard defines *what the viewer experiences*; this document defines *how it's built*. Where they differ, the storyboard is the reference for feel, and this document is the reference for mechanics.

Version 1 · 12 Oct 2026

---

## Contents

1. [Research summary: how great scroll stories are built](#1-research-summary-how-great-scroll-stories-are-built)
2. [Architecture overview](#2-architecture-overview)
3. [Repository layout](#3-repository-layout)
4. [Technology choices](#4-technology-choices)
5. [Portal 1 (new): the story site](#5-portal-1-new-the-story-site)
6. [Portal 2 (reuse + upgrade): the guided product](#6-portal-2-reuse--upgrade-the-guided-product)
7. [Backend changes](#7-backend-changes)
8. [Shared systems: sound, judge lens, assets](#8-shared-systems-sound-judge-lens-assets)
9. [Performance, accessibility, mobile](#9-performance-accessibility-mobile)
10. [Build, run, deploy](#10-build-run-deploy)
11. [Testing and QA](#11-testing-and-qa)
12. [Build order, estimates and cut list](#12-build-order-estimates-and-cut-list)
13. [Risks and mitigations](#13-risks-and-mitigations)
14. [Storyboard corrections from this research](#14-storyboard-corrections-from-this-research)
15. [Sources](#15-sources)

---

## 1. Research summary: how great scroll stories are built

I reviewed 2026 roundups of scrollytelling sites (27 examples with performance reviews from scrollytelling.ai, plus other curated lists), library documentation, and comparisons. Takeaways that shape this plan:

| Finding | Evidence | What we do |
|---|---|---|
| **GSAP + ScrollTrigger is the standard** for pinned, scrubbed story scenes. GSAP and all its former paid plugins (SplitText, MorphSVG…) became **free, including commercial use**, in 2025 | Webflow announcement; GSAP 3.13 release notes; current version 3.15.0 | Portal 1 uses GSAP + ScrollTrigger + SplitText |
| **Lenis is the standard smooth-scroll layer**, driven from GSAP's ticker with `ScrollTrigger.update` on each Lenis scroll; the old `@studio-freight` packages are retired; touch devices are usually left on native scroll | Lenis README; 2026 integration notes; current version 1.3.26 (MIT) | Lenis on desktop only; native scroll on touch and under reduced motion |
| **Motion (formerly Framer Motion)** is excellent for React state and micro-interactions, but pinning has to be hand-rolled. The common advice is GSAP for the scroll layer, Motion for React components, and **never both on the same DOM node** | Motion vs GSAP comparisons (2026) | Portal 1 = GSAP; Portal 2 = Motion. No mixing on the same nodes |
| **The best-performing story sites animate cheap things** (CSS/SVG transforms and opacity, typography) rather than scrubbing video. Video and WebGL-heavy sites scored worst (blocking times of 15–21 s) | scrollytelling.ai review: Adidas report (score 94), Maglr (91) vs BMW and Lunarwheel (36–39) | No video, no WebGL. Photos + HTML/CSS phone mockups + SVG |
| **Pin the text, move the image**: holding text still while imagery moves reads as deliberate pacing | Inversa, Petralithe, UCL examples | Copy pinned in a fixed column/lower third; images parallax/zoom |
| **Reserve space for everything that moves.** Most layout-shift failures came from media without fixed dimensions | Repeated in the reviews | Every image and mockup has fixed `aspect-ratio` boxes |
| **Front-load the hero, lazy-load the rest**; modern image formats (AVIF/WebP) | Reviews' LCP findings | An AVIF/WebP pipeline, a preloaded hero, the next scene pre-fetched |
| **Mobile needs a lighter version**, plus progress/chapter navigation for long pieces | Reviews | Shorter pins, stacked splits, a progress line, chapter dots |
| **Native CSS scroll-driven animations** work in Chromium and Safari 26+, but Firefox support is uncertain | caniuse / WebKit / MDN | Not relied on; GSAP covers all browsers |
| **Product tours:** driver.js (MIT, ~5 KB, framework-agnostic, current 1.9.0) and React Joyride (MIT, larger) are the low-risk choices; Shepherd's licence is disputed | 2026 tour-library comparisons (vendor-written, so treated with caution) | **driver.js** for spotlight + popover, with our own React content and ghost cursor |
| **Audio unlocks only on click, tap or key press, *not* on scroll or wheel.** Once unlocked, it stays unlocked for that page | MDN transient/sticky activation; Chromium autoplay policy | Portal 1 opens with **"Tap to begin"**; Portal 2 opens with a **"Start"** tap (§14) |
| **Restraint wins**: poorly executed motion hurts engagement; give the viewer agency | Nielsen Norman Group via roundups | Short animations, no scroll-jacking beyond pins, skip and mute everywhere |

---

## 2. Architecture overview

```
                         one Node process (Cloud Run / AI Studio)
┌──────────────────────────────────────────────────────────────────────────────┐
│  server.ts (Express)                                                          │
│   ├── /                → Portal 1 static build   (story/dist)                 │
│   ├── /app/            → Portal 2 static build   (web/dist, base "/app/")     │
│   ├── /api/*           → SeatSaver API  (per-visitor sandbox, §7.1)           │
│   ├── /api/live/:case  → Live AI panel stream (Server-Sent Events, §7.3)      │
│   ├── /webhooks/razorpay                                                       │
│   └── /pay-test        → real test payment page (operator tool + bonus)       │
│                                                                                │
│  Engine (unchanged core) ── Gemini (gemini-3.8-flash) ── Razorpay test API    │
└──────────────────────────────────────────────────────────────────────────────┘

Viewer journey:  /  (scroll story) ──"Let's find out →"──▶ /app/#/welcome ──▶ guided tour ──▶ free explore
```

- **Two separately built front ends** in two folders, served by **one server on one URL** (one deploy, one domain, no CORS).
- Portal 1 is **static** (it calls no API) apart from an optional health ping that pre-warms the server.
- Portal 2 is the existing React console, upgraded with a tour layer and animations, talking to the existing API.

---

## 3. Repository layout

The owner's constraint is **"one portal in one folder, everything else separate"**. One `package.json` is kept, because AI Studio's importer handles a single package well; each portal gets its own folder, Vite config and tsconfig.

```
RazorPay-AI-Builder/
├─ story/                         ← PORTAL 1 (new, self-contained)
│  ├─ index.html
│  ├─ vite.config.ts              (root: story, base: "/", outDir: story/dist)
│  ├─ tsconfig.json
│  ├─ public/
│  │  ├─ img/                     (optimised AVIF/WebP outputs, generated)
│  │  └─ audio/sprite.(webm|mp3)  (sound sprite, §8.1)
│  ├─ assets-src/                 (original PNGs from OpenAI; not served)
│  └─ src/
│     ├─ main.tsx, App.tsx
│     ├─ story.config.ts          (every scene's copy, timings, images: the storyboard as data)
│     ├─ engine/                  (Lenis + GSAP setup, scene registry, clock pill, progress)
│     ├─ scenes/                  (Scene01Hero.tsx … Scene10Cliffhanger.tsx)
│     ├─ mockups/                 (Phone, Laptop, Sms, ChatBubble, Checkout, SeatRow, Vault)
│     ├─ ui/                      (ClockPill, ProgressLine, MuteToggle, JudgeLens, IntroGate)
│     └─ styles/                  (tokens.css, story.css)
│
├─ web/                           ← PORTAL 2 (existing console, upgraded)
│  ├─ vite.config.ts              (base changes to "/app/")
│  └─ src/
│     ├─ (existing pages, components, lib)
│     ├─ tour/                    (new: TourProvider, steps.ts, MissionBar, GhostCursor, ResumePill)
│     ├─ live/                    (new: LiveAiPanel, useLiveFeed)
│     ├─ fx/                      (new: FlyingChips, RuleRace, OfferFlight, PadlockVault, OnceStamp, Confetti)
│     ├─ pages/WelcomePage.tsx    (new: setup screen)
│     └─ pages/NotActPage.tsx     (new: bonus chapter)
│
├─ shared/                        ← used by both portals (pure TS/CSS, no framework lock-in)
│  ├─ sound.ts                    (howler wrapper, sprite map, mute persistence)
│  ├─ judgeLens.ts                (annotation data + persisted toggle)
│  └─ tokens.css                  (brand tokens: clay palette + product palette)
│
├─ server/  server.ts  fixtures/  tests/  eval/   ← backend (existing; changes in §7)
├─ scripts/
│  ├─ ensure-build.mjs            (builds both portals if missing)
│  └─ optimize-images.mjs         (new: sharp → AVIF/WebP at 3 widths)
├─ storyboard.md  technical_implementation.md  backend.md  frontend.md
└─ package.json  (scripts build both; §10)
```

---

## 4. Technology choices

| Concern | Choice | Version (checked 12 Oct) | Licence | Why |
|---|---|---|---|---|
| Framework (both portals) | React 19 + Vite + TypeScript | existing | MIT | Already in use; component mockups |
| Portal 1 scroll choreography | **GSAP + ScrollTrigger** (+ `@gsap/react` `useGSAP`) | gsap 3.15.0, @gsap/react 2.1.2 | GSAP Standard "no charge" licence (commercial OK) | Best-in-class pinning/scrubbing; free |
| Portal 1 text reveals | **GSAP SplitText** | in gsap | same | Line/word reveals with masks |
| Portal 1 smooth scroll | **Lenis** (desktop only) | 1.3.26 | MIT | The standard; synced to the GSAP ticker |
| Portal 2 micro-interactions | **Motion** (`motion/react`) | 14.1.0 | MIT | Declarative React animations, shared-layout "flying" elements |
| Portal 2 spotlight tour | **driver.js** | 1.9.0 | MIT | Tiny, overlay/cut-out + popover positioning; we control step logic |
| Sound | **howler.js** (sprites) | 2.2.4 | MIT | Cross-browser audio, sprites, unlock handling |
| Icons | **lucide-react** | 1.55.0 | ISC | Consistent line icons (replaces the current emoji icons) |
| Font | **Inter** (sans, both portals) + **Fraunces** (serif story lines, Portal 1) via self-hosted `@fontsource-variable` | 5.x | OFL-1.1 | No external font requests; consistent rendering |
| Image pipeline | **sharp** (dev script) | latest | Apache-2.0 | AVIF/WebP at 640/1280/1920 widths |
| Live feed | Server-Sent Events (native `EventSource`) | — | — | One-way stream; no extra dependency |

**Rejected:** WebGL/Three.js (performance cost, not needed for the story), video scrubbing (heavy), Lottie (would need a designer pipeline; CSS/SVG covers our motion), Shepherd.js (licence uncertainty), react-joyride (heavier, and less control over advance-on-action), CSS scroll-driven animations as the primary mechanism (Firefox support uncertain).

---

## 5. Portal 1 (new): the story site

### 5.1 How it works

- **The storyboard as data.** `story.config.ts` holds every scene: id, clock text, scroll length (in viewport heights), image ids, copy lines, beat timings and sound cues. Scenes read their content from config, so copy and timing edits never touch animation code.
- **One master ScrollTrigger per scene:** each scene is a full-viewport section **pinned** for `scrollLength × 100vh`, with a GSAP timeline `scrub`bed to scroll progress (`scrub: 0.6` for slight smoothing).
- **Two kinds of motion:**
  - **Scrubbed** (tied to scroll position): image zoom/parallax, timer drains, counters, the race between lines. These play backwards when scrolling up.
  - **Triggered** (play once when a scroll threshold is crossed, at real-time speed): notification drops, error shakes, typing bubbles, dings. Fired via `onEnter`/timeline callbacks at a given progress, so the timing from the storyboard (e.g. "1.2 s of dots") stays exact regardless of scroll speed. Reversing past the threshold resets them (`onLeaveBack`).
- **Lenis** smooths wheel/trackpad scroll on desktop; `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. It's disabled on touch (`pointer: coarse`) and under `prefers-reduced-motion`.
- **Plugins are registered once** at module scope (to avoid duplicate registration in React Strict Mode); all scene animations live in `useGSAP` for automatic cleanup.

### 5.2 Persistent UI

| Element | Implementation |
|---|---|
| **Intro gate** ("Tap to begin · best with sound 🔊") | A full-screen overlay on load. The tap unlocks audio (`Howler.ctx.resume()`), plays a soft start tone, fades the overlay out (600 ms) and starts Scene 1's intro beats. A small "Continue without sound" link starts muted. Also unlocks with keyboard (Enter/Space) |
| **Clock pill** | A fixed top-left component; each scene's ScrollTrigger `onToggle`/`onUpdate` sets the clock text from config; the text cross-fades (200 ms) and plays the tick sprite |
| **Progress line** | A fixed 3 px top bar; `scaleX` bound to overall page scroll progress (GSAP `ScrollTrigger.create({ onUpdate })`) |
| **Chapter dots** | A right-edge vertical dot nav (desktop), one per scene, with click-to-scroll via `lenis.scrollTo(sceneTop)`; hidden on mobile |
| **Mute toggle** | Top-right; reads/writes `shared/sound.ts` (persisted in `localStorage`) |
| **Judge lens toggle** | Bottom-right; shows the annotation cards from `shared/judgeLens.ts` (§8.2) |
| **Skip link** | "Skip to the demo →" (top-right, small) jumps to `/app/#/welcome` for judges short on time |

### 5.3 Scene-by-scene build notes

Timings and copy come from `storyboard.md`; below are the mechanics.

| Scene | Pin length | Key techniques |
|---|---|---|
| **1 · Meet Priya** | 1.5 vh | The image `<picture>` scales 1.05 → 1 on intro (time-based), then 1 → 1.15 scrubbed around a transform-origin set on the phone (config gives `origin: "62% 55%"`). The two lines use SplitText `type: "lines"` with masked fade-up (500 ms, `y: 16`) |
| **2 · The class** | 1.5 vh | The wheel image `rotate` scrubs 0 → 8° (subtle "spin"); the class card slides in (x: 40 → 0); the seat row is 8 SVG stools with a stagger fill (80 ms); the 8th gets a CSS keyframe glow (1.6 s loop). The Arjun avatar pops (scale 0.6 → 1, back-out ease) |
| **3 · Meet Ritu** | 1.5 vh | Two-layer parallax: the image is cut into **foreground (Ritu) and background (studio)** only if a clean cut-out exists; otherwise the single image is panned slowly (`yPercent: -6`) with the copy column moving at a different rate. A distant hum sound sprite (2 s) |
| **4 · She pays** | 2 vh | `Phone` mockup absolutely positioned over the blank screen in P1-04 using the per-image `screenRect` (percent coordinates in config). Checkout UI → tap ripple → spinner (CSS). The clock pill jumps at progress 0.33/0.66/0.9 (ticks) |
| **5 · Failed / debited** | 2 vh | Split grid (phone left, face right). Triggered at 0.15: shake (`x` keyframes ±8 px, 400 ms) + red state; 900 ms of stillness; `Sms` notification drops (y: -80 → 0, 350 ms + settle). At 0.5 both words glow (text-shadow pulse 800 ms) |
| **6a · Meanwhile…** | 1 vh | Background tween to ink; word reveal; scrubbed exit `xPercent: 0 → -120` while 6b enters from the right (overlapping pins via a shared container) |
| **6b · Rohan** | 2 vh | Split grid. Left: the P1-06 image with a `Laptop` mockup overlay (`screenRect`). Right: three lines, each revealed at progress 0.1/0.4/0.7. The hold timer is a scrubbed number tween 59 → 0 (`snap: 1`); the padlock SVG opens at 0; Rohan's cursor click at 0.7 → "Booked ✓"; the counter flips 7 → 8 (slot-roll digits, 600 ms). The close line at 0.9 |
| **7 · 11 PM** | 1.5 vh | Slow image fade (1.2 s); the phone notification glows in (no movement), with two opacity pulses; the faint tone sprite |
| **8 · Sunday 8 AM** | 2 vh | The image brightens (CSS `filter: brightness(0.75) saturate(0.8)` → 1, scrubbed). `ChatBubble` sequence triggered at 0.15 with real-time choreography: dots 1.2 s → bubble → 600 ms gap… (dings with three pitches via sprite rate 1.0/1.06/0.94). P1-08 → P1-08b cross-fade (800 ms) at the end |
| **9 · The clock** | 2 vh | The P1-09 background blurred (`filter: blur(6px)`) with slow parallax; the `Vault` card counts down **in real time** (setInterval at 1 s while in view; the start value is computed so it reads "2d 13h 58m"); the three bubbles pop in staggered, then drift via a CSS animation (translate ±6 px, 4 s alternate) |
| **10 · Cliffhanger** | 2 vh | Background to ink; four lines stack (each pushes the previous one up via a flex column + a y tween); a 1.2 s hold; all dim to 0.3; the question fades/scales in; the CTA appears with a breathing glow (CSS keyframes). Each line plays a "thump" sprite |

**The CTA transition:** on click, a full-screen white circle scales from the button's centre (`clip-path: circle()` tween, 700 ms), then `location.assign("/app/#/welcome?from=story")`. This is a full page load, so Portal 2 asks for its own start tap (§14).

### 5.4 Mockup components (HTML/CSS, not images)

| Component | Contents | Notes |
|---|---|---|
| `Phone` | A rounded frame + status bar + slot | Sized by container; dark/light screen variants |
| `Checkout` | Merchant line, amount, "Pay via UPI", spinner state, failed state | Generic, **no real brand marks** |
| `Sms` | Sender "VM-YOURBK", text, time | Drop-down notification style |
| `ChatHeader`, `ChatBubble`, `TypingDots` | Generic messenger UI (not WhatsApp branding) | Bubbles support emoji |
| `Laptop` | A booking-page mock: class card, seats, hold timer, Book button | For Scene 6b |
| `SeatRow` | 8 SVG stools with states: empty/filled/glowing/taken/locked | Shared with Portal 2 |
| `Vault` | Lock icon, amount, live countdown | Shared with Portal 2's "captured" animation |
| `ClassCard` | Title, date/time, instructor avatar, seats, "1 seat left" | |

Overlay alignment: each photo with a device has a `screenRect: { x, y, w, h, rotate }` in percent, measured once the final images are approved.

### 5.5 Assets and loading

- Hero (P1-01) **preloaded** (`<link rel="preload" as="image" imagesrcset=…>`); the other scenes lazy-load, and the **next scene's images are pre-fetched** when the current scene starts (`new Image()` warm-up).
- Every image sits in an `aspect-ratio` box (no layout shift); a low-quality placeholder colour from the image's dominant colour (computed in `optimize-images.mjs`) shows until it loads.
- Fonts are self-hosted with `font-display: swap`; the serif is subset to Latin.

---

## 6. Portal 2 (reuse + upgrade): the guided product

### 6.1 What stays (reuse)
- **The entire backend engine**, API, eval, tests, the real-payment flow.
- **Existing pages and components:** QueuePage, CasePage (Timeline, ConstraintChips, SessionsMatrix, RecommendationCard, PhoneChat, AuditTrail), DemoPage, PolicyPage, design tokens, the API client and hooks.

### 6.2 What changes

| # | Change | Details |
|---|---|---|
| C1 | **Base path `/app/`** | `web/vite.config.ts` `base: "/app/"`; the server mounts the static build at `/app`; `/pay-test` stays at the root |
| C2 | **Welcome (setup) screen** replaces the current Start page as the entry (`#/welcome`) | Built to storyboard §5.1. The first element is a **"▶ Start"** tap (unlocks audio), then the cards animate (Motion stagger). On load it calls `POST /api/session/start` (§7.1), which creates the visitor's sandbox and **starts Priya's case immediately**, so the Gemini call runs while the viewer reads the setup cards (hides latency) |
| C3 | **Tour layer** (`web/src/tour/`) | `TourProvider` (React context) holds `stepIndex` and status (`running/closed/finished`), persisted in `sessionStorage`. `steps.ts` defines the 9 steps (selector, title, body, `advance: "next" or {event: "clicked:queue-nav"}`, `onEnter` animation hook, `requires` state). driver.js renders the overlay cut-out and popover (`popoverClass: "ss-tour"`, `allowClose: true`, `overlayOpacity: 0.55`, `stagePadding: 8`, `stageRadius: 12`, `disableActiveInteraction: false` on click-steps). Steps that wait for a real click listen for app events (a tiny event bus: `tour.emit("clicked:case-card")`). ✕ → `status = closed` → the ResumePill appears |
| C4 | **Mission bar** | A sticky bar under the top bar: role avatar (Ritu/Priya), "Step N of 9", progress. It switches persona on steps 7+ |
| C5 | **Ghost cursor** | A fixed-position SVG pointer + name tag. `moveTo(selector)` animates (Motion spring, ~900 ms) to the target's centre (`getBoundingClientRect`, scroll into view first); `press()` = a 150 ms scale + a 400 ms ripple, then **calls the real API action** (`merchant approve`, `customerChoice accept`). So what the viewer watches is genuinely executed |
| C6 | **Live AI panel** | `LiveAiPanel` subscribes to `GET /api/live/:caseId` (SSE, §7.3). It renders lines with a typewriter effect (15 ms/char), a spinner + live seconds counter for in-flight AI calls, and labels (✦ AI, ✓ check, Razorpay). It's a fixed right column (320 px) during the tour, collapsing to a tab in free explore. If SSE is blocked it falls back to polling `GET /api/cases/:id` every 1 s and diffing the audit entries |
| C7 | **Signature animations** (`web/src/fx/`) | See §6.3 |
| C8 | **Bonus chapter** (`#/not-act`) | Three flip cards (CSS 3D, 600 ms). "Watch →" loads G05/G04/G17 into the visitor's sandbox (`POST /api/session/scenario`), runs a mini-tour (2–3 steps each) with the Live AI panel, then flips the card to its result |
| C9 | **Visual cleanup** | Replace the emoji icons with **lucide-react** (timeline, pills, flags); one-line top bar (brand · nav · mute · judge lens); "Demo controls" and "Policy" move under a **"More"** menu; internal IDs (`case_1`, `pay_…`) leave the main views (still in the Audit trail); Priya/Ritu avatars appear in cards, chat and the mission bar; copy updated to the storyboard's copy deck |
| C10 | **Free explore + Resume** | `ResumePill` (bottom-left) restarts at the stored step; "Start over" resets the visitor's sandbox (`POST /api/session/reset`) and the tour |
| C11 | **Sound** | `shared/sound.ts` cues per step (see the storyboard's sound list) |
| C12 | **Judge lens** | The same toggle and data as Portal 1, with Portal 2 annotations anchored to the step targets |
| C13 | **Mobile layout** | Tour steps on phones target stacked sections; the Live AI panel becomes a bottom sheet (40% height, draggable); the ghost cursor is replaced by a tap highlight |

### 6.3 Signature animations (Motion)

| Step | Effect | Technique |
|---|---|---|
| 1 | Priya's card slides in; the outcome strip counts up | `motion.div` initial `{x: 40, opacity: 0}` → animate; `animate()` number tween for ₹ |
| 2 | The timeline draws top to bottom | An SVG line `pathLength` 0 → 1 (Motion) + items staggered 250 ms |
| 4 | **Words lift into chips** | Render Priya's quote with each extracted phrase wrapped in a `<motion.span layoutId={"chip-"+i}>`. On reveal, the spans move to the chip container; **shared-layout animation** (`layoutId`) flies each word into its chip (600 ms, stagger 300 ms). Phrase offsets come from the AI's `evidence_quote` (matched case-insensitively in the message); if not found, the chip simply fades in |
| 5 | **Rule vs SeatSaver race** | Two absolutely positioned cursors over the matrix; positions from row `getBoundingClientRect`. Grey cursor → the rule row (the backend's `ruleBaselineSessionId`) → ✗ stamps on the violated cells (from `reasons`) → the row greys out. Blue cursor → offered row #1 → ✓ ticks per satisfied hard constraint |
| 6 | **Offer flight** | Clone the offer preview as a small "envelope"; animate along a quadratic arc (keyframes for x/y with `times`) to the phone's chat area; on arrival, the phone bubble enters (spring) + ding |
| 7 | **Padlock → vault** | SVG padlock shackle `rotate`/`y` close (400 ms) when the API returns `execute.seat_reserved`; then the vault door `rotateY` open (700 ms) on `payment.captured`, synced to the **actual audit events** arriving on the live feed (so the order is real, not just animated) |
| 8 | **"ONCE" stamps** | Each ledger row: a stamp element `scale: 1.4 → 1`, `rotate: -8 → -4`, 250 ms, with the thud sound |
| 9 | **Confetti** | Lightweight DOM confetti (40 particles, CSS transforms, 1.2 s) in clay/green |

All Portal 2 animations respect `useReducedMotion()` (they become fades).

### 6.4 Tour step data shape

```ts
type TourStep = {
  id: string;                         // "queue", "case", "timeline", "needs", "race", "approve", "book", "audit", "done"
  persona: "ritu" | "priya" | "none";
  target: string;                     // CSS selector, e.g. '[data-tour="queue-nav"]'
  title: string; body: string;        // from the copy deck
  advance: { kind: "next" } | { kind: "event"; event: string; hint: string };
  waitFor?: (detail: CaseDetail) => boolean;   // e.g. intent present (step 4), state === "OFFER_SENT" (step 6)
  onEnter?: () => Promise<void>;      // plays fx / ghost actions
  sound?: SoundCue;
};
```
`data-tour="…"` attributes are added to the target elements in existing components (no structural rewrites).

---

## 7. Backend changes

### 7.1 Per-visitor sandboxes (required)
**Problem:** today all visitors share one in-memory store, so two judges at once would reset each other's demo.

**Design:**
- `POST /api/session/start` issues an opaque `ss_sid` cookie (HttpOnly, SameSite=Lax, 2 h) or a header token.
- A `SessionRegistry` maps `sid → { store, engine, realPayments, lastSeen }`. Gemini and the gateways are **shared**; each session gets its own `Store` + `CaseEngine`.
- All `/api/*` routes resolve the container from the session (middleware); requests without a session use a read-only "showcase" session.
- **Limits:** max 200 live sessions (LRU eviction), idle TTL 2 h, max **25 AI calls per session** (cost guard; beyond that the case escalates with a friendly "demo limit reached" message), simple per-IP rate limit on `session/start` (e.g. 20/hour).
- `DEMO_ADMIN_TOKEN` now only protects **global** operations (pool management, global reset, clock changes on the showcase session). Visitors can load scenarios in their own sandbox freely.
- Store reset per session: `POST /api/session/reset`.

### 7.2 Real-payment pool (so "real Razorpay test payment" is true for every visitor)
- **Operator flow:** using `/pay-test?admin=…`, the owner creates **N authorised test payments in advance** (Netbanking → Success), with orders created as `capture: "manual"`, `manual_expiry_period: 7200` (5 days, the Orders API maximum). That keeps them valid through judging.
- **The pool is persisted** in a small JSON file (or Cloud Run env/secret) of `payment_id`s, since the in-memory store resets on restart. On boot, the server fetches each payment's status from Razorpay and keeps only those still `authorized`.
- **Claiming:** `session/start` claims one pooled payment for Priya's case (atomic claim; the payment is attached to the session's booking). The capture in step 7 is then a **real Razorpay test-mode capture**.
- **Fallback:** if the pool is empty or expired, a simulated payment is used and the Welcome card text switches to *"A replay of a real Razorpay test payment"* with the SIMULATED tag. This keeps the honesty rule.
- **Sizing:** about 30 payments covers the judging window (one per visitor session that reaches step 7). It's about 20–30 minutes of clicking for the owner, or a scripted flow later.

### 7.3 Live AI feed (SSE)
- `GET /api/live/:caseId` → `text/event-stream`; on connect, it sends the existing audit entries as `line` events (mapped to human text server-side by a `liveLine(entry)` formatter), then pushes new entries as they're logged (`store.on('audit', …)`; add a tiny EventEmitter to `Store.log`).
- **In-flight AI calls:** emit `ai_start {kind}` before each Gemini call and `ai_end {kind, ms}` after, so the panel can show a spinner + live seconds.
- **Heartbeat** comment every 15 s (keeps Cloud Run/proxies from closing idle streams); the client reconnects automatically.
- **Honesty:** lines are generated only from real audit events; cached AI answers are labelled "(cached: identical input)".

### 7.4 Latency strategy for Gemini 3.8-flash
- **Start early:** Priya's case is created at `session/start` (the Welcome screen), so the intent + recommend calls (typically 5–20 s, sometimes more) run while the viewer reads.
- **Step 4 waits gracefully** (`waitFor: intent present`), with the "Gemini is reading her message live…" shimmer.
- **Response cache:** keep the existing cache, but for the tour **prefer live**. If the live call exceeds **25 s** or fails, fall back to the cached answer for the identical input and label it in the Live panel. This is a new `AI_TOUR_FALLBACK=cache` behaviour in `CachedProvider`.
- **Model:** pinned `gemini-3.8-flash`, thinking `low` (owner decision).

### 7.5 Small API additions
| Endpoint | Purpose |
|---|---|
| `POST /api/session/start` | Create the sandbox + Priya case; returns `{caseId, payment: {source, id}}` |
| `POST /api/session/scenario` `{id}` | Load a bonus scenario into the session |
| `POST /api/session/reset` | Reset the session sandbox |
| `GET /api/live/:caseId` | SSE live feed |
| `GET /api/case/:id/fx` (optional) | Precomputed animation hints: quote phrase offsets, the rule row, violated cells (keeps Portal 2 fx logic simple) |

Existing endpoints stay backward compatible; tests are extended for session isolation and the pool claim.

---

## 8. Shared systems: sound, judge lens, assets

### 8.1 Sound (`shared/sound.ts`)
- **One audio sprite** (`audio/sprite.webm` + `.mp3` fallback) containing all 23 cues from the storyboard, with a JSON map of `{cue: [startMs, durationMs]}`. One file means one request and instant playback.
- A `Howl` instance with `sprite`, `preload: true`, `html5: false` (Web Audio).
- `unlock()` is called from the intro gate (Portal 1) / Start tap (Portal 2) → `Howler.ctx.resume()`. Cues requested before the unlock are dropped, not queued (no burst of stale dings).
- `play(cue, {rate?, volume?})`, with per-cue default volumes (e.g. ticks 0.25, dings 0.6, chord 0.5).
- **Mute is on by default = false** (sound on), persisted in `localStorage("ss.muted")`, and reflected in both portals' toggles.
- Sources: generated or royalty-free originals; **no WhatsApp, bank or app sounds copied**. The credits list lives in the build log.

### 8.2 Judge lens (`shared/judgeLens.ts`)
- Data: an array of `{ portal: 1|2, anchor: sceneId|stepId, label, text }` from storyboard §6.
- A persisted toggle (`localStorage("ss.judgeLens")`), off by default.
- Rendering: Portal 1 shows margin cards attached to the pinned scene (fade 400 ms); Portal 2 shows a small card beside the tour popover (or near the anchor in free explore).

### 8.3 Image pipeline
- Originals from OpenAI go in `story/assets-src/<ID>.png`.
- `npm run images` → `scripts/optimize-images.mjs` (sharp) → `story/public/img/<ID>-{640,1280,1920}.{avif,webp}` + `manifest.json` (dimensions, dominant colour). Portal 2 avatars → `web/public/img/` (256 px squares).
- A `<Picture id="P1-03" sizes="(max-width: 900px) 100vw, 60vw" />` component builds the `srcset`s from the manifest.
- Budget: hero ≤ 180 KB (AVIF 1280); total Portal 1 images ≤ 2.5 MB at desktop widths.
- **Review gate:** images are only added to the manifest after passing storyboard §10.

---

## 9. Performance, accessibility, mobile

**Performance budgets (Portal 1):**

| Metric | Budget |
|---|---|
| JS (gzipped) | ≤ 140 KB (React ~45 + GSAP/ScrollTrigger/SplitText ~45 + Lenis ~4 + app) |
| Largest content paint (desktop / mobile) | ≤ 2.0 s / ≤ 2.8 s |
| Layout shift | < 0.05 |
| Main-thread blocking | < 200 ms |
| Frame rate | 60 fps on a mid-range laptop; animate only `transform`/`opacity`/`filter` (with blur sparingly); `will-change` set only while a scene is active |

- `ScrollTrigger.config({ ignoreMobileResize: true })`; `ScrollTrigger.refresh()` after images load and on font load.
- No layout reads inside scrub callbacks; positions are measured once per refresh.

**Accessibility:**
- All copy is real DOM text (not baked into images); every image has `alt` text from config.
- `prefers-reduced-motion`: Lenis off, pins shortened to 1 vh, all scrubs replaced by fades, typing sequences show instantly, counters jump.
- Keyboard: Space/PageDown scroll works; chapter dots are buttons; the tour popovers are focus-trapped, with Esc = close and Enter = Next.
- Sound is never the only carrier of meaning (every ding has a visual).
- Contrast ≥ 4.5:1 for text over images (gradient scrims behind the copy columns).

**Mobile (< 900 px):**
- Split scenes stack (image on top, text below); pin lengths × 0.7; Lenis off (native scroll).
- Mockups scale to the viewport width; the chapter dots are hidden; the progress line stays.
- Portal 2: the Live panel is a bottom sheet; tour popovers are bottom-anchored; there's no ghost cursor (the target pulses instead).

---

## 10. Build, run, deploy

**Scripts (`package.json`):**
```
"dev":          "tsx server.ts"                              # API + both portals via Vite middleware (dev)
"dev:story":    "vite --config story/vite.config.ts"         # optional standalone story dev on :5174
"build":        "npm run build:story && npm run build:web"
"build:story":  "vite build --config story/vite.config.ts"
"build:web":    "vite build --config web/vite.config.ts"
"images":       "node scripts/optimize-images.mjs"
"prestart":     "node scripts/ensure-build.mjs"              # builds whichever portal is missing
"start":        "tsx server.ts"
```

**`server.ts` routing (production):**
- `app.use('/app', express.static('web/dist'))` + a fallback to `web/dist/index.html` for `/app/*` GETs.
- `app.use('/', express.static('story/dist'))` + a fallback to `story/dist/index.html` for other non-API GETs.
- Order: webhook → JSON → `/api` → `/pay-test` → `/app` → `/`.

**`server.ts` (dev):** two Vite servers in middleware mode: `story` (base `/`) and `web` (base `/app/`); `app.use('/app', webVite.middlewares)` then `app.use(storyVite.middlewares)`. HMR stays disabled (as AI Studio set).

**Deploy:**
- **AI Studio:** pull from GitHub → redeploy. Secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `DEMO_ADMIN_TOKEN`, `RAZORPAY_WEBHOOK_SECRET`; **clear `GEMINI_MODELS`** or set it to `gemini-3.8-flash` (the current preview shows the old 4-model chain).
- **Cloud Run:** max instances = 1 (in-memory sessions); min instances = 1 during judging (avoids cold starts; small cost), otherwise 0. Request timeout ≥ 300 s (for SSE streams).
- **Dockerfile:** add `RUN npm run build` (both portals).
- **Pool file:** if using a JSON file for the payment pool, note that the Cloud Run filesystem is ephemeral, so store the pool as a secret/env var (`PAYMENT_POOL=pay_a,pay_b,…`) updated by the operator, and check validity on boot.

---

## 11. Testing and QA

| Layer | What |
|---|---|
| Unit (vitest) | Session registry (isolation, TTL, LRU, AI-call cap), pool claim (atomic; expired payments skipped), `liveLine()` formatter, tour step reducer (advance on event, resume, close) |
| Integration | Two simultaneous sessions running Priya's flow don't interfere; SSE emits the expected sequence for G01; the cached fallback is labelled |
| Existing | The 44 backend tests stay green; the eval harness is unaffected |
| Visual / manual | The built-in browser at 1440 px and 375 px: every Portal 1 scene (scroll down **and back up**), the intro gate with sound, mute persistence, reduced-motion mode; the Portal 2 full tour, ✕ → explore → resume, bonus chapter |
| Performance | Lighthouse on `/` and `/app/` (desktop + mobile) against the §9 budgets |
| Cross-browser | Chrome, Safari (macOS + iOS), Firefox: pins, Lenis off on iOS, audio unlock |
| Real money path | A pooled payment → step 7 → the Razorpay dashboard shows *Captured*; an expired pool → the simulated fallback with honest copy |

---

## 12. Build order, estimates and cut list

**Context:** submission is **13 Oct, 11:59 PM IST**; the video, one-page note and build log are also due. Estimates assume focused build time.

| # | Work | Est. | Depends on |
|---|---|---|---|
| 1 | Repo restructure: `story/` scaffold, `/app` base path, server routing, scripts | 1 h | — |
| 2 | Backend: per-visitor sessions + `session/*` endpoints + AI-call cap + tests | 2 h | 1 |
| 3 | Backend: SSE live feed + `ai_start/ai_end` events + tests | 1 h | 2 |
| 4 | Portal 1 engine: Lenis + GSAP setup, config, intro gate, clock pill, progress, mute, skip link | 1.5 h | 1 |
| 5 | Portal 1 mockups (Phone, Checkout, Sms, Chat, Laptop, SeatRow, Vault, ClassCard) | 2 h | 4 |
| 6 | Portal 1 scenes 1–10 (with placeholder images until the real ones arrive) | 4 h | 5 |
| 7 | Sound sprite + `shared/sound.ts` + cues | 1 h | 4 |
| 8 | Portal 2: Welcome screen + session start + tour engine (driver.js, mission bar, resume, ✕) | 2.5 h | 2, 3 |
| 9 | Portal 2: Live AI panel | 1.5 h | 3 |
| 10 | Portal 2: ghost cursor + fx (chips, race, flight, padlock/vault, stamps, confetti) | 3 h | 8 |
| 11 | Portal 2: visual cleanup (lucide icons, More menu, IDs hidden, avatars, copy deck) | 1.5 h | — |
| 12 | Bonus chapter (3 flip cards + mini-tours) | 1.5 h | 8, 10 |
| 13 | Real-payment pool (operator tool, claim, boot check, fallback) | 1.5 h | 2 |
| 14 | Images: integrate + `screenRect` alignment after review | 1.5 h | owner's images |
| 15 | Judge lens (both portals) | 1 h | 6, 8 |
| 16 | Mobile + reduced-motion pass, Lighthouse, cross-browser QA | 2 h | all |
| 17 | Deploy (AI Studio pull + secrets + Cloud Run settings) | 0.5 h | all |
| | **Total** | **≈ 30 h** | |

**This does not fit before tomorrow's deadline alongside the other deliverables.** The proposed split:

- **Must, before submission (≈ 14 h):** 1, 2, 4, 5, 6 (scenes 1, 2, 4, 5, 6a/6b, 8, 10; scenes 3, 7 and 9 can be simplified to image + copy), 7, 8, 10 (chips, approve/book ghost actions, padlock/vault only), 11 (icons + hide IDs), 14, 17, with a reduced QA pass.
- **Should (if time):** 3 + 9 (Live AI panel; fall back to a simple audit-polling list), 12, 15, the remaining fx (race, flight, stamps, confetti), full scenes 3/7/9.
- **For the in-person pitch (16 Oct+):** 13 (real-payment pool), 16 (full mobile/perf pass), polish.

---

## 13. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Gemini 3.8-flash slow/overloaded (503s, 70 s calls seen) | The tour stalls at step 4 | Start the AI at Welcome; graceful wait UI; labelled cache fallback after 25 s |
| Images arrive late or need re-rolls | Portal 1 looks unfinished | Build with tinted placeholders + correct aspect ratios; images slot in via the manifest; scenes degrade to colour + copy |
| AI Studio import rewrites the structure again | A broken deploy | Pull, don't re-import; review its diffs before merging (as with `2715104`) |
| Shared state between judges | Broken demos | Per-visitor sessions (§7.1) |
| Audio blocked | No dings | Explicit intro/Start taps; visuals carry meaning anyway |
| Scroll-jank on low-end devices | Poor first impression | Transform/opacity only, Lenis off on touch, reduced pins on mobile, performance budgets |
| Pool payments expire before judging | "Real" claim false | 5-day expiry; boot-time validation; honest simulated fallback text |
| Firefox/Safari quirks | Visual bugs | GSAP (cross-browser) rather than native scroll timelines; a QA matrix |
| Time | Incomplete submission | The cut list in §12; video/note/build log are scheduled before the "Should" items |

---

## 14. Storyboard corrections from this research

These need updating in `storyboard.md`:

1. **Sound unlock:** scrolling does **not** unlock audio. Portal 1 needs an **intro gate**: a full-screen *"Tap to begin · best with sound 🔊"* with a small *"Continue without sound"* option. Portal 2's Welcome screen starts with a **"▶ Start"** tap before the cards animate (the navigation between portals is a new page load, so unlock happens again).
2. **"We made a real Razorpay test payment as Priya"** is only literally true for every visitor with the **payment pool** (§7.2). Until the pool exists, the Welcome copy should read *"A replay of a real Razorpay test payment"* with the SIMULATED tag.
3. **Skip link:** add a small *"Skip to the demo →"* in Portal 1 for time-pressed judges.
4. **Chapter dots** on the right edge (desktop) for navigation in the long story (recommended by the reviews).

---

## 15. Sources

- Webflow: [GSAP becomes 100% free](https://webflow.com/blog/gsap-becomes-free) · GSAP: [3.13 release notes](https://gsap.com/blog/3-13/) · npm: gsap 3.15.0, @gsap/react 2.1.2
- Lenis: [README / GitHub](https://github.com/darkroomengineering/lenis) · GSAP forum: [ScrollTrigger + Lenis in React](https://gsap.com/community/forums/topic/40426-patterns-for-synchronizing-scrolltrigger-and-lenis-in-reactnext/)
- Scrollytelling reviews: [scrollytelling.ai: 27 examples reviewed](https://scrollytelling.ai/examples/) · [Maglr: best scrollytelling examples](https://www.maglr.com/blog/best-scrollytelling-examples) · [Svilenković: scrollytelling trends 2026](https://svilenkovic.com/3d/scrollytelling-trends-2026)
- Motion vs GSAP: [OpenReplay](https://blog.openreplay.com/motion-vs-gsap/) · [Aceternity](https://ui.aceternity.com/blog/motion-vs-gsap-for-react)
- CSS scroll-driven animations: [caniuse](https://caniuse.com/wf-scroll-driven-animations) · [WebKit guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) · [MDN Firefox experimental features](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features)
- Product tours: [2026 benchmark (vendor-written)](https://usertourkit.com/blog/react-tour-library-benchmark-2026) · [Inline Manual comparison](https://inlinemanual.com/blog/driverjs-vs-introjs-vs-shepherdjs-vs-reactour/) · npm: driver.js 1.9.0 (MIT), react-joyride 3.2.0 (MIT)
- Audio: [MDN: transient activation](https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation) · [MDN: sticky activation](https://developer.mozilla.org/docs/Glossary/Sticky_activation) · [Chromium autoplay policy](https://www.chromium.org/audio-video/autoplay/) · npm: howler 2.2.4 (MIT)
- Razorpay Orders API capture options (manual capture, up to 7,200 min expiry): [docs](https://razorpay.com/docs/payments/payment-gateway/rainy-day/capture-settings/api/)
