# Merchant problem research: recovery between payment and outcome

Research date: 6 October 2026. Workstream: Indian merchant pain, plus relevant global analogues. This file is an input to the main Build Challenge research report, not a claim that every idea is unique or validated by customer interviews.

## Most useful conclusion

The strongest problem space is **recovering a transaction whose intent still exists but whose operational state is ambiguous**. Generic reminders assume that a customer needs persuasion. Many real exceptions instead require discovering whether the customer still wants the outcome, whether money has already moved, and whether the merchant can still fulfil its promise.

Three candidates worth first-round merchant interviews are:

1. **Contested delivery recovery:** the courier reports a failed delivery, the buyer says no attempt happened, and the merchant needs evidence and a workable reattempt before the parcel returns.
2. **Late-paid order rescue:** payment is eventually confirmed after an order, booking, or stock reservation has expired; determine whether the original promise can still be fulfilled and obtain consent to a feasible replacement.
3. **Short-payment resolution:** identify why an invoice is short-paid before chasing the balance; recover a valid remainder by resolving missing documents or deduction disputes, while suppressing incorrect reminders.

The first two have a direct customer/revenue-recovery story. The third has strong Indian nuance but could be judged as finance-operations automation unless the demonstration closes a customer dispute and collects the valid balance. Exact track interpretation should come from the challenge brief.

All three require data outside a payment gateway. That is a feature of the opportunity but a build constraint: an honest prototype should use a small merchant CSV, mocked connector responses, and one real Razorpay test action rather than claim gateway-only intelligence.

## Evidence standard

- **Documented fact:** a provider's official documentation supports an operational state, action or feature. This establishes possibility and an existing workflow, not market prevalence.
- **Vendor claim:** a provider describes its product or a business benefit. Treat as competitive evidence; do not turn a claimed uplift into an expected result for a new product.
- **Anecdote:** a public merchant account suggests an interview question. Identity, causality, and representativeness are not independently verified.
- **Hypothesis/design proposal:** our inference about an unmet need, proposed workflow, or likely benefit. Requires testing.

No India-wide RTO, no-show, failed-payment, or return-rate estimate is used below. Available vendor pages often quote rates without a sufficiently clear sample or methodology.

## 1. Contested delivery recovery: rescue customer intent when courier and customer disagree

**Problem statement.** A small D2C merchant is told “customer unavailable” or “customer refused,” but the customer says they were waiting or were never contacted. Sending another generic confirmation message does not resolve the contradiction or create an actionable escalation.

**Evidence.** Shiprocket explicitly describes a workflow for an incorrect courier NDR reason: submit a buyer conversation or chat screenshot as proof; correct reasons follow a different reattempt flow. Its delivery-dispute support page also distinguishes “delivered but not received” from “physically delivered but status not updated.” These are documented state conflicts, not just our speculation. [Shiprocket NDR workflow](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-), [delivery disputes](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-).

**Merchant voice, anecdotal.** One small Indian home/lifestyle brand describes calling buyers after courier refusal/unavailability notes and hearing that no delivery attempt had occurred. This is useful problem-discovery material, not evidence of the frequency of misconduct or a finding against a specific courier. [Merchant discussion](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/).

**Segment and present workaround.** D2C apparel, home goods and other merchants with enough weekly shipments to have repeated exceptions but no dedicated logistics team. The probable workaround is manual calls, screenshots, panel uploads, and spreadsheet follow-up; interviews should establish the actual steps and time spent.

**Proposed narrow wedge.** An evidence-backed recovery case: retrieve NDR reason and parcel state; ask one clarifying question; distinguish address/access issue, timing issue, rejection, and contested attempt; collect only necessary proof; prepare reattempt instructions; track whether the next physical attempt succeeded. Do not label a courier fraudulent from a customer message. The core product is the resolution case and its measurable outcome.

**Signals and access.** Gateway data may show prepaid status and the merchant's customer reference. It cannot supply AWB, courier attempt history, RTO state, delivery access instructions, or buyer availability. Those require a shipping/commerce connector plus a permitted customer conversation channel. For pure COD orders, the gateway may have no payment event at all.

**Why AI / why rules.** AI can interpret colloquial or multilingual explanations and extract a precise access/time correction; a rule engine should enforce permitted address changes, escalation windows, maximum contacts, and allowed parcel states. A voice bot asking “will you accept?” adds little novelty.

**Closest existing products.** Shiprocket's NDR resolution already handles the operational queue. Shipway already advertises automated NDR follow-ups and address/order verification. Razorpay's launch blog lists RTO Shield and RTO Insights. The proposed distinction is **contested-attempt evidence to resolved delivery**, not risk scoring, COD confirmation or an RTO dashboard. [Shipway](https://www.shipway.com/), [Razorpay launch](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/).

**2–4 day prototype.** Use 12 synthetic shipments with courier reason, last attempt, remaining eligibility, payment status and cost. A chat simulation produces a structured case, cites the supporting message, and drafts a valid reattempt or escalation. Demonstrate three outcomes: wrong gate/address detail resolved; buyer explicitly rejects so stop; buyer disputes the attempt so assemble a proof packet and route for review. Simulate courier updates and measure recovery only when delivered.

**Metrics.** Incremental delivered contribution margin per eligible contested NDR; successful next-attempt rate; false customer-refusal classifications; minutes of operator work per case; contact opt-out rate. A positive reply is not revenue recovered.

**Risks / disconfirmation.** Courier execution may remain poor after perfect instructions. API access may not support escalation submission; a draft packet is then the honest MVP boundary. Stop if interviews show existing NDR tools already close these cases adequately or if genuine customer intent rarely survives by the time the signal arrives.

## 2. Late-paid order rescue: money succeeds after the original promise expires

**Problem statement.** Payment confirmation arrives after the merchant has cancelled an order, released inventory, or lost the booked slot. A naive “payment succeeded” automation risks overselling; a naive refund loses a willing customer.

**Evidence.** Xendit's official documentation describes delayed confirmation after expiry and explicitly distinguishes time-critical orders that can no longer be fulfilled from orders merchants can keep open. Razorpay's own merchant guide explains timeout versus late authorisation. This is a well-defined cross-market problem. [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/), [Razorpay payment timeout guide](https://razorpay.com/learn/payment-timeout/).

**Segment and workaround.** Limited-stock drops, local classes, event bookings, time-bound services and delivery slots. Likely workaround: support verifies payment, checks inventory/calendar manually, then offers another item/time or requests a refund.

**Proposed narrow wedge.** An agent restores the customer's intended outcome once payment is confirmed: reconstruct the timeline, check whether fulfilment is still possible, offer only valid equivalent alternatives under merchant policy, obtain explicit choice, then create the replacement reservation or draft the refund. The attractive demo is a sold-out workshop where the agent offers an approved later session at the original price and carries the confirmed payment into the replacement booking.

**Signals and access.** Gateway payment/order IDs, payment status and timestamps identify the money state. Commerce order status, stock, booking availability, original promised date and refund state must come from the merchant. Customer screenshots are supporting evidence, never authoritative proof that funds arrived.

**Why AI / why rules.** All ordinary webhook reconciliation belongs in deterministic code. AI becomes useful only when interpreting the customer's objective (“must arrive before a birthday,” “evening only,” “same instructor”) and negotiating among merchant-approved alternatives. Payment verification, inventory reservation and one-time execution stay deterministic.

**Closest existing solution.** Xendit already advises fulfil-or-refund handling; payment gateways and good commerce integrations should already repair many status mismatches. The novel hypothesis is recovery of a feasible alternative **after** automatic reconciliation establishes an exception. Do not pitch “AI reads webhooks.”

**2–4 day prototype.** Simulate one late `payment.captured` event after booking expiration. A mock calendar has two feasible and one infeasible options; an agent explains the evidence and offers the permitted alternatives. User selects; a reservation is atomically locked; the original payment is attached once; a duplicate webhook has no effect. A second test has no feasible option and correctly prepares the refund.

**Metrics.** Incremental contribution retained relative to the merchant's normal refund/support policy; time to fulfilment or refund decision; duplicate actions prevented; false confirmation count; customer acceptance of alternatives. Distinguish revenue retained from newly collected money.

**Risks / disconfirmation.** Incidence could be too low for a stand-alone product. A deterministic replacement menu may solve most cases. An isolated prototype should not imply it can repair a bank's payment state. A strong demo includes the duplicate and no-availability paths, not just a successful sales chat.

## 3. Short-pay resolver: separate a legitimate deduction from collectable debt

**Problem statement.** A customer pays less than the invoice. The difference could be an agreed credit, TDS, a disputed delivery, an allocation error, or an unpaid balance. An automatic “you owe us ₹X” reminder can be wrong; a collector needs to find the missing explanation first.

**Evidence.** Zoho Books' India documentation supports recording tax withheld when customer payments are received. HighRadius sells proof-of-delivery retrieval and attachment for shortage-dispute correspondence. Together these show two different reasons a simple invoice-minus-cash comparison is inadequate. This research does not make a legal judgment on any transaction's TDS treatment. [Zoho income TDS](https://www.zoho.com/in/books/help/settings/income-tds.html), [HighRadius proof-of-delivery automation](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/).

**Segment and workaround.** Indian agencies, service firms and wholesalers with invoices plus email/WhatsApp remittance explanations. Accountants check ledger entries, contracts, remittance advice and delivery records, then ask the customer or sales rep what the deduction means.

**Proposed narrow wedge.** “Explain before collect”: show the remainder, candidate explanations with evidence, confidence, missing document and next safe action. If the customer says “TDS as per attached advice,” route to verification and suppress dunning. If the customer withheld an amount due to missing delivery proof, retrieve the relevant document and draft a precise resolution request. Only create a payment link for a human-confirmed valid balance.

**Signals and access.** Razorpay records payment facts, but the merchant's invoice ledger, credit notes, approved tax configuration, remittance text and contractual terms are required. A CSV invoice export plus uploaded customer advice is sufficient for the first prototype. Do not infer tax rates or write off balances through an LLM.

**Why AI / why rules.** AI maps messy remittance descriptions and email conversations to invoices and reasons. Deterministic arithmetic, approved accounting mappings and evidence requirements decide the amount. A fixed example in which every difference is exactly 10% is not a convincing AI demonstration.

**Closest existing solution.** Zoho already records withholding and payments; HighRadius already addresses deductions/disputes at larger organisations. Differentiation would be a small merchant, conversation-driven explanation-to-resolution workflow connected to payment collection. The market gap is a hypothesis, not established by these sources.

**2–4 day prototype.** Import ten invoices and seven payments; upload three short remittance notes and one delivery document. Show: tax withholding goes to accountant verification; a genuine shortage becomes a credit-review case; missing PoD is attached to a customer response; a confirmed outstanding amount gets a Razorpay test payment link. One deliberately ambiguous case must abstain.

**Metrics.** Correctly classified balances; incorrectly sent reminders; eligible cash collected after resolving the blocker; time to clear disputed balance; manual work per resolved case. Reclassifying cash already received must never be counted as recovered revenue.

**Risks / disconfirmation.** Accounting exceptions can expand uncontrollably; choose one merchant segment and three reason codes. This may fit an automation track better unless the closed loop visibly recovers a collectable balance. Merchant data is necessary to determine whether enough small businesses face the problem frequently.

## 4. Constraint-aware cancellation backfill for service capacity

**Problem statement.** A slot becomes empty, but the customers who want it have incompatible service durations, staff preferences, travel time or budgets. Blasting everyone can create work, annoy customers or sell a slot the business cannot deliver.

**Evidence and competition.** Square explicitly provides waitlists for filling gaps after cancellations/reschedules, and supports messaging waitlisted customers. Fresha provides deposits and stored-card booking policies. Therefore “AI no-show reminder” and “notify a waitlist” are already ordinary features. [Square waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments), [Fresha upfront payments](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview).

**Segment and workaround.** Start with non-medical services: premium salons, photography studios, coaching or activity sessions. Staff manually call a few known customers after a cancellation. Avoid healthcare for a first demo because clinical suitability is a much larger problem than schedule matching.

**Proposed narrow wedge.** Turn free-text intent already collected from opted-in customers into feasible recovery: “weekends only, haircut plus colour, must finish before 5.” A deterministic scheduler filters duration/staff/resource constraints; the agent offers the best feasible option and obtains a deposit through a payment link, with a short inventory hold and no double booking.

**Signals and access.** Gateway sees deposit status and payment reference only. Calendar, staff/resource capacity, service length, existing waitlist preferences and contact consent are external. Can prototype from two CSVs.

**Why AI / why rules.** AI is useful for turning natural-language constraints into structured preferences and negotiating alternatives. Scheduling feasibility, locks, expiry and price floors are conventional software. If preferences are already structured, AI is optional.

**2–4 day prototype.** A cancelled 90-minute slot, five waitlisted customers with different natural-language needs, one compatible option, and a Razorpay test deposit. On expiry of the hold, release the slot; on confirmed deposit, stop other offers. Include a customer who says “no calls, message only.”

**Metrics.** Incremental filled margin from previously empty slots, deposit-to-attendance conversion, messages per recovered slot, and complaints/opt-outs. Do not count merely moving an existing appointment earlier as new revenue without measuring the resulting calendar.

**Risks / disconfirmation.** Very crowded globally and highly dependent on integration. The initial value proposition must be capacity recovery with realistic constraints, not scheduling software replacement. Pick this only with an accessible merchant and a real cancellation queue.

## 5. Return-intent repair when the desired exchange is unavailable

**Problem statement.** A customer still wants the product but the obvious exchange cannot happen: a size is out of stock, the original purchase discount is gone, or the alternate variant does not meet the original use case. A standard return portal can end at a refund even though acceptable alternatives exist.

**Evidence and competition.** Loop already offers instant exchanges and bonus credit for exchanges/store credit. This makes generic refund-to-exchange conversion a weak novelty claim. [Loop instant exchanges](https://help.loopreturns.com/en/articles/1913025), [Loop bonus credit](https://help.loopreturns.com/en/articles/1912193).

**Segment and workaround.** Indian apparel or footwear merchants with product-specific support messages and frequent availability changes. Operators inspect inventory and manually suggest another size/product or offer credit.

**Proposed narrow wedge.** Recover the original reason for buying, then propose an in-stock option that actually solves the return reason, within a margin ceiling. Example: “toe box too narrow, same colour required” should not trigger another shoe with the same fit merely because it is popular. The agent needs explicit catalogue attributes; it must not invent fit advice.

**Signals and access.** Gateway provides paid/refunded amount. Order lines, return reason, catalogue attributes, available inventory, cost and return eligibility come from commerce/support. This is impossible to do credibly from payment data alone.

**Why AI / why rules.** AI can interpret the customer's explanation and match approved product attributes. Refund rights, prices, inventory, reservations and offer limits must be deterministic. Explicit refund requests must have an uncomplicated refund path.

**2–4 day prototype.** One footwear catalogue of 20 synthetic SKUs with structured fit metadata, five return reasons, and a live-looking inventory table. Show a useful alternative, a refusal, and a no-suitable-product case. Demonstrate a reservation and approved difference-payment link; refund remains available.

**Metrics.** Incremental kept-order contribution after eventual second returns and exchange shipping, return-to-exchange acceptance, time to resolution, and regret/second-return rate. Store credit issuance is not automatically incremental revenue.

**Risks / disconfirmation.** Strong incumbents; merchant-specific product metadata may be poor. Avoid generic incentives and indiscriminate retention discounts. Build only if a merchant can supply a meaningful reason-to-product distinction.

## 6. Subscription continuity resolver after a payment problem

**Problem statement.** Subscription billing status, actual payment, service access and customer intent become inconsistent. The merchant may suspend a paying customer, continue delivering an unpaid service, or chase invoices generated during a paused relationship.

**Evidence.** Current Razorpay documentation describes pending/halted states and notes that invoices continue to be created in a halted subscription without automatically being charged. It also provides built-in retry and payment-method update flows. [Razorpay current retry documentation](https://razorpay.com/docs/payments/subscriptions/payment-retries/).

**Segment and workaround.** Non-essential memberships, class subscriptions, software tools or equipment rentals. Support joins the payment dashboard, billing records and entitlement system manually. The user needs one clear answer: what is paid, what is usable, and what action will restore the intended service?

**Proposed narrow wedge.** Reconstruct the evidence and choose an approved continuity action: correct stale service access, offer a permitted pause instead of chasing future periods, or route an invoice conflict to review. Payment retry itself is not novel. The agent should never treat mandate cancellation as permission to charge via another route.

**Signals and access.** Gateway subscription/payment/invoice events are only one side. Usage, service-delivery status, pause policy, renewal intent, entitlement ledger and customer messages are external. The prototype must explicitly show its source of truth for each.

**Why AI / why rules.** Free-text explanations (“I paused while travelling”) and conflicting support notes justify AI interpretation. Billing state transitions, grace periods and authorised collection amounts do not. If no free-text dispute exists, use a state machine.

**2–4 day prototype.** Three timelines: paid but entitlement stale; pending retry with policy-approved grace; halted with disputed historical invoice. Show a source-cited explanation, a proposed corrective operation and a human approval queue. No real collection is necessary to demonstrate the reasoning.

**Metrics.** Wrongful suspensions prevented, time to correct entitlements, confirmed recoverable balance collected, service leakage prevented and support recontacts. “Customers messaged” is not recovery.

**Risks / disconfirmation.** High overlap with Razorpay Subscription Recovery. Position only around billing/service contradictions and customer continuity. India-specific collection permissions and provider capabilities require careful validation for implementation.

## 7. Refund resolution that protects the next purchase

**Problem statement.** The merchant believes it refunded, but the customer cannot identify the credit or lacks the reference needed to ask their bank. Repeated reassurance from a generic bot may damage trust without resolving the issue.

**Evidence.** Razorpay documents bank reference numbers such as ARN/RRN/UTR and says refund/reference emails depend on the merchant passing a customer email. This creates a concrete information-gap possibility for orders reached principally through phone or chat. [Razorpay refund communication](https://razorpay.com/docs/payments/refunds/communication/).

**Segment and workaround.** D2C and booking merchants with phone-first customers. Support finds the original payment and refund, copies the reference and date, and explains how to follow up. Needs merchant interviews to establish recontact burden.

**Proposed narrow wedge.** Provide a verifiable refund trace and escalation case, reconcile multiple partial refunds with order lines, and recognise when the refund is not yet completed. Only after the issue is resolved and the customer wants an alternative should a relevant replacement be offered. Do not use unresolved refunds as an opportunity for pressure.

**Signals and access.** Payment/refund entities and bank reference, plus order lines, customer identity verification and contact channel. Never imply knowledge of the customer's bank balance. Additional bank visibility is generally absent.

**Why AI / why rules.** AI explains a complex timeline and interprets the complaint; fetching status/reference and notifying on a deadline are rules. This may be a supporting feature for late-paid-order rescue rather than a standalone challenge idea.

**2–4 day prototype.** Two partial refunds against one order; customer complains about the full amount. Agent reconstructs the exact ledger, distinguishes processed/pending portions, supplies the right available reference, and drafts a support escalation with no promise that bank credit is visible.

**Metrics.** Repeat refund contacts per case, correct-reference delivery, time to resolution and later repurchase measured separately. Most immediate value is support efficiency, so this is a weaker Recover and Grow candidate unless repeat trust is demonstrated.

## Global patterns worth importing, not cloning

**Southeast Asia — finality-aware recovery.** Xendit's delayed-webhook documentation is particularly useful because it treats payment confirmation and merchant order viability as separate decisions. Transfer the pattern to India: first establish money state, then establish fulfilment state, then ask what customer outcome remains feasible. [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/).

**Nigeria/Ghana — identify received money before sending another demand.** Paystack's DVA documentation explains customer-linked bank-transfer receipts and a requery path when expected transaction notification is delayed. The design lesson is that a recovery agent should verify receipt and query supported status tools before contacting the customer to pay again. The page describes availability in Nigeria and Ghana; do not assume the identical facility, rights or requery API in India. [Paystack dedicated virtual accounts](https://paystack.com/docs/payments/dedicated-virtual-accounts/).

**Brazil — distinguish a recurring permission from an individual collection.** Banco Central describes Pix Automático as a customer-authorised recurring payment arrangement with payer-defined rules. The useful abstraction is a stateful, consent-aware workflow rather than a repeated payment link. This is a design analogy, not proof that Brazilian bank-transfer behaviour or rules map onto UPI. [Banco Central Pix Automático](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico).

**US/global service software — recovery happens at the resource level.** Square and Fresha demonstrate that merchant value can come from filling perishable capacity and securing an appointment. The India opportunity must add concrete local integration or language/intent handling rather than rename their features.

## Quick comparison for the deadline

| Candidate | Distinctiveness if built narrowly | Evidence of underlying workflow | Gateway-only? | Prototype burden | Main proof still missing |
|---|---|---|---|---|---|
| Contested delivery recovery | Medium-high | Strong official support workflow + anecdote | No | Medium; shipping replay + chat | Customer intent survives and escalation changes outcome |
| Late-paid order rescue | High relative to generic dunning | Strong official cross-market docs | No | Medium; event replay + inventory/calendar | Exception volume and value per incident |
| Short-pay resolver | Medium-high with Indian nuance | Strong accounting/product docs | No | Low-medium with uploads | Frequent SMB need; track fit; valid-balance recovery |
| Cancellation backfill | Medium with constraints; low generically | Strong shipped product precedent | No | Low-medium | Unserved local merchant segment |
| Return-intent repair | Medium with good product semantics | Strong competitive precedent | No | Medium | Metadata and incremental kept margin |
| Subscription continuity | Medium; high overlap risk | Strong gateway docs | No | Medium | Existing recovery agents miss these cases |
| Refund resolution | Low-medium standalone | Strong refund communications docs | Partly | Low | Direct revenue impact rather than only support savings |

“High” is a researcher's relative assessment, not a claim of global novelty.

## Interview script that can kill a weak idea quickly

Ask the merchant to show the last three actual exceptions, with identifying details removed. Ask: What happened first? Which systems disagreed? Who had to call whom? What exact evidence unblocked the case? How long did the action remain useful? Did the eventual resolution bring new cash, preserve an existing sale, or only reduce work? What would the existing tool have done? What was the costly false-positive action? Could a new assistant have obtained the same data without a custom integration project?

For the deadline, a single authentic, anonymised case is more valuable than an invented aggregate market statistic. A good prototype should reproduce that case, include one safe refusal/abstention, and demonstrate one bounded action.

## Implementation notes that materially affect a prototype

1. Razorpay's current webhook documentation says events may duplicate and arrive out of order. Validate signatures, deduplicate by event ID, fetch authoritative current state when needed, and make business actions one-time operations. These are prerequisites, not the AI contribution. [Webhook validation and ordering](https://razorpay.com/docs/webhooks/validate-test/).
2. Avoid the stale `d6xcmfyh68wv8.cloudfront.net` copies that search engines surface. In this research, an old subscription retry page said UPI retries happen twice on the same day; the canonical page now describes T+1, T+2 and T+3. Exact behaviour must be rechecked for the merchant's product/account before coding. Use the canonical current source in the report.
3. A late payment screenshot is not confirmation. Never collect a second payment, refund, release inventory, or grant service based solely on conversational confidence.
4. Use deterministic eligibility and amount checks before actions; log the evidence and proposed effect. Customer messages and uploaded PDFs are untrusted business inputs, not instructions that can change the agent's permission policy.
5. For a contest demo, state clearly which data/actions are live in test mode, simulated, and future integrations. An honest, small loop is more convincing than simulated enterprise breadth.
6. Use **Standard Payment Links** when designing a test-mode deposit or balance-collection demo, subject to the merchant account's supported features. Do not silently substitute dedicated UPI Payment Links: the current canonical documentation says those are live-mode-only, Android-only and do not support partial payments. This constraint was cross-checked by the parent research workstream. [Dedicated UPI Payment Links](https://razorpay.com/docs/payments/payment-links/upi/).

## Source ledger

All sources below were browsed on 6 October 2026. “Undated” means no reliable page-level publication date was used. Product pages establish advertised availability, not independently measured business outcomes.

| ID | Source / date visible | Type | Specific use and limit |
|---|---|---|---|
| P1 | [Razorpay Agent Studio launch](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/) — 12 Mar 2026 | Official product announcement | Existing RTO Shield, RTO Insights, subscription and cart agents; prevents false novelty claims |
| P2 | [Shiprocket NDR workflow](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-) — modified 2 Mar 2021 | Official support | Incorrect reason, buyer proof, reattempt workflow; older page, contract/carrier behaviour may vary |
| P3 | [Shiprocket delivery disputes](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-) — modified 13 Jul 2023 | Official support | Distinct conflicting delivery states and proof submission |
| P4 | [Indian D2C merchant discussion](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/) — relative timestamp only | Unverified anecdote | Buyer/courier disagreement; neither incidence nor culpability established |
| P5 | [Shipway product page](https://www.shipway.com/) — undated | Vendor product | NDR and verification competition; marketing uplift numbers excluded |
| P6 | [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/) — updated 26 Dec 2024 | Official technical docs | Late payment versus order feasibility; SEA analogue |
| P7 | [Razorpay timeout/late authorisation](https://razorpay.com/learn/payment-timeout/) — 17 Sep 2026 | Official merchant guide | Indian payment-finality context; implementation should still use API docs |
| P8 | [Zoho Books income TDS](https://www.zoho.com/in/books/help/settings/income-tds.html) — undated | Official product docs | Withholding can explain cash/invoice difference; not transaction-specific tax advice |
| P9 | [HighRadius PoD automation](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/) — undated | Vendor product | Existing deduction/dispute evidence workflow; claimed gains excluded |
| P10 | [Square waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments) — undated | Official support | Existing cancellation backfill and waitlist messaging |
| P11 | [Fresha upfront payment policies](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview) — undated | Official support | Existing deposits/stored-card policies; jurisdiction applicability not inferred |
| P12 | [Loop instant exchanges](https://help.loopreturns.com/en/articles/1913025) — current help article | Official product docs | Existing exchange reservation/fulfilment mechanism; competitive baseline |
| P13 | [Loop bonus credit](https://help.loopreturns.com/en/articles/1912193) — edited 13 Feb 2026 | Official product docs | Existing exchange/store-credit incentives; do not pitch as novel |
| P14 | [Razorpay subscription retries](https://razorpay.com/docs/payments/subscriptions/payment-retries/) — current canonical page | Official API/product docs | Pending/halted behaviour and built-in retries; stale mirrored docs differ |
| P15 | [Razorpay refund communication](https://razorpay.com/docs/payments/refunds/communication/) — current canonical page | Official product docs | ARN/RRN/UTR and email dependence |
| P16 | [Paystack DVAs](https://paystack.com/docs/payments/dedicated-virtual-accounts/) — current canonical page | Official technical docs | Customer-linked transfers and delayed-notification requery; geography-specific |
| P17 | [Banco Central Pix Automático](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico) — undated | Central bank explainer | One-time recurring authorisation and payer rules; search-rendered content available, direct page renders minimally |
| P18 | [Razorpay webhook validation](https://razorpay.com/docs/webhooks/validate-test/) — current canonical page | Official technical docs | Signature, duplicates and out-of-order events |
