# SeatSaver Frontend Plan

This plan is based on `02_Concept1_Prototype_Build_Plan.md` §6 (UX and visual design) and §12 (demo script), and on `01_Concept1_Product_Framework.md` §7–§10 (scope, merchant controls, trust, metrics). The backend it talks to is described in `backend.md`.

Prepared 9 Oct 2026.

---

## 1. Goals: what the UI has to prove to a judge

The brief's Track 2 questions are answered visually, not in prose:

| Brief asks | Where the UI shows it |
|---|---|
| What signal identifies the opportunity | Queue card + case **timeline** (paid → marked failed → seat released → bank confirmed late) |
| Why AI, not a rule | **Constraint chips with the customer's own words** + a **sessions matrix** with ✓/✗ per constraint + a **"A fixed rule would have offered…"** callout |
| What action it produces | **Recommendation card** → real capture or deliberate release |
| What the merchant can review, change, approve or stop | **Approve / Edit / Reject / Release now** on the recommendation; policy page; autonomy badge |
| How it learns | **"Learned from your decision on case #N"** note; reject reason chips |
| Accuracy, permissions, trust, failure | Honest state pills, **AI** and **SIMULATED** tags, audit trail with raw AI JSON, pending/escalated reasons in plain words, ledger |
| Business outcome | **Outcome ladder strip**: Eligible → Offered → Rescued → Released (₹), never mixed |

**Non-goals:** the UI isn't a chatbot or a dashboard that only explains information (the brief warns against both). Every screen leads to a decision or an action.

---

## 2. Users and surfaces

| Surface | User | Device | Purpose |
|---|---|---|---|
| Merchant console | Ritu (studio owner) | Desktop / laptop | Review and act on rescue cases |
| Customer phone | Priya (customer) | 375px phone frame (simulated WhatsApp) | Receive the notice and offer; reply; accept or ask for a refund |
| Demo controls | Presenter / judge | Desktop | Load scenarios, replay events, sell the last seat, inject failures, move the clock, reset |

**Key layout decision:** the Case screen shows the **merchant console and the customer phone side by side**. That makes the 90-second video possible in one continuous screen recording: the merchant approves on the left and the offer appears on the phone on the right.

---

## 3. Information architecture and routes

Hash routing (no router dependency), so it works when served as static files by Express or Cloud Run.

| Route | Screen |
|---|---|
| `#/` | **Start**: what SeatSaver is, real vs simulated, 3 quick-start buttons (main case, duplicate payment, customer wants a refund), link to the real test payment |
| `#/queue` | **Rescue Queue** (merchant home) |
| `#/case/:id` | **Case**: header + timeline + evidence + recommendation + customer phone; tabs: *Decision* / *Audit trail* |
| `#/phone/:id` | Customer phone alone, full screen (mobile testing and phone-only recording) |
| `#/demo` | **Demo controls** |
| `#/policy` | **Policy and autonomy** settings |

The top bar has: brand ("SeatSaver · Clay & Co."), nav (Queue, Demo, Policy), an AI mode badge (`gemini-3.8-flash` / cache / offline), a "Razorpay test API" badge when keys are configured, a demo-clock readout, and a theme toggle.

---

## 4. Screens in detail

### 4.1 Start (`#/`)
- A one-sentence explanation: *"When a payment is confirmed after the seat is gone, SeatSaver finds the customer a seat they'll accept and captures the held money, or deliberately lets it refund."*
- **Quick-start buttons:** "Main case: Priya" (G01), "Customer paid twice" (G05), "Customer wants a refund" (G04), "Mixed Hindi-English" (G11). Each resets, injects the scenario and opens the case.
- A **real vs simulated** table, from the build plan §0.
- A link to `/pay-test` ("Create a real Razorpay test payment").

### 4.2 Rescue Queue (`#/queue`)
- **Outcome ladder strip:** four tiles (Eligible ₹, Offered ₹, Rescued ₹, Released ₹), each with a count. Tooltip: "identified ≠ realised".
- **Case cards**, sorted by urgency (open cases first, then by deadline):
  - customer first name, ₹ held, original session
  - **countdown chip**: "Auto-refund in 2d 14h". Neutral above 24h, amber under 24h, red under 6h, grey when closed
  - **state pill** with human wording (see §6)
  - one-line AI summary with an AI tag
  - flags as small icons with text (identity, injection, seat lost, question)
- **Filters:** Needs action (MERCHANT_REVIEW, RESTORE_PROPOSED, ESCALATED, PENDING), Waiting on customer, Closed.
- **Empty state:** "No late payments right now" + a button "Load the main demo case".

### 4.3 Case (`#/case/:id`), the main screen

**Header:** back link, customer name, ₹ amount, original session, countdown chip, state pill, money mode ("Held: capture or release" vs "Already captured: rebook only"), and the reason in plain words.

**Body (desktop ≥1280px): three columns.**

| Left (260px): Timeline | Middle (flex): Evidence + Decision | Right (390px): Customer phone |
|---|---|---|

- **Timeline:** built from payment, booking, messages and audit. Each item shows time (IST), an icon and a label: *Paid ₹2,000 · Marked failed · Seat hold expired · Bank confirmed (late authorisation) · Customer message · AI read message · Offer sent · Seat reserved · Payment captured*. Razorpay events carry a "Razorpay" or "Razorpay test mode" tag; simulated ones carry SIMULATED.
- **Middle, top: Recommendation card** (sticky). By state:
  - `MERCHANT_REVIEW`: the decision ("Offer 2 sessions"), option chips, merchant summary (AI tag), a customer message preview with facts filled in, confidence, and buttons **Approve & send** (primary), **Edit**, **Reject** (reason chips: "Wrong session", "Customer would prefer refund", "Weekend customers don't want weekdays", "Other"), **Release refund now** (secondary, destructive style).
  - `RESTORE_PROPOSED`: "The original seat is free again" → **Restore & capture** (no AI used; says so).
  - `AWAITING_CUSTOMER`: "Waiting for Priya's preferences", the time since the notice, and **Release refund now**.
  - `OFFER_SENT`: "Offer sent, waiting for the customer", plus a flag if they asked a question.
  - `ESCALATED`: the reason in plain words, plus **Edit & send an offer** (opens the editor) and **Release refund now**.
  - `PENDING_RESOLUTION`: what failed, what's held, **Retry**, the deadline.
  - `RESCUED`: a big success line: seat booked, ₹ captured, payment ID and source (test mode or simulated).
  - `RELEASED`, `AUTO_REFUNDED`, `NO_ACTION`: what happened and why, plus "money returns automatically by {deadline}".
- **Middle: What the customer needs.** Constraint chips: 🔒 **hard** and ♡ **soft**, each with the verbatim quote below it. Also: language, seats needed, unverifiable constraints (warning), "Learned from case #N".
- **Middle: Sessions matrix.** Rows are sessions; columns are Seats left · Price · Day · Time · Instructor · Policy. Each cell is ✓ or ✗ with a short reason on hover or tap. Offered rows are highlighted; the original session is labelled. One row carries a "A fixed rule would have offered this" badge, and the rejected-highlight reason from the AI appears inline.
- **Right: Customer phone.** A WhatsApp-like chat in a 375px frame:
  - outbound bubbles (template vs AI-drafted, with a small tag)
  - inbound bubbles
  - **offer buttons** (one per offered session) + **Refund instead**, shown only while `OFFER_SENT`
  - a text box to reply as the customer, with suggested replies ("18th works!", "haan pehla wala theek hai", "nah, refund pls") so the demo doesn't need typing
  - a "Send from a different number" toggle, to demo the identity guardrail

**Audit trail tab:**
- A table: time · actor (system / AI / merchant / customer / Razorpay) · action · details. Rows are expandable, and AI rows show the raw JSON output plus model, latency and prompt version.
- Ledger entries (`reserve:…`, `capture:…`) with status.

**Edit modal:** pick 1–2 sessions (only same price and with seats; others disabled with a reason), and optionally edit the message (facts are filled in automatically). Shows "This correction will be remembered for similar cases".

**AI wait state:** Gemini calls can take 10–70 seconds. Show an inline progress line, "AI is reading Priya's message… 12s", with elapsed time, and disable conflicting buttons. Never pretend it's instant.

### 4.4 Customer phone alone (`#/phone/:id`)
The same component, full viewport, for mobile checks.

### 4.5 Demo controls (`#/demo`)
- **Scenario picker**, grouped (Customer cases / Reply cases / System cases), with held-out marked. Actions: **Inject** and **Reset & inject**.
- **Replay last event** (idempotency demo).
- **Sell the last seat** of a chosen session (race demo).
- **Fail the next reservation / capture** (failure demo).
- **Clock:** +1h, +6h, jump to 5h before the deadline, jump to the deadline.
- **Reset everything.**
- A link to the real test payment.
- An admin token field (stored in localStorage), sent as `x-admin-token`.

### 4.6 Policy (`#/policy`)
- **Autonomy:** L1 Review-first (default) / L2 Auto-send for approved patterns, with pattern checkboxes (e.g. `day_of_week+instructor+time_window`).
- Max days ahead; max unanswered messages.
- Read-only: same price only (locked in v1), escalate at T-6h, minimum 2h before start.

---

## 5. Visual design

The tokens come from the build plan §6.2: a clean fintech look *inspired by* Razorpay, but with no Razorpay logo or trademarks.

```
Light: --bg #F7F9FC  --surface #FFFFFF  --surface-2 #F1F4F9  --text #0B1B33  --muted #5B6B82  --border #E3E8EF
       --primary #2B6DEF  --success #12B76A  --warning #F79009  --danger #F04438  --ai #7A5AF8
Dark:  --bg #0B1220  --surface #121A2B  --surface-2 #182235  --text #E6EDF7  --muted #9AA8BD  --border #24314A
Font: Inter (Google Fonts), tabular numbers for money and time. Radius 12px (cards), 8px (controls). 8px spacing grid.
```

- **AI-generated content** always carries a purple **AI** tag and a faint purple left border.
- **Simulated** items carry a grey **SIMULATED** tag. Real Razorpay test calls carry a blue **Razorpay test mode** tag.
- State never relies on colour alone: every pill has an icon and a word.
- The chat phone uses a WhatsApp-like palette in its own frame (neutral greens, not brand assets).

---

## 6. Human wording for states and reasons

| Code | Pill | Plain explanation |
|---|---|---|
| `MERCHANT_REVIEW` | Needs your approval | |
| `RESTORE_PROPOSED` | Original seat free | |
| `AWAITING_CUSTOMER` | Waiting for customer | |
| `OFFER_SENT` | Offer sent | |
| `EXECUTING` | Booking… | |
| `PENDING_RESOLUTION` | Needs retry | |
| `ESCALATED` | Needs you | |
| `RESCUED` | Rescued | |
| `RELEASED` | Released, refunding | |
| `AUTO_REFUNDED` | Auto-refunded | |
| `NO_ACTION` | No action needed | |
| `duplicate_payment` | | Customer already paid for this seat with another payment, so this one won't be captured |
| `identity_unverified` | | A message came from a number that isn't on the booking |
| `injection_detected` | | The message tried to instruct the system; a human should look |
| `extra_seats_requested` | | Customer wants more seats than they paid for |
| `deadline_too_close` / `deadline_approaching` | | Less than 6 hours before Razorpay auto-refunds |
| `amount_mismatch` | | Payment amount doesn't match the booking |
| `ai_unavailable` | | The AI didn't respond; decide manually or retry later |
| `capture_failed` / `calendar_write_failed` | | A step failed; nothing was charged twice |
| … | | (full map in code: `web/src/lib/labels.ts`) |

---

## 7. Technical design

| Topic | Decision |
|---|---|
| Stack | **React 19 + TypeScript + Vite**. No UI framework; plain CSS with variables (small, fast, no design-system lock-in) |
| Location | `web/` in the same repo and package (one `npm install`) |
| Routing | A small hash router (`useHashRoute`) |
| Data | A typed `api.ts` client mirroring the backend view types. A `usePolling` hook (2.5 s) for the queue and case; paused during in-flight actions; manual refresh after actions using the response body |
| Long AI calls | Actions return only when the backend finishes; the UI shows elapsed time and disables duplicate submits |
| Dev | `npm run dev` (backend :8080) + `npm run dev:web` (Vite :5173, proxies `/api`, `/pay-test` and `/webhooks` to :8080) |
| Prod | `npm run build` → `web/dist`; Express serves it statically, with an SPA fallback on `/`. One process, one port, ready for Cloud Run |
| Backend additions | `ruleBaselineSessionId` in the case detail (what the fixed rule would offer); static serving of `web/dist` |
| Types | `web/tsconfig.json` (DOM + JSX); `npm run typecheck` checks server and web |
| Accessibility | Semantic buttons, focus rings, `aria-live="polite"` for chat and status, labelled form controls, colour-plus-icon states, sufficient contrast in both themes |
| Responsive | ≥1280px: 3 columns · 900–1279px: 2 columns (phone moves under a "Customer" tab) · <900px: single column with tabs (Decision / Customer / Audit) |

### Component list

```
web/src/
  main.tsx, App.tsx (shell + router)
  lib/api.ts            typed client (+ admin token)
  lib/types.ts          view types mirroring server/views.ts
  lib/labels.ts         state/reason/constraint wording, timeline builder, formatting
  lib/hooks.ts          useHashRoute, usePolling, useElapsed
  components/
    TopBar, OutcomeStrip, CountdownChip, StatePill, Tag (AI/SIMULATED/TEST), CaseCard,
    Timeline, ConstraintChips, SessionsMatrix, RecommendationCard, EditOfferModal,
    RejectReasons, PhoneChat, AuditTrail, Banner, Spinner
  pages/
    StartPage, QueuePage, CasePage, PhonePage, DemoPage, PolicyPage
  styles.css            tokens, layout, components
```

---

## 8. Mapping to the 90-second video (build plan §12)

| Video beat | Screen |
|---|---|
| 0–10 s: Priya paid, seat gone | Case timeline + phone showing the notice |
| 10–20 s: the 3-day window | Queue countdown chip + outcome strip |
| 20–40 s: reading needs, rule vs AI | Constraint chips with quotes + matrix + "fixed rule would have offered" badge |
| 40–55 s: approve → accept | Approve on the left → offer bubble on the phone → tap Sun 18 Oct |
| 55–68 s: reserve → real capture | Timeline: seat reserved → payment captured (Razorpay test mode tag) + audit tab |
| 68–80 s: when not to act | Quick-start: duplicate payment → Released; "only this Sunday" → Released |
| 80–90 s: results | Start page / eval table |

---

## 9. Build order

1. Scaffolding: Vite config, tsconfig, tokens and CSS, shell, router, API client, backend static serving + `ruleBaselineSessionId`.
2. Queue page (strip, cards, countdown, pills).
3. Case page: header, timeline, recommendation card + actions, constraint chips, sessions matrix.
4. Customer phone component (chat, offer buttons, replies, identity toggle).
5. Audit tab, edit modal, reject reasons.
6. Demo controls, policy page, start page.
7. Responsive and dark-mode pass; empty, loading and error states.
8. Verification: typecheck; run the main flow, duplicate, refund, seat-lost race and failure in the browser at 1280 and 375 widths; screenshots.

## 10. Acceptance criteria

- The main case can be completed entirely from the UI: inject → approve → accept on the phone → Rescued, with the capture in the audit trail.
- Every AI-generated text is visibly tagged; every simulated event is visibly tagged.
- No screen shows "booked" or "captured" unless the backend state is `RESCUED`.
- Buttons are disabled while a request is in flight, with elapsed time shown for AI waits.
- Works at 375px (phone page) and 1280px (case page) in light and dark themes.
- No secrets in the client bundle. The Razorpay key ID is only used on `/pay-test`, where it is public by design.
