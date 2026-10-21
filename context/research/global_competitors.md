# Global payment recovery landscape and opportunity hypotheses

Research date: **6 October 2026**, Asia/Kolkata. Prepared for the Razorpay × ISB Recover and Grow with AI ideation effort. This is a research module, not a claim of exhaustive market coverage. Proposed product ideas and scores below are our hypotheses. Vendor features are sourced; vendor performance claims are not independent proof.

## Decision in one paragraph

Do not pitch a generic agent that notices failed payments, reasons about a decline, sends a personalized WhatsApp message, retries, and shows recovered rupees. That category is crowded at infrastructure, billing, startup, and public hackathon-project levels. The more defensible opportunity is **a narrow merchant-specific decision that payment infrastructure cannot settle on its own**: whether a cart is still fulfilable; whether a payment repaired the next renewal or merely this invoice; which invoice objection must be resolved; or who is legitimately authorized to pay. A basic prototype can demonstrate one such decision using merchant data, customer language, strict action constraints, and a verified outcome. The originality should reside in the problem and operating decision, not the chatbot interface.

## What is already commoditized or heavily contested

| Layer | Examples checked | Existing capability | Implication for this challenge |
|---|---|---|---|
| Optimal retry timing | [Stripe](https://stripe.com/blog/how-we-built-it-smart-retries), [Recurly](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [Butter](https://www.butterpayments.com/), [GoCardless](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success) | Network-trained or merchant-adapted models choose when to reattempt collection. | A one-week project will not credibly outperform infrastructure trained on very large payment histories. Use payment-provider capabilities as tools. |
| Payment routing, acceptance and cost | [Adyen](https://docs.adyen.com/uplift), [Checkout.com](https://www.checkout.com/products/intelligent-acceptance), [PayPal](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li), [Primer](https://www.primer.io/manage/observability) | Optimize authorization, provider paths, fraud friction, costs, and experiments. | A dashboard that diagnoses payment failure is insufficient differentiation. |
| Customer communication after failure | [Yuno NOVA](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery), [Churnkey](https://churnkey.co/), [Gravy](https://www.gravysolutions.io/press) | WhatsApp/voice, email/SMS/in-app intervention, or human-assisted recovery. | Local-language voice alone is not a new idea. Show a better resolution workflow. |
| Subscription retention | [Chargebee](https://www.chargebee.com/solutions/usecases/churn-management/), [Churnkey](https://churnkey.co/) | Retention offers, pauses, plan changes, prediction, feedback analysis, payment recovery. | Personalized offers and cancellation rescue need a narrow nuance to stand out. |
| Local and backup payment methods | [dLocal](https://www.dlocal.com/our-solution/payins/), [Xendit](https://docs.xendit.co/docs/recover-failed-payments) | Local acceptance and alternative payment channels; automatic or manual fallback. | “Offer another payment method” is a baseline. The interesting decision is which authorized alternative solves the customer's actual obstacle. |
| Recovery attribution | [Churnkey recovery methods](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/) | Recovery is assigned to one channel or action without double counting. | Attribution is useful bookkeeping, but it does not measure causal uplift against what would have happened anyway. |

### Why the newest competitive evidence matters

Yuno's June 2026 article describes a three-layer recovery stack: routing, infrastructure fallback, and direct customer recovery through NOVA. Its reported Viva Aerobus result is **75% of contacted customers**, a selected denominator, not 75% of all failed payments. The product description includes WhatsApp or voice in many languages. This is a close analogue of the most obvious buildathon idea. [Yuno source](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery)

Churnkey's current positioning combines an Account Agent, adaptive offers, feedback analysis, and payment recovery. Therefore, adding an LLM to churn prediction or cancellation flows is also insufficient by itself. These observations establish existing products, not proof that these tools work equally well for an Indian small merchant. [Churnkey source](https://churnkey.co/)

Stripe's engineering article is a useful reality check: retry prediction uses more than 500 attributes and a combination of statistical and text-derived features. Even “use richer context instead of static rules” is already established. The article also explicitly discusses the tradeoff between keeping unpaid customers active and giving retries enough time. [Stripe source](https://stripe.com/blog/how-we-built-it-smart-retries)

## Regional lessons worth importing

### North America: optimize the relationship, not only authorization

Butter markets recovery customized to merchant subscription characteristics; Gravy combines technology and people. Their useful shared lesson is that a merchant-specific workflow can matter after baseline infrastructure has done its job. However, neither a new retry model nor “a warmer message” is a defensible novelty claim. Candidate Indian adaptations should use merchant-side context that changes the permissible action. [Butter](https://www.butterpayments.com/), [Gravy](https://www.gravysolutions.io/press)

### Europe and global enterprise: recovery is a constrained optimization problem

Adyen explicitly balances conversion, risk and cost. Recurly documents boundaries on retry eligibility; GoCardless exposes retry limits, delays, and a filter for likely failures. The lesson is to make “stop”, “wait”, “ask for another method” and “escalate” first-class outcomes. More attempts do not inherently mean better recovery. [Adyen](https://docs.adyen.com/uplift), [Recurly](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [GoCardless](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success)

### Latin America: instant payments and local rails change the workflow

dLocal documents failed recurring Pix payment retries. Its broader pay-in proposition emphasizes local methods such as Pix, UPI and GCash, alongside local acquiring and fallback. The transferable lesson is not that a Pix design can be copied directly into UPI: **rail-specific authorization, timing, pending states, and confirmation matter**. A generic card-retry abstraction can conceal these differences. [dLocal Pix retries](https://docs.dlocal.com/docs/payment-retries-pix), [dLocal Payins](https://www.dlocal.com/our-solution/payins/)

### Africa: failure handling differs materially across providers

Paystack's subscription documentation says a failed charge is not retried within that billing cycle; its `attention` state can be charged on the next payment date. It supports hosted authorization updates. Separately, its customer help page recognizes the case where a payment appears to fail but the customer's bank account was debited. That is a strong reminder to reconcile payment state before sending another demand for money. These are provider-specific facts, not a claim about all African payments. [Paystack subscriptions](https://paystack.com/docs/payments/subscriptions/), [Paystack failed-but-debited](https://support.paystack.com/en/articles/2127938)

### Southeast Asia: one-time recovery can leave the underlying problem unfixed

Xendit documents up to five ordered payment channels and a recovery payment link. Crucially, a successful one-time recovery payment does **not** replace the subscription's registered methods. It fixes the current cycle and stops its retries; future cycles continue on the original methods. This suggests a subtle problem statement: **the merchant's “recovered” invoice can hide an unresolved next-cycle failure.** This behavior is confirmed for Xendit; whether the same gap exists in a chosen Razorpay merchant workflow requires validation. [Xendit recovery documentation](https://docs.xendit.co/docs/recover-failed-payments)

## Seven differentiated, feasible opportunity hypotheses

All examples are illustrative, with invented merchants, customers and amounts. These are not claims that a competitor has never built a similar feature. “Nearest competitor” is the nearest found in this research, not a global novelty guarantee.

### 1. Fix the next renewal: a durable recovery agent

**Problem.** A one-time payment rescues today's invoice while the expired card, revoked mandate, wrong payer, or unsupported recurring method remains. The dashboard celebrates recovery; the merchant repeats the same work next month.

**Best starting vertical.** Memberships, classes, coaching or software with clear monthly cycles. Pick one, preferably with accessible billing and entitlement data.

**Signal.** Failed recurring invoice → successful one-time payment → original recurring authorization still invalid, absent, or unchanged. Customer conversation can reveal why: changed bank, family member paid once, mandate revoked intentionally, or temporary payment-method substitution.

**Decision and action.** Classify the root situation, explain the distinction between paying this invoice and authorizing future collection, then offer an approved next step: update the recurring authorization, change the authorized payer, choose a supported cadence, or deliberately remain manual. Confirm the actual authorization status before marking the issue resolved. Never infer permission for recurring debits from a one-time payment.

**Why AI rather than a rule.** A rule can detect “one-time payment plus broken mandate”; AI interprets the customer's reason and maps it to a permitted resolution. If all data is structured and no conversation is needed, this is mostly workflow automation and should be presented honestly.

**Merchant controls.** Allowed resolution types; no forced mandate conversion; channel and follow-up caps; explicit customer consent; human review for contradictory status; stop if customer chooses manual payment. Deterministic state transitions decide whether an authorization is valid.

**Feedback and measure.** Next-cycle first-attempt success, repeat-failure incidence, customer opt-out rate and verified recurring-authorization completion. Separate current recovered money from prevented future failure. A one-week demo cannot measure a real renewal cohort; replay labeled scenarios and propose the live evaluation.

**Prototype.** Six cases: expired card, revoked mandate, one-time family payment, temporary insufficient funds, customer wants manual billing, and confusing delayed webhook. A dashboard shows two independently verified statuses: “this invoice paid” and “next cycle ready”. Connect one actual test-mode payment-link flow if available; simulate the mandate-status adapter with labels if no suitable API access exists.

**Nearest analogue / caveat.** Xendit's documented one-time-versus-recurring distinction motivates the problem; Stripe, Chargebee and Churnkey already support payment updates. The wedge is the closed loop and consent-aware durable fix, not the existence of an update-card page. [Xendit](https://docs.xendit.co/docs/recover-failed-payments), [Chargebee](https://www.chargebee.com/receivables/failed-payment-recovery/)

**Validation question.** Of the last 30 manually rescued subscriptions, how many failed again next cycle, and how many needed the same manual intervention?

### 2. Recover a fulfilable basket, not a stale cart

**Problem.** The payment failed when the original offer was available. By the time recovery starts, a product is out of stock, a delivery promise has expired, a coupon is no longer valid, or a class seat has been taken. A payment link for the old cart can recover gross payment while creating cancellations, refunds and distrust.

**Best starting vertical.** Small D2C bundles, perishable deliveries, or scheduled classes. Avoid starting with airlines: live inventory, pricing and ticketing integrations are too complex for this deadline.

**Signal.** Failed order plus changes in inventory, promised delivery time, price validity or slot availability. Customer text supplies the constraint that matters, such as “only if it arrives before Friday”.

**Decision and action.** Revalidate the order before outreach. Ask at most one necessary clarification. Construct two merchant-approved alternatives using available items or slots, preserve the customer's must-have constraint, compute contribution margin, and issue a new order/payment link only after acceptance. Suppress recovery when no honest viable offer remains.

**Why AI rather than a rule.** Rules can check stock and price validity. AI interprets the customer's priorities and explains acceptable substitutions across a merchant catalog. All availability, price, tax and margin calculations remain deterministic.

**Controls.** Hard inventory and capacity checks; inventory-hold TTL; margin floor; no invented delivery guarantees; approved substitute set; final price confirmation; no silent substitution. A second freshness check precedes link creation.

**Feedback and measure.** Net fulfilled contribution recovered, payment-to-fulfilment conversion, refunds after recovery, and customer acceptance of alternatives. Compare with generic retry-link outreach for eligible failed carts.

**Prototype.** A mock store with 20 SKUs or five class slots, three inventory changes, and eight customer statements. Demonstrate a successful modified basket and an intentional no-action case. One re-created order and test payment are enough to show the loop.

**Nearest analogue / caveat.** Yuno NOVA and Razorpay Agent Studio already recover failed checkouts conversationally. Differentiation depends on implementing fulfilment constraints and measuring completed profitable orders; a nicer cart-recovery conversation would not suffice. [Yuno](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery)

**Validation question.** How often does the original inventory, slot, coupon or delivery promise become invalid between failure and recovery outreach?

### 3. Resolve the invoice objection before asking again

**Problem.** A customer is willing to pay but cannot route an invoice through their organization because a PO reference, legal entity, service completion document, line-item explanation or billing contact is missing. Reminder automation repeatedly contacts a person who cannot resolve the block.

**Best starting vertical.** A small B2B agency selling standardized monthly services, with simple invoices and known customer contacts. Do not attempt enterprise procurement integration in the prototype.

**Signal.** Unpaid invoice plus customer email or chat objections, invoice metadata, contract extract and approved document inventory.

**Decision and action.** Distinguish inability to pay from an administrative obstacle or a substantive dispute. Retrieve the needed authorized evidence, draft a corrected non-final invoice or documentation packet, route it to the responsible merchant owner, and reopen collection only after the blocker is resolved. If only part of the invoice is disputed, propose a clearly itemized partial-payment option for merchant approval rather than rewriting the commercial agreement.

**Why AI.** The obstacle is expressed in free text and scattered documents. AI is useful for classifying the objection, mapping relevant evidence and producing the packet. Financial totals and legal-entity changes require explicit validation.

**Controls.** Approved document access; no invented PO or completion evidence; no unilateral credit notes or price reduction; human approval for invoice corrections; no payment demands while a dispute is open; consented recipient changes.

**Feedback and measure.** Time from objection to approved payable invoice, collection after obstacle resolution, incorrect-document rate, human time saved, and re-opened disputes. DSO changes alone are confounded by seasonality and invoice mix.

**Prototype.** Ten synthetic invoices and short customer threads, four document types, and three obstacle categories. Show an evidence-linked recommendation, human approval, generated packet and test payment-link handoff.

**Nearest analogue / caveat.** Chargebee Receivables already offers segmentation and collection workflows; AR automation broadly is crowded. Originality requires owning one high-frequency obstacle end to end, such as missing service-acceptance evidence for agencies, rather than “AI collections”. [Chargebee Receivables](https://www.chargebee.com/receivables/failed-payment-recovery/)

**Validation question.** What fraction of overdue invoices are actually blocked by documentation or ownership, and which exact blocker consumes the most days?

### 4. Authorized payer handoff for learning and memberships

**Problem.** The person using the product is not always the person able or authorized to pay. Generic reminders reach the learner, employee or family member indefinitely. An invoice can also be accidentally disclosed to an unverified new payer.

**Signal.** Customer says “my parent pays”, “send it to our accounts person” or “the old billing owner left”; CRM and prior payment data conflict with the current contact.

**Decision and action.** Offer a customer-controlled payer handoff: the user approves a recipient or shares a secure link themselves; the new payer receives only the necessary payment context; a verified payment maps back to the original order or subscription. Updating future billing ownership is a separate confirmed action.

**Why AI.** It recognizes role changes and constraints in messy conversation. Identity checks, authorization, recipient validation and link scope must remain deterministic. Without role ambiguity this is simply a payment link feature.

**Controls.** Customer-supplied contacts only; data minimization; no scraping relatives or employer contacts; expiring links; no entitlement transfer merely because someone paid; prevent duplicate invoice settlement.

**Feedback and measure.** Time to reach an authorized payer, paid invoices after handoff, contact loops avoided, privacy incidents and duplicate-payment rate.

**Prototype.** Adult learner/parent payer, departing employee/finance team, and one denied handoff. Demonstrate two different permissions: one-time payer versus future billing owner.

**Nearest analogue / caveat.** Payment links and billing-contact changes are established. The differentiated unit is consent-aware role resolution tied to the same invoice and future authorization. Must validate whether this is frequent enough in the chosen vertical to justify an agent.

### 5. Payment-to-access rescue: fix the customer outcome after money moves

**Problem.** The processor shows payment success but a course, membership or software account remains inactive due to a missed webhook, mismatched account or duplicate customer record. The merchant sees “revenue received”, yet the customer asks for a refund or leaves.

**Signal.** Verified paid invoice but absent entitlement, or a customer complaint plus conflicting order/account evidence. Payment screenshots can be clues but cannot authorize access or establish settlement.

**Decision and action.** Retrieve canonical payment and merchant entitlement states, resolve probable account mapping, and propose or perform an allowed access repair. Escalate ambiguity. If payment is still unresolved, avoid another charge and give an evidence-based status response.

**Why AI.** Useful for identifying the right account across conversational clues and summarizing conflicting evidence. The core paid-to-entitled invariant is deterministic; do not use a language model for ledger truth.

**Controls.** Verified source records; no screenshot-only approval; no cross-user access grant; least-privilege entitlement repair; human review above uncertainty threshold; idempotency.

**Feedback and measure.** Paid-but-blocked time, refund requests following activation incidents, and successful entitlement repairs. Count this as **protected revenue / reduced refunds**, not new recovered payment value. Track fit should be checked against the challenge's definition of recovery.

**Prototype.** Five event histories: delayed webhook, duplicate account, already-refunded payment, truly failed payment with debit complaint, and successful payment requiring entitlement replay. Demonstrate a repair and an escalation.

**Nearest analogue / caveat.** Payment support and billing-entitlement platforms already solve parts of this. Razorpay itself now demonstrates payment complaint investigation. The potential wedge is closing the merchant-side access gap, not inspecting transaction status. [Paystack's failed-but-debited example](https://support.paystack.com/en/articles/2127938) supports the need to distinguish user-reported debit from canonical merchant payment state; it does not prove demand for this exact product.

### 6. Recovery that knows when to stay quiet

**Problem.** Multiple tools claim credit for the same recovered invoice; some users would have paid without intervention; discounts destroy margin; simultaneous messages create annoyance. Gross recovered payment can rise while incremental profit or trust falls.

**Signal.** Unified invoice state, scheduled provider retries, prior customer contact, customer objections, current offer eligibility and past outcomes.

**Decision and action.** Choose among do nothing, wait for an already scheduled attempt, send one helpful explanation, request a payment update, or escalate. Assign eligible invoices randomly to the merchant's existing baseline and the proposed policy. Include a contact budget and stop conditions.

**Why AI.** Customer intent and objections can change the appropriate action; AI can structure those signals. Randomization, suppression, budget limits, payment matching and uplift calculation are deterministic. A pure experimentation dashboard would be weak on the agent requirement, so demonstrate one actual constrained intervention loop.

**Controls.** Baseline care continues for the control group; no withholding necessary payment notices; customer opt-outs; per-person contact caps; discount eligibility rules; never change experiment assignment after seeing outcomes; no results claimed from simulated cohorts.

**Feedback and measure.** Incremental net collected contribution per eligible invoice, recovery delay, contact rate, opt-outs, refunds and repeat churn. Store both attributed recovery and estimated incremental recovery as different numbers.

**Prototype.** A queue of 100 clearly synthetic cases with fixed experiment assignment and five intervention examples. The demo shows why one case is suppressed, one resolved with no discount, one escalated and one recovered. Show how a later live pilot would test the hypothesis; do not pretend synthetic uplift is empirical proof.

**Nearest analogue / caveat.** Churnkey has single-touchpoint attribution; Primer has A/B tools. The wedge is applying a merchant contact budget and net-contribution objective to the customer recovery policy, not inventing A/B testing. [Churnkey attribution](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [Primer observability](https://www.primer.io/manage/observability)

**Validation question.** Can the merchant say how much recovery was incremental, and do existing systems know that another system has already contacted the same customer?

### 7. Preserve a booked experience during a temporary payment failure

**Problem.** A blanket payment-failure rule cancels a customer's booked class or freezes their membership just before a scheduled session. A short, bounded service bridge might preserve retention while the customer resolves payment; offering unlimited grace would invite losses.

**Best starting vertical.** Non-essential fitness, language classes or professional communities. Avoid essential services where access decisions have different legal and ethical requirements.

**Signal.** Payment failure, imminent booking, verified usage and payment history, explicit customer explanation, and cost/capacity of the scheduled experience.

**Decision and action.** Within a merchant policy, propose a one-session bridge, a pause, or rescheduling, then link the customer to an approved payment resolution. Do not mistake a commercial bridge for a new loan or infer repayment ability from demographic attributes.

**Why AI.** It interprets whether the customer wants the service, a delay or cancellation and selects from allowed options. Grant eligibility and maximum exposure are deterministic. If all cases map cleanly to rules, keep AI to conversation and evidence explanation.

**Controls.** Maximum bridge value; no repeat abuse; no credit underwriting; clearly communicated expiry; customer acceptance; human review for exceptions; no obstruction of cancellation.

**Feedback and measure.** Next 30-day retention and net contribution, bridges repaid, unpaid service cost, cancellations and complaints. A demo can establish workflow feasibility but not those long-run results.

**Prototype.** Three customers with identical failure codes but different upcoming bookings, stated preferences and policy eligibility. Show three different authorized outcomes and a later payment event.

**Nearest analogue / caveat.** Stripe already acknowledges the access-versus-retry tradeoff; Churnkey supports pauses and offers. The distinction is an inventory/capacity-aware single-experience bridge, not generic grace periods. [Stripe](https://stripe.com/blog/how-we-built-it-smart-retries), [Churnkey](https://churnkey.co/)

## Prioritization for a seven-day prototype

These scores are judgment calls, not empirical measurements. Five means strongest or easiest. Access to one real merchant's problem examples can reverse the ranking.

| Candidate | Problem specificity | Demo feasibility | AI justification | Strongest reason to pursue | Biggest reason to reject |
|---|---:|---:|---:|---|---|
| Durable next-renewal repair | 5 | 4 | 3 | Sharp “recovered today, broken tomorrow” insight with a visible two-state outcome | Could collapse into deterministic mandate-update workflow; actual integration support must be checked |
| Fulfilable-basket recovery | 5 | 4 | 5 | Connects natural-language intent to inventory, timing and margin constraints | Needs good merchant-side inventory/order simulation or integration |
| Invoice-objection resolution | 4 | 4 | 5 | AI works on genuinely messy language and evidence | Broad AR category is saturated; pick one blocker and vertical |
| Authorized payer handoff | 4 | 5 | 3 | Easy, memorable multi-person demo | May not be frequent enough; payments links already cover simple cases |
| Payment-to-access rescue | 4 | 4 | 3 | Clear customer harm and verifiable corrective action | Could fit operations more than Recover and Grow; novelty limited without account ambiguity |
| Quiet/incremental recovery | 4 | 4 | 4 | Strong PM thinking, transparent economics, avoids recovery vanity metrics | One week cannot prove causal uplift; must still show an action-taking agent |
| Booked-experience continuity | 4 | 4 | 4 | Goes beyond collection to preserve customer value | Retention/grace competitors are close; exposure policy needs careful scope |

**My shortlist from this workstream:** (1) fulfilable-basket recovery for a tiny merchant catalog; (2) durable next-renewal repair for one recurring vertical; (3) invoice-objection resolution for one specific document blocker. Use quiet/incremental recovery as a measurement design across all three, rather than necessarily making it the headline product.

## Competitive and evidence traps to avoid in the final pitch

1. Do not compare a vendor's selected “up to” recovery figure with another's average or with a different denominator. Payment count, invoice value, contacted customers, initially failed orders and net revenue are different measures.
2. Do not train a model on synthetic labels produced by your own rules and present its accuracy as proof of better real-world recovery. A synthetic demo can establish plumbing and policy behavior, not economic uplift.
3. Separate gross settled amount, net retained amount after refunds, contribution after fulfilment/contact cost, and incremental uplift against baseline.
4. A retry that succeeds is not necessarily caused by your agent. Provider retries, customer self-service and other outreach may already be active.
5. Public product pages establish claimed capabilities, not complete feature inventories. Absence from a page is not proof the feature is absent from the product.
6. A country analogy is a prompt for local validation. Pix, UPI, cards, wallets and direct debit have different transaction and authorization models.
7. “LLM recommends; rules authorize” and “webhook-to-verified-recovery audit trail” are good implementation principles but are already common. They cannot carry the originality claim.

## Source ledger

All sources below were accessed **6 October 2026**. “Undated” means no reliable publication date was visible in the retrieved material; crawl dates are not publication dates. Claims are deliberately brief and paraphrased. Primary source means the vendor's own documentation or site, not independently verified performance.

| ID | Source and exact URL | Date visible | What it establishes / caution |
|---|---|---|---|
| G01 | [Stripe — How we built it: Smart Retries](https://stripe.com/blog/how-we-built-it-smart-retries) | 23 Jan 2024 | Technical description of network-data retry modeling, configurable policies and access-versus-retry tradeoffs. Case-study results combine particular products and customer circumstances; not transferable baselines. |
| G02 | [Adyen — Uplift documentation](https://docs.adyen.com/uplift) | Undated | Recommendations and experiments across conversion, risk and cost; configuration and integration limitations apply. Supports the conclusion that generalized payment optimization is mature. |
| G03 | [Checkout.com — Intelligent Acceptance](https://www.checkout.com/products/intelligent-acceptance) | Undated | Real-time acceptance optimization including message formatting, routing and recovery. Marketing claims about performance and speed are vendor assertions. |
| G04 | [PayPal — Payment Optimization](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li) | Undated | Smart Retries, ML routing, tokenization, authentication and processor redundancy are listed capabilities. No independent uplift conclusion taken. |
| G05 | [Chargebee — Failed Payment Recovery](https://www.chargebee.com/receivables/failed-payment-recovery/) | Undated | Segmentation using risk, payment history and failure reasons, plus configurable communication and collection workflows. Does not establish that the invoice-objection concept is unserved. |
| G06 | [Chargebee — Churn Management](https://www.chargebee.com/solutions/usecases/churn-management/) | Undated | Prediction, retention interventions, and recovery already sit in one product family. Useful evidence against a broad “AI churn agent” novelty claim. |
| G07 | [Recurly — Intelligent Retries](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic) | Relative update shown: 3 months ago; exact date not asserted | ML timing for recurring cards, eligibility limits, and distinct direct-debit treatment. The retrieved documentation describes soft/hard decline handling and retry boundaries; implementation should use current provider documentation. |
| G08 | [Churnkey — Growth infrastructure homepage](https://churnkey.co/) | Undated | Lists Account Agent, adaptive offers, feedback analysis, cancellation flows and payment recovery. Performance numbers are marketing claims, not independent trial results. |
| G09 | [Churnkey — Recovery Methods](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/) | Undated | Describes exclusive attribution categories and how channel attribution is assigned. Our distinction between attribution and causal incrementality is an analytical inference. |
| G10 | [Butter Payments](https://www.butterpayments.com/) | Undated main page; latest listed release 29 Jan 2026 | Merchant-adapted ML payment recovery and payment-health positioning. ARR and loss estimates are vendor claims; not used as market-size proof. |
| G11 | [Gravy — Press](https://www.gravysolutions.io/press) | Undated | Positions failed-payment recovery as a combination of technology and people. Historical funding snippets are not used to infer current scale. |
| G12 | [Yuno — Enterprise Revenue Recovery Stack](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery) | 12 Jun 2026 | Describes routing, fallback and NOVA customer outreach. Viva Aerobus figure uses contacted customers as denominator. The article's quantitative outcomes are Yuno-reported, not independently audited here. |
| G13 | [dLocal — Payins](https://www.dlocal.com/our-solution/payins/) | Undated | Local acquiring/methods, routing and fallback across markets. Listing multiple methods does not establish identical recurring capability in each country. |
| G14 | [dLocal — Pix Payment Retries](https://docs.dlocal.com/docs/payment-retries-pix) | Undated | Confirms a recurring Pix retry service and synchronous/asynchronous states. An analogy for rail-specific recovery design, not an authorization to transfer Pix rules to UPI. |
| G15 | [Paystack — Subscriptions](https://paystack.com/docs/payments/subscriptions/) | Undated | Failed subscription charges are not retried in that cycle; customer authorization can be updated through hosted flows. Provider-specific behavior, not a continent-wide conclusion. |
| G16 | [Paystack — My transaction failed, but I was debited](https://support.paystack.com/en/articles/2127938) | Edited 15 Sep 2026 | Recognizes failed-payment/debit ambiguity and directs customers toward resolution. No inference that a customer screenshot proves merchant receipt of funds. |
| G17 | [Xendit — Recover failed payments](https://docs.xendit.co/docs/recover-failed-payments) | Published 4 Dec 2024; updated 19 Jun 2025 | Up to five ranked channels; retries; one-time recovery links. The one-time method is not saved as the subscription's future method. A concrete basis for the durable-repair hypothesis. |
| G18 | [GoCardless — Introduction to Success+](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success) | Undated | Intelligent retry selection, configurable windows/limits/delay and high-failure filtering. Reported recovery percentages are product claims and vary by customer. |
| G19 | [Primer — Observability](https://www.primer.io/manage/observability) | Undated | Cross-provider analytics, anomaly identification and A/B experimentation already exist. Supports viewing experimentation as baseline product capability rather than novel invention. |

### Additional discovery: naming ambiguity and public project overlap

- [RecoverAI at tryrecoverai.com](https://tryrecoverai.com/) advertises an early beta using CSV estimates, AI-timed retries and personalized messages. It makes claims about Stripe's defaults that should not be repeated as fact; Stripe's own documentation describes sophisticated Smart Retries. This site is evidence of a crowded concept, not reliable performance proof.
- The exact `recover.ai` domain could not be retrieved in this search. Multiple unrelated similarly named businesses appeared. Do not merge them into one competitor or infer that the exact domain's business is inactive.
- [Pen-ball/recover-ai](https://github.com/Pen-ball/recover-ai) and [Renukaprasad-dev/recoverai](https://github.com/Renukaprasad-dev/recoverai) publicly describe Razorpay-oriented revenue-recovery projects with diagnosis, policy bounds, payment links, verified outcomes and audit trails. Their READMEs mention a Track 3; that does **not** establish they are submissions to this two-track ISB challenge. The repositories were not executed or audited. They are evidence that the generic architecture is common, not evidence of successful businesses or validated revenue results.

## Immediate merchant discovery before choosing

Ask one merchant to walk through five recent lost or difficult orders, with personal data removed. For each, record the event that started the problem, what the customer actually said, what data the merchant needed, the action that eventually worked, and whether the customer returned. Look for repeated decisions that required reading and coordination, not merely waiting for a bank retry. If no example fits a proposed concept, deprioritize it regardless of how attractive its AI demo looks.

The best next step is not adding another broad feature. It is choosing one recurring failure pattern with accessible evidence, a permitted action, and a outcome that the prototype can verify in front of a judge.
