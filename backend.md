# SeatSaver Backend: Decisions, Files and Flow

This is the reference for how the SeatSaver backend works and why it is built this way. It goes alongside the two planning documents in the parent folder: `01_Concept1_Product_Framework.md` (the product thinking) and `02_Concept1_Prototype_Build_Plan.md` (the build plan).

Last updated 9 Oct 2026 (prompt v2, held-out eval).

---

## 1. What the backend does, in one paragraph

A UPI or card payment can be confirmed by the bank *after* a booking's seat hold has expired and the seat has been sold. Razorpay then holds the money as `authorized` until it is captured or automatically refunded. SeatSaver picks up that late-authorised payment and works through it in order:
1. Verify the money with deterministic checks.
2. Understand what the customer needs, using Gemini.
3. Offer only seats that are really available and within policy (code filters, Gemini ranks).
4. After the merchant approves and the customer accepts, reserve the seat and then **capture** the payment.

If nothing fits, the customer paid twice, or they want a refund, it deliberately **does not capture**, and Razorpay returns the money automatically.

**The core design rule: the AI suggests and the code decides.** Gemini only reads language and ranks options. Every check on money, seats and permissions is plain code, and every AI output is re-validated before it is used.

---

## 2. Decision log

| # | Decision | Why | Where |
|---|---|---|---|
| D1 | **Already-paid cases only.** The product never asks the customer for new money | Removes a whole class of trust and fraud problems; matches the "capture or release" framing | `eligibility.ts`, `caseEngine.ts` |
| D2 | **Capture-or-release framing.** The decision is whether to capture an `authorized` payment within Razorpay's window, not "refund vs rebook" | Razorpay's capture settings make this a real, native action with a natural deadline and no refund cost | `adapters/razorpay.ts` |
| D3 | **Same-price alternatives only** in v1 | Price differences mean partial refunds or extra charges; cutting them keeps the money logic simple and correct | `candidateFilter.ts` (`price_differs`), merchant edit check |
| D4 | **Reserve the seat first, capture second** | Reserving is reversible; capturing is not. The irreversible step always comes last | `caseEngine.executeRescue` |
| D5 | **Idempotency ledger** with keys `capture:{paymentId}` and `reserve:{caseId}:{sessionId}` | Duplicate webhooks, retries and double clicks can never capture twice or book twice | `store.ledger`, `executeRescue` |
| D6 | **The AI never writes amounts, dates or times.** It writes placeholders (`{{AMOUNT}}`, `{{SESSION_1}}` …) that code fills in | The model can't misquote money or a slot. A draft that leaks facts is replaced by a pre-approved template | `validator.customerMessageIssues`, `messages.ts`, `composeOffer` |
| D7 | **The AI may only choose from code-filtered feasible sessions** | Removes invented availability. An off-list ID is rejected, retried once, then escalated | `validator.validateRecommendation` |
| D8 | **Three narrow prompts with JSON schemas** (intent, recommend, reply) instead of one agent with tools | Each is small, testable and replaceable. The model has no tools, so it cannot act | `ai/prompts.ts`, `ai/schemas.ts` |
| D9 | **Two-layer output validation:** JSON Schema sent to Gemini (`responseJsonSchema`), plus zod re-validation | Never trust raw model output, even with constrained decoding | `ai/schemas.ts`, `validator.ts` |
| D10 | **Review-first by default (L1).** The merchant approves every AI offer; L2 auto-approve is opt-in per constraint pattern | Matches Razorpay Agent Studio's review-first model; builds trust gradually | `policy.autonomy`, `autoApproves()` |
| D11 | **Restore the original seat without AI** when it's free again | No language to interpret, so no AI needed. Being honest about where AI isn't required | `eligibility.ts` (`restore`) |
| D12 | **The contact limit counts *unanswered* messages** (at most 2 in a row), not total messages | A normal back-and-forth shouldn't be blocked; what matters is not spamming a silent customer | `caseEngine.send` |
| D13 | **"Stop" and "refund" end the flow immediately.** No persuasion and no discounts | Respect for the customer is a product feature; tested | `runProposal`, `interpretReply` |
| D14 | **Identity check before any AI call.** A message from a contact that isn't on the booking escalates | Never merge timelines or act on a stranger's instructions | `inbound()`, `customerMessage` |
| D15 | **Customer text is untrusted data.** It is wrapped in `<customer_message>` tags; injection attempts are flagged and escalated | Prompt-injection defence | prompts, `runProposal`, `interpretReply` |
| D16 | **Deadline watcher:** escalate 6 hours before Razorpay auto-refunds; mark `AUTO_REFUNDED` at the deadline; release seats held by pending cases | The 3-day window can't pass silently | `caseEngine.tick` |
| D17 | **Failures never show success.** Payment fetch, reservation or capture failures go to `PENDING_RESOLUTION` with a merchant retry | Honest states: offered ≠ reserved ≠ captured | `executeRescue`, `merchantAction("retry")` |
| D18 | **Webhook snapshots aren't trusted alone.** Payment state is re-fetched from Razorpay; if that's impossible, the case escalates | Events are snapshots and may be stale or out of order | `ingestPaymentEvent` |
| D19 | **In-memory store, single instance, resettable** | A prototype with a demo reset button; Cloud Run max-instances = 1 | `store/memoryStore.ts` |
| D20 | **Simulated clock** for scenarios | The demo can show deadlines, T-6h escalation and auto-refund without waiting 3 days | `store.setNow/advance`, `/api/demo/clock` |
| D21 | **Real Razorpay test-mode capture for the main case;** simulated gateway for synthetic scenarios | One genuine, verifiable money action; the rest is safe to replay | `realPayment.ts`, `GatewayRouter` |
| D22 | **Manual-capture orders** (`payment.capture: "manual"`, `manual_expiry_period: 4320` minutes = 3 days) | Keeps the test payment `authorized` until SeatSaver decides. Note: the Orders API allows up to 5 days; 3 matches the dashboard story | `RazorpayTestGateway.createManualCaptureOrder` |
| D23 | **Refuse non-test Razorpay keys** | Live money can't be touched by accident | `RazorpayTestGateway` constructor |
| D24 | **Gemini model pinned to `gemini-3.8-flash`** (owner's decision, to control cost) with `thinking: low` and a 120 s timeout | 3.8-flash is the current model (2.5-flash is retired for new users). Low thinking is cheaper and faster | `.env` `GEMINI_MODELS`, `GEMINI_THINKING`, `GEMINI_TIMEOUT_MS` |
| D25 | **The model fallback chain is supported but not used.** Per-day quota errors fall through to the next model when several are configured | Built when on the free tier (20 requests per day per model); kept as a resilience option | `ai/gemini.ts` |
| D26 | **AI response cache and a "cache-only" demo-safe mode** | Saves cost while judges click around; the demo survives an API outage | `ai/cache.ts`, `AI_MODE=cache-only` |
| D27 | **Offline `FakeProvider`** (a keyword heuristic) for tests and running without a key | Deterministic tests; clearly *not* the product's intelligence | `ai/fake.ts` |
| D28 | **The eval counts infrastructure failures separately** and never as quality passes | A Google outage that causes an escalation must not look like a correct decision | `eval/runEval.ts` |
| D29 | **Synthetic data only** | Privacy, plus the brief allows it; real customer data never goes to the model | `fixtures/` |
| D30 | **Prompt v2: a named month, date or workshop type is a must-have** unless the customer says they're flexible; the recommender must never offer a session that contradicts an explicit request and should escalate or release instead | The v1 misses (G16 dev, G25 held-out) came from "X works for me" being read as a soft preference, then contradicted by the offer | `ai/prompts.ts` (`PROMPT_VERSION = "v2"`) |
| D31 | **Code safety net:** if an offer contradicts a month, date or workshop type the customer named (even one recorded as soft), the case escalates (`offer_contradicts_request`) | Defence in depth: correctness shouldn't rely on the model labelling hard vs soft perfectly | `caseEngine.contradictsExplicitRequest` + test |
| D33 | **Hosting on Google AI Studio / Cloud Run.** Kept AI Studio's `server.ts` structure, but fixed three regressions from its import: the deleted `package-lock.json` (restored), a hard-coded port (now `PORT \|\| 3000`), and an Express-5-incompatible `app.get("*")` that crashed production mode (now middleware). Empty env values now fall back to defaults (an empty timeout used to mean 0 ms) | The hosted app must boot in both dev and production modes, on AI Studio and on direct Cloud Run | `server.ts`, `container.ts` |
| D32 | **Held-out discipline:** prompts are tuned only on dev cases. Once a held-out case informs a fix (G25), it is retired as "unseen" and new held-out cases (G31–G33) are written *before* the next run, including a positive control (G33) to catch over-correction | Keeps the "unseen" number honest | `fixtures/scenarios.json`, `eval/runEval.ts --only=` |

---

## 3. File map

```
RazorPay-AI-Builder/
├─ server.ts                Entry point (added by AI Studio import, fixed): loads .env, builds the container, mounts createApp;
│                           dev = Vite middleware, production = serves web/dist with SPA fallback; port = PORT || 3000
├─ metadata.json            AI Studio app metadata (server-side Gemini capability)
├─ Dockerfile               Direct Cloud Run deploy (fallback path)
├─ scripts/ensure-build.mjs prestart: builds web/dist if missing
├─ server/
│  ├─ index.ts              Legacy entry point (imports ../server.ts)
│  ├─ app.ts                REST API, webhook, demo controls, /pay-test page
│  ├─ container.ts          Wires store + AI provider + gateways + engine from env
│  ├─ views.ts              Response shapes: case summary/detail, outcome metrics
│  ├─ scenarios.ts          Loads golden scenarios; writes them into the store; prepares real-payment bookings
│  ├─ realPayment.ts        Real Razorpay test payment: order → Checkout → verify signature → engine
│  ├─ domain/
│  │  ├─ types.ts           All domain types (Session, Payment, RescueCase, CaseState …)
│  │  ├─ time.ts            IST helpers, formatting, rupees
│  │  └─ labels.ts          Session labels for UI, customers and the AI
│  ├─ store/memoryStore.ts  In-memory state, simulated clock, audit log, ledger, fault injection
│  ├─ engine/
│  │  ├─ eligibility.ts     E1–E10 checks → eligible | restore | release | escalate | no_action
│  │  ├─ candidateFilter.ts Hard constraints + policy → feasible sessions with reason codes
│  │  ├─ validator.ts       Validates intent / recommendation / reply; blocks facts in AI text
│  │  ├─ messages.ts        Pre-approved message templates (English, Hinglish, Hindi)
│  │  └─ caseEngine.ts      State machine, proposal pipeline, executor, deadline watcher, learning
│  ├─ ai/
│  │  ├─ prompts.ts         The 3 system prompts + user-content builders (PROMPT_VERSION)
│  │  ├─ schemas.ts         JSON Schemas for Gemini + zod schemas for re-validation
│  │  ├─ provider.ts        AiProvider interface
│  │  ├─ gemini.ts          Live Gemini: structured output, throttling, retries, model chain, thinking level
│  │  ├─ cache.ts           Response cache (read-write or cache-only)
│  │  └─ fake.ts            Offline deterministic stand-in
│  ├─ adapters/
│  │  ├─ razorpay.ts        Simulated + real test gateways, order creation, signature checks, router
│  │  └─ calendar.ts        Seat reservation against the session table
│  └─ static/pay-test.html  Page that creates and pays a real test-mode manual-capture order
├─ fixtures/
│  ├─ sessions.json         Clay & Co. calendar (10 sessions; the original Sun 11 Oct 10 AM is full)
│  ├─ policy.json           Studio and merchant policy
│  └─ scenarios.json        39 golden scenarios (ai / reply / system; held-out marked)
├─ tests/                   44 tests: deterministic units, engine flows for every system case, guardrails, HTTP + webhook
├─ eval/
│  ├─ runEval.ts            Golden-set eval vs baselines (do nothing, fixed rule)
│  └─ results/              Markdown reports per run
├─ .env.example             All configuration keys (no secrets)
└─ README.md                Quick start and API table
```

---

## 4. How the flow works

### 4.1 Lifecycle of a case

```
Razorpay late authorisation (webhook / Checkout / simulated injection)
   │
   ▼
ingestPaymentEvent
   ├─ seen event id? ───────────────────────────────► duplicate_event (no-op)
   ├─ case already exists for payment? ─────────────► attach (no-op)
   ├─ re-fetch payment from gateway; failure ───────► ESCALATED (payment_state_unverified)
   └─ checkEligibility
        ├─ failed/created payment, refund in flight ► NO_ACTION
        ├─ customer already paid for this seat ─────► RELEASED (duplicate_payment)
        ├─ amount mismatch / <6h left / no booking ─► ESCALATED
        ├─ original seat free again ────────────────► RESTORE_PROPOSED  (no AI)
        └─ eligible → send template notice ─────────► AWAITING_CUSTOMER → runProposal

runProposal (whenever the customer has written)
   ├─ message from an unverified contact ───────────► ESCALATED (identity_unverified)  (no AI)
   ├─ AI #1 extractIntent → zod validate (1 retry)
   │    ├─ injection ───────────────────────────────► ESCALATED
   │    ├─ stop contact ────────────────────────────► RELEASED (no further messages)
   │    ├─ refund / original only ──────────────────► RELEASED
   │    ├─ more seats than paid ────────────────────► ESCALATED (extra_seats_requested)
   │    └─ unclear, no preferences ─────────────────► clarifying question (AWAITING_CUSTOMER)
   ├─ filterCandidates (code): seats, same price, same class type, 14-day window, ≥2h before start, hard constraints
   ├─ AI #2 recommend (feasible + excluded + few-shot past merchant corrections) → validate (1 retry)
   │    ├─ offer_alternative ───────────────────────► MERCHANT_REVIEW  (offer message composed; L2 may auto-send)
   │    ├─ release_refund ──────────────────────────► RELEASED
   │    ├─ ask_customer ────────────────────────────► clarifying question
   │    └─ escalate ────────────────────────────────► ESCALATED
   
Merchant: approve → OFFER_SENT · edit (same price, seats left) → OFFER_SENT + learning record
          reject → ESCALATED + learning record · release → RELEASED · retry (pending) → executeRescue

Customer: button accept → executeRescue · refund → RELEASED · other → AWAITING_CUSTOMER
          free text → AI #3 interpretReply → accept / refund / stop / request_other (re-propose, excluding declined) / question / unclear

executeRescue
   1. re-fetch payment: must still be authorized and before the deadline
   2. seat still free?  no → apologise, re-propose without that seat (MERCHANT_REVIEW)
   3. reserve seat (ledger) → failure → PENDING_RESOLUTION, no capture
   4. capture (ledger, 1 retry) → failure → PENDING_RESOLUTION, seat held, "finalising" message
   5. booking → rescued; RESCUED; confirmation message

tick (on every queue/detail read and clock change)
   ├─ ≤6h to deadline and still open ───────────────► ESCALATED (deadline_approaching)
   └─ deadline passed, still authorised ────────────► AUTO_REFUNDED (+ release any held seat)
```

### 4.2 Case states

| State | Meaning | Terminal? |
|---|---|---|
| `DETECTED` | Case created, checks running | no |
| `RESTORE_PROPOSED` | Original seat free; one-tap restore awaiting the merchant | no |
| `AWAITING_CUSTOMER` | Waiting for the customer to say what they want | no |
| `MERCHANT_REVIEW` | AI offer ready; merchant must approve, edit or reject | no |
| `OFFER_SENT` | Offer delivered; waiting for the customer | no |
| `EXECUTING` | Reserving or capturing | no |
| `PENDING_RESOLUTION` | A step failed; merchant retry or deadline | no |
| `ESCALATED` | Needs a human (reason recorded) | no |
| `RESCUED` | Seat booked and payment captured once | yes |
| `RELEASED` | Deliberately not captured; Razorpay returns the money | yes |
| `AUTO_REFUNDED` | Deadline passed without capture | yes |
| `NO_ACTION` | Nothing to do (not authorised, refund in flight, already confirmed) | yes |

### 4.3 Real Razorpay test payment (verified 8 Oct 2026)

1. `POST /api/demo/real-order` creates a manual-capture order and prepares a released booking on the full original session.
2. `/pay-test` opens Razorpay Checkout in test mode. Netbanking → "Success" on the mock bank page works. The built-in browser pane can't do this because the bank page opens in a popup.
3. `POST /api/demo/real-payment` verifies the HMAC of `order_id|payment_id`, fetches the payment (must be `authorized`, correct order and amount), maps the real capture window onto the demo clock, and ingests it.
4. Merchant approves, customer accepts. `POST /v1/payments/{id}/capture` is a **real API call**.

Verified result: `pay_TlVOmvH6qLIRgh | captured | ₹2,000 | netbanking`.

**Only the *lateness* of the authorisation is simulated.**

---

## 5. API

The full table is in `README.md`. The frontend uses:
- `GET /api/health`, `GET /api/studio`, `GET /api/metrics`
- `GET /api/cases`, `GET /api/cases/:id`
- `POST /api/cases/:id/merchant`, `/customer-message`, `/customer-choice`
- Demo: `GET /api/demo/scenarios`, `POST /api/demo/inject/:id`, `/replay/:eventId`, `/capacity`, `/faults`, `/clock`, `/reset`, `PUT /api/demo/policy`, `/real-order`, `/real-payment`

---

## 6. Evaluation results

Everything below is `gemini-3.8-flash` with `thinking: low`, synthetic data, one run per case. The reports are in `eval/results/`.

### Prompt v1 (8–9 Oct)

| Set | Result |
|---|---|
| Dev (18 cases) | **17 / 18 correct**, all answered. Miss: G16 (asked for the premium Glazing class; got Wheel Basics offers instead of an escalation) |
| Held-out (5 cases, run once) | **3 / 4 answered correct** (G12 ✓, G15 ✓, G29 ✓, G25 ✗). G27 was a Google timeout (not counted either way) |
| Safety | 0 hard-constraint violations, **0 false money actions**, 1 must-not-offer violation (G25 offered October sessions to a "November" request) |

### Prompt v2 + code safety net (9 Oct)

| Set | Result |
|---|---|
| Dev regression (G16 + G01, G13, G28) | **4 / 4**. G16 now escalates; the soft-preference and offer cases didn't regress |
| **New held-out (G31–G33, written before running, run once)** | **3 / 3**. G31 "next month" → escalated; G32 "switch to hand-building" → escalated; G33 "any Sunday in October with Arjun" (positive control) → correct offer |
| Safety | **0 hard-constraint, 0 must-not-offer, 0 false money actions** |

Baselines on the same cases: the fixed rule ("offer the next same-price slot") passed **0%** of decision cases, with violations in every run. Doing nothing passed only the release cases.

### Honest caveats

- **Small sample:** 18 dev + 8 held-out synthetic cases, one run each. This shows decision quality on designed cases, not real-world accuracy.
- **G25 is no longer unseen** (it informed the v2 fix). **G27** has never received a model answer because of Google timeouts.
- **v2 hasn't been re-run on the full dev set,** only on the 4 most relevant cases, to limit cost.
- The report `2026-10-08T18-32-30` used the earlier free-tier fallback chain (3.5–3.7 Flash) and is kept only for history.

## 7. Configuration

| Env var | Purpose |
|---|---|
| `GEMINI_API_KEY` | Paid-tier key (in `.env` only, never committed) |
| `GEMINI_MODELS` | `gemini-3.8-flash` (comma list = fallback chain) |
| `GEMINI_THINKING` | `low` |
| `GEMINI_TIMEOUT_MS` | `120000` |
| `GEMINI_MIN_INTERVAL_MS` | Spacing between calls |
| `AI_MODE` | `gemini` / `cache-only` / `fake` |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Test keys only (`rzp_test_…`) |
| `RAZORPAY_WEBHOOK_SECRET` | For the hosted webhook (later) |
| `DEMO_ADMIN_TOKEN` | Protects `/api/demo/*` on the hosted app |

---

## 8. Known limitations and open items

- **Latency:** `gemini-3.8-flash` was slow and overloaded on 8 Oct (503s, up to 70 s per call). Use cache-only mode for recording the video if needed.
- **No real messaging:** WhatsApp is simulated in-app.
- **Single instance:** state is lost on restart (by design for the demo; the Reset button reseeds it).
- **Webhooks:** they need the public URL from deployment; not configured yet.
- **No real-world measurement:** learning is retrieval of past merchant corrections as few-shot examples, not model retraining.
- **Remaining eval gaps:** G27 never answered (timeouts); v2 not re-run on the full dev set.
