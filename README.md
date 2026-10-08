# SeatSaver: late-payment booking rescue agent

Prototype for the **Razorpay x ISB AI PM Build Challenge, Track 2 (Recover and Grow with AI)**.

When a UPI or card payment is confirmed by the bank *after* a booking has expired and the seat is gone, Razorpay holds the money as `authorized` for up to 3 days before auto-refunding it. SeatSaver decides what to do in that window:
- It verifies the money.
- It reads what the customer actually needs, from their own words.
- It offers only seats that are really available and within policy.
- After the merchant approves and the customer accepts, it reserves the seat and **captures** the payment.

If nothing fits, the customer paid twice, or they want their money back, it deliberately **doesn't capture**.

> **Design rule: the AI suggests and the code decides.** Gemini only interprets language and ranks options. Every money, seat and permission check is deterministic code, and every AI output is re-validated before anything happens.

## Status

The backend and frontend are complete. Design notes are in [backend.md](backend.md) and [frontend.md](frontend.md).

## Quick start

```bash
npm install
cp .env.example .env        # add GEMINI_API_KEY (free from Google AI Studio)
npm run dev                 # http://localhost:8080
npm test                    # 43 deterministic tests, no API key needed
npm run eval                # golden-set evaluation against live Gemini
```

### Frontend

```bash
npm run dev:web             # Vite dev server on http://localhost:5173 (proxies /api to :8080)
npm run build               # builds web/dist; `npm start` then serves the app on :8080
```

Screens:
- **Start** (`#/`): scenario quick-starts and what's real vs simulated
- **Rescue queue** (`#/queue`)
- **Case** (`#/case/:id`): timeline, AI recommendation with Approve / Edit / Reject / Release, customer needs with quotes, sessions matrix, and the customer's phone side by side, plus an audit trail tab
- **Customer phone** (`#/phone/:id`)
- **Demo controls** (`#/demo`) and **Policy** (`#/policy`)

There are three AI modes, set with `AI_MODE`:

| Mode | What it does |
|---|---|
| `gemini` | Live calls. Responses are cached in `.cache/` to save free-tier quota |
| `cache-only` | Demo-safe replay of recorded responses. It never calls the model |
| `fake` | An offline keyword stub for tests and for running without a key. **Not** the product's intelligence |

## What is real and what is simulated

| Component | Status |
|---|---|
| AI reasoning (intent extraction, ranking, offer drafting, reply interpretation) | Real (Gemini API, structured JSON output) |
| Policy checks, idempotency ledger, state machine, audit log | Real code |
| Razorpay capture | Real Razorpay **test-mode** API for payments with `source: "razorpay_test"` (needs test keys). Simulated adapter for synthetic scenarios |
| Late arrival of the bank's authorisation | Simulated: it can't be forced in test mode, so it's injected and labelled |
| Studio calendar, customers, bookings | Synthetic fixtures (Clay & Co., Bengaluru) |
| WhatsApp messaging | Simulated: messages are stored, not sent |

## Architecture

```
server/
  domain/        types, time and label helpers
  store/         in-memory store seeded from fixtures/ (single instance, resettable)
  engine/
    eligibility.ts      E1–E10 deterministic gate (duplicate payment, amount, deadline, refund in flight…)
    candidateFilter.ts  hard constraints + policy → feasible sessions (AI may only pick from these)
    validator.ts        re-validates every AI output; blocks money, dates or unknown placeholders in AI text
    caseEngine.ts       state machine + executor (re-verify → reserve seat → capture once → confirm)
    messages.ts         pre-approved templates (en / Hinglish / Hindi); safe fallback for AI drafts
  ai/            prompts (versioned), JSON schemas, Gemini provider, cache, offline fake
  adapters/      Razorpay (test API + simulator + webhook signature), calendar
  app.ts         REST API + demo controls
web/             React + Vite frontend (see frontend.md)
fixtures/        sessions, policy, 36 golden scenarios
tests/           unit + engine-flow + HTTP tests
eval/            golden-set evaluation vs baselines (do-nothing, fixed rule)
```

## Case lifecycle

`DETECTED` → (`NO_ACTION` | `RELEASED` | `ESCALATED` | `RESTORE_PROPOSED` | `AWAITING_CUSTOMER`) → `MERCHANT_REVIEW` → `OFFER_SENT` → `EXECUTING` → `RESCUED` (or `PENDING_RESOLUTION`). Any case still open at the 3-day deadline becomes `AUTO_REFUNDED`.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | AI mode, model, whether the Razorpay test API is configured |
| GET | `/api/studio` | Studio, policy, sessions |
| GET | `/api/cases`, `/api/cases/:id` | Queue and full case detail (candidates, offer, messages, audit, ledger) |
| GET | `/api/metrics` | Outcome ladder: eligible / offered / rescued / released (₹) |
| POST | `/api/cases/:id/merchant` | `{type: approve, edit, reject, release, retry}`. `edit` takes `sessionIds[]` and an optional `message` |
| POST | `/api/cases/:id/customer-message` | `{text, fromContact?}`: the customer chats, and the AI interprets |
| POST | `/api/cases/:id/customer-choice` | `{choice: accept, refund, other, sessionId?}`: the customer taps a button |
| POST | `/webhooks/razorpay` | Real test-mode webhook (HMAC-SHA256 of the raw body) |
| GET | `/api/demo/scenarios` | Golden scenarios |
| POST | `/api/demo/inject/:id[?reset=1]` | Load a scenario and emit its simulated late `payment.authorized` event |
| POST | `/api/demo/replay/:eventId` | Re-send an event (idempotency demo) |
| POST | `/api/demo/capacity` | `{sessionId, booked}`: for example, sell the last seat mid-flow |
| POST | `/api/demo/faults` | `{reserveFailures, captureFailures}`: fault injection |
| POST | `/api/demo/clock` | `{advanceHours}` or `{set}`: move the simulated clock (deadline demo) |
| PUT | `/api/demo/policy` | Autonomy level, auto-approve patterns, window, contact limit |
| POST | `/api/demo/reset` | Reseed everything |

`/api/demo/*` requires the `x-admin-token` header (or `?admin=`) when `DEMO_ADMIN_TOKEN` is set.

## Guardrails (all enforced in code and tested)

- **Capture conditions:** capture only if the payment is authorised, the amount matches, the deadline hasn't passed, the seat is reserved, the customer accepted, and the merchant approved.
- **Order of operations:** reserve the seat first, then capture. Idempotency keys per payment and per reservation prevent double capture or double booking.
- **What the AI may offer:** only sessions from the code-filtered feasible set. Anything else is rejected, retried once, then escalated.
- **No facts written by the AI:** the AI never writes amounts, dates or times. Code fills placeholders, and drafts that leak facts are replaced by templates.
- **Prompt injection:** customer text is treated as untrusted data, and suspected injection escalates the case.
- **Identity:** a message from an unknown number escalates the case, and the AI is never called.
- **Respecting the customer:** at most 2 unanswered messages; "stop" is honoured immediately; a refund request ends the flow.
- **Deadline:** cases escalate 6 hours before auto-refund. A pending case that reaches the deadline releases its held seat.
- **Failures:** if the AI or the gateway fails, the case escalates or goes to pending resolution. It never shows a false success.

## External tools and services

- Google Gemini API (`@google/genai`)
- Razorpay API (test mode)
- Express, zod, vitest, tsx
- Built with help from Claude Code (Anthropic) and Google AI Studio

All merchant and customer data is synthetic.
