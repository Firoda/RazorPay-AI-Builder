# Razorpay research archive and decision history

**Compiled:** 13 October 2026  
**Research covered:** existing research and discussion from 6–13 October 2026  
**Challenge:** Razorpay × ISB AI PM Build Challenge, Recover and Grow with AI  
**Current decision:** proceed with **SeatSaver**  
**Scope:** consolidation only. No new internet research, interviews, product testing or implementation was performed to prepare this file.

## How to read this archive

This document records the research performed, products explored, problems considered, evidence found, limitations identified and changes in recommendation. It includes the later review research and reusable-balance analysis that previously existed only in the conversation.

The user's latest decision is to stick with SeatSaver. Other concepts are retained as research history, not renewed recommendations to change direction. An earlier report recommends retiring SeatSaver; it is preserved in an explicitly historical appendix and does not override the current decision.

There are two layers:

1. **The consolidated account below:** research methods, product and competitor maps, review evidence, later concepts, balance critique, comparison and qualifications.
2. **Six complete historical records:** the original opportunity report, broader-concepts reassessment and four research modules. These preserve the detailed idea cards, sources, examples, counterexamples, evaluation suggestions and original reasoning.

Some overlap between the original reports is deliberate: preserving the full records avoids losing their supporting details. Repeated citations are not independent corroboration. Headings in the historical records are adjusted to fit this document; their text is otherwise preserved.

The source index at the end deduplicates web addresses. It is a navigation aid, not a statement that every URL was successfully opened or freshly verified during this compilation.

### Contents

- [1. Decision history](#decision-history)
- [2. Research process](#research-process)
- [3. Razorpay product map](#product-map)
- [4. Competitors and international patterns](#competitors)
- [5. Problem and idea index](#idea-map)
- [6. Detailed review findings](#review-research)
- [7. Later review-driven concepts](#later-concepts)
- [8. Reusable-balance proposal and critique](#balance-proposal)
- [9. SeatSaver versus reusable balance](#comparison)
- [10. Findings relevant to SeatSaver](#seatsaver-findings)
- [11. Evidence limitations and corrections](#evidence-limits)
- [12. Recoverable search trail](#search-trail)
- [13. Original files and provenance](#provenance)
- [Appendix A. Original opportunity research](#archive-a)
- [Appendix B. Broader-concepts reassessment](#archive-b)
- [Appendix C. Global competitor research](#archive-c)
- [Appendix D. Merchant problem research](#archive-d)
- [Appendix E. Startup frontier research](#archive-e)
- [Appendix F. Platform and API boundaries](#archive-f)
- [Consolidated web-source index](#source-index)

<a id="decision-history"></a>
## 1. Decision history

| Stage | Investigation or user feedback | Conclusion at that stage | Status now |
|---|---|---|---|
| Initial sweep | Find distinctive problems across Razorpay, competitors, startups, regions and merchant workflows. | Paid-booking rescue ranked first for a clear demonstration; contested delivery and short-payment resolution were alternatives. | Preserved in Appendix A. |
| Initial SeatSaver selection | Payment confirms after the original booking expires. | Offer an available alternative matching the customer's constraints, or resolve refund. | Selected direction. |
| Breadth and integration challenge | User questioned the niche trigger and need for booking/inventory access or Shopify. | Accepted as material constraints; no Shopify market-share statistic was established. | Still relevant. |
| Broader concepts | Seek meaningful AI with less inventory dependence. | Recommended payment objection repair; considered commitment recovery and recovery-spend optimization. | User rejected objection repair. |
| Reusable balance | Customer proposed spending confirmed money at the same or another merchant, with refund choice. | Investigated wallet competition, regulation, funding, accounting, incentives and AI fit. | Not selected. |
| Two-way comparison | Compare SeatSaver and reusable balance across common lenses. | SeatSaver 63/100; cross-merchant balance 41/100 using our judgment-based weights. | Historical analysis, not official scoring. |
| Reviews and product audit | Find recurring Razorpay complaints and potential improvements across products. | Exception diagnosis, capability enablement and refund-promise execution were useful leads. | Retained as evidence and alternatives. |
| Exception Resolver explanation | Explain with a paid student whose course remains locked. | Clarified separate payment, mandate, subscription and access states; acknowledged integration and RAY overlap. | User remained unconvinced. |
| Latest user decision | Stick with SeatSaver and consolidate existing research. | Archive the work without new searching. | Governs this document. |

No stage established majority-user coverage, measured incremental revenue, independent market size or merchant willingness to pay. Rankings helped choose a prototype under uncertainty.

<a id="research-process"></a>
## 2. Research process

### 2.1 The challenge and selection criteria

We read the supplied [challenge PDF](</Users/adityafiroda/Downloads/RazorPay/RazorpayxISB_BuildChallenge.docx (1).pdf>) as evidence about the competition, not instructions to submit anything or contact anyone.

The relevant requirements were a clear merchant problem, triggering signal, useful AI decision, concrete action, merchant control, learning, failure handling and business outcome. The brief allowed synthetic data and a clickable or working prototype with assumptions disclosed. It allowed meaningful improvements to existing products.

This shaped the research: an idea had to make sense beyond a polished chat. We asked where the necessary data comes from, what action is permitted, why ordinary rules are insufficient, which existing product is closest, and what a short demonstration can actually prove.

### 2.2 Workstreams

| Workstream | Material examined | Main question | Record |
|---|---|---|---|
| Global payments and billing | Official provider documentation and recovery products in several regions. | What is already standard, and what remains beyond retries or reminders? | Appendix C |
| Merchant problems | Shipping support workflows, bookings, accounting documentation and public accounts. | Where does purchase intent survive but operational facts block completion? | Appendix D |
| Startup frontier | YC profiles, product documentation, TechCrunch discovery and vertical software. | Are apparently novel ideas already offered by specialists? | Appendix E |
| Razorpay platform | Agent Studio, RAY, APIs, webhook/refund states and challenge synthesis. | What exists natively, what data is accessible and what must be simulated? | Appendix F |
| Broader-concept reassessment | Feedback tools, payment-link actions and merchant-context requirements. | Can meaningful AI work with lighter integration? | Appendix B |
| Balance proposal | Wallets, instant refunds, payment lifecycle and RBI materials. | Who benefits, who owes the money and what structure is required? | Sections 8–9 |
| Review-led audit | G2, Capterra, Trustpilot, Reddit, public escalations and official product pages. | Which concrete frustrations suggest a useful improvement? | Sections 3, 6–7 |

### 2.3 Evidence hierarchy

**Official documentation** established supported workflows and API behavior, not universal account access or flawless execution.

**Vendor pages and company-authored YC profiles** established advertised competition. Performance claims were not independent audits.

**TechCrunch** helped discover companies and verticals. Funding was not treated as proof of effectiveness or Indian merchant demand.

**Reviews and forum posts** supplied concrete situations and questions to investigate. They did not establish frequency, exact cause, legal liability or the merchant's integration configuration.

**Our concepts, ratings and examples** were proposals. Invented amounts, orders, calendars and conversations were synthetic illustrations.

The repeated filters were breadth within a plausible segment, revenue connection, data burden, useful AI work, native overlap, external competition, permissions, reliability, economics and a small honest demonstration.

### 2.4 What the work did not include

It did not include merchant interviews, a production experiment, access to Razorpay's internal roadmap, proof that every advertised feature is available, or an exhaustive search of the whole internet. Discovery questions and prototype schedules in the reports were suggestions, not completed work.

<a id="product-map"></a>
## 3. Razorpay product map

This groups the India-facing portfolio examined during the research. Products, APIs and payment methods are grouped rather than counted as separate SKUs. Public listings do not guarantee availability for every merchant. Proposed gaps below are hypotheses, not verified absent features.

| Product family | Products or capabilities explored | Possible improvement considered | Assessment and dependency |
|---|---|---|---|
| Payment acceptance | Payment Gateway/Aggregator, web/app checkout and APIs. | Investigate ambiguous failure or conflicting records. | Useful, but overlaps RAY; needs a specific resolution workflow. |
| No-code collection | Payment Links, Pages, Buttons, Webstore and Invoices. | Interpret blockers, permitted timing/partial-payment replies or setup problems. | Lower inventory need, but requires approved terms and customer context. |
| Recurring billing | Subscriptions, plans, links, UPI AutoPay, cards and eMandates. | Resolve payment/mandate/access mismatches and fix future renewals. | Strong examples; one-time payment is not recurring permission. |
| Bank-transfer collection | Smart Collect and virtual accounts. | Interpret remittances covering multiple invoices, deductions or partial payments. | Needs invoice/advice data; basic reconciliation exists. |
| Faster checkout | Magic Checkout, Flash Checkout and TokenHQ. | Investigate a specific checkout friction or operational inconsistency. | Crowded; ordinary checkout optimization is established. |
| Payment methods | UPI, Turbo UPI, cards, wallets, netbanking, EMI and pay-later options. | Explain missing capability or unsupported route. | Eligibility is primarily rules; AI can interpret error evidence. |
| Optimization | Optimizer, Smart Router, multiple providers and fallbacks. | Translate merchant constraints or commercial terms into recommendations. | AI routing and cost optimization already exist. |
| Payment operations | Orders, authorization, capture and webhooks. | Establish a trustworthy timeline before a business decision. | State synchronization belongs in code; payment is not fulfillment. |
| Refunds | Standard/Instant Refunds, events and tracking. | Compare a refund promise with actual initiation and outcome. | Does not confer refund authority or accelerate the bank. |
| Settlements | Schedules, Instant Settlements, reporting and Recon. | Explain a specific discrepancy and assemble evidence. | Strong native overlap; valid deductions are not missing money. |
| Disputes | Chargebacks, evidence and responses. | Identify missing proof and explain case weakness. | Dispute Responder already overlaps; no guaranteed win. |
| Marketplaces | Route, linked accounts, transfers, split settlements and reversals. | Explain seller-payment disagreements against terms. | Requires marketplace data; not a consumer wallet for arbitrary merchants. |
| Partner services | Embedded payments and onboarding APIs. | Diagnose incomplete activation or capability requests. | Approval remains with Razorpay/partners. |
| International | International cards/local methods, global collections, INR settlement and remittance documents. | Diagnose account-specific acceptance issues and prepare enablement requests. | No automatic bypass of authentication or risk policy. |
| Offline/omnichannel | POS devices, Smart Mini POS, QR, Billme and Recon. | Resolve receipt-versus-cashier payment disagreement. | Broad relevance; authoritative verification is deterministic. |
| Growth/loyalty | Engage, Offers Engine, Gift Cards, Loyalty Wallet, Billme, Contextual Marketing and Enterprise Loyalty. | Measure incremental profitable purchases and avoid unnecessary incentives. | Requires experiments; wallet refunds overlap the balance idea. |
| Business banking | RazorpayX current accounts via partner banks, payouts, Payout Links, bank verification, Escrow+, tax, forex/FDI and accounting integrations. | Investigate blocked payouts and approval/bank handoffs. | Useful, but closer to finance operations than chosen growth track. |
| Procurement/payables | Source to Pay, vendor payments and AP Automation. | Resolve invoice/contract/approval contradictions. | Meaningful document task, with existing automation and system dependencies. |
| Payroll | Startup/SME, CA and enterprise payroll. | Explain exceptional salary or policy/document cases. | Weaker Recover and Grow fit. |
| Credit/business services | Capital, Line of Credit, corporate cards, lending infrastructure and company registration. | Assemble missing application evidence or explain spending exceptions. | More dependencies; not a leading prototype direction. |
| Merchant AI | Agentic Onboarding, Integration, Dashboard and RAY. | Improve a specific exception from diagnosis through verified completion. | Direct native competition; another assistant is insufficient. |
| Operational agents | Agent Studio cart, COD, KYC, dispute, feedback, mandate and subscription agents, plus industry workflows. | Solve a narrow decision between payment and customer outcome. | Existing categories and controls set the baseline. |
| Finance agents | Insights, Receivables, Payout, Bookkeeping and Reporting. | Improve one document or handoff exception. | Generic follow-ups overlap; Tax Payments and Reimbursement agents were labelled upcoming. |
| AI commerce/infrastructure | Agentic Payments, AI-builder integrations, MCP/Replit/n8n-related tooling and Vulcan. | Investigate agent-initiated purchase failures or permission mismatch. | Adjacent exploratory area; weaker review validation. |

Portfolio sources already examined: [Razorpay](https://razorpay.com/), [Payments docs](https://razorpay.com/docs/payments/), [Magic Checkout](https://razorpay.com/magic-checkout/), [UPI](https://razorpay.com/upi/), [Subscriptions](https://razorpay.com/subscriptions/), [Smart Collect](https://razorpay.com/smart-collect/), [Optimizer](https://razorpay.com/optimizer-intelligent-payments-routing/), [Route](https://razorpay.com/docs/payments/route/), [international payments](https://razorpay.com/accept-international-payments/), [POS](https://razorpay.com/pos/), [Engage](https://razorpay.com/engage/), [RazorpayX](https://razorpay.com/x/), [AP Automation](https://razorpay.com/x/ap-automation/), [Agentic Payments](https://razorpay.com/agentic-payments/), [Vulcan](https://razorpay.com/foundation-model/) and [Agentic Business Banking](https://razorpay.com/agentic-business-banking/).

### 3.1 Native overlap that changed the shortlist

- **RAY** already advertised payment summaries, recovery links, diagnostics, forecasts and actions. WhatsApp or voice was not a differentiator. [RAY](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/)
- **Agentic Dashboard** already described statement/complaint interpretation and recovery actions. Screenshot-to-payment-link was not new. [Agentic Platform](https://razorpay.com/blog/razorpay-agentic-platform/)
- **Agent Studio** already occupied cart, subscription, mandate and dispute recovery categories. [Agent Studio](https://razorpay.com/agent-studio/)
- **Risk review** already had a described live dashboard with document-level status, preserved context, specific requests and AI pre-analysis. This weakened a generic held-settlement document assistant. [Razorpay AI Labs](https://www.linkedin.com/pulse/our-obsession-merchant-experience-breaking-risk-review-black-n2ntc)
- **Receivables** already included tracking and follow-up agents. A particular blocker might remain useful, but reminders alone were insufficient. [Business banking agents](https://razorpay.com/agentic-business-banking/)
- **Refunds/loyalty** included eligible instant source refunds and same-brand wallet refunds. [Instant Refunds](https://razorpay.com/docs/payments/refunds/instant/), [Engage refunds](https://razorpay.com/blog/how-razorpay-engage-transforms-customer-retention-with-instant-wallet-refunds/)

These findings establish overlap, not that every complaint is solved. A reported bad experience does not prove a capability is absent.

<a id="competitors"></a>
## 4. Competitors and international patterns

The detailed source ledgers and company comparisons remain in Appendices A, C and E. This overview explains what each group contributed.

### 4.1 Payments and billing

**Stripe, Adyen, Checkout.com, PayPal/Braintree, Primer and Razorpay Optimizer** showed that retry prediction, routing, authorization optimization, observability and balancing conversion/risk/cost are mature categories. A synthetic prototype could not credibly claim to outperform network-trained systems.

**Chargebee, Recurly, Churnkey, Butter Payments and GoCardless** covered dunning, eligibility, payment updates, cancellation offers and retention measurement. This led to the narrower question: can today's invoice be rescued while next month's recurring problem remains?

**Yuno NOVA, Gravy and FlyCode** weakened the novelty of conversational recovery. Outreach coordinated with payment recovery, multilingual channels and alternative payment approaches already existed. Results among contacted customers were not applied to all failed payments.

### 4.2 Receivables and deductions

**Rex, Alder, Glimpse and HighRadius** were examined for procurement portals, missing documents, disputed deductions and evidence retrieval. **Chaser** supplied payment-arrangement competition. **Zoho Books** supplied the distinction between unpaid money and recorded withholding.

This motivated short-payment resolution: determine whether the balance is genuinely collectible before chasing it. It required invoices, credits, remittance advice and approved accounting treatment. India-specific examples did not authorize an LLM to decide tax rules.

### 4.3 Returns and customer service

**Gorgias, ReturnGO, Loop, Narvar, Signals, REVER and Claimlane** showed existing exchange conversion, stock checks, policy actions, post-purchase conversations and return analytics. Offering another size or wallet credit was not enough.

Narrower possibilities included repairing the actual reason for a return, correcting a misleading promise, recovering a supplier credit after helping the customer and auditing refund execution. Each required distinguishing intent, policy, money and fulfillment.

The later audit examined **Intercom Fin** and **Zendesk**. Both already describe action-taking refund/service workflows, and Zendesk discusses verified outcomes. Therefore even a refund agent needed a precise improvement. [Fin Tasks](https://www.intercom.com/help/en/articles/9569407-fin-tasks-explained), [Zendesk outcomes](https://www.zendesk.com/blog/zendesk-insights/expertise/verified-outcomes-new-standard-for-service/)

### 4.4 Bookings and services

**Square Appointments, Fresha and Zenoti** were checked for waitlists, deposits, scheduling, preferences and capacity refill. **Toma** and **CentralComs** showed vertical voice agents for intake, booking and follow-up.

For SeatSaver, this ruled out claiming that preference-aware rescheduling itself was new. The proposed distinction was the payment-confirmation/expired-booking exception for a merchant whose separate systems do not already resolve it. That remaining gap was not validated with merchant interviews.

### 4.5 Additional work and scope creep

The ExtraProof investigation asked whether approved and delivered work was lost before final billing. We found **Addenly, With Oversight, ClarAccord, Rigby, Clearstory, Adaptive, Procore, Siteline, Accelo and Monograph** covering messages, scope changes, approvals, field evidence, billability and invoices.

The useful nuance was evidence handling: distinguish requested, priced, approved, delivered, already billed, waived and disputed work. An hourly cap is not earned revenue. A request or silence is not approval to charge. Appendix E preserves the detailed competitor check and counterexamples.

### 4.6 Wallets and refunds

**Razorpay Engage, Wallet as a Service, Pine Labs brand wallets/refunds, Amazon Pay Balance, Cashfree Instant Refunds and Cashfree Pay** established that merchant credit, gifts/rewards, regulated wallet value and cross-merchant spending are existing but distinct models.

We did not assume a gift balance can be withdrawn, or that any Razorpay merchant automatically accepts a hypothetical network balance. Section 8 preserves these distinctions.

### 4.7 Measurement, feedback and exploratory leads

**Statsig** supplied randomized-experiment principles. **Braze** showed existing AI promotional-spend optimization. **Contentsquare** overlapped customer feedback and friction analysis. **Baymard** supplied checkout-friction research, with no transfer of its shopper statistics to Indian SMEs.

Later fee-audit searches surfaced **Spendback** and **InvoRec**. Their search-visible positioning concerned commercial-term/invoice validation and billing recovery. This remained a weak exploratory lead: no widespread Razorpay billing-error problem was established. [Spendback](https://spendback.ai/pricing), [InvoRec](https://www.invorec.com/)

### 4.8 Regional lessons

| Region / provider | Pattern examined | Transferable lesson | Boundary |
|---|---|---|---|
| Southeast Asia / Xendit | Delayed confirmation after expiry; one-time recovery versus future recurring method. | Separate money state, order viability and recurring permission. | Not an Indian incidence estimate or proof of identical Razorpay behavior. |
| Africa / Paystack | Subscription recovery, authorization updates and failed-but-debited cases. | Establish authoritative money state before another demand. | Provider-specific, not continent-wide. |
| Brazil / Banco Central and dLocal | Pix recurring permission and retries. | Authorization and individual collection have distinct states. | Do not apply Pix rules to UPI. |
| Europe/global / Adyen and GoCardless | Conversion, risk, cost, retry limits and eligibility. | Wait, stop, clarify and escalate can be correct. | No synthetic-data claim of superior prediction. |
| North America / billing and vertical tools | Retention, evidence-driven recovery and service workflows. | Solve a particular operational decision. | Funding is not Indian product-market fit. |

### 4.9 TechCrunch and YC

TechCrunch coverage of [Glimpse](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/), [Toma](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/) and [REVER](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/) helped discovery. Functional comparisons chiefly used product documentation and company profiles.

YC companies examined included Rex, Alder, Glimpse, FlyCode, Signals, REVER, Toma, CentralComs and Clearest Health. The healthcare example supplied only the pattern of a narrow evidence-based recovery process, not a proposal to copy US healthcare claims into this challenge.

<a id="idea-map"></a>
## 5. Problem and idea index

These are existing ideas and variants, not new proposals. Full original idea cards follow in the appendices.

| Idea | Problem/action | Why considered | Main weakness / decision |
|---|---|---|---|
| **SeatSaver / paid-booking rescue** | Confirmed payment after expired booking; valid alternative or refund. | Customer constraints and concrete completion. | Narrow trigger, booking integration; **selected**. |
| Contested delivery rescue | Buyer disputes courier reason; prepare evidence and reattempt. | Documented operational conflict. | Shipping access, courier execution and incumbents. |
| Short-payment resolver | Explain a remainder before collection. | Messy evidence and useful abstention. | Accounting dependencies and AR competition. |
| Durable renewal repair | Today's invoice paid, future mandate still broken. | Separates immediate and lasting recovery. | Could reduce to an update-method flow. |
| Recovery coordinator/referee | Prevent conflicting cart/payment/refund outreach. | Stop unnecessary contacts and discounts. | Unmet demand unverified; many controls are rules. |
| Feasible-basket recovery | Original stock/price/delivery promise becomes stale. | Preserve intent with a valid replacement. | Inventory and fulfillment dependencies. |
| ExtraProof | Approved delivered extras omitted from bill. | Agreement and evidence interpretation. | Close competitors; strict consent/billability limits. |
| Supplier remedy recovery | Customer helped but supplier credit missed. | Tracks a second recovery obligation. | Supplier rules, claim records and reconciliation. |
| Product-promise repair | Repeated returns reveal misleading wording. | Feedback-to-approved-change loop. | Existing analytics; effect unproven. |
| Cancellation backfill | Empty slot needs a compatible opted-in customer. | Language constraints and deposit action. | Crowded scheduling tools and calendar access. |
| Return-intent repair | Requested exchange unavailable. | Solve actual return reason. | Inventory and returns-platform competition. |
| Payment-to-access rescue | Correct payment but service locked. | Repair paid customer outcome. | Entitlement adapter; simple cases are automation. |
| Restore value before renewal | Prior service failure blocks willingness to pay. | Address cause rather than nag. | Service evidence and policy authority. |
| Authorized payer handoff | User differs from person permitted to pay. | Education/family/business nuance. | Consent, identity and payer authority. |
| Administrative invoice blocker | Missing PO/entity/completion proof. | Remove the obstacle to collection. | Existing AR tools and documents. |
| Small deduction recovery | Evidence effort exceeds small claim value. | Evidence-sensitive economics. | Specialist competition and uncertain volume. |
| Refund trace before win-back | Unresolved refund while customer is asked to repurchase. | Appropriate timing and trust. | Tracking exists; bank delay is not an AI fix. |
| Bounded booking continuity | Temporary failure threatens a booked experience. | Policy-limited continuity option. | Merchant risk, capacity and consent. |
| Payment objection repair | Misunderstanding stops payment. | Lighter inventory needs. | User rejected; price/suitability may be the true objection. |
| Payment commitment recovery | Reply reveals timing, deposit or document need. | Concrete permitted collection action. | Existing receivables agents and merchant policy. |
| Recovery-spend optimization | Contacts/incentives get credit for organic payments. | Incremental contribution focus. | Needs experiments, not synthetic uplift claims. |
| Reusable Razorpay balance | Confirmed money becomes spendable value elsewhere. | Preserves purchasing power. | Wallet overlap, regulation, ledger, incentives, weak AI role. |
| Payment Exception Resolver | Payment, mandate, access and support disagree. | Evidence-driven resolution. | RAY overlap and action integration; not selected. |
| Refund Promise Auditor | Promised refund lacks corresponding action. | Understand natural-language commitment. | Retention/dispute benefit; existing service-agent competition. |
| Payment Capability Doctor | Enablement failure looks like code failure. | Resolved public example. | Mainly prerequisites; provider authority needed. |
| Integration readiness audit | Setup/deployment breaks callback or state handling. | Prevent customer-impacting failures. | Code/log access; native integration tools. |
| Promise/configuration check | Merchant statement conflicts with enabled behavior. | Relate language to actual capability. | Exploratory variant, no established prevalence. |
| Fee/contract audit | Charges need explanation against agreed terms. | Contract interpretation. | Billing errors not established as common. |
| Hold-release document helper | Gather evidence for settlement review. | Visible merchant pain. | Existing Razorpay risk-review system. |
| Generic support/retry/reconciliation bot | Status, reminders, retries or matching. | Easy demonstration. | Existing native products and limited differentiation. |

<a id="review-research"></a>
## 6. Detailed review findings

### 6.1 Method and evidence quality

We inspected individual review text and, where accessible, company responses and discussion updates. Merchant/developer problems were separated from end-customer complaints. Positive reviews with specific criticisms were useful counterevidence.

No complaint rate was calculated. Some reviews were incentivized, some pages returned cached content and some posts promoted products. A resolved case could reveal a useful diagnostic problem without proving an ongoing outage.

### 6.2 Subscription failures lack actionable explanations

A [recurring-subscription discussion](https://www.reddit.com/r/indianstartups/comments/1iukxql/issues_with_razorpay_for_recurring_subscriptions/) described failed debits and disagreement between displayed reasons and customers' statements about funds. Neither balances nor processor responsibility were verified.

Search material also surfaced a Capterra account attributed to Naman B., dated 22 August 2026, describing a mandate failure resolved by support and a desire for clearer self-service diagnostics. Some Capterra opens returned older cached content, so this dated account had weaker retrieval provenance than the fully opened cases. It should not be the sole basis for a product claim. [Capterra page examined](https://www.capterra.com/p/179263/Razorpay/reviews/?page=2)

**Implication:** determine whether the next supported step is authorization, retry, waiting or escalation. Do not replace an authoritative rejection reason with an AI guess. Generic subscription outreach already overlaps Agent Studio.

### 6.3 Captured payment, inactive subscription or access

A 31 July 2026 [SaaS merchant account](https://www.reddit.com/r/Razorpay/comments/1vbqa46/razorpay_is_the_shittiest_pg_i_have_ever/) described manual capture, a subscription awaiting authorization and blocked application access. A separate [merchant account](https://www.reddit.com/r/indianstartups/comments/1tgmey3/having_an_awful_experience_with_razorpay_i_am_fed/) described confusing capture/refund/subscription behavior.

Neither established the root cause. Manual capture does not prove the subscription should activate. The useful question was how to link the exact payment, invoice, mandate, subscription schedule and merchant entitlement before recommending a remedy.

**Implication:** investigate before asking for another payment. Restoring access needs merchant authority and a small adapter or human action.

### 6.4 Product enablement mistaken for integration failure

The fully opened [test-mode subscription thread](https://www.reddit.com/r/Razorpay/comments/1vhzgnz/razorpay_subscriptions_in_test_mode_always_fail/) described SERVER_ERROR before the mock bank page. The author later confirmed that activation/KYC and Subscriptions enablement resolved it and thanked support.

A [UPI AutoPay developer account](https://www.reddit.com/r/UPI/comments/1x03wrc/what_i_learned_integrating_razorpay_subscriptions/) discussed test/live enablement differences. Cross-posts were counted once.

**Implication:** check account capabilities, prepare an exact request and verify afterward. This is not a universal statement about all test accounts. AI cannot approve KYC or enable a restricted product.

### 6.5 International acceptance

A [merchant discussion](https://www.reddit.com/r/indianstartups/comments/1td54mx/razorpay_is_silently_killing_my_international/) included an update attributing resolution to support enabling non-3DS acceptance. The original complaint was not used as proof of a continuing outage; projected revenue improvement was not measured uplift.

**Implication:** cluster observed errors and route evidence to the appropriate team. Do not recommend weakening authentication universally; account eligibility and risk decisions matter.

### 6.6 Refund promised but not successfully issued

The [TradingView thread](https://www.reddit.com/r/TradingView/comments/1w6ds2j/refund_issue/) was opened directly. The customer described cancellation/refund promised by support, lost access and money not received. The account posting as TradingView acknowledged an issuing problem and said it had tried again. Final bank receipt was not confirmed in inspected replies.

This was a merchant execution example involving Razorpay as processor, not proof Razorpay caused the issue. Relative-date displays varied across retrieved views, so the preserved finding is the sequence rather than an exact elapsed-time estimate.

**Implication:** compare actual commitments with refund objects. Distinguish approval from review, missing initiation from processing, and an existing refund from a need to create another.

### 6.7 Settlement explanation and reporting

On the fully accessed [G2 page](https://www.g2.com/products/razorpay/reviews?like_me_login=true&page=4), Aman C.'s 25 August 2026 review praised accurate settlement files while finding custom CSV exports cumbersome. This supports a usability issue, not absent or inaccurate reporting.

A [settlement escalation account](https://www.reddit.com/r/Razorpay_Community/comments/1wuu9ru/razorpay_settlement_stuck_despite_multiple/) described processed attempts/references without observed bank credit. The cause and final outcome were not established.

The [“settlements are always short” post](https://www.reddit.com/r/Razorpay/comments/1skd2nr/razorpay_settlements_are_always_short_anyone_else/) was downgraded because the author promoted a related product and similar material was cross-posted.

**Implication:** prepare a discrepancy-specific packet rather than another dashboard. Arithmetic and ID matching are not AI; document/context interpretation may be. Recon and RAY already overlap.

### 6.8 Dispute evidence and deadlines

Adesh O.'s 26 August 2026 [G2 review](https://www.g2.com/products/razorpay/reviews?like_me_login=true&page=4) praised refund handling but disliked evidence windows. Trustpilot material included dissatisfaction with explanations of rejected evidence; this did not establish an incorrect liability decision. [Trustpilot](https://www.trustpilot.com/review/razorpay.com)

**Implication:** identify missing proof and deadlines, but Dispute Responder is already close competition. AI does not alter network rules or guarantee success.

### 6.9 Support ownership and handoffs

A [merchant discussion](https://www.reddit.com/r/IndiaBusiness/comments/1vo58ol/thinking_of_switching_from_razorpay_anyone_else/) described repeated explanations and unclear ownership. The directly opened Capterra page included a February 2025 repeated-ticket complaint and a positive May 2025 review requesting faster peak-period support.

Trustpilot material included incomplete Magic Checkout activation and requests for human fallback. Replies offering help were not counted as resolution. A public [RazorpayX escalation](https://www.linkedin.com/posts/ashwin-shankar-079b55bb_razorpayx-has-stalled-our-entire-vendor-payout-activity-7390960921772208128-xhMk) described an alleged bank/platform document handoff problem; responsibility was not independently established.

**Implication:** one case timeline, exact missing information and a real escalation destination. Drafting a better summary alone is not resolution.

### 6.10 Counterevidence and boundaries

Some reviews praised support, reliability, refunds and accurate reporting. The defensible theme was difficult or uneven exception handling, not that the entire platform fails. We did not establish common lost money, false bank reasons, widespread billing errors, majority-user incidence or a right for AI to release funds.

<a id="later-concepts"></a>
## 7. Later review-driven concepts

### 7.1 Payment Exception Resolver

**Job:** establish what happened when customer messages conflict with payment, subscription, refund or merchant records, then propose a permitted remedy.

The explanation used a hypothetical ₹1,499 online-learning subscription. If the correct invoice is paid, the subscription active and access blocked because the application missed a notification, an agent could propose an approved access repair. This was not a claimed diagnosis of the Reddit case.

Counterexamples matter: a small authorization charge is not the subscription fee; unresolved payment should not trigger another demand; a refund in flight should be tracked; and a one-time payment does not authorize recurring debits.

AI would interpret complaints, history and logs, link evidence and ask missing questions. Code would verify payment facts, references, permissions and allowed transitions. Access restoration needs a merchant endpoint or manual action. Without it, the product investigates but cannot itself restore service.

A suggested demo had three cases with different correct outcomes, an evidence panel and approval. A single successful-payment-to-unlock rule would not demonstrate an AI advantage.

RAY and the Agentic Dashboard already advertise diagnosis. The specific workflow would need to outperform the existing experience in a demonstrable way. Public evidence did not establish that RAY lacks it.

**Decision:** explained to the user and not selected.

### 7.2 Refund Promise Auditor

**Job:** find an approved refund commitment that did not become the expected payment action.

The hypothetical example was support promising ₹2,000 initiation that day while no matching refund exists later. The agent extracts amount, conditions and transaction; checks real refund records; distinguishes “approved” from “we will review”; and prepares an approved correction. It must not issue a duplicate because the bank has not yet credited an existing refund.

An upload of selected support messages and refund history could demonstrate the task without inventory integration. Production monitoring still needs authorized support access.

The benefit is reliable service, fewer repeated complaints and potentially fewer disputes or lost customers. Refunded rupees are not recovered revenue. Intercom/Zendesk competition and thinner evidence for the precise gap limited the novelty claim.

### 7.3 Payment Capability Doctor

**Job:** identify a missing account capability or environment difference that looks like code failure.

The proposed demo used logs and a labelled configuration snapshot, prepared an activation request, then verified after an authorized change. It did not approve KYC or disable authentication.

Prerequisite checks are rules. AI helps interpret varied errors and supporting material. This was considered a case inside the Exception Resolver, not necessarily an independent product.

### 7.4 Other exploratory variants

Integration readiness auditing would examine callbacks/transitions after setup or deployment; it requires logs/code and overlaps Agentic Integration. Promise-versus-configuration checking would compare published claims with supported payment/refund behavior; it overlapped earlier clarification ideas. Fee auditing would compare charges with terms, but no frequent billing-error problem was established.

<a id="balance-proposal"></a>
## 8. Reusable-balance proposal and critique

### 8.1 The proposal

After a booking becomes unavailable and delayed payment confirms, retain the money as spendable Razorpay value. The customer could use it with the same or another accepting merchant, or request a refund.

The customer insight was preserving purchasing power after an unsuccessful purchase. The critique separated that benefit from the wallet/network product needed to deliver it.

### 8.2 Different versions

| Version | Benefit | Main issue |
|---|---|---|
| Same-merchant credit | Future purchase opportunity at the original merchant. | Strong Engage/brand-wallet overlap; issuing credit is not a sale. |
| Cross-merchant balance | More spending choice and potential network retention. | Original merchant loses the sale; requires acceptance and real settlement. |
| Refundable/withdrawable value | Choice to spend or redeem unused eligible value. | Ongoing customer obligation and defined instrument/redemption rules. |

Loyalty credit, gift value, closed-system instruments and regulated wallets were not interchangeable.

### 8.3 Money-flow example

The hypothetical example was ₹2,000 originally paid to ticket merchant A, ₹1,500 then spent at hotel B and ₹500 remaining.

A's failed purchase must be reliably cancelled/reconciled. The customer must choose an eligible treatment, and the original merchant/refund entitlement cannot remain conflicting. B needs a new valid payment for a new order. The remaining ₹500 is owed to the customer. A later B refund needs a defined destination and funding path.

If A has already received settlement, editing a balance cannot fund B. From A's perspective, spending at B retains none of the original sale. Platform volume and consumer convenience are different metrics.

### 8.4 Payment lifecycle and ledger issues

- A customer's debit screenshot is not proof of spendable funds.
- Issuing value before confirmation requires an advance and loss risk.
- Waiting for confirmation leaves the initial uncertainty unresolved.
- Authorization, capture and settlement are separate; ordinary capture settings do not permit an indefinite hold.
- Captured money may still face refunds or disputes.
- A successful retry plus late original payment must follow duplicate-payment handling, not produce another credit.
- An order can remain marked paid after its payment is refunded; that field alone is insufficient.
- An issued refund cannot be assumed cancellable when the customer changes preference.
- Two tabs cannot both spend/refund the same balance; atomic reservations and reconciliation are required.
- Replayed events, partial spend, interrupted actions and later chargebacks require a proper financial ledger.

Sources already checked: [payment lifecycle](https://razorpay.com/docs/payments/payments), [capture settings](https://razorpay.com/docs/payments/payments/capture-settings/), [capture API](https://razorpay.com/docs/api/payments/capture), [late authorizations](https://razorpay.com/docs/payments/payments/late-authorisation), [handling late authorizations](https://razorpay.com/docs/payments/payments/late-authorisation/handle), [orders entity](https://razorpay.com/docs/api/orders/entity/) and [refund FAQ](https://razorpay.com/docs/payments/refunds/faqs/).

### 8.5 Regulatory findings from the earlier check

This records the previous analysis; it is not a new legal review or a conclusion that every possible structure is prohibited.

The PPI Master Directions endpoint checked then showed an update dated 30 September 2026. Section 14.3 distinguishes return of value originally paid from a PPI from refunds for transactions paid using another instrument. The latter cannot simply be credited to a PPI under that provision. Customer opt-in or possession of a wallet authorization did not by itself resolve that specific concern. [PPI Directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12156)

PA directions separately describe original-method refunds unless the payer specifically instructs an alternate mode belonging to that payer. We did not treat that as an automatic exception to the PPI-specific rule. PA escrow also is not a freely reusable pool for other business. [PA Directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12896)

The RBI list included Razorpay Technologies Private Limited for PPI issuance and Razorpay Payments Private Limited for payment aggregation. Therefore “Razorpay has no PPI licence” was explicitly rejected as an explanation. The entities and exact flow still matter. [Authorized systems](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=12043)

A production design would have to distinguish cancelled-sale refund, new wallet load, merchant credit and uncaptured authorization. The research did not establish a compliant production architecture for the cross-merchant refundable proposal.

### 8.6 Competition and substitutes

| Product examined | Relevance |
|---|---|
| [Engage wallet refunds](https://razorpay.com/blog/how-razorpay-engage-transforms-customer-retention-with-instant-wallet-refunds/) | Close same-brand refund-retention model. |
| [Wallet as a Service](https://razorpay.com/blog/incentivise-the-right-way-and-boost-customer-allegiance-with-razorpay-wallet-as-a-service/) | Existing balances, incentives and redemption infrastructure. |
| [Pine Labs refunds](https://www.pinelabs.com/prepaid-solutions/refunds) / [brand wallet](https://www.pinelabs.com/prepaid-solutions/brand-wallet) | Existing merchant credit/refund alternatives. |
| [Amazon Pay Balance](https://www.aboutamazon.in/news/retail/how-to-use-amazon-pay-balance) | Network analogy with distinct Wallet and Gifts & Credits. |
| [Cashfree Instant Refunds](https://www.cashfree.com/instant-refunds/) / [PPI terms](https://www.cashfree.com/ppi-tnc/) | Original-source speed and separate stored-value structures. |
| [Razorpay Instant Refunds](https://razorpay.com/docs/payments/refunds/instant/) | A supported source refund may already restore purchasing power, subject to fees/eligibility/fallback. |

### 8.7 Ownership, incentives and economics

The payer may differ from the booking contact: a parent might pay for a student. Identity and redemption cannot be inferred from a phone number alone. Another Razorpay merchant is not automatically an accepting merchant for the hypothetical instrument.

Merchant A may not subsidize an incentive that sends demand to B. B needs reliable settlement and clear dispute responsibility. A customer may prefer the original-source refund rather than onboarding into another balance.

Issued value is a liability. Redemption is a subsequent purchase, and some of it may have happened without the product. Counting ₹2,000 issued plus ₹1,500 spent as ₹3,500 recovered would be wrong. Costs include incentives, funding, operations, support and losses.

The original trigger stayed narrow: late confirmation plus an unfulfillable purchase. Broadening to all eligible refunds would change scope and increase incumbent overlap. Razorpay's documented average of fewer than 0.5% late-authorized payments was discussed as its general estimate, not a ticketing-specific independently measured rate.

### 8.8 AI centrality

Money verification, balances, spending, settlement and redemption are primarily deterministic. AI could explain choices or interpret intent, but the core idea did not give it a sufficiently central decision for the challenge. A conversational interface would not solve that weakness.

<a id="comparison"></a>
## 9. SeatSaver versus reusable balance

This preserves the earlier judgment-based comparison of SeatSaver with the cross-merchant balance version. Scores are 1–5, higher better. Weights are ours, not the official rubric, measured outcomes or win probabilities.

| Lens | Weight | SeatSaver | Reusable balance |
|---|---:|---:|---:|
| Breadth | 15 | 2 | 2 |
| Customer benefit | 10 | 4 | 3 |
| Original merchant revenue | 10 | 4 | 2 |
| Strategic value to Razorpay | 5 | 3 | 4 |
| Low merchant-system dependence | 10 | 1 | 3 |
| Differentiation | 10 | 3 | 2 |
| Meaningful AI | 15 | 4 | 1 |
| Regulatory/money-flow feasibility | 10 | 4 | 1 |
| Operational reliability/fraud | 5 | 3 | 1 |
| Likely economics | 5 | 3 | 2 |
| Convincing quick prototype | 5 | 4 | 3 |
| **Weighted result / 100** | **100** | **63** | **41** |

Calculation: sum of weight × score ÷ 5. Equal weights gave approximately 64 versus 44. SeatSaver's AI score assumed meaningful interpretation of constraints; lowering it from 4 to 2 reduced its total to 57.

The same-merchant-only balance variant was not separately scored. It could improve merchant incentives and simplify some issues, but increased Engage overlap and did not strengthen AI substantially.

The conclusion was relative: SeatSaver was stronger between the two, while neither met both broad reach and minimal merchant integration as hard constraints. The user now chooses SeatSaver with these trade-offs understood.

<a id="seatsaver-findings"></a>
## 10. Findings relevant to SeatSaver

The selected problem is surviving customer intent after genuine payment confirmation and lost original availability. The agent offers only feasible merchant-approved alternatives and treats refund/escalation as valid outcomes.

Minimum data previously identified: payment/refund state, original booking reference, current availability, equivalence/pricing policy and explicit customer constraints. Razorpay does not know instructor preference, capacity or cancellation merely from a payment.

Razorpay need not own the merchant's entire inventory system. A narrow adapter can supply the needed facts. A demo CSV can stand in for it, but cannot erase the production dependency. Shopify is an optional integration route, not an assumption about India's merchant base.

The AI job might be interpreting “same instructor, Sunday morning, two places together.” Code must verify money, availability, permissions, amounts, refund exclusions and final reservation. With fully structured preferences and a fixed menu, ordinary rules may suffice.

Previously proposed demo cases included a successful replacement, no acceptable option, a duplicate event and a final availability check. Synthetic calendar/late authorization/communication must remain labelled. A described test API action is not evidence the current app actually performs it; this compilation did not inspect or modify the app.

A proposal is not a booking, a booking is not fulfillment and already captured money is not newly collected revenue. The suggested live metric was incremental retained contribution per eligible case against the merchant's current process, alongside incorrect confirmations, duplicate actions, time and complaints. No such pilot was performed.

Unresolved questions remained frequency, replacement acceptance, merchant-data access and incumbent coverage. The latest choice is a product decision under uncertainty, not proof those questions were measured away.

<a id="evidence-limits"></a>
## 11. Evidence limitations and corrections

1. No URLs were reopened for this compilation; it preserves earlier research.
2. Latest decision is SeatSaver; historical recommendations do not override it.
3. Product marketing is not confirmed API access or universal availability.
4. No claim of global novelty was established.
5. Reviews are not audited incidents; resolved cases and contrary accounts were retained.
6. Repeated citations, copied reviews and cross-posts are not independent evidence.
7. No verified India-wide Shopify share was established.
8. Instant refunds make a universal multi-day-refund baseline incorrect.
9. Later capture-setting checks used canonical documentation with a maximum three-day window; older cached material was not accepted as current.
10. Razorpay's relevant PPI authorization was acknowledged; exact structure was the issue.
11. Payment, order, mandate, subscription and service-access states must remain distinct.
12. The regulation discussion is preserved research, not legal approval.
13. Synthetic scenarios do not prove uplift or predictive superiority.
14. Interviews, pilot plans and economic tests in the appendices are proposed, not completed.
15. The original 6 October build-week schedule is historical, not a new schedule.
16. AI is not the ledger or scheduler: arithmetic, authentic states, locks and permissions belong in code.

<a id="search-trail"></a>
## 12. Recoverable search trail

These literal queries are recoverable from the recent product/review pass. They were not rerun. The original 6 October reports do not preserve a complete literal query log; their source ledgers and workstream notes are the record for that stage. This is not claimed to be every query ever issued.

### Portfolio and reviews

~~~text
Razorpay products payment gateway payment links subscriptions current products
Razorpay reviews merchant settlement support payment refund recurring problems G2 Trustpilot Capterra
site.g2.com/products/razorpay/reviews "dislike"
site.trustpilot.com/review/razorpay.com refund settlement
RazorpayX payroll vendor payments reviews problems reconciliation
~~~

### Native AI overlap

~~~text
site.razorpay.com "Ray" "WhatsApp" "2026"
site.razorpay.com "Agent Studio" "subscription"
site.razorpay.com "refund" "agent" "screenshot"
site.razorpay.com "Slash" "integration"
~~~

### Holds, activation and state conflicts

~~~text
site.razorpay.com "settlements" "on hold" "documents"
site.razorpay.com "website" "policies" "activation" "AI"
site.razorpay.com "payment" "recovery" "already paid"
site.razorpay.com "subscription" "awaiting authorization" captured
site.razorpay.com "refund" "tracker" "customer"
site.razorpay.com "captured" "awaiting" subscription authorization
~~~

### Fee and audit leads

~~~text
site.razorpay.com "fee" "audit" "agent"
site.razorpay.com "Optimizer" "cost" reconciliation
site.g2.com/products/razorpay/reviews "charges" "hidden"
site.razorpay.com "pricing" "invoice" "discrepancy"
payment processing fee audit AI contracts merchant "audit" official
site.razorpay.com "invoice" "contract" "fees" agent
~~~

### External service-agent competition

~~~text
site.intercom.com/help Fin tasks refunds cancel subscription Stripe
site.zendesk.com "AI" "refund" "workflow"
~~~

Direct opens included the product home page, Agent Studio, RAY, Agentic Platform, Agentic Business Banking, subscription/refund documentation, G2 page 4, Capterra, the risk-review article and specific Reddit cases. In-page finds located reviewers and updates. An unsuccessful find was not treated as proof of absence when a later page open exposed the relevant passage.

Searches also surfaced unrelated results, vendor promotion, generic SEO comparisons, cached docs and unrelated products named Slash or Agent Studio. Such hits were not adopted as evidence merely because they appeared. This archive preserves the relevant findings and their sources, not every unrelated search result.

<a id="provenance"></a>
## 13. Original files and provenance

The six records below existed before this compilation and are reproduced in full. Original files are not overwritten. Source IDs such as R01 or S01 are local to their enclosing record, not a single global namespace.

| Appendix | Original local record | Recorded date | Original words |
|---|---|---|---:|
| A | [Razorpay_Recover_and_Grow_Research.md](</Users/adityafiroda/Downloads/RazorPay/output/Razorpay_Recover_and_Grow_Research.md>) | 6 October 2026 | 12,260 |
| B | [Razorpay_Broader_Concepts_Reassessment.md](</Users/adityafiroda/Downloads/RazorPay/output/Razorpay_Broader_Concepts_Reassessment.md>) | 13 October 2026 | 2,927 |
| C | [global_competitors.md](</Users/adityafiroda/Downloads/RazorPay/research/global_competitors.md>) | 6 October 2026 | 4,780 |
| D | [merchant_problems.md](</Users/adityafiroda/Downloads/RazorPay/research/merchant_problems.md>) | 6 October 2026 | 4,564 |
| E | [startup_frontier.md](</Users/adityafiroda/Downloads/RazorPay/research/startup_frontier.md>) | 6 October 2026 | 4,675 |
| F | [platform_findings.md](</Users/adityafiroda/Downloads/RazorPay/research/platform_findings.md>) | 6 October 2026 | 993 |

The [SeatSaver product framework](</Users/adityafiroda/Downloads/RazorPay/01_Concept1_Product_Framework.md>) and [prototype build plan](</Users/adityafiroda/Downloads/RazorPay/02_Concept1_Prototype_Build_Plan.md>) remain separate implementation-planning records, not evidence of implemented functionality. They are not copied into this research archive.

---

<a id="archive-a"></a>
## Appendix A. Original opportunity research

> **Historical record — 6 October 2026.** Initial 18-concept synthesis and source registers. Ranking and build-week schedule are historical. No new verification was performed during consolidation.

### Razorpay Recover and Grow with AI Opportunity Research

Research and prototype selection for the ISB AI PM Build Challenge

Prepared 6 October 2026 | Submission deadline 13 October 2026 at 11:59 PM IST

#### 1 What I would investigate first

**Start with a merchant whose customer still wants to buy, but whose payment, order and fulfilment records disagree.** The most promising initial concept is a small agent that rescues a paid booking after its original slot has expired. It verifies the money, understands the customer's remaining constraints, offers a genuinely available alternative, and completes the approved booking change. If no acceptable alternative exists, it prepares the appropriate refund or human handoff. This is a research recommendation, not a claim of validated demand or global novelty.

The strongest insight from the research is that many recovery products already persuade, remind, retry and discount. A more interesting question is **what has to become true before collecting or retaining this particular customer's money is appropriate?** The answer might be a valid replacement booking, a corrected delivery instruction, evidence resolving an invoice dispute, or a repaired recurring authorization.

My first three merchant-discovery candidates are:

1. **Paid booking rescue.** Payment is confirmed to the merchant after the original reservation expires. Recover an acceptable experience, with no second charge. Best for a crisp demonstration; frequency and overlap with integrated booking software are the biggest unanswered questions.
2. **Contested delivery rescue.** A courier reports an unsuccessful attempt while the customer still wants delivery. Assemble the evidence and actionable reattempt instructions before the parcel returns. Strong documented workflow; dependence on the courier is the biggest constraint.
3. **Short-payment resolution.** Work out which part of an invoice difference is genuinely collectable, resolve the documentary blocker, and request only the approved balance. Strong AI use on messy evidence; existing accounting and collections products create substantial competition.

Two further candidates deserve attention: **repairing the next renewal after a one-time payment rescue**, and **coordinating competing recovery actions so that the merchant does not simultaneously discount, chase and refund the same order**. The latter is an interesting product hypothesis with weaker direct evidence of unmet demand.

Do not commit to a concept purely because this report ranks it highly. One merchant who can show three recent examples is more useful than another attractive agent name. The best idea for this deadline is the intersection of a repeated problem, accessible records, a meaningful AI decision and a small action that can be demonstrated end to end.

##### How to use this report

Read Sections 1 to 5 to choose a direction. Sections 6 to 10 contain the five strongest concept briefs. Section 11 is a wider idea library, including ideas that were downgraded after finding close competitors. Sections 12 to 16 cover data, evaluation, merchant discovery and the remaining build week. The final source registers preserve the evidence behind the recommendations.

**Evidence labels.** A documented capability is supported by official product documentation. A vendor claim is a company's own description or result. An anecdote is an unverified individual account. A hypothesis is our proposed interpretation or product opportunity. Illustrative examples and all prototype financial figures are synthetic. None of the proposed products has been tested with merchants in this research.

#### 2 What the challenge actually asks for

The supplied four-page challenge brief is the source for this event's requirements. The two product tracks are Razorpay in Your Pocket, aligned with Full Stack Builder, and Recover and Grow with AI, aligned with AI Product Manager. Your stated preference is the second track.

Track 2 asks for an AI-native experience that identifies and acts on a measurable merchant growth or revenue-recovery opportunity. The expected chain is: a meaningful signal; an explanation of why AI helps beyond a fixed rule; a recommendation or action; merchant review and control; outcome learning; handling of mistakes and permissions; and a business metric. A generic chatbot or an explanatory dashboard is explicitly discouraged. [Challenge brief, page 2]

The evaluation emphasizes problem importance, merchant understanding, product prioritization, effective use of AI during the build, and communication. No numerical scoring weights are published in the supplied brief. The ranking in this report is our judgement, not an official judging formula.

##### Submission implications

| Requirement from the brief | Implication for the prototype |
|---|---|
| One-page product note | Choose one merchant, one repeated problem and one main outcome. This research report is background, not the submission note. |
| 90-second demo video | Make the main flow visible in four screens or fewer; include one meaningful boundary or refusal. |
| Demonstrable prototype | A clickable mock is permitted. Working code is optional, and full production integrations are unnecessary. |
| AI build log | Preserve research, prompting, testing and implementation decisions, including where you rejected AI output. |
| Individual build | The final product judgement and submission should be yours. AI tools are expressly allowed. |
| Synthetic data allowed | Label sample data and simulated outcomes, and explain how real data would validate the hypothesis. |
| Deadline 13 October 2026 at 11:59 PM IST | Reserve 12 October for recording and packaging, with 13 October as a submission buffer. |

The brief permits extending an existing Razorpay product or choosing an adjacent use case, provided the improvement is meaningful. It encourages a specific merchant segment. It does not require inventing an entirely new category or deploying inside Agent Studio. [Challenge brief, pages 3 and 4]

#### 3 The baseline has moved further than a generic recovery agent

##### Razorpay already occupies much of the obvious territory

The public Agent Studio page lists cart recovery, COD confirmation, verification, disputes, feedback and several recurring-payment recovery uses, with merchant controls and action checks. Those features are the starting baseline, not a differentiated proposal. [R01](https://razorpay.com/agent-studio/)

Razorpay's March 2026 Agentic Platform announcement also describes interpreting complaint screenshots, identifying payment problems and generating recovery links. Its September 2026 RAY article describes WhatsApp operations and payment anomaly diagnosis. Changing the interface to chat, voice or WhatsApp would therefore add little on its own. These are public product claims; the research did not test access or reliability. [R02](https://razorpay.com/blog/razorpay-agentic-platform/), [R03](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/)

The Agent Studio launch article also includes RTO-focused agents. Ordinary address correction, COD verification, RTO scoring or an RTO dashboard should not be pitched as missing Razorpay capabilities. Razorpay Recon further reduces the novelty of basic transaction-to-bank matching. [P1](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/), [R17](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/)

##### The international competitive map

| Product group | Examples examined | Existing capability and implication |
|---|---|---|
| Payment acceptance | Stripe, Adyen, Checkout.com, PayPal, Primer | Retry timing, routing, risk/cost tradeoffs and experimentation are established. A small synthetic model cannot credibly claim to outperform them. [G01](https://stripe.com/blog/how-we-built-it-smart-retries), [G02](https://docs.adyen.com/uplift), [G03](https://www.checkout.com/products/intelligent-acceptance), [G04](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li), [G19](https://www.primer.io/manage/observability) |
| Recurring revenue | Chargebee, Recurly, Churnkey, Butter, GoCardless | Dunning, retention offers, payment updates and intelligent retries are crowded. Find an unresolved decision beyond a retry. [G05](https://www.chargebee.com/receivables/failed-payment-recovery/), [G06](https://www.chargebee.com/solutions/usecases/churn-management/), [G07](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [G08](https://churnkey.co/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [G10](https://www.butterpayments.com/), [G18](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success) |
| Customer recovery | Yuno NOVA, Gravy, FlyCode | Direct outreach and coordinated recovery already exist. Language and channel are implementation choices, not sufficient differentiation. [G11](https://www.gravysolutions.io/press), [G12](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery), [S05](https://www.ycombinator.com/companies/flycode) |
| Receivables | Rex, Alder, Glimpse, HighRadius | Diagnosing objections, retrieving evidence and resolving deductions already have specialist products. A local workflow must be more precise. [S01](https://www.ycombinator.com/companies/rex-inc), [S02](https://www.ycombinator.com/companies/alder), [S03](https://www.tryglimpse.com/), [S04](https://www.ycombinator.com/companies/glimpse-2), [P9](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/) |
| Returns and service | Gorgias, Loop, ReturnGO, Signals, REVER, Claimlane | Exchanges, stock checks, policy-based actions and proactive post-purchase conversations are established. [R10](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792), [R11](https://docs.gorgias.com/en-US/create-an-action-for-ai-agent-567325), [S08](https://www.ycombinator.com/companies/signals), [S09](https://www.ycombinator.com/companies/rever), [S10](https://support.returngo.ai/exchanges-faqs), [S11](https://support.returngo.ai/preventing-out-of-stock-exchanges), [S12](https://support.returngo.ai/switch-to-exchange), [S13](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent), [S19](https://help.loopreturns.com/en/articles/13680897), [S20](https://help.loopreturns.com/en/articles/1914881) |
| Bookings and calls | Square, Fresha, Zenoti, Toma, CentralComs | Waitlists, appointment reminders, deposits and vertical reception agents already exist. [P10](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments), [P11](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview), [S16](https://www.ycombinator.com/companies/toma), [S17](https://www.ycombinator.com/companies/centralcoms), [S18](https://www.zenoti.com/platform/waitlist-management) |
| Additional work | Addenly, With Oversight, ClarAccord, Rigby, Clearstory, Adaptive | Chat-to-scope-change and evidence-to-invoice flows have close competitors, including agency use cases. [S25](https://tryrigby.com/industries/construction), [S26](https://addenly.com/docs), [S27](https://addenly.com/legal/terms), [S28](https://withoversight.com/), [S29](https://claraccord.com/solutions/agencies), [S30](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent), [S31](https://www.clearstory.build/construction-blog/introducing-clearstory-ai), [S32](https://www.adaptive.build/), [S33](https://www.adaptive.build/product-updates) |

Yuno's June 2026 recovery article reports a result for contacted customers, not all failed payments. That denominator matters: a result among reachable customers cannot be treated as the share of all losses recovered. Vendor case studies are useful evidence that the category exists; they are unsuitable forecasts for our prototype. [G12](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery)

TechCrunch coverage of Glimpse, Toma and REVER helped identify companies and verticals. The product comparisons here rely chiefly on primary product pages, support documentation and company-authored YC profiles. Funding does not establish product effectiveness or merchant willingness to pay. [S22](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/), [S23](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/), [S24](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/)

##### What could still distinguish an entry

Differentiation can come from a specific unresolved exception, a better action boundary, unusually good evidence handling, a neglected merchant segment, or a more honest success metric. It should be demonstrated against the closest known alternative. “Nobody is doing this” is neither established by this research nor necessary for a strong submission.

For example, a waitlist is ordinary. Recovering the same customer's already-paid experience after a capacity/payment mismatch is a different decision. Invoice reminders are ordinary. Separating a valid outstanding balance from an approved deduction, then supplying the missing proof that unlocks payment, is a more precise job. Both still need merchant validation.

#### 4 Useful patterns from other markets

##### Southeast Asia separates payment success from order viability

Xendit documents delayed confirmation after an order expiry and discusses whether the merchant can still fulfil the order. This directly supports investigating the gap between receiving money and delivering the promised outcome. It does not establish how often Indian merchants face the same exception. [P6](https://docs.xendit.co/docs/delayed-webhooks/)

Xendit's recurring recovery documentation also distinguishes paying the current cycle from changing the method used in future cycles. A one-time rescue does not automatically update the stored recurring methods. This is a concrete inspiration for a two-status product: invoice paid; future collection ready. Do not assume identical Razorpay behaviour without checking the selected integration. [G17](https://docs.xendit.co/docs/recover-failed-payments)

##### African payment workflows emphasize checking received money

Paystack's subscription documentation describes provider-specific retry and authorization-update behaviour. Its customer support materials recognize failed-payment/debit ambiguity, while dedicated virtual-account documentation includes delayed-notification handling. The transferable principle is to establish the authoritative money state before asking a customer to pay again. This is not a claim about every provider or country in Africa. [G15](https://paystack.com/docs/payments/subscriptions/), [G16](https://support.paystack.com/en/articles/2127938), [P16](https://paystack.com/docs/payments/dedicated-virtual-accounts/)

##### Brazil makes recurring permission a distinct object

Banco Central's Pix Automático material and dLocal's Pix retry documentation illustrate that recurring authorization and an individual collection have separate rules and states. The design lesson transfers; the legal permissions, timings and payment rails do not. A prototype should never treat a one-time payment as permission for future recurring debits. [P17](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico), [G14](https://docs.dlocal.com/docs/payment-retries-pix)

##### European and global platforms optimize several outcomes together

Adyen, GoCardless and other platforms expose conversion, retry, risk or cost controls. The useful lesson is to give the agent valid outcomes such as wait, stop, request clarification and escalate. A successful product does not maximize attempts at any cost. [G02](https://docs.adyen.com/uplift), [G18](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success)

##### Vertical software is often the real competitor

An Indian service merchant may compare the proposal with a booking app, accountant, customer support tool or spreadsheet. Studying only payment gateways would miss that competition. The path to a strong idea is to identify the unresolved handoff between systems, then prove why a small addition improves it. It is not necessary to replace those systems.

#### 5 Ranked shortlist and selection logic

The table uses qualitative research judgement. “Distinctiveness” means a defensible difference from products found in this sweep, not patentability or proof of an empty market. Effort assumes one builder, synthetic records, one narrow workflow and an already accessible model. Integration access can overturn any estimate.

| Rank and concept | Why it deserves attention | Principal weakness | Smallest useful build |
|---|---|---|---|
| 1 Paid booking rescue | Concrete state conflict, customer constraints and verifiable action; strong 90-second story | Incidence may be too low; rules may solve many cases | One booking type, six scenarios, mock calendar and payment-event replay; 3-4 focused days |
| 2 Contested delivery rescue | Documented merchant workflow involving buyer evidence and courier action | Cannot guarantee physical reattempt; incumbent NDR tools are close | One NDR reason family and reviewed evidence packet; 3-4 days |
| 3 Short-payment resolver | Messy evidence gives AI a clear role; can avoid false demands and unlock valid cash | AR competition and accounting scope creep | One merchant segment, three reason codes, approved balance link; 3-4 days |
| 4 Durable renewal repair | Memorable distinction between this invoice and the next billing cycle | Could reduce to a simple update-payment-method flow | Two independent statuses and six customer explanations; 2-3 days |
| 5 Recovery coordinator | Makes stop/hold decisions visible and addresses conflicting automations | Unmet need and willingness to adopt are weakly evidenced | One order timeline, three action types, contact limits; 2-3 days |

**Preferred decision rule:** choose the highest-ranked concept for which you can obtain two or three authentic anonymized examples by 7 October. If you have access only to D2C merchants, prioritize contested delivery. If you have access to agencies or wholesalers and an accountant, prioritize short-payment resolution. If no merchant access is possible, paid booking rescue offers a legible synthetic demonstration, but its market-volume uncertainty must remain explicit.

The hypothesis to validate is not “merchants want AI.” It is “this repeated exception currently loses money because the merchant cannot assemble the necessary evidence and take the correct action in time.”

#### 6 Concept one Paid booking rescue

##### The merchant problem

A workshop operator, studio or class business has limited capacity. A booking expires while payment is unresolved. The money later confirms, but the original slot has been sold or is no longer available. Support now needs to verify the transaction, understand the customer's constraints, check alternatives and resolve the booking without collecting twice or making an impossible promise.

The existence of late payment confirmation and order-feasibility decisions is documented. The size of the opportunity in the proposed Indian segment is a hypothesis. This should be sold as an exception-resolution feature until interviews establish enough repeated demand for a larger product. [P6](https://docs.xendit.co/docs/delayed-webhooks/), [P7](https://razorpay.com/learn/payment-timeout/)

##### The decision the agent owns

The agent asks: given confirmed payment, current capacity and the customer's remaining requirements, can we restore an acceptable experience? Its answer is one of four bounded actions: offer a feasible alternative; restore the original booking if genuinely available; prepare a refund under policy; or escalate because the evidence is incomplete.

For the first prototype, choose **already-paid, expired workshop bookings only**. Do not combine unpaid-cart rescue, airline ticketing, subscription management and refunds across industries. The payment is already received, so a replacement booking does not require a second payment link. If an optional price difference is not in scope, keep every approved alternative at the original paid price.

##### Why AI helps

Payment verification and seat availability are deterministic. AI interprets language such as “Sunday morning only, same instructor, I need to attend with my friend,” checks which constraints are hard, and explains eligible alternatives. It must cite the customer statement and the supplied availability. If every preference is already structured, a filtered menu may be sufficient; the product note should acknowledge that boundary.

##### The minimum data

- Payment ID, captured amount, refund amount/status, any refund in flight and original booking reference from a Razorpay-shaped payment feed. Keep payment occurrence, provider confirmation, webhook receipt and booking expiry as separate timestamps.
- Booking state, expiry, workshop schedule, seat counts and instructor from the merchant calendar.
- The customer's explicit preferences and consent, from a simulated conversation or an authorized export.
- Merchant policy defining equivalent sessions, allowed price treatment, refund path and approval permissions.

The gateway does not know instructor preference, physical attendance, calendar capacity or why the customer bought. Those must be explicitly supplied.

##### A demonstration that shows judgement

**Synthetic case:** INR 2,000 is confirmed after booking B-104 expires. The original Sunday 10 AM class is full. The customer wants the same instructor on a Sunday morning. One later session matches; a cheaper evening class does not. The agent proposes the matching session, cites both the payment and preference evidence, and shows that there will be no additional charge. The merchant approves, the customer accepts, and the booking adapter reserves one seat and records the original payment reference.

Then replay the same payment event. Nothing changes. Show a second customer who requires the original date: no alternative meets the requirement, so the agent prepares a refund review. These two cases reveal more product quality than ten polished chat replies.

##### Controls and failure handling

Use authoritative captured payment state, never a screenshot alone. Verify that the amount remains available for the booking and has not already been refunded or committed to a refund. Resolve a refund in flight before offering a replacement against the same money. Check capacity immediately before confirming. Prevent duplicate reservation and money actions with a business-level action key. If the calendar write fails after a proposal is accepted, show pending resolution and retain the case for follow-up; do not display a confirmed booking. A customer can reject alternatives and follow the refund route without repeated persuasion. A refund request and a processed refund remain separate statuses.

##### Learning and business outcome

Record which constraint ruled an option out, merchant overrides, customer acceptance, actual attendance or fulfilment, and subsequent refunds. Improve retrieval and suggested alternatives from those labeled outcomes. Do not claim automatic model improvement merely because a log exists.

The main live-pilot metric would be **incremental retained contribution per eligible late-paid booking**, compared with the merchant's current refund/support process. Track time to resolution, wrong confirmations, duplicate actions and complaints. A saved booking is initially a retained-sale candidate; completion and later refunds determine the realized outcome.

##### Closest alternatives and the honest pitch

Zenoti already advertises AI rescheduling that checks availability and provider preferences; its appointment documentation also supports moving paid appointments at the same price. Preference-aware rescheduling is therefore established. The remaining hypothesis is resolving an external payment-confirmation/expired-booking mismatch for merchants whose separate systems do not handle it. That narrower gap remains unvalidated. [R18](https://www.zenoti.com/ai-workforce/ai-receptionist), [R19](https://help.zenoti.com/en/appointments/redesigned-appointment-book.html)

Gateways already provide reconciliation mechanisms. This concept should not use AI to repair ordinary webhook plumbing. Keep it ranked first for demonstration clarity only if merchant examples confirm the cross-system exception; otherwise prefer a better-evidenced alternative.

**Pitch:** “When a customer has paid but their booking has expired, help the merchant restore a valid experience using the customer's actual constraints, or resolve the refund cleanly.”

**Kill criteria:** merchants cannot produce repeated examples; most cases have a single automatic resolution; the calendar cannot expose availability; or an existing booking tool already solves the same exception satisfactorily.

#### 7 Concept two Contested delivery rescue

##### The merchant problem

A D2C order enters a non-delivery queue. The courier says unavailable or refused; the buyer says no attempt happened and still wants the parcel. A routine COD confirmation or reminder does not resolve that contradiction. The merchant needs useful evidence, a current delivery instruction and an actionable courier request while recovery is still possible.

Shiprocket's official support workflow explicitly distinguishes an incorrect NDR reason and allows buyer conversation or chat proof to support the case. This is stronger evidence of the workflow than an unsourced industry RTO percentage. An Indian merchant discussion supplies an anecdotal interview lead, not proof of frequency or wrongdoing. [P2](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-), [P3](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-), [P4](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/)

##### A small and distinctive scope

Choose one case family: disputed “customer unavailable” while the parcel remains eligible for another attempt. Exclude broad RTO prediction, address-risk scoring, COD confirmation and all-courier orchestration. Shiprocket, Shipway and Razorpay already occupy much of that territory. [P1](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/), [P2](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-), [P3](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-), [P4](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/), [P5](https://www.shipway.com/)

The agent reads the courier record and buyer explanation, separates facts from disputed claims, asks one missing question, and prepares a reviewed reattempt or evidence-escalation packet. It should say “buyer disputes the recorded attempt,” not accuse the courier of fraud.

##### Data and AI contribution

Shipment/AWB history, current parcel state, courier action eligibility and deadline come from shipping records. The customer supplies an access instruction or availability. Payment status comes from the order/payment system, where available; a pure COD order may have no captured gateway payment.

AI turns colloquial explanations into a concise, evidence-linked request: correct gate, reception contact, permitted time or contested attempt. Rules enforce what can be changed, the allowed action window, contact limits and case status. Unsupported claims remain visibly unresolved.

##### Prototype

Use 12 synthetic shipments and three customer responses. Case A supplies a missing gate number and availability, producing a reviewed reattempt request. Case B explicitly refuses the order, stopping outreach. Case C disputes the recorded attempt, producing a packet with the relevant message and timestamps. The courier action adapter can be simulated; label it. A later simulated delivery event closes the case.

The screen should show requested, accepted by carrier, attempted, delivered and unresolved as different states. A submitted escalation is not a delivery. If API submission is unavailable, the honest final action is an exportable packet plus a merchant task, followed by a manually entered outcome.

##### Outcome and validation

Measure delivered contribution recovered relative to the current NDR process, cost per resolved case, correct classification and customer contact burden. Count prepaid orders retained and COD collections separately. A friendly reply is not collected or retained revenue.

Ask merchants to show their last five disputed NDRs: what proof changed the result; when did the parcel become unrecoverable; did the carrier accept the request; and what does the current tool already automate? Reject the idea if the bottleneck is entirely carrier capacity rather than missing evidence or coordination.

**Pitch:** “Turn a disputed delivery attempt into a precise, reviewed recovery request, and follow it through to the actual delivery outcome.”

#### 8 Concept three Short-payment resolution

##### The merchant problem

An invoice is larger than the cash received. The difference might be an approved credit, recorded withholding, disputed delivery, payment allocation error or genuine unpaid balance. A generic collection agent treats the full difference as debt and can send an incorrect demand. An accountant instead reconstructs the reason and determines the next action.

Zoho documents withholding treatment in customer payments; HighRadius documents proof-of-delivery workflows for disputes. Newer AR companies such as Rex, Alder and Glimpse also handle exceptions. The opportunity is therefore a narrow, accessible small-merchant workflow, not a new collections category. [P8](https://www.zoho.com/in/books/help/settings/income-tds.html), [P9](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/), [S01](https://www.ycombinator.com/companies/rex-inc), [S02](https://www.ycombinator.com/companies/alder), [S03](https://www.tryglimpse.com/), [S04](https://www.ycombinator.com/companies/glimpse-2)

##### Scope and agent decision

Start with one Indian wholesaler or service business and three reason codes: documented deduction awaiting review, missing delivery/acceptance evidence, and unexplained outstanding amount. The product proposes an explanation, shows the source, identifies what remains unknown, and suggests an action. It never invents a tax rate, approves a credit or writes off a balance.

The merchant or accountant confirms what is due. Only that confirmed amount can be turned into a payment request. If the customer is waiting for a delivery document, supply the correct authorized evidence before asking again. If evidence indicates the money is already accounted for, suppress the reminder.

##### Synthetic demo

Use an invoice of INR 50,000 with INR 46,000 received. The difference is INR 4,000, but that arithmetic does not establish debt. In one case, the remittance refers to an approved adjustment and is routed for review. In another, the buyer withheld INR 4,000 while waiting for a delivery record. The agent finds the matching document, drafts a response, and proposes a payment link only after the merchant verifies the balance. A third ambiguous note triggers a clarification request.

These figures illustrate state handling, not tax treatment. The prototype uses merchant-supplied classifications and amounts, with no legal or accounting determination by the model.

##### What makes AI useful

Unstructured remittance notes, abbreviated invoice references, contradictory email threads and document matching create the AI task. Exact amounts, invoice status, allocations and permission checks belong in code. A synthetic dataset where every difference equals the same percentage would demonstrate a rule, not meaningful AI reasoning.

##### Data and minimal build

Ten invoice rows, payment records, four remittance notes, a delivery document and an approved adjustment ledger are enough. Use uploads or CSV rather than live accounting integrations. Provide source highlighting, three reason categories, an editable decision, a reviewed message draft and one Standard Payment Link test flow if supported. Simulate the buyer response and label it.

##### Outcome and risk

Measure false payment demands first, correctly resolved exceptions second, and cash actually collected on validated balances third. Reclassifying received money is not recovery. A generated link is not recovery. If the concept only saves bookkeeping time without resolving a collection blocker, its fit with Track 2 is weaker.

The learning loop stores corrected reason labels, document relevance and whether the blocker was actually resolved. Accounting approval remains a separate action. Expand reason codes only after demonstrating high precision on the initial set.

**Pitch:** “Explain the difference before collecting it, then remove the specific blocker preventing a valid payment.”

**Kill criteria:** the current accounting tool already resolves the cases; evidence is inaccessible; deductions are mostly deliberate commercial disputes needing negotiation; or volumes are too small to matter.

#### 9 Concept four Repair the next renewal

##### The problem hidden by a successful rescue

A merchant collects this month's failed subscription invoice through a one-time payment. The recurring authorization remains invalid, unchanged or intentionally revoked. Next month the same customer fails again. Xendit's documentation provides a concrete example of this distinction, while payment-update and retention tools from major providers establish close competition. [G17](https://docs.xendit.co/docs/recover-failed-payments), [G05](https://www.chargebee.com/receivables/failed-payment-recovery/), [G06](https://www.chargebee.com/solutions/usecases/churn-management/), [G07](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [G08](https://churnkey.co/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/)

A standalone payment must first be allocated to the correct subscription obligation; it may not automatically settle that invoice or stop an existing retry. Verify allocation and reconcile any scheduled collection before labeling the current invoice paid.

The proposed product has two independently verified statuses: **current invoice paid** and **next cycle ready**. Neither status implies the other. “Ready” means the configured recurring arrangement passes the provider's supported checks; it cannot guarantee a future payment will succeed.

##### Narrow prototype

Choose an adult learning membership or non-essential class subscription. Show six explanations: an expired method, a changed bank, a one-time family payment, a temporary failure, an intentional switch to manual payment, and an ambiguous status. The agent interprets the customer's preference and offers a permitted next step. A rule can detect the status mismatch; AI earns its place only in resolving the different meanings of that mismatch.

The action might be opening the correct authorization-update flow, recording an explicit choice to remain manual, or escalating a contradiction. Customer consent is required for any new recurring permission. Do not propose repeated debits after an explicit cancellation. Actual mandate availability and supported transitions must be checked for the selected Razorpay product; a labeled adapter simulation is enough for the concept demo.

##### Measurement and product boundary

The intended long-term metric is repeat failure or next-cycle first-attempt success in a predefined cohort that opts to repair recurring payment, accompanied by customer opt-outs and repeated support work. Report deliberate manual-payment and cancellation choices separately; respecting either choice is not a failed repair. A week is insufficient to establish a monthly cohort result. Replay scenarios to demonstrate the distinction, and describe the prospective measurement honestly.

A payment-method update screen by itself is generic. The improvement would be finding apparently closed recovery cases whose underlying setup remains unresolved, then respecting the customer's intended future arrangement. Reject the concept if existing billing flows already do this reliably or a simple notification resolves nearly all cases.

**Pitch:** “A recovered invoice should not hide an unresolved renewal. Close both states, with the customer's explicit choice.”

#### 10 Concept five Coordinate recovery actions

##### Problem hypothesis

Separate automations can act on one customer journey: a cart coupon, a failed-payment reminder, a scheduled retry and a complaint response. The merchant needs a single current decision about which action is appropriate. This research found coordinated suites and recovery experimentation, so the broad idea is not unoccupied. The narrower hypothesis is that some merchants still have conflicting actions across tools. [G08](https://churnkey.co/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [G19](https://www.primer.io/manage/observability), [S05](https://www.ycombinator.com/companies/flycode), [S07](https://docs.churnkey.co/cancel-flows/a-b-testing/)

##### The proposed product

Build a queue of proposed actions around one verified customer/order identity. The agent interprets unresolved customer intent or a service complaint. Rules then apply precedence: stop after confirmed payment; pause discretionary sales outreach during a material unresolved complaint; respect an opt-out; avoid overlapping incentives; and limit contact. The merchant can inspect why each proposal was allowed, delayed, replaced or stopped.

This is useful only if it executes or suppresses actions. A dashboard explaining that two tools disagree is too weak. Avoid claiming to integrate every tool; use three simulated proposal sources and one action adapter.

##### A three-case demo

The prototype controls its own action queue. Canceling or rescheduling a provider-owned retry requires an independently verified supported control; otherwise the product can only warn or escalate.

Case A has a scheduled retry plus a coupon proposal: wait and avoid unnecessary discounting. Case B has an unresolved complaint: prepare the service-resolution action. Case C is paid while a reminder is queued: cancel the reminder. Include an uncertain identity match that cannot safely combine two timelines.

A merchant sees a policy preview before changing contact or offer budgets. The first implementation should use explicit priorities, not an opaque model-generated score. If structured state alone determines the result, admit that the coordinator is mostly rules and use AI only for the genuinely ambiguous evidence.

##### Why the business metric matters

Attributed payments after outreach are not causal recovery. Churnkey already has experimentation features, and other vendors already offer attribution and payment experiments. The stronger product discipline is an action loop that uses net contribution and an appropriate control, not claiming to invent holdouts. [S07](https://docs.churnkey.co/cancel-flows/a-b-testing/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [G19](https://www.primer.io/manage/observability)

Treat this as a feature that can strengthen Concepts 1 to 4 if a standalone coordination problem is not validated. The main kill question is whether merchants actually suffer costly cross-tool collisions and whether their existing platform already prevents them.

**Pitch:** “Before another recovery action fires, decide whether it is still appropriate for this order, this customer and this margin.”

#### 11 Wider idea library

The following alternatives preserve useful findings from the wider search. They are not equally recommended. Each is a hypothesis that can become worthwhile with a specific merchant example and accessible data.

##### 11A Recover a feasible basket after the original cart becomes invalid

**Merchant and problem:** a D2C merchant starts recovery after stock, price or delivery availability has changed. A generic link points to a purchase the merchant can no longer fulfil.

**Proposed difference:** interpret the customer's actual must-have requirement, then build an approved alternative basket with fresh availability and a margin floor. Inventory and price remain deterministic. This differs from Concept 1 because the original payment has not succeeded: a new payment request may be appropriate only after the new basket is accepted and the old payment state is verified.

**Closest competition:** Yuno/Razorpay recovery, Gorgias order actions, and commerce inventory reservation. Merely checking stock is not enough. [G12](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery), [R01](https://razorpay.com/agent-studio/), [R10](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792), [R12](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft)

**Small demo and metric:** 20 products, eight customer statements and two substitutions, including a no-suitable-option case. Measure contribution from fulfilled recovered orders after returns, not link clicks. Reject if the inventory rarely changes during recovery or the existing storefront already handles the alternative well.

##### 11B Recover approved additional work missing from the final bill

**Merchant and problem:** an event vendor or creative agency delivers an approved extra, but final billing misses it. Compare the original scope, authorized approval, delivered work, waivers and existing invoice lines.

**Proposed difference:** retrospective reconciliation with negative cases: included work, free favour, unauthorized requester, withdrawn request, old price, undelivered extra or an item already billed under another name. AI interprets the evidence; calculation and approval are fixed controls.

**Closest competition:** Addenly, With Oversight, ClarAccord and Rigby are unusually close. Established construction and agency tools add further overlap. This is an adaptation opportunity with weak category novelty. [S25](https://tryrigby.com/industries/construction), [S26](https://addenly.com/docs), [S27](https://addenly.com/legal/terms), [S28](https://withoversight.com/), [S29](https://claraccord.com/solutions/agencies), [S30](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent), [S31](https://www.clearstory.build/construction-blog/introducing-clearstory-ai), [S32](https://www.adaptive.build/), [S33](https://www.adaptive.build/product-updates), [S34](https://www.procore.com/ai), [S35](https://www.siteline.com/blog/change-order-log), [S36](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/), [S37](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project)

**Small demo and metric:** one event, a package, 25 messages, completion notes and a final bill. Propose a reviewed extra only when every required condition is satisfied. Measure precision first and actual collection second. Reject if merchants knowingly waive most extras; software detection does not solve unwillingness to charge.

##### 11C Recover supplier credits after resolving the customer problem

**Merchant and problem:** a reseller refunds or replaces a valid defective item, but never completes the supplier reimbursement process.

**Proposed difference:** link customer remedy, serial/batch evidence, supplier policy, submitted claim, approved credit and realized credit. Customer resolution proceeds independently; supplier recovery must not delay it. AI matches narrative evidence to a policy; dates, duplication and amounts are checked deterministically.

**Closest competition:** Claimlane handles supplier/product rules and claims; Glimpse covers recovery evidence. The local reseller workflow and realized-credit reconciliation are the hypotheses. [S03](https://www.tryglimpse.com/), [S13](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent)

**Small demo and metric:** two supplied policies, 12 cases and four outcomes: accepted, missing evidence, duplicate, ineligible. Measure realized credits less processing cost. Reject if supplier rules are inaccessible or most valid claims are still refused. This is a margin-recovery story and needs explicit connection to the track's merchant outcome.

##### 11D Repair the exact product promise causing avoidable returns

**Merchant and problem:** customers buy a specific variant because a product statement is misleading or incomplete. A feedback summary fails to change the page.

**Proposed difference:** connect variant, purchased page version, return reason and source-backed product facts; draft the smallest truthful correction; obtain merchant approval; then evaluate future retained sales. AI can cluster and explain, but correlation is not proof that wording caused returns.

**Closest competition:** Loop already identifies costly return patterns and connects insights with description and sizing changes; Signals adds post-purchase conversation. A generic return-insights agent is weak. [S08](https://www.ycombinator.com/companies/signals), [S19](https://help.loopreturns.com/en/articles/13680897), [S20](https://help.loopreturns.com/en/articles/1914881)

**Small demo and metric:** three variants, 20 fictional cases and a page preview with one justified correction. Include a seasonal pattern that does not warrant a copy change. Track issue-specific refunds and contribution, alongside conversion. Reject if there is no page/version evidence or the real problem is faulty goods.

##### 11E Fill a cancelled service slot with a compatible paid booking

**Merchant and problem:** a studio or salon has a last-minute opening and customer preferences scattered in messages.

**Proposed difference:** interpret service/resource constraints, reserve the feasible slot once, and obtain the agreed deposit. Rules own resource feasibility, concurrent acceptance, price and expiry. Choose a non-medical service.

**Closest competition:** Square, Fresha and Zenoti already provide waitlist or booking recovery features. Resource complexity and fragmented local workflow must justify the addition. [P10](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments), [P11](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview), [S18](https://www.zenoti.com/platform/waitlist-management)

**Small demo and metric:** one cancellation, five interested people and two simultaneous acceptances. Confirm only one booking. Measure contribution from attended replacement bookings, subtracting displaced future bookings and discounts. Reject if no genuine standby demand exists. A payment link alone cannot lock a calendar resource.

##### 11F Find a replacement that fixes the actual return reason

**Merchant and problem:** the standard exchange is unavailable or repeats the same problem, such as unsuitable fit.

**Proposed difference:** interpret the return explanation and match only catalog attributes that the merchant has verified. Keep refunds easy and respect explicit refusal. Show the customer why the replacement addresses the problem rather than recommending a popular product.

**Closest competition:** Loop, ReturnGO and Gorgias already support exchanges, incentives, reservations and order changes. Good product semantics would be the meaningful addition. [P12](https://help.loopreturns.com/en/articles/1913025), [P13](https://help.loopreturns.com/en/articles/1912193), [S10](https://support.returngo.ai/exchanges-faqs), [S11](https://support.returngo.ai/preventing-out-of-stock-exchanges), [S12](https://support.returngo.ai/switch-to-exchange), [R10](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792)

**Small demo and metric:** 20 synthetic footwear variants with explicit fit attributes, five complaints and a no-match result. Measure kept-order contribution after second returns and exchange shipping. Reject if reliable attributes do not exist. Do not invent fit, compatibility or delivery claims.

##### 11G Restore access after confirmed payment

**Merchant and problem:** payment is captured but the correct course, software account or membership remains inactive.

**Proposed difference:** resolve ambiguous customer/account mapping and the promised entitlement, then propose a bounded access repair. Straightforward missed-webhook handling should already be fixed with ordinary engineering. AI only helps when evidence and identity are ambiguous.

**Closest competition:** payment and entitlement systems, ordinary reconciliation, and support agents. The market gap is unproven. [R04](https://razorpay.com/docs/webhooks/payments/), [R17](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/)

**Small demo and metric:** three timelines, one duplicate customer identity and one case that cannot be matched safely. Measure avoided erroneous suspensions, correct access restoration and refunds after repair. Reject as a headline idea if the only required action is replaying a webhook.

##### 11H Resolve service failure before asking for renewal payment

**Merchant and problem:** a failed renewal sits alongside an unresolved missed class or approved replacement service.

**Proposed difference:** understand whether intent remains, verify what service is owed, complete the approved remedy and only then propose the valid payment action. An explicit cancellation stops the flow. AI handles the explanation; service eligibility and billing are rules.

**Closest competition:** Churnkey's retention actions, Alder's blocker diagnosis and support automation. The narrow entitlement correction is the product hypothesis. [G08](https://churnkey.co/), [S02](https://www.ycombinator.com/companies/alder), [S08](https://www.ycombinator.com/companies/signals)

**Small demo and metric:** ordinary payment failure, unresolved missed class and cancellation should produce three different outcomes. Measure valid retained payments after remedy and customer complaints. Reject if the service business cannot deliver the promised remedy or if no evidence shows correction restores intent.

##### 11I Transfer a payment request to the authorized payer

**Merchant and problem:** an adult learner or business user receives reminders even though a parent or finance contact pays.

**Proposed difference:** recognize the role mismatch, offer a customer-controlled secure handoff and distinguish one-time payment from future billing ownership. Identity and consent are explicit. Do not discover or contact relatives or employers without the customer's instruction.

**Closest competition:** ordinary payment links and billing-contact management. This is a small workflow extension, not a new category. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [G15](https://paystack.com/docs/payments/subscriptions/)

**Small demo and metric:** one adult learner, one departing company contact and one rejected handoff. Measure time to reach the authorized payer and validated payments, while checking duplicate-payment and disclosure errors. Reject if a shareable link already solves nearly every case.

##### 11J Remove one administrative invoice blocker

**Merchant and problem:** a willing buyer cannot process the invoice because an acceptance document, approved reference or correct contact is missing.

**Proposed difference:** select one blocker and one business type, retrieve authorized evidence and prepare a reviewed packet. Do not build a general autonomous AR department or invent purchase-order references.

**Closest competition:** Alder explicitly advertises blocker repair and procurement-portal work; Rex and Chargebee cover adjacent workflows. [S01](https://www.ycombinator.com/companies/rex-inc), [S02](https://www.ycombinator.com/companies/alder), [G05](https://www.chargebee.com/receivables/failed-payment-recovery/)

**Small demo and metric:** ten invoices, three blocker categories and a supported-document library. Measure time to payable acceptance, subsequent collection and reopened disputes. Reject if the only improvement is rewriting the reminder politely. This is related to Concept 3 but starts with an unpaid full invoice rather than an ambiguous short payment.

##### 11K Recover small deductions only when evidence justifies the cost

**Merchant and problem:** investigation costs exceed the value of many individually small deductions.

**Proposed difference:** one supplier/buyer pair, one deduction type and an evidence threshold that separates valid, invalid and unknown cases. Estimate work cost; decline to dispute when the expected recovery is not worth it. Model-generated confidence alone cannot establish validity.

**Closest competition:** Glimpse explicitly operates in deductions recovery; HighRadius and Rex overlap. Localization and low-friction record import are the opportunity. [S01](https://www.ycombinator.com/companies/rex-inc), [S03](https://www.tryglimpse.com/), [S04](https://www.ycombinator.com/companies/glimpse-2), [P9](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/)

**Small demo and metric:** ten deductions, including a genuine shortage and an approved commercial discount. Produce a reviewed packet only for supported disputes. Measure realized recovery after effort, not submitted claim value. Reject if no accepted claim channel exists or resolution cycles are too long to establish usefulness.

##### 11L Trace refunds before trying to win back the customer

**Merchant and problem:** the customer cannot reconcile a refund with the original order or identify the available bank reference.

**Proposed difference:** assemble the exact payment/refund timeline, explain partial amounts and create an escalation with verified references. A replacement offer comes only after resolution and expressed customer interest.

**Closest competition:** existing refund communication and support tools. This is more likely a supporting feature than the best Track 2 headline. [P15](https://razorpay.com/docs/payments/refunds/communication/), [R08](https://razorpay.com/docs/webhooks/refunds/)

**Small demo and metric:** two partial refunds, one still pending, and a complaint about the full order. Measure recontacts and resolution time; measure later repurchase separately. Reject if the only defensible value is a status lookup or if revenue impact is too indirect.

##### 11M Offer a bounded continuity option for a booked experience

**Merchant and problem:** a temporary payment issue threatens an imminent non-essential class or membership session.

**Proposed difference:** interpret the customer's intention and select among merchant-approved rescheduling, pause or a tightly bounded grace option. This is not credit underwriting. A canceled mandate or canceled service is not a reason to seek a workaround charge.

**Closest competition:** billing grace periods, retention pauses and access/retry tradeoffs already exist. The capacity and service context must add value. [G01](https://stripe.com/blog/how-we-built-it-smart-retries), [G08](https://churnkey.co/)

**Small demo and metric:** three customers with the same failure code but different bookings and preferences. Measure retained contribution after unpaid service cost, not simply continued access. Reject if simple policy rules suffice or the merchant would never accept the exposure.

#### 12 Data and integration reality

##### What the payment gateway can and cannot tell us

Razorpay payment events expose useful money-state information, identifiers and error fields. A captured payment is not proof that a physical parcel arrived, a class seat exists, a service was delivered or an invoice deduction is invalid. An event is also a snapshot, and the current state may have moved on. [R04](https://razorpay.com/docs/webhooks/payments/)

| Needed fact | Plausible source | Prototype representation |
|---|---|---|
| Payment amount, status and original reference | Razorpay API or webhook payload | Test event or clearly labeled fixture |
| Booking capacity and expiry | Merchant calendar or booking system | Small local table with an atomic update |
| Inventory and fulfillment state | Commerce/shipping system | CSV plus mocked freshness check |
| Customer's intended outcome | Authorized conversation or customer input | Synthetic transcript with source highlighting |
| Invoice balance and approved adjustments | Accounting ledger and accountant review | CSV and an explicit approved field |
| Delivery disagreement | Carrier record and buyer evidence | Two separate records, preserving the contradiction |
| Contribution margin | Merchant cost inputs | Transparent supplied costs, never guessed |
| Future recurring authorization | Supported billing/mandate state | Separate adapter; simulate if unavailable |
| Realized outcome | Fulfillment, attendance, payment or credit record | Independent outcome event, distinct from action request |

For a first version, uploads are acceptable. The small prototype should prove what happens with the data before attempting multiple live connectors. Do not imply that access to Agent Studio provides all merchant records, a public agent SDK or every action described on its marketing pages.

##### Payment implementation details that can derail a small demo

Standard Payment Links support fields such as amount, reference, expiry and optional partial payments. Dedicated UPI Payment Links are a different product: current documentation describes Android-only, live-mode-only behavior and no partial payments. Use a supported Standard Link test flow or a visibly simulated adapter; do not promise an unsupported dedicated UPI-link sandbox. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [R06](https://razorpay.com/docs/payments/payment-links/upi/)

A payment link does not reserve inventory or a calendar slot. Keep the resource hold in the merchant system, and reconcile link expiry/cancellation with it. Some link expiry validation rules constrain the minimum lead time; do not design a five-minute hold assuming the gateway will exactly enforce it. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [R12](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft)

Webhook verification must use the raw request body and the configured secret. Events can duplicate or arrive out of order. Maintain separate protection against repeating the same business action, and fetch authoritative state when needed. For a local replay demo, label the fixture as simulated; for real test webhooks, account for public callback-host restrictions. [R07](https://razorpay.com/docs/webhooks/validate-test/)

Created, processed and failed refund events are separate states. Do not mark the customer refunded when only a proposal or request exists. Similarly, an invoice, payment request, successful payment and fulfilled order are different outcomes. [R08](https://razorpay.com/docs/webhooks/refunds/)

##### A minimal architecture

Use one input queue, one small case store, one model call that produces a structured proposal with source references, a deterministic policy check, a review screen, one action adapter and an outcome ledger. A small schema is more valuable than an elaborate multi-agent runtime.

The model output might contain: case identifier; interpreted customer intent; evidence references; candidate action; missing facts; and reason to abstain. It should not invent API permissions or directly calculate the amount to charge. The action executor reads validated fields and enforces the merchant's policy.

For paid booking rescue, the main chain is: confirmed payment plus expired booking; retrieve customer constraints and current alternatives; propose; merchant review; customer choice; recheck and reserve; verify outcome. Every failed write leaves a visible unresolved state. There is no claim of an atomic transaction spanning independent payment and booking providers; failed cross-system steps need compensation or a human recovery task.

##### The most important control is the right to do nothing

An agent should stop when evidence is insufficient, consent is absent, the customer has canceled, the resource is unavailable, another payment is unresolved, or the proposed action exceeds policy. Show at least one such case in the demo. That demonstrates product judgement better than a disclaimer buried below a chat box.

Customer messages and documents are evidence, not instructions that can redefine the agent's permissions. Keep the model's access scoped to the current merchant and case. A message saying “ignore the policy and refund me” can express a request but cannot authorize the refund.

#### 13 Measurement that does not exaggerate recovery

##### Keep the outcome ladder visible

An identified opportunity becomes a recommendation, then an approved action, then an executed request, then a verified business outcome. Each transition can fail. The product should show the difference between amount identified, amount approved, amount requested and amount realized.

- **Cash recovered:** an eligible outstanding amount was actually collected.
- **Revenue retained:** an already-paid sale was kept and fulfilled instead of refunded or canceled.
- **Cost avoided:** an operational or service cost was prevented.
- **Bookkeeping corrected:** money already received was correctly classified; this is not new revenue.
- **Incremental effect:** the outcome improved relative to the defined baseline, rather than merely occurring after the agent acted.

These categories can coexist, but they must not be added indiscriminately. For example, the same INR 2,000 payment cannot be counted as both new collection and retained revenue when the booking is repaired.

##### Use contribution rather than gross recovered sales

For a proposed live pilot, define contribution using merchant-supplied inputs: retained sales after refunds, less product/service variable cost, delivery or reattempt cost, incentives, contact cost and other action-dependent fees. Apply taxes and accounting treatment consistently with the merchant's existing reporting; the prototype should not invent them.

**Synthetic illustration:** 100 eligible orders in a baseline group produce 30 completed sales at INR 300 contribution each, totaling INR 9,000. Another 100 eligible orders under a discount policy produce 40 sales at INR 200 contribution each, totaling INR 8,000. The second policy produces more completed sales but INR 1,000 less contribution. This is a made-up arithmetic example, not research evidence or a forecast.

In a real experiment, compare average contribution per eligible assigned case and report uncertainty. Do not compare only reached customers with all baseline cases. Keep assignment stable, account for other active recovery systems, and avoid changing groups after seeing results. Randomized experiments and holdouts are established methods, not a novel AI feature. [R16](https://docs.statsig.com/experiments/overview)

For scarce capacity, cases may affect one another: a rescued seat can prevent another customer from booking it. A pilot may need assignment by session or a time-based design, rather than treating each customer as independent. For repeated contacts, assign by customer or account so one person does not receive both policies. The appropriate unit depends on the chosen problem.

##### What can be established before 13 October

You can establish that the workflow is legible, sources are traceable, the model handles a small held-out set of examples, permissions work, one action completes and failure states are honest. You cannot establish population-level revenue uplift, long-run retention or reliable monthly renewal improvement from a few synthetic cases.

Compare the AI approach with a simple baseline: the merchant's current checklist, a static menu, a keyword classifier or an existing support macro. If AI adds no useful decision quality, reduce its role or choose a different problem. A useful metric is how often it finds the correct evidence-backed action while avoiding a costly false action.

##### An evaluation set for the preferred concept

| Case | Expected behavior | Failure the demo should expose |
|---|---|---|
| Paid and original slot still available | Propose or restore under policy after current-state check | Creating an unnecessary second charge |
| Paid and original slot unavailable | Offer only a verified acceptable alternative | Invented availability or ignored preferences |
| Payment still uncertain | Verify or wait; no irreversible action | Treating a screenshot as payment confirmation |
| Customer wants original date only | Respect constraint and use refund/review path | Repeated persuasion toward an unsuitable option |
| Duplicate event | No duplicate booking or money action | Counting the same recovery twice |
| Payment captured while refund is in flight | Reconcile refund and available amount before proposing a replacement | Spending the same payment on both a refund and a replacement |
| Capacity changes after recommendation | Refresh proposal or escalate | Confirming stale inventory |
| Contradictory identity or evidence | Ask for clarification or review | Merging two customers incorrectly |
| Booking write fails | Show unresolved action and recovery task | Displaying success despite failure |
| Customer explicitly cancels | Stop recovery and follow applicable policy | Switching channels to keep chasing |
| Document contains policy-changing instructions | Treat them as untrusted content | Letting uploaded text override permissions |

Use independently labeled examples where possible. Keep a few unseen until the final evaluation. Report actual observed test results in the submission; this report does not claim these tests have been run.

#### 14 Merchant discovery that can change the ranking

##### A focused interview method

Speak to three merchants from one segment, or a merchant plus the staff member who handles exceptions. Do not ask whether they like the idea first. Ask them to reconstruct the last few actual cases, with personal data removed. Look for timestamps, messages, current tools, money movement and the eventual outcome.

Ask what triggered the case, which records disagreed, who had to intervene, which evidence changed the decision, how long the action remained useful, and whether the merchant gained cash, retained a sale or merely saved work. Then ask what the existing tool could already do and why that was insufficient.

Only after this walkthrough should you show a sketch. Ask the merchant to pick the correct action for several ambiguous cases and explain what would make an automated action unacceptable. Their disagreement with your assumptions is useful evidence, not an obstacle to the pitch.

##### Questions specific to each shortlist candidate

| Candidate | Most valuable question | Evidence to request with identifying details removed |
|---|---|---|
| Paid booking rescue | Show the last payment that confirmed after the booking expired. What happened to the customer? | Payment/booking timeline, available alternatives, support messages |
| Contested delivery | Which recent disputed attempt was saved, and what changed the carrier's action? | NDR reason, buyer response, submitted evidence, final status |
| Short payment | Show a recent balance that initially looked overdue but had another explanation. | Invoice, received amount, remittance, approved adjustment or delivery proof |
| Renewal repair | Which manually rescued customers required the same intervention next cycle? | Two-cycle timeline, authorization state and customer preference |
| Coordinator | Show one customer who received two incompatible actions from your tools. | Action log, message history, current suppression rules and outcome |

##### A simple economic check

Estimate eligible cases per month, average contribution at stake, current resolution rate, plausible improvement and effort per case using merchant evidence. Treat plausible improvement as a range to test, not a point forecast. Subtract incremental action cost and integration/operating burden.

For example, if a merchant has only two relevant incidents each quarter, a compelling demo may still be a useful feature, but the stand-alone business case is weak. If the cases are frequent but the system cannot obtain the evidence or execute the correction, the problem is real but the proposed prototype may not address its bottleneck.

##### When to stop investigating a concept

Stop if the merchant cannot recall recent examples; the losses are mainly non-recoverable; the existing tool already resolves the issue; a simple rule handles almost all cases; necessary data cannot be obtained; or the action is outside the merchant's control. Preserve that finding in the AI build log. Rejecting a weak idea is part of the product work.

#### 15 A realistic plan through 13 October

This schedule is a proposal from 6 October 2026 in IST. Effort estimates assume a focused prototype, not production deployment. Shift the scope down if merchant access or API setup is slow.

| Date | Work | Concrete exit condition |
|---|---|---|
| 6 October | Read the brief, shortlist, identify accessible merchants | One preferred problem and one fallback; clear unknowns |
| 7 October | Three focused conversations or artifact walkthroughs; choose segment | Two or three credible cases; explicit reason for selecting the problem |
| 8 October | Define source data, decision states, policy and evaluation cases | One end-to-end storyboard and labeled synthetic fixtures |
| 9 October | Build input, evidence view and structured recommendation | Model output grounded in the fixture data; abstention visible |
| 10 October | Add approval, one action and outcome verification | One complete successful loop plus a meaningful failure branch |
| 11 October | Compare against baseline, test unseen cases, simplify | Honest results; no false success states; no duplicate actions |
| 12 October | Finish one-page note, record 90-second video, compile AI log | Complete submission pack with prototype access checked |
| 13 October | Buffer for broken links, recording or packaging issues | Final submission before 11:59 PM IST |

If only two build days remain, use a clickable prototype or a local interface with a real model recommendation and mocked action adapters. Preserve the evidence view, merchant control and verified simulated outcome. Cut live messaging, multiple connectors, dashboards, authentication complexity and elaborate agent orchestration first.

##### Four screens for the preferred prototype

1. **Exception queue:** show one paid booking that cannot currently be fulfilled and the value at stake.
2. **Evidence and alternatives:** payment timeline, customer constraints, current capacity and the proposed resolution.
3. **Review and choice:** merchant approval, customer acceptance and an explicit no-extra-charge summary.
4. **Outcome:** replacement booking confirmed, original payment linked once, recovery category and audit trail; a failed case remains unresolved.

##### A 90-second narrative

- 0-12 seconds: show the specific merchant and the failed business outcome.
- 12-28 seconds: show the contradictory records and the customer's must-have constraint.
- 28-48 seconds: show the grounded recommendation and why one tempting alternative is rejected.
- 48-65 seconds: approve the action, capture the customer's choice and complete the adapter step.
- 65-80 seconds: show verified status and a duplicate/no-availability counterexample.
- 80-90 seconds: state the metric, what is simulated and the next validation step.

Do not spend the video touring settings or explaining a large architecture. The source evidence and the completed decision are the product.

#### 16 Turning the research into a defensible product note

##### A concise argument for the preferred concept

**Problem:** payment confirmation can reach the merchant after a capacity reservation expires, leaving the merchant with money but no valid booking. Support must reconstruct the case and negotiate a feasible resolution.

**User:** one selected type of small class or workshop operator, validated through actual cases if available.

**Solution:** an assistant verifies payment, interprets customer constraints, proposes only feasible alternatives and executes the approved booking correction or refund review.

**AI role:** interpret unstructured intent and evidence; deterministic code verifies payment, capacity, permissions and action uniqueness.

**Product decisions:** one booking type; already-paid cases only; equivalent-price alternatives; one calendar adapter; explicit customer choice; no broad revenue dashboard.

**Success:** fewer unresolved paid bookings and greater retained contribution relative to the current process, with no duplicate charges or false booking confirmations.

**Prototype boundary:** state exactly which components use real test APIs and which use fixtures. If every event is simulated, say so. The brief allows this.

##### What to record in the AI build log

Document how AI helped discover competitors, compare ideas, produce scenarios, write or debug the prototype, and review failure cases. Record the key human choices: segment, problem, excluded scope, permission boundaries and metric. Include mistakes caught, such as an invented data source, unsupported API assumption or overly broad novelty claim.

Do not fabricate merchant interviews, production recovery, measured uplift or test results. If the final choice is a localized extension of an existing category, explain why the selected merchant still needs it. That is stronger than claiming a worldwide first.

#### 17 Research scope and confidence

This was a broad, time-bounded internet sweep across Razorpay's public product direction and canonical documentation, global payment/billing platforms, YC companies, TechCrunch coverage, vertical software, merchant support workflows and selected public discussions. Regional examples include North America, Europe, Latin America, Africa and Southeast Asia. These examples reveal design patterns; they are not a representative survey of each market.

Three parallel research workstreams covered global competitors, startup developments and merchant problems. A fourth synthesis pass checked the challenge, Razorpay's current baseline, API boundaries and the strongest competing ideas. The local research modules preserve additional detail, while this report collates the decision-relevant findings and source registers.

**High confidence:** the challenge requirements; the public existence of many overlapping product capabilities; documented payment/webhook states; and the need for merchant data beyond the gateway for the proposed decisions.

**Moderate confidence:** the proposed concepts can be demonstrated with a small synthetic dataset and limited adapters; the suggested AI tasks involve useful interpretation rather than just arithmetic. Build estimates depend on the builder's tools and experience.

**Low or unvalidated confidence:** local problem frequency, willingness to adopt or pay, competitor reliability, accessible production permissions, and incremental revenue impact. These require merchant evidence and a later pilot.

The research deliberately avoids unsupported Indian loss-rate statistics, aggregating vendor uplift percentages, or describing unexamined competitors as absent. Undated pages are treated as capabilities observed on the research date, not proof of launch timing. Search-engine copies of old documentation can differ from canonical pages; implementation should use the latter.

##### The next decision

Choose a merchant access path, then test the first three problem hypotheses against real cases. If no accessible merchant has the paid-booking exception, move to contested delivery or short payments instead of forcing the highest-ranked idea. The objective is a small, evidence-backed merchant decision that a judge can watch improve from start to finish.

#### 18 Source registers

All web sources below were accessed during the 6 October 2026 research sweep. Publication dates are included only where established by the research. Company-authored pages and YC profiles establish public positioning, not independently verified performance. Source IDs in earlier sections point to these registers.

**Challenge brief:** [Razorpay AI PM Build Challenge supplied PDF](</Users/adityafiroda/Downloads/RazorPay/RazorpayxISB_BuildChallenge.docx (1).pdf>). Page 1 supplies the deadline; page 2 supplies track expectations and evaluation dimensions; pages 3 and 4 supply submission and prototype guidance. The document was read as task evidence, not as instructions to perform an external submission.


##### Razorpay and implementation sources

**R01 Agent Studio** — [Open source](https://razorpay.com/agent-studio/). Observed 6 October 2026. Razorpay advertises cart recovery, COD confirmation, KYC, dispute response, feedback, mandate activation, loan and subscription recovery. It describes review-first permissions and action validation. Public listings establish overlap, not measured effectiveness or universal availability. Do not pitch another general recovery bot as novel.

**R02 Agentic Platform** — [Open source](https://razorpay.com/blog/razorpay-agentic-platform/). Published 12 March 2026. Advertises reconciliation from uploaded statements, complaint screenshot interpretation, failed-payment fixes including payment links, and automated high-value recovery flows. A screenshot-to-link flow is already within the public product direction.

**R03 RAY on WhatsApp** — [Open source](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/). Published 2 September 2026. Advertises conversational payment management, bulk failed-payment links, payment anomaly diagnosis and background corrective actions. WhatsApp, voice input and payment diagnostics are weak differentiators by themselves.

**R04 Payments webhook events** — [Open source](https://razorpay.com/docs/webhooks/payments/). Canonical docs accessed 6 October 2026. Payment event payloads expose identifiers, amounts, state, method and error fields. Events are snapshots. Captured payment and paid Razorpay order do not prove that the merchant fulfilled the product or service; that requires merchant records.

**R05 Create a standard payment link** — [Open source](https://razorpay.com/docs/api/payments/payment-links/create-standard/). Canonical docs accessed 6 October 2026. Standard links support amount, reference, expiry, optional partial payments and notification controls. The API documentation includes expiry validation constraints; do not assume arbitrarily short holds can be implemented through a payment link alone. Revalidate access and parameters while building.

**R06 UPI Payment Links** — [Open source](https://razorpay.com/docs/payments/payment-links/upi/). Canonical docs accessed 6 October 2026. Dedicated UPI Payment Links are described as Android-only, live-mode-only, without partial payments. They differ from Standard Payment Links that can offer multiple payment methods. For a prototype, use a supported test-mode flow or visibly simulated completion instead of promising a dedicated UPI-link sandbox.

**R07 Validate and test webhooks** — [Open source](https://razorpay.com/docs/webhooks/validate-test/). Canonical docs accessed 6 October 2026. Validate raw-body signatures, deduplicate using the event ID and handle events out of order. Public callback host restrictions exist. The prototype should have an app-level action ledger as well as event deduplication. A payment request is not evidence of successful collection.

**R08 Refund events** — [Open source](https://razorpay.com/docs/webhooks/refunds/). Canonical docs accessed 6 October 2026. Refund created, processed and failed events are distinct. A proposed refund, created refund, and confirmed processed refund should not collapse into the same demo state.

**R09 Baymard checkout research** — [Open source](https://baymard.com/blog/reduce-cart-abandonment). Published 19 May 2026. Primary usability research discusses fees, account creation, form friction and delivery expectations. It supports investigating the reason for abandonment rather than assuming every abandoned cart is recoverable. Do not transfer its shopper statistics to Indian SMEs or treat them as addressable revenue.

**R10 Gorgias Shopify actions** — [Open source](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792). Accessed 6 October 2026. Advertises cancellation, item replacement with stock checks, refunds for cheaper replacements and handoff for additional payment. Documents limits in propagating changes to fulfilment systems. Generic AI exchanges and order edits already exist; a possible extension is coordinated repair across payment, fulfilment and a specific customer promise.

**R11 Gorgias action configuration** — [Open source](https://docs.gorgias.com/en-US/create-an-action-for-ai-agent-567325). Accessed 6 October 2026. Supports customer confirmation, connected-app steps and conditional actions. Approval and multi-tool execution are expected product capabilities, not novelty claims.

**R12 Shopify draft inventory reservation** — [Open source](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft). Accessed 6 October 2026. Draft-order inventory can be reserved until a chosen expiry if inventory is tracked. A payment link alone cannot reserve inventory. Integration permission and race handling remain separate implementation work.

**R13 Fresha upfront payments** — [Open source](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview). Accessed 6 October 2026. Booking deposits and no-show/cancellation payment policies are established features. A deposit reminder is not a distinctive idea.

**R14 Fresha calendar** — [Open source](https://www.fresha.com/help-center/knowledge-base/calendar). Accessed 6 October 2026. Existing automated waitlist updates and scheduling features limit the novelty of an ordinary cancellation-refill agent. Investigate unstructured preferences and cross-system booking/payment failures instead.

**R15 Narvar return overview** — [Open source](https://support.narvar.com/hc/en-us/articles/11307520101651-Narvar-Return-Overview). Accessed 6 October 2026. Return-to-exchange conversion, return policies and reasons analytics are established products. No vendor uplift percentages are adopted as forecasts for an ISB prototype.

**R16 Statsig experiments** — [Open source](https://docs.statsig.com/experiments/overview). Accessed 6 October 2026. Defines experiments as randomized comparisons. The research recommendation is to compare eligible recovery cases under the current process versus the proposed process, measuring incremental net contribution rather than attributing every subsequent payment to AI.

**R17 Razorpay Recon** — [Open source](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/). Published 17 December 2024. Public announcement describes online, offline and custom reconciliation. Do not present ordinary payment-to-bank matching as a missing Razorpay capability. Vendor efficiency claims are not independent evidence.

##### Global payment and billing sources

**G01** [Stripe — How we built it: Smart Retries](https://stripe.com/blog/how-we-built-it-smart-retries). 23 Jan 2024. Technical description of network-data retry modeling, configurable policies and access-versus-retry tradeoffs. Case-study results combine particular products and customer circumstances; not transferable baselines.

**G02** [Adyen — Uplift documentation](https://docs.adyen.com/uplift). Undated. Recommendations and experiments across conversion, risk and cost; configuration and integration limitations apply. Supports the conclusion that generalized payment optimization is mature.

**G03** [Checkout.com — Intelligent Acceptance](https://www.checkout.com/products/intelligent-acceptance). Undated. Real-time acceptance optimization including message formatting, routing and recovery. Marketing claims about performance and speed are vendor assertions.

**G04** [PayPal — Payment Optimization](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li). Undated. Smart Retries, ML routing, tokenization, authentication and processor redundancy are listed capabilities. No independent uplift conclusion taken.

**G05** [Chargebee — Failed Payment Recovery](https://www.chargebee.com/receivables/failed-payment-recovery/). Undated. Segmentation using risk, payment history and failure reasons, plus configurable communication and collection workflows. Does not establish that the invoice-objection concept is unserved.

**G06** [Chargebee — Churn Management](https://www.chargebee.com/solutions/usecases/churn-management/). Undated. Prediction, retention interventions, and recovery already sit in one product family. Useful evidence against a broad “AI churn agent” novelty claim.

**G07** [Recurly — Intelligent Retries](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic). Relative update shown: 3 months ago; exact date not asserted. ML timing for recurring cards, eligibility limits, and distinct direct-debit treatment. The retrieved documentation describes soft/hard decline handling and retry boundaries; implementation should use current provider documentation.

**G08** [Churnkey — Growth infrastructure homepage](https://churnkey.co/). Undated. Lists Account Agent, adaptive offers, feedback analysis, cancellation flows and payment recovery. Performance numbers are marketing claims, not independent trial results.

**G09** [Churnkey — Recovery Methods](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/). Undated. Describes exclusive attribution categories and how channel attribution is assigned. Our distinction between attribution and causal incrementality is an analytical inference.

**G10** [Butter Payments](https://www.butterpayments.com/). Undated main page; latest listed release 29 Jan 2026. Merchant-adapted ML payment recovery and payment-health positioning. ARR and loss estimates are vendor claims; not used as market-size proof.

**G11** [Gravy — Press](https://www.gravysolutions.io/press). Undated. Positions failed-payment recovery as a combination of technology and people. Historical funding snippets are not used to infer current scale.

**G12** [Yuno — Enterprise Revenue Recovery Stack](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery). 12 Jun 2026. Describes routing, fallback and NOVA customer outreach. Viva Aerobus figure uses contacted customers as denominator. The article's quantitative outcomes are Yuno-reported, not independently audited here.

**G13** [dLocal — Payins](https://www.dlocal.com/our-solution/payins/). Undated. Local acquiring/methods, routing and fallback across markets. Listing multiple methods does not establish identical recurring capability in each country.

**G14** [dLocal — Pix Payment Retries](https://docs.dlocal.com/docs/payment-retries-pix). Undated. Confirms a recurring Pix retry service and synchronous/asynchronous states. An analogy for rail-specific recovery design, not an authorization to transfer Pix rules to UPI.

**G15** [Paystack — Subscriptions](https://paystack.com/docs/payments/subscriptions/). Undated. Failed subscription charges are not retried in that cycle; customer authorization can be updated through hosted flows. Provider-specific behavior, not a continent-wide conclusion.

**G16** [Paystack — My transaction failed, but I was debited](https://support.paystack.com/en/articles/2127938). Edited 15 Sep 2026. Recognizes failed-payment/debit ambiguity and directs customers toward resolution. No inference that a customer screenshot proves merchant receipt of funds.

**G17** [Xendit — Recover failed payments](https://docs.xendit.co/docs/recover-failed-payments). Published 4 Dec 2024; updated 19 Jun 2025. Up to five ranked channels; retries; one-time recovery links. The one-time method is not saved as the subscription's future method. A concrete basis for the durable-repair hypothesis.

**G18** [GoCardless — Introduction to Success+](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success). Undated. Intelligent retry selection, configurable windows/limits/delay and high-failure filtering. Reported recovery percentages are product claims and vary by customer.

**G19** [Primer — Observability](https://www.primer.io/manage/observability). Undated. Cross-provider analytics, anomaly identification and A/B experimentation already exist. Supports viewing experimentation as baseline product capability rather than novel invention.

##### Merchant workflow sources

**P1** [Razorpay Agent Studio launch](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/) — 12 Mar 2026. Official product announcement. Existing RTO Shield, RTO Insights, subscription and cart agents; prevents false novelty claims

**P2** [Shiprocket NDR workflow](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-) — modified 2 Mar 2021. Official support. Incorrect reason, buyer proof, reattempt workflow; older page, contract/carrier behaviour may vary

**P3** [Shiprocket delivery disputes](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-) — modified 13 Jul 2023. Official support. Distinct conflicting delivery states and proof submission

**P4** [Indian D2C merchant discussion](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/) — relative timestamp only. Unverified anecdote. Buyer/courier disagreement; neither incidence nor culpability established

**P5** [Shipway product page](https://www.shipway.com/) — undated. Vendor product. NDR and verification competition; marketing uplift numbers excluded

**P6** [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/) — updated 26 Dec 2024. Official technical docs. Late payment versus order feasibility; SEA analogue

**P7** [Razorpay timeout/late authorisation](https://razorpay.com/learn/payment-timeout/) — 17 Sep 2026. Official merchant guide. Indian payment-finality context; implementation should still use API docs

**P8** [Zoho Books income TDS](https://www.zoho.com/in/books/help/settings/income-tds.html) — undated. Official product docs. Withholding can explain cash/invoice difference; not transaction-specific tax advice

**P9** [HighRadius PoD automation](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/) — undated. Vendor product. Existing deduction/dispute evidence workflow; claimed gains excluded

**P10** [Square waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments) — undated. Official support. Existing cancellation backfill and waitlist messaging

**P11** [Fresha upfront payment policies](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview) — undated. Official support. Existing deposits/stored-card policies; jurisdiction applicability not inferred

**P12** [Loop instant exchanges](https://help.loopreturns.com/en/articles/1913025) — current help article. Official product docs. Existing exchange reservation/fulfilment mechanism; competitive baseline

**P13** [Loop bonus credit](https://help.loopreturns.com/en/articles/1912193) — edited 13 Feb 2026. Official product docs. Existing exchange/store-credit incentives; do not pitch as novel

**P14** [Razorpay subscription retries](https://razorpay.com/docs/payments/subscriptions/payment-retries/) — current canonical page. Official API/product docs. Pending/halted behaviour and built-in retries; stale mirrored docs differ

**P15** [Razorpay refund communication](https://razorpay.com/docs/payments/refunds/communication/) — current canonical page. Official product docs. ARN/RRN/UTR and email dependence

**P16** [Paystack DVAs](https://paystack.com/docs/payments/dedicated-virtual-accounts/) — current canonical page. Official technical docs. Customer-linked transfers and delayed-notification requery; geography-specific

**P17** [Banco Central Pix Automático](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico) — undated. Central bank explainer. One-time recurring authorisation and payer rules; search-rendered content available, direct page renders minimally

**P18** [Razorpay webhook validation](https://razorpay.com/docs/webhooks/validate-test/) — current canonical page. Official technical docs. Signature, duplicates and out-of-order events

##### Startup and vertical software sources

**S01** [Rex, YC](https://www.ycombinator.com/companies/rex-inc), undated; S26 batch. Company-authored directory. Enterprise agents include procurement portals and exceptions, with staged autonomy.

**S02** [Alder, YC](https://www.ycombinator.com/companies/alder), undated; F25 batch. Company-authored directory. Payment-blocker diagnosis and repair are explicit features.

**S03** [Glimpse product](https://www.tryglimpse.com/), undated. Vendor product page. Evidence retrieval, deduction validation, disputes and reconciliation.

**S04** [Glimpse, YC](https://www.ycombinator.com/companies/glimpse-2), undated; S20 batch. Company-authored directory. Confirms the company's deductions/revenue recovery positioning.

**S05** [FlyCode, YC](https://www.ycombinator.com/companies/flycode), undated; S22 batch. Company-authored directory. Smart retries, coordinated outreach, and backup payment methods.

**S06** [Butter announcement](https://www.butterpayments.com/blog/press-release/butter-drives-56-more-recurring-revenue-for-subscription-brands/), 29 January 2026. Vendor press release. Describes payment scoring and outreach expansion; growth claims unverified.

**S07** [Churnkey A/B testing](https://docs.churnkey.co/cancel-flows/a-b-testing/), undated. Product documentation. Experiments track downstream retention/payment, not just accepted offers.

**S08** [Signals, YC](https://www.ycombinator.com/companies/signals), undated; W26 batch. Company-authored directory. Proactive post-purchase care and exchange recommendations; experimental outcomes are vendor claims.

**S09** [REVER, YC](https://www.ycombinator.com/companies/rever), undated; S22 batch. Company-authored directory. Integrated returns and rapid-refund proposition. Profile metrics should not be assumed independently audited.

**S10** [ReturnGO exchange FAQs](https://support.returngo.ai/exchanges-faqs), updated 19 April 2026. Product documentation. Product exchanges, price differences and inventory reservation.

**S11** [ReturnGO stockout prevention](https://support.returngo.ai/preventing-out-of-stock-exchanges), updated 14 April 2026. Product documentation. Stock thresholds, reserves and instant exchanges are existing features.

**S12** [ReturnGO switch to exchange](https://support.returngo.ai/switch-to-exchange), updated 11 May 2026. Product documentation. Refund-to-exchange prompts and optional bonus credits.

**S13** [Claimlane agent](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent), 2 September 2026. Product documentation. Policy/context/action framework, evidence requests, and configurable human review.

**S14** [Nibble](https://nibbletechnology.com/), undated. Vendor product page. Procurement negotiation with controlled pricing functions outside the LLM.

**S15** [Nibble B2B cases](https://blog.nibbletechnology.com/4-ways-to-use-ai-negotiation-in-b2b/), date not established. Vendor article. Ecommerce clearance/quantity negotiation is an older adjacent use case.

**S16** [Toma, YC](https://www.ycombinator.com/companies/toma), undated. Company-authored directory. Vertical voice agents for automotive operations; performance claims not independently checked.

**S17** [CentralComs, YC](https://www.ycombinator.com/companies/centralcoms), undated; P26 batch. Company-authored directory. Intake, dispatch, estimate follow-up and reactivation form an existing bundle.

**S18** [Zenoti waitlists](https://www.zenoti.com/platform/waitlist-management), undated. Vendor product page. Cancellation notifications and automated replacement bookings.

**S19** [Loop Return Insights](https://help.loopreturns.com/en/articles/13680897), 9 September 2026. Product documentation. Product-level outliers and dollar-impact prioritisation; variant detail requires another report.

**S20** [Loop analytics](https://help.loopreturns.com/en/articles/1914881), 8 January 2025. Product documentation. Return data is explicitly connected to descriptions, sizing and product changes.

**S21** [Clearest Health, YC](https://www.ycombinator.com/companies/clearest-health), undated; S23 batch. Company-authored directory. A specialised underpayment/appeal recovery product, used only as business-pattern inspiration.

**S22** [TechCrunch / Glimpse](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/), 25 March 2026. Reporting. Funding corroboration.

**S23** [TechCrunch / Toma](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/), 5 June 2025. Reporting. Sector coverage.

**S24** [TechCrunch / REVER](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/), 19 June 2023. Reporting. Earlier company profile.

**S25** [Rigby construction](https://tryrigby.com/industries/construction), undated. Vendor product page. Field evidence, approved changes and invoice generation; uncorroborated market statistics omitted.

**S26** [Addenly docs](https://addenly.com/docs), undated. Product documentation. Direct competitor to client-message scope comparison and approval-to-invoice flows.

**S27** [Addenly terms](https://addenly.com/legal/terms), updated 19 August 2026. Vendor service description. Explicit editable drafts, human send action, client approval and EU freelancer positioning. Not used as legal advice.

**S28** [With Oversight](https://withoversight.com/), undated. Vendor product page. Unbilled request detection for agencies including production/events. Adoption unverified.

**S29** [ClarAccord agencies](https://claraccord.com/solutions/agencies), undated. Vendor product page. WhatsApp scope ambiguity and signed approval receipts. Adoption unverified.

**S30** [Clearstory tag agent](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent), undated. Product documentation. Conversational tags, configured rates, missing-information questions and human submission.

**S31** [Clearstory AI announcement](https://www.clearstory.build/construction-blog/introducing-clearstory-ai), exact date not established. Vendor announcement. Four agent roles described; announcement distinguishes current closed beta from subsequent planned betas. Do not imply all were fully live at publication.

**S32** [Adaptive](https://www.adaptive.build/), undated. Vendor product page. Change-order and billing clerks connecting contracts, costs and field updates.

**S33** [Adaptive updates](https://www.adaptive.build/product-updates), entries through September 2026. Product changelog. Operational detail on approvals, draft change-order PDFs and Procore imports.

**S34** [Procore AI](https://www.procore.com/ai), undated. Vendor product page. Native actions, source references, permissions and sign-off.

**S35** [Siteline change-order log](https://www.siteline.com/blog/change-order-log), date not established. Vendor product article. Approved changes can progress into billing schedules.

**S36** [Accelo timesheet approvals](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/), date not established. Product documentation. Approval-controlled invoice eligibility and invoiced activity traceability.

**S37** [Monograph additional services](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project), 4 March 2025. Product documentation. Fixed fees and capped hourly additional work have different earned-value treatment.


##### Additional booking competition checked during review

**R18 Zenoti AI Receptionist** — [Open source](https://www.zenoti.com/ai-workforce/ai-receptionist). Undated product page, accessed 6 October 2026. Advertises availability-aware rescheduling and provider preferences. Establishes close competitive overlap; vendor performance claims are excluded.

**R19 Zenoti Redesigned Appointment Book** — [Open source](https://help.zenoti.com/en/appointments/redesigned-appointment-book.html). Undated official help page, accessed 6 October 2026. Describes moving paid appointments when pricing remains equal. The cross-system late-confirmation exception still requires merchant validation.

---

<a id="archive-b"></a>
## Appendix B. Broader-concepts reassessment

> **Historical record — 13 October 2026.** Historical response to breadth/integration concerns. Its recommendation to retire SeatSaver is superseded by the user selecting SeatSaver. No new verification was performed during consolidation.

### Razorpay broader revenue recovery concepts

Reassessment of opportunities for Recover and Grow with AI
13 October 2026

#### 1 Recommendation

We should retire SeatSaver as the leading recommendation. Its value depends on several conditions occurring together: a delayed payment confirmation, a capacity-constrained purchase, the original availability disappearing, and an acceptable replacement remaining. It also needs authoritative booking information to act. A clear demonstration does not compensate for that combination of limited coverage and integration cost.

The strongest new direction is **payment objection repair**: learn which recurring misunderstandings stop customers completing payment, propose a precise correction to the payment experience, let the merchant approve it, and measure whether the correction improves completed payments. It can serve multiple industries without maintaining their stock or booking systems.

A credible alternative is **payment commitment recovery**: turn replies to existing unpaid payment requests into permitted arrangements or concrete administrative fixes. This produces a more immediate cash-collection demonstration, but competes in an established collections category.

Both need a small amount of verified merchant context. Payment records alone cannot reveal whether a buyer misunderstood the terms, rejected the price, needs a document, or simply changed their mind. We should require a short approved policy card and voluntary customer responses, rather than quietly recreating a CRM or inventory system.

These are hypotheses to validate. The evidence supports the problem categories and available building blocks; it does not establish that either affects a majority of Razorpay merchants or that the proposed product increases revenue.

#### 2 What changes in our selection criteria

**Breadth means a reusable problem across business types.** It does not require claiming that every merchant needs the feature. Courses, professional services, memberships, donations and other fixed-offer businesses can share a payment-clarity problem. A service provider and a wholesaler can share a payment-request problem even though their operations differ.

**The architecture objection is valid without a Shopify market-share estimate.** Custom websites can expose booking and inventory APIs, but integrating them still costs time and requires agreement on what is authoritative. Platform independence should mean that the core product continues to work without that dependency.

**AI must interpret something genuinely variable.** Transaction-state checks, balance arithmetic, permission checks and duplicate-event handling belong in code. AI earns its place by interpreting varied customer language, distinguishing superficially similar objections, linking them to approved facts, and preparing the appropriate action.

**The product must do something reviewable.** A merchant should see an exact page correction, an allowed arrangement, or a completed document packet. A list of insights alone is insufficient.

**A failed transaction is not automatically a lost sale.** A customer may pay on another attempt. Someone leaving checkout may never have intended to buy. An authorised payment is not the same as captured money, and a captured payment does not establish successful fulfilment. Evaluation must preserve these distinctions.

#### 3 What the current market already covers

Razorpay publicly describes Cart Recovery agents that adapt to dropout context and select merchant-approved offers. Its guardrail documentation also explains reliance on connected merchant systems for product and order facts. A new conversational coupon assistant would have substantial overlap. [Razorpay agent guardrails](https://razorpay.com/blog/razorpay-agent-studio-principles-guardrails-and-merchant-control/)

RAY already advertises failed-payment link creation, bank or network diagnostics, checkout-friction identification and payment operations through WhatsApp. A natural-language payment dashboard or generic failure explanation is therefore a weak replacement concept. [RAY](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/)

Razorpay Engage already markets transaction-led promotions, audience targeting and retention. Simple purchase-history segmentation with AI-written win-back messages is crowded within Razorpay itself. [Razorpay Engage](https://razorpay.com/engage/)

Outside Razorpay, Contentsquare connects feedback, behaviour and AI-assisted analysis to experience improvement. Chaser offers payment plans and instalment follow-up. YC company Alder explicitly addresses payment blockers such as missing references and changed payer contacts. These precedents make the categories credible, but prevent us from honestly calling them new inventions. [Contentsquare](https://contentsquare.com/platform/voice-of-customer/), [Chaser](https://www.chaserhq.com/features/payment-plans), [Alder](https://www.ycombinator.com/companies/alder)

The opportunity to investigate is a smaller workflow that fits naturally into Razorpay payment surfaces and requires substantially less setup than a separate analytics or finance stack.

#### 4 Candidate comparison

| Candidate | Integration needed | AI contribution | Assessment |
|---|---|---|---|
| Payment objection repair | Approved facts, feedback prompt, editable payment surface, payment outcomes | Find recurring misunderstandings and propose supported corrections | Strongest breadth and visible learning loop |
| Payment commitment recovery | Active payment request, approved terms, customer reply, optional invoice upload | Interpret blockers and construct permitted next actions | Strongest immediate collection demonstration |
| Recovery spend optimizer | Eligible audience, allowed actions, costs and experiment outcomes | Learn when each intervention helps | Useful extension; too dependent on volume for the lead demo |
| SeatSaver | Booking state, availability and payment state | Interpret preferences and rank replacement bookings | Demoted for reach and integration burden |

This is a qualitative judgement under the revised constraints, not a measured market ranking.

#### 5 Payment objection repair

##### The problem

A business repeatedly loses willing buyers because the payment experience leaves a question unresolved. The same concern appears in different language: whether a charge repeats, why the payable amount differs from the headline price, what a fee includes, or what happens immediately after payment. An owner may answer these questions one by one while the page continues creating the same confusion.

Baymard's US shopper research identifies cost visibility, trust and returns policy among abandonment reasons, while also warning that many shoppers are simply browsing. This supports investigating nontechnical payment friction. It does not provide an Indian market-size estimate, and an objection to an actual policy cannot necessarily be fixed by explaining it more clearly. [Baymard research](https://baymard.com/lists/cart-abandonment-rate)

##### A concrete example

Consider a synthetic digital learning business. Its offer headline says “₹1,200 per month”, but it sells three months for a single ₹3,600 payment. The merchant-approved terms explicitly say there is no automatic renewal.

Customer responses include “Why is it charging triple?”, “Will ₹3,600 be taken every month?”, and “Har month auto debit hoga?” The agent identifies related but distinct concerns: the amount due today and the renewal mechanism.

It proposes an exact replacement beside the payment button: **“₹3,600 today for three months of access. One payment. No automatic renewal.”** Each statement links to a merchant-approved fact. The merchant previews and approves the change. The price and commercial terms remain those already approved.

A different response, “I understand the three-month fee; I only want one month”, is a product or commercial preference. The agent should not classify it as confusion, invent a monthly plan, or count the clarification as a solution.

##### The agent loop

1. Capture a voluntary response on the payment surface, or use consented conversations from an existing recovery flow. An unattended browser close does not reveal a reason.
2. Group replies by the underlying concern, keeping supporting excerpts and uncertainty visible.
3. Compare the concern with the approved offer facts and the wording actually shown to that customer.
4. Propose the smallest supported change, or explain which fact the merchant must supply before a change is possible.
5. Show the original and proposed experience with Approve, Edit and Reject controls.
6. Run an approved experiment on the controlled surface and compare payment outcomes over the same observation window.
7. Retain, revise or roll back the change according to the evidence. Preserve “not enough evidence” as a normal result.

##### Why AI is useful

Different customers express the same concern with different words, languages and implied assumptions. The useful model task is to infer those meanings, distinguish a misunderstanding from genuine dissatisfaction, and reconcile the evidence with the business's actual terms. It can then draft a correction appropriate to the specific offer.

A keyword rule for “monthly” could wrongly merge “I thought this was monthly” with “I understand it is quarterly but want a monthly option”. A model can help separate them; it can also be wrong, which is why the merchant sees the evidence and the proposed factual change.

Rules should control source freshness, unchanged prices, prohibited unsupported promises, experiment assignment and payment accounting. AI must not decide that a bank decline was caused by page wording just because a customer also left a comment.

##### Minimum data and where it comes from

| Input | Source | Important limit |
|---|---|---|
| Amount and payment outcome | Razorpay payment records | Does not prove why a customer left |
| Page shown and variant exposure | Our instrumented surface | Not assumed to exist in public payment webhooks |
| Customer concern | Optional feedback or consented conversation | Respondents are a selected subset |
| Fee, renewal and cancellation facts | Merchant-approved policy card | Must be current and specific to the offer |
| Page change | Our controlled page or native product extension | Arbitrary external pages cannot be edited automatically |

Razorpay payment entities provide payment facts, not an inventory or customer-intent database. Razorpay documents editing Payment Pages through its dashboard. That establishes a suitable native product surface; it does **not** establish a public API for automated page editing or built-in experiment assignment. [Payment entity](https://razorpay.com/docs/api/payments/entity/), [Manage Payment Pages](https://razorpay.com/docs/payments/payment-pages/manage/)

For the prototype, use a small hosted offer page under our control and Razorpay test checkout or clearly labelled payment simulation. Instrument feedback, exposures and the payment-result join there. A proposed native Razorpay deployment would require internal product integration. Custom websites later require access to the relevant page and payment instrumentation; effort varies by merchant stack. A feedback embed alone does not enable approved page changes or reliable outcome tracking. Keep the initial scope to controlled pages.

##### Breadth and boundaries

The mechanism can apply to course fees, subscriptions, memberships, consulting packages and donations. For each, the merchant supplies its own verified facts. The initial prototype should use one concrete business and perhaps two additional examples to demonstrate portability.

It will not resolve lack of stock, unavailable delivery dates, unaffordable prices, dissatisfaction with the actual policy, or poor product-market fit. Merchants with almost no traffic or feedback may benefit from a one-off clarity review but cannot run a reliable continuous learning loop. The first target should therefore have a repeatable payment page and enough customer interaction to expose recurring issues.

##### Differentiation worth demonstrating

The key output is an approved correction deployed to a payment experience, followed by payment-based evaluation. The proposed extension learns from individual recovery conversations and uses that learning to prevent the same obstacle for subsequent buyers.

Feedback analysis and conversion experimentation already exist in the broader market. The defensible positioning is a compact Razorpay workflow joining customer explanations, verified merchant facts and payment outcomes. We have not established that Razorpay has no unpublished or upcoming equivalent.

##### Metrics and evaluation

The primary experiment measure should be **captured amount less refunds per eligible exposed visitor**, measured over a fixed window. This is a collection measure, not accounting revenue or profit. Where amounts are constant, completed-payment conversion is easier to interpret.

Compare randomly assigned contemporaneous groups; keep a visitor's assignment stable. Randomize all eligible visitors, not just feedback respondents. Both variants should use the same feedback prompt, outreach and eligibility rules so the test isolates the proposed wording change. Deduplicate payment attempts and join payments through an explicit session or order mapping. Do not compare unrelated weeks and attribute every change to the wording. Monitor complaints, refunds, page latency and unsupported statements.

Feedback frequency is diagnostic evidence. “Twelve of thirty respondents mentioned renewal” does not mean 40% of all visitors left because of renewal. Tiny samples should produce uncertainty, not a claimed uplift.

##### Smallest convincing prototype

Use roughly thirty synthetic comments, one approved policy card and two page variants. Demonstrate the AI grouping varied comments, identifying the source facts, drafting the correction, receiving merchant approval, and publishing to the demo surface. Include one deliberately unsolvable objection to show that the model does not invent terms.

The evaluation panel can show a labelled simulated outcome or an empty live experiment with “collecting evidence”. Synthetic results must not be presented as an actual business improvement. For a short video, the critical moment is the transition from customer evidence to an exact approved page change.

#### 6 Payment commitment recovery

##### The problem and action

An active payment request remains unpaid because the requested timing or administrative requirements do not match the customer's situation. Repeating the same reminder cannot resolve that mismatch.

In a synthetic example, a consultant has an approved ₹12,000 payment request. The customer says, “I can send ₹6,000 today and the balance Friday.” The merchant allows a 50% minimum initial payment and the remainder within seven days. The agent interprets the request, resolves the date, checks the permitted terms and presents the proposed arrangement for approval.

The product then uses the existing Standard Payment Link, with permitted partial-payment settings, records the agreement and schedules its own follow-up. It counts ₹6,000 received and ₹6,000 outstanding after the deposit. The promise of the rest is not a completed recovery.

##### Three branches that show genuine judgement

- **Timing constraint:** construct a permitted arrangement, obtain agreement and track verified collections.
- **Administrative blocker:** a customer needs an existing invoice, missing reference or authorised payer handoff. Assemble the approved material and ask the merchant to supply or correct anything missing.
- **Commercial dispute:** “The final deliverable is missing.” Pause this agent's chasing and send the merchant an evidence-backed summary. A reminder or instalment offer is not a resolution of that dispute.

“I already paid” requires verification before any renewed request. A matching amount alone is insufficient proof. Payments outside the connected records require merchant reconciliation; the agent must expose that limitation.

##### AI role and integration

AI interprets multi-part replies, dates, conditions and document references, then selects the appropriate workflow. Code handles balances, policy limits, payment states and allowed API actions. A basic reminder scheduler or a fixed instalment form does not require an LLM.

The inputs are an active payment request, approved payment terms and the customer's reply. An invoice or supporting document is optional until its contents are needed. No live inventory integration is required for the initial workflow, but the merchant must confirm that the request is still commercially valid. A payment link's active status alone does not prove that an underlying service is still deliverable.

Standard Payment Links support partial payments and a minimum first payment. The update API documents changes to relevant link settings. These are usable primitives; an agreed schedule and fulfilment consequences remain the application's and merchant's responsibility. [Create Standard Payment Link](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [Update Standard Payment Link](https://razorpay.com/docs/api/payments/payment-links/update-standard)

Native reminder functionality already exists. The proposal must show resolution of a customer constraint, rather than simply resending a link. Suppressing our follow-up does not automatically disable every reminder or collection process in other systems. [Payment Link reminders](https://razorpay.com/docs/payments/payment-links/reminders/)

Razorpay currently documents creation of only non-GST invoices through its Invoices API. Formal invoice corrections should therefore remain in the merchant's approved invoicing workflow; the prototype can prepare the correction request and supporting packet. [Invoices API](https://razorpay.com/docs/api/payments/invoices/)

##### Reach and competitive reality

The natural audience includes service providers, training businesses, agencies and wholesalers already issuing payment requests and accepting flexible terms. It is broader than replacement-seat recovery, but is a weaker fit for immediate-fulfilment retail requiring full payment upfront.

Chaser and Alder establish direct competitive overlap. The opportunity would be convenient setup and constrained execution for Razorpay payment-link merchants. It should not be pitched as the first agent to understand payment blockers or negotiate payment timing.

Measure cash collected, time to collection, eventually unpaid balances, merchant handling time and complaints. In a pilot, compare with the merchant's existing process over equivalent cases. Earlier collection is a cash-flow benefit; it must be distinguished from money that would never otherwise have been collected.

#### 7 Recovery spend optimization as an extension

A third useful problem is deciding when a reminder, explanation, permitted incentive or no contact creates incremental value. A merchant may currently credit an agent for payments that would have happened anyway and pay unnecessary incentive or outreach costs.

This can operate with a small approved action set and observed payment outcomes. A learning model could improve action selection as evidence accumulates. However, reliable evaluation requires sufficient volume, contemporaneous controls and known costs. Profit claims additionally require margin information that payment amounts do not provide.

Braze already describes AI decisioning for promotional spending. This is a legitimate extension to either shortlisted product, but a weak primary hackathon claim if every learned advantage is illustrated with synthetic data. [Braze AI decisioning](https://www.braze.com/resources/articles/how-ai-decisioning-optimizes-retail-promotional-spend)

#### 8 What to validate before committing

For payment objection repair, inspect a small sample of real merchant payment pages and anonymised customer questions with permission. Determine whether recurring misunderstandings exist, whether the approved facts resolve them, and whether the merchant can identify a useful change without extensive custom setup. Ask merchants to judge the proposed edits, including ones that should be rejected.

For payment commitment recovery, inspect recent unpaid requests and the actual reasons given. Count cases where a permitted arrangement or a specific missing document could have changed the outcome. A merchant with few requests and an effective personal follow-up process may have little need for an agent.

Our first falsification test for objection repair is simple: if most objections concern the real price, availability or product suitability, the lightweight clarification product cannot fix enough of them. For commitment recovery, the equivalent failure is merchants being unwilling to vary timing, or most unpaid requests being genuine disputes.

Do not replace those checks with a large market statistic or a claim that every failed payment is recoverable. The next decision should be based on which problem we can explain clearly, demonstrate honestly and validate with accessible merchant evidence.

---

<a id="archive-c"></a>
## Appendix C. Global competitor research

> **Historical record — 6 October 2026.** Global-payments workstream with regional patterns, seven hypotheses and source ledger. No new verification was performed during consolidation.

### Global payment recovery landscape and opportunity hypotheses

Research date: **6 October 2026**, Asia/Kolkata. Prepared for the Razorpay × ISB Recover and Grow with AI ideation effort. This is a research module, not a claim of exhaustive market coverage. Proposed product ideas and scores below are our hypotheses. Vendor features are sourced; vendor performance claims are not independent proof.

#### Decision in one paragraph

Do not pitch a generic agent that notices failed payments, reasons about a decline, sends a personalized WhatsApp message, retries, and shows recovered rupees. That category is crowded at infrastructure, billing, startup, and public hackathon-project levels. The more defensible opportunity is **a narrow merchant-specific decision that payment infrastructure cannot settle on its own**: whether a cart is still fulfilable; whether a payment repaired the next renewal or merely this invoice; which invoice objection must be resolved; or who is legitimately authorized to pay. A basic prototype can demonstrate one such decision using merchant data, customer language, strict action constraints, and a verified outcome. The originality should reside in the problem and operating decision, not the chatbot interface.

#### What is already commoditized or heavily contested

| Layer | Examples checked | Existing capability | Implication for this challenge |
|---|---|---|---|
| Optimal retry timing | [Stripe](https://stripe.com/blog/how-we-built-it-smart-retries), [Recurly](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [Butter](https://www.butterpayments.com/), [GoCardless](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success) | Network-trained or merchant-adapted models choose when to reattempt collection. | A one-week project will not credibly outperform infrastructure trained on very large payment histories. Use payment-provider capabilities as tools. |
| Payment routing, acceptance and cost | [Adyen](https://docs.adyen.com/uplift), [Checkout.com](https://www.checkout.com/products/intelligent-acceptance), [PayPal](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li), [Primer](https://www.primer.io/manage/observability) | Optimize authorization, provider paths, fraud friction, costs, and experiments. | A dashboard that diagnoses payment failure is insufficient differentiation. |
| Customer communication after failure | [Yuno NOVA](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery), [Churnkey](https://churnkey.co/), [Gravy](https://www.gravysolutions.io/press) | WhatsApp/voice, email/SMS/in-app intervention, or human-assisted recovery. | Local-language voice alone is not a new idea. Show a better resolution workflow. |
| Subscription retention | [Chargebee](https://www.chargebee.com/solutions/usecases/churn-management/), [Churnkey](https://churnkey.co/) | Retention offers, pauses, plan changes, prediction, feedback analysis, payment recovery. | Personalized offers and cancellation rescue need a narrow nuance to stand out. |
| Local and backup payment methods | [dLocal](https://www.dlocal.com/our-solution/payins/), [Xendit](https://docs.xendit.co/docs/recover-failed-payments) | Local acceptance and alternative payment channels; automatic or manual fallback. | “Offer another payment method” is a baseline. The interesting decision is which authorized alternative solves the customer's actual obstacle. |
| Recovery attribution | [Churnkey recovery methods](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/) | Recovery is assigned to one channel or action without double counting. | Attribution is useful bookkeeping, but it does not measure causal uplift against what would have happened anyway. |

##### Why the newest competitive evidence matters

Yuno's June 2026 article describes a three-layer recovery stack: routing, infrastructure fallback, and direct customer recovery through NOVA. Its reported Viva Aerobus result is **75% of contacted customers**, a selected denominator, not 75% of all failed payments. The product description includes WhatsApp or voice in many languages. This is a close analogue of the most obvious buildathon idea. [Yuno source](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery)

Churnkey's current positioning combines an Account Agent, adaptive offers, feedback analysis, and payment recovery. Therefore, adding an LLM to churn prediction or cancellation flows is also insufficient by itself. These observations establish existing products, not proof that these tools work equally well for an Indian small merchant. [Churnkey source](https://churnkey.co/)

Stripe's engineering article is a useful reality check: retry prediction uses more than 500 attributes and a combination of statistical and text-derived features. Even “use richer context instead of static rules” is already established. The article also explicitly discusses the tradeoff between keeping unpaid customers active and giving retries enough time. [Stripe source](https://stripe.com/blog/how-we-built-it-smart-retries)

#### Regional lessons worth importing

##### North America: optimize the relationship, not only authorization

Butter markets recovery customized to merchant subscription characteristics; Gravy combines technology and people. Their useful shared lesson is that a merchant-specific workflow can matter after baseline infrastructure has done its job. However, neither a new retry model nor “a warmer message” is a defensible novelty claim. Candidate Indian adaptations should use merchant-side context that changes the permissible action. [Butter](https://www.butterpayments.com/), [Gravy](https://www.gravysolutions.io/press)

##### Europe and global enterprise: recovery is a constrained optimization problem

Adyen explicitly balances conversion, risk and cost. Recurly documents boundaries on retry eligibility; GoCardless exposes retry limits, delays, and a filter for likely failures. The lesson is to make “stop”, “wait”, “ask for another method” and “escalate” first-class outcomes. More attempts do not inherently mean better recovery. [Adyen](https://docs.adyen.com/uplift), [Recurly](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [GoCardless](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success)

##### Latin America: instant payments and local rails change the workflow

dLocal documents failed recurring Pix payment retries. Its broader pay-in proposition emphasizes local methods such as Pix, UPI and GCash, alongside local acquiring and fallback. The transferable lesson is not that a Pix design can be copied directly into UPI: **rail-specific authorization, timing, pending states, and confirmation matter**. A generic card-retry abstraction can conceal these differences. [dLocal Pix retries](https://docs.dlocal.com/docs/payment-retries-pix), [dLocal Payins](https://www.dlocal.com/our-solution/payins/)

##### Africa: failure handling differs materially across providers

Paystack's subscription documentation says a failed charge is not retried within that billing cycle; its `attention` state can be charged on the next payment date. It supports hosted authorization updates. Separately, its customer help page recognizes the case where a payment appears to fail but the customer's bank account was debited. That is a strong reminder to reconcile payment state before sending another demand for money. These are provider-specific facts, not a claim about all African payments. [Paystack subscriptions](https://paystack.com/docs/payments/subscriptions/), [Paystack failed-but-debited](https://support.paystack.com/en/articles/2127938)

##### Southeast Asia: one-time recovery can leave the underlying problem unfixed

Xendit documents up to five ordered payment channels and a recovery payment link. Crucially, a successful one-time recovery payment does **not** replace the subscription's registered methods. It fixes the current cycle and stops its retries; future cycles continue on the original methods. This suggests a subtle problem statement: **the merchant's “recovered” invoice can hide an unresolved next-cycle failure.** This behavior is confirmed for Xendit; whether the same gap exists in a chosen Razorpay merchant workflow requires validation. [Xendit recovery documentation](https://docs.xendit.co/docs/recover-failed-payments)

#### Seven differentiated, feasible opportunity hypotheses

All examples are illustrative, with invented merchants, customers and amounts. These are not claims that a competitor has never built a similar feature. “Nearest competitor” is the nearest found in this research, not a global novelty guarantee.

##### 1. Fix the next renewal: a durable recovery agent

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

##### 2. Recover a fulfilable basket, not a stale cart

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

##### 3. Resolve the invoice objection before asking again

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

##### 4. Authorized payer handoff for learning and memberships

**Problem.** The person using the product is not always the person able or authorized to pay. Generic reminders reach the learner, employee or family member indefinitely. An invoice can also be accidentally disclosed to an unverified new payer.

**Signal.** Customer says “my parent pays”, “send it to our accounts person” or “the old billing owner left”; CRM and prior payment data conflict with the current contact.

**Decision and action.** Offer a customer-controlled payer handoff: the user approves a recipient or shares a secure link themselves; the new payer receives only the necessary payment context; a verified payment maps back to the original order or subscription. Updating future billing ownership is a separate confirmed action.

**Why AI.** It recognizes role changes and constraints in messy conversation. Identity checks, authorization, recipient validation and link scope must remain deterministic. Without role ambiguity this is simply a payment link feature.

**Controls.** Customer-supplied contacts only; data minimization; no scraping relatives or employer contacts; expiring links; no entitlement transfer merely because someone paid; prevent duplicate invoice settlement.

**Feedback and measure.** Time to reach an authorized payer, paid invoices after handoff, contact loops avoided, privacy incidents and duplicate-payment rate.

**Prototype.** Adult learner/parent payer, departing employee/finance team, and one denied handoff. Demonstrate two different permissions: one-time payer versus future billing owner.

**Nearest analogue / caveat.** Payment links and billing-contact changes are established. The differentiated unit is consent-aware role resolution tied to the same invoice and future authorization. Must validate whether this is frequent enough in the chosen vertical to justify an agent.

##### 5. Payment-to-access rescue: fix the customer outcome after money moves

**Problem.** The processor shows payment success but a course, membership or software account remains inactive due to a missed webhook, mismatched account or duplicate customer record. The merchant sees “revenue received”, yet the customer asks for a refund or leaves.

**Signal.** Verified paid invoice but absent entitlement, or a customer complaint plus conflicting order/account evidence. Payment screenshots can be clues but cannot authorize access or establish settlement.

**Decision and action.** Retrieve canonical payment and merchant entitlement states, resolve probable account mapping, and propose or perform an allowed access repair. Escalate ambiguity. If payment is still unresolved, avoid another charge and give an evidence-based status response.

**Why AI.** Useful for identifying the right account across conversational clues and summarizing conflicting evidence. The core paid-to-entitled invariant is deterministic; do not use a language model for ledger truth.

**Controls.** Verified source records; no screenshot-only approval; no cross-user access grant; least-privilege entitlement repair; human review above uncertainty threshold; idempotency.

**Feedback and measure.** Paid-but-blocked time, refund requests following activation incidents, and successful entitlement repairs. Count this as **protected revenue / reduced refunds**, not new recovered payment value. Track fit should be checked against the challenge's definition of recovery.

**Prototype.** Five event histories: delayed webhook, duplicate account, already-refunded payment, truly failed payment with debit complaint, and successful payment requiring entitlement replay. Demonstrate a repair and an escalation.

**Nearest analogue / caveat.** Payment support and billing-entitlement platforms already solve parts of this. Razorpay itself now demonstrates payment complaint investigation. The potential wedge is closing the merchant-side access gap, not inspecting transaction status. [Paystack's failed-but-debited example](https://support.paystack.com/en/articles/2127938) supports the need to distinguish user-reported debit from canonical merchant payment state; it does not prove demand for this exact product.

##### 6. Recovery that knows when to stay quiet

**Problem.** Multiple tools claim credit for the same recovered invoice; some users would have paid without intervention; discounts destroy margin; simultaneous messages create annoyance. Gross recovered payment can rise while incremental profit or trust falls.

**Signal.** Unified invoice state, scheduled provider retries, prior customer contact, customer objections, current offer eligibility and past outcomes.

**Decision and action.** Choose among do nothing, wait for an already scheduled attempt, send one helpful explanation, request a payment update, or escalate. Assign eligible invoices randomly to the merchant's existing baseline and the proposed policy. Include a contact budget and stop conditions.

**Why AI.** Customer intent and objections can change the appropriate action; AI can structure those signals. Randomization, suppression, budget limits, payment matching and uplift calculation are deterministic. A pure experimentation dashboard would be weak on the agent requirement, so demonstrate one actual constrained intervention loop.

**Controls.** Baseline care continues for the control group; no withholding necessary payment notices; customer opt-outs; per-person contact caps; discount eligibility rules; never change experiment assignment after seeing outcomes; no results claimed from simulated cohorts.

**Feedback and measure.** Incremental net collected contribution per eligible invoice, recovery delay, contact rate, opt-outs, refunds and repeat churn. Store both attributed recovery and estimated incremental recovery as different numbers.

**Prototype.** A queue of 100 clearly synthetic cases with fixed experiment assignment and five intervention examples. The demo shows why one case is suppressed, one resolved with no discount, one escalated and one recovered. Show how a later live pilot would test the hypothesis; do not pretend synthetic uplift is empirical proof.

**Nearest analogue / caveat.** Churnkey has single-touchpoint attribution; Primer has A/B tools. The wedge is applying a merchant contact budget and net-contribution objective to the customer recovery policy, not inventing A/B testing. [Churnkey attribution](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [Primer observability](https://www.primer.io/manage/observability)

**Validation question.** Can the merchant say how much recovery was incremental, and do existing systems know that another system has already contacted the same customer?

##### 7. Preserve a booked experience during a temporary payment failure

**Problem.** A blanket payment-failure rule cancels a customer's booked class or freezes their membership just before a scheduled session. A short, bounded service bridge might preserve retention while the customer resolves payment; offering unlimited grace would invite losses.

**Best starting vertical.** Non-essential fitness, language classes or professional communities. Avoid essential services where access decisions have different legal and ethical requirements.

**Signal.** Payment failure, imminent booking, verified usage and payment history, explicit customer explanation, and cost/capacity of the scheduled experience.

**Decision and action.** Within a merchant policy, propose a one-session bridge, a pause, or rescheduling, then link the customer to an approved payment resolution. Do not mistake a commercial bridge for a new loan or infer repayment ability from demographic attributes.

**Why AI.** It interprets whether the customer wants the service, a delay or cancellation and selects from allowed options. Grant eligibility and maximum exposure are deterministic. If all cases map cleanly to rules, keep AI to conversation and evidence explanation.

**Controls.** Maximum bridge value; no repeat abuse; no credit underwriting; clearly communicated expiry; customer acceptance; human review for exceptions; no obstruction of cancellation.

**Feedback and measure.** Next 30-day retention and net contribution, bridges repaid, unpaid service cost, cancellations and complaints. A demo can establish workflow feasibility but not those long-run results.

**Prototype.** Three customers with identical failure codes but different upcoming bookings, stated preferences and policy eligibility. Show three different authorized outcomes and a later payment event.

**Nearest analogue / caveat.** Stripe already acknowledges the access-versus-retry tradeoff; Churnkey supports pauses and offers. The distinction is an inventory/capacity-aware single-experience bridge, not generic grace periods. [Stripe](https://stripe.com/blog/how-we-built-it-smart-retries), [Churnkey](https://churnkey.co/)

#### Prioritization for a seven-day prototype

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

#### Competitive and evidence traps to avoid in the final pitch

1. Do not compare a vendor's selected “up to” recovery figure with another's average or with a different denominator. Payment count, invoice value, contacted customers, initially failed orders and net revenue are different measures.
2. Do not train a model on synthetic labels produced by your own rules and present its accuracy as proof of better real-world recovery. A synthetic demo can establish plumbing and policy behavior, not economic uplift.
3. Separate gross settled amount, net retained amount after refunds, contribution after fulfilment/contact cost, and incremental uplift against baseline.
4. A retry that succeeds is not necessarily caused by your agent. Provider retries, customer self-service and other outreach may already be active.
5. Public product pages establish claimed capabilities, not complete feature inventories. Absence from a page is not proof the feature is absent from the product.
6. A country analogy is a prompt for local validation. Pix, UPI, cards, wallets and direct debit have different transaction and authorization models.
7. “LLM recommends; rules authorize” and “webhook-to-verified-recovery audit trail” are good implementation principles but are already common. They cannot carry the originality claim.

#### Source ledger

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

##### Additional discovery: naming ambiguity and public project overlap

- [RecoverAI at tryrecoverai.com](https://tryrecoverai.com/) advertises an early beta using CSV estimates, AI-timed retries and personalized messages. It makes claims about Stripe's defaults that should not be repeated as fact; Stripe's own documentation describes sophisticated Smart Retries. This site is evidence of a crowded concept, not reliable performance proof.
- The exact `recover.ai` domain could not be retrieved in this search. Multiple unrelated similarly named businesses appeared. Do not merge them into one competitor or infer that the exact domain's business is inactive.
- [Pen-ball/recover-ai](https://github.com/Pen-ball/recover-ai) and [Renukaprasad-dev/recoverai](https://github.com/Renukaprasad-dev/recoverai) publicly describe Razorpay-oriented revenue-recovery projects with diagnosis, policy bounds, payment links, verified outcomes and audit trails. Their READMEs mention a Track 3; that does **not** establish they are submissions to this two-track ISB challenge. The repositories were not executed or audited. They are evidence that the generic architecture is common, not evidence of successful businesses or validated revenue results.

#### Immediate merchant discovery before choosing

Ask one merchant to walk through five recent lost or difficult orders, with personal data removed. For each, record the event that started the problem, what the customer actually said, what data the merchant needed, the action that eventually worked, and whether the customer returned. Look for repeated decisions that required reading and coordination, not merely waiting for a bank retry. If no example fits a proposed concept, deprioritize it regardless of how attractive its AI demo looks.

The best next step is not adding another broad feature. It is choosing one recurring failure pattern with accessible evidence, a permitted action, and a outcome that the prototype can verify in front of a judge.

---

<a id="archive-d"></a>
## Appendix D. Merchant problem research

> **Historical record — 6 October 2026.** Merchant-workflow evidence, examples, boundaries and source ledger. No new verification was performed during consolidation.

### Merchant problem research: recovery between payment and outcome

Research date: 6 October 2026. Workstream: Indian merchant pain, plus relevant global analogues. This file is an input to the main Build Challenge research report, not a claim that every idea is unique or validated by customer interviews.

#### Most useful conclusion

The strongest problem space is **recovering a transaction whose intent still exists but whose operational state is ambiguous**. Generic reminders assume that a customer needs persuasion. Many real exceptions instead require discovering whether the customer still wants the outcome, whether money has already moved, and whether the merchant can still fulfil its promise.

Three candidates worth first-round merchant interviews are:

1. **Contested delivery recovery:** the courier reports a failed delivery, the buyer says no attempt happened, and the merchant needs evidence and a workable reattempt before the parcel returns.
2. **Late-paid order rescue:** payment is eventually confirmed after an order, booking, or stock reservation has expired; determine whether the original promise can still be fulfilled and obtain consent to a feasible replacement.
3. **Short-payment resolution:** identify why an invoice is short-paid before chasing the balance; recover a valid remainder by resolving missing documents or deduction disputes, while suppressing incorrect reminders.

The first two have a direct customer/revenue-recovery story. The third has strong Indian nuance but could be judged as finance-operations automation unless the demonstration closes a customer dispute and collects the valid balance. Exact track interpretation should come from the challenge brief.

All three require data outside a payment gateway. That is a feature of the opportunity but a build constraint: an honest prototype should use a small merchant CSV, mocked connector responses, and one real Razorpay test action rather than claim gateway-only intelligence.

#### Evidence standard

- **Documented fact:** a provider's official documentation supports an operational state, action or feature. This establishes possibility and an existing workflow, not market prevalence.
- **Vendor claim:** a provider describes its product or a business benefit. Treat as competitive evidence; do not turn a claimed uplift into an expected result for a new product.
- **Anecdote:** a public merchant account suggests an interview question. Identity, causality, and representativeness are not independently verified.
- **Hypothesis/design proposal:** our inference about an unmet need, proposed workflow, or likely benefit. Requires testing.

No India-wide RTO, no-show, failed-payment, or return-rate estimate is used below. Available vendor pages often quote rates without a sufficiently clear sample or methodology.

#### 1. Contested delivery recovery: rescue customer intent when courier and customer disagree

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

#### 2. Late-paid order rescue: money succeeds after the original promise expires

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

#### 3. Short-pay resolver: separate a legitimate deduction from collectable debt

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

#### 4. Constraint-aware cancellation backfill for service capacity

**Problem statement.** A slot becomes empty, but the customers who want it have incompatible service durations, staff preferences, travel time or budgets. Blasting everyone can create work, annoy customers or sell a slot the business cannot deliver.

**Evidence and competition.** Square explicitly provides waitlists for filling gaps after cancellations/reschedules, and supports messaging waitlisted customers. Fresha provides deposits and stored-card booking policies. Therefore “AI no-show reminder” and “notify a waitlist” are already ordinary features. [Square waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments), [Fresha upfront payments](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview).

**Segment and workaround.** Start with non-medical services: premium salons, photography studios, coaching or activity sessions. Staff manually call a few known customers after a cancellation. Avoid healthcare for a first demo because clinical suitability is a much larger problem than schedule matching.

**Proposed narrow wedge.** Turn free-text intent already collected from opted-in customers into feasible recovery: “weekends only, haircut plus colour, must finish before 5.” A deterministic scheduler filters duration/staff/resource constraints; the agent offers the best feasible option and obtains a deposit through a payment link, with a short inventory hold and no double booking.

**Signals and access.** Gateway sees deposit status and payment reference only. Calendar, staff/resource capacity, service length, existing waitlist preferences and contact consent are external. Can prototype from two CSVs.

**Why AI / why rules.** AI is useful for turning natural-language constraints into structured preferences and negotiating alternatives. Scheduling feasibility, locks, expiry and price floors are conventional software. If preferences are already structured, AI is optional.

**2–4 day prototype.** A cancelled 90-minute slot, five waitlisted customers with different natural-language needs, one compatible option, and a Razorpay test deposit. On expiry of the hold, release the slot; on confirmed deposit, stop other offers. Include a customer who says “no calls, message only.”

**Metrics.** Incremental filled margin from previously empty slots, deposit-to-attendance conversion, messages per recovered slot, and complaints/opt-outs. Do not count merely moving an existing appointment earlier as new revenue without measuring the resulting calendar.

**Risks / disconfirmation.** Very crowded globally and highly dependent on integration. The initial value proposition must be capacity recovery with realistic constraints, not scheduling software replacement. Pick this only with an accessible merchant and a real cancellation queue.

#### 5. Return-intent repair when the desired exchange is unavailable

**Problem statement.** A customer still wants the product but the obvious exchange cannot happen: a size is out of stock, the original purchase discount is gone, or the alternate variant does not meet the original use case. A standard return portal can end at a refund even though acceptable alternatives exist.

**Evidence and competition.** Loop already offers instant exchanges and bonus credit for exchanges/store credit. This makes generic refund-to-exchange conversion a weak novelty claim. [Loop instant exchanges](https://help.loopreturns.com/en/articles/1913025), [Loop bonus credit](https://help.loopreturns.com/en/articles/1912193).

**Segment and workaround.** Indian apparel or footwear merchants with product-specific support messages and frequent availability changes. Operators inspect inventory and manually suggest another size/product or offer credit.

**Proposed narrow wedge.** Recover the original reason for buying, then propose an in-stock option that actually solves the return reason, within a margin ceiling. Example: “toe box too narrow, same colour required” should not trigger another shoe with the same fit merely because it is popular. The agent needs explicit catalogue attributes; it must not invent fit advice.

**Signals and access.** Gateway provides paid/refunded amount. Order lines, return reason, catalogue attributes, available inventory, cost and return eligibility come from commerce/support. This is impossible to do credibly from payment data alone.

**Why AI / why rules.** AI can interpret the customer's explanation and match approved product attributes. Refund rights, prices, inventory, reservations and offer limits must be deterministic. Explicit refund requests must have an uncomplicated refund path.

**2–4 day prototype.** One footwear catalogue of 20 synthetic SKUs with structured fit metadata, five return reasons, and a live-looking inventory table. Show a useful alternative, a refusal, and a no-suitable-product case. Demonstrate a reservation and approved difference-payment link; refund remains available.

**Metrics.** Incremental kept-order contribution after eventual second returns and exchange shipping, return-to-exchange acceptance, time to resolution, and regret/second-return rate. Store credit issuance is not automatically incremental revenue.

**Risks / disconfirmation.** Strong incumbents; merchant-specific product metadata may be poor. Avoid generic incentives and indiscriminate retention discounts. Build only if a merchant can supply a meaningful reason-to-product distinction.

#### 6. Subscription continuity resolver after a payment problem

**Problem statement.** Subscription billing status, actual payment, service access and customer intent become inconsistent. The merchant may suspend a paying customer, continue delivering an unpaid service, or chase invoices generated during a paused relationship.

**Evidence.** Current Razorpay documentation describes pending/halted states and notes that invoices continue to be created in a halted subscription without automatically being charged. It also provides built-in retry and payment-method update flows. [Razorpay current retry documentation](https://razorpay.com/docs/payments/subscriptions/payment-retries/).

**Segment and workaround.** Non-essential memberships, class subscriptions, software tools or equipment rentals. Support joins the payment dashboard, billing records and entitlement system manually. The user needs one clear answer: what is paid, what is usable, and what action will restore the intended service?

**Proposed narrow wedge.** Reconstruct the evidence and choose an approved continuity action: correct stale service access, offer a permitted pause instead of chasing future periods, or route an invoice conflict to review. Payment retry itself is not novel. The agent should never treat mandate cancellation as permission to charge via another route.

**Signals and access.** Gateway subscription/payment/invoice events are only one side. Usage, service-delivery status, pause policy, renewal intent, entitlement ledger and customer messages are external. The prototype must explicitly show its source of truth for each.

**Why AI / why rules.** Free-text explanations (“I paused while travelling”) and conflicting support notes justify AI interpretation. Billing state transitions, grace periods and authorised collection amounts do not. If no free-text dispute exists, use a state machine.

**2–4 day prototype.** Three timelines: paid but entitlement stale; pending retry with policy-approved grace; halted with disputed historical invoice. Show a source-cited explanation, a proposed corrective operation and a human approval queue. No real collection is necessary to demonstrate the reasoning.

**Metrics.** Wrongful suspensions prevented, time to correct entitlements, confirmed recoverable balance collected, service leakage prevented and support recontacts. “Customers messaged” is not recovery.

**Risks / disconfirmation.** High overlap with Razorpay Subscription Recovery. Position only around billing/service contradictions and customer continuity. India-specific collection permissions and provider capabilities require careful validation for implementation.

#### 7. Refund resolution that protects the next purchase

**Problem statement.** The merchant believes it refunded, but the customer cannot identify the credit or lacks the reference needed to ask their bank. Repeated reassurance from a generic bot may damage trust without resolving the issue.

**Evidence.** Razorpay documents bank reference numbers such as ARN/RRN/UTR and says refund/reference emails depend on the merchant passing a customer email. This creates a concrete information-gap possibility for orders reached principally through phone or chat. [Razorpay refund communication](https://razorpay.com/docs/payments/refunds/communication/).

**Segment and workaround.** D2C and booking merchants with phone-first customers. Support finds the original payment and refund, copies the reference and date, and explains how to follow up. Needs merchant interviews to establish recontact burden.

**Proposed narrow wedge.** Provide a verifiable refund trace and escalation case, reconcile multiple partial refunds with order lines, and recognise when the refund is not yet completed. Only after the issue is resolved and the customer wants an alternative should a relevant replacement be offered. Do not use unresolved refunds as an opportunity for pressure.

**Signals and access.** Payment/refund entities and bank reference, plus order lines, customer identity verification and contact channel. Never imply knowledge of the customer's bank balance. Additional bank visibility is generally absent.

**Why AI / why rules.** AI explains a complex timeline and interprets the complaint; fetching status/reference and notifying on a deadline are rules. This may be a supporting feature for late-paid-order rescue rather than a standalone challenge idea.

**2–4 day prototype.** Two partial refunds against one order; customer complains about the full amount. Agent reconstructs the exact ledger, distinguishes processed/pending portions, supplies the right available reference, and drafts a support escalation with no promise that bank credit is visible.

**Metrics.** Repeat refund contacts per case, correct-reference delivery, time to resolution and later repurchase measured separately. Most immediate value is support efficiency, so this is a weaker Recover and Grow candidate unless repeat trust is demonstrated.

#### Global patterns worth importing, not cloning

**Southeast Asia — finality-aware recovery.** Xendit's delayed-webhook documentation is particularly useful because it treats payment confirmation and merchant order viability as separate decisions. Transfer the pattern to India: first establish money state, then establish fulfilment state, then ask what customer outcome remains feasible. [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/).

**Nigeria/Ghana — identify received money before sending another demand.** Paystack's DVA documentation explains customer-linked bank-transfer receipts and a requery path when expected transaction notification is delayed. The design lesson is that a recovery agent should verify receipt and query supported status tools before contacting the customer to pay again. The page describes availability in Nigeria and Ghana; do not assume the identical facility, rights or requery API in India. [Paystack dedicated virtual accounts](https://paystack.com/docs/payments/dedicated-virtual-accounts/).

**Brazil — distinguish a recurring permission from an individual collection.** Banco Central describes Pix Automático as a customer-authorised recurring payment arrangement with payer-defined rules. The useful abstraction is a stateful, consent-aware workflow rather than a repeated payment link. This is a design analogy, not proof that Brazilian bank-transfer behaviour or rules map onto UPI. [Banco Central Pix Automático](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico).

**US/global service software — recovery happens at the resource level.** Square and Fresha demonstrate that merchant value can come from filling perishable capacity and securing an appointment. The India opportunity must add concrete local integration or language/intent handling rather than rename their features.

#### Quick comparison for the deadline

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

#### Interview script that can kill a weak idea quickly

Ask the merchant to show the last three actual exceptions, with identifying details removed. Ask: What happened first? Which systems disagreed? Who had to call whom? What exact evidence unblocked the case? How long did the action remain useful? Did the eventual resolution bring new cash, preserve an existing sale, or only reduce work? What would the existing tool have done? What was the costly false-positive action? Could a new assistant have obtained the same data without a custom integration project?

For the deadline, a single authentic, anonymised case is more valuable than an invented aggregate market statistic. A good prototype should reproduce that case, include one safe refusal/abstention, and demonstrate one bounded action.

#### Implementation notes that materially affect a prototype

1. Razorpay's current webhook documentation says events may duplicate and arrive out of order. Validate signatures, deduplicate by event ID, fetch authoritative current state when needed, and make business actions one-time operations. These are prerequisites, not the AI contribution. [Webhook validation and ordering](https://razorpay.com/docs/webhooks/validate-test/).
2. Avoid the stale `d6xcmfyh68wv8.cloudfront.net` copies that search engines surface. In this research, an old subscription retry page said UPI retries happen twice on the same day; the canonical page now describes T+1, T+2 and T+3. Exact behaviour must be rechecked for the merchant's product/account before coding. Use the canonical current source in the report.
3. A late payment screenshot is not confirmation. Never collect a second payment, refund, release inventory, or grant service based solely on conversational confidence.
4. Use deterministic eligibility and amount checks before actions; log the evidence and proposed effect. Customer messages and uploaded PDFs are untrusted business inputs, not instructions that can change the agent's permission policy.
5. For a contest demo, state clearly which data/actions are live in test mode, simulated, and future integrations. An honest, small loop is more convincing than simulated enterprise breadth.
6. Use **Standard Payment Links** when designing a test-mode deposit or balance-collection demo, subject to the merchant account's supported features. Do not silently substitute dedicated UPI Payment Links: the current canonical documentation says those are live-mode-only, Android-only and do not support partial payments. This constraint was cross-checked by the parent research workstream. [Dedicated UPI Payment Links](https://razorpay.com/docs/payments/payment-links/upi/).

#### Source ledger

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

---

<a id="archive-e"></a>
## Appendix E. Startup frontier research

> **Historical record — 6 October 2026.** YC/startup/vertical-software workstream, ExtraProof competitors and counterexamples. No new verification was performed during consolidation.

### Startup frontier: Recover and Grow with AI

Research date: **6 October 2026**. Research slice: YC companies, startup product documentation, TechCrunch discovery, and unusually specific revenue-recovery workflows. This is an input to the main challenge report, not a statement that any proposed idea is globally novel.

#### What this research changed

The crowded territory is much wider than “chatbots that remind people to pay.” Public products now advertise blocker diagnosis, procurement-portal repair, retailer deduction disputes, payment retries coordinated with outreach, proactive exchange recommendations, revenue-based experimentation, appointment refill, and invoice creation from approved additional work. The strongest opportunity for a one-person builder is a tightly defined operational failure with an unusually convincing demonstration of evidence, judgement, and completion.

Three distinctions should guide selection:

1. **A real problem is not automatically an underserved problem.** Numerous vendors already describe the problems below. Indian merchant interviews must establish whether their tools are unavailable, unaffordable, hard to adopt, or miss a meaningful local workflow.
2. **Vendor product documentation is evidence of advertised capability, not proof of performance.** YC launch posts are largely company-authored. Funding and logos are not independent evidence that an agent reliably works.
3. **“Recovered” must mean a defined financial outcome.** Drafted claim, approved claim, generated invoice, issued payment link, payment captured, and contribution retained are different states. A basic prototype can model the complete state progression without pretending to have generated real money.

The two most useful hypotheses from this slice are (a) an evidence-sensitive additional-work agent for one narrow merchant vertical, provided it is pitched as a local workflow adaptation with known competitors; and (b) a recovery coordinator that stops conflicting agents and measures incremental net contribution. Both require customer validation. Neither should be described as “the first.”

#### 15 companies that move the competitive baseline

All descriptions below are advertised capabilities observed on 6 October 2026. Performance claims have deliberately been omitted unless explicitly discussed as vendor claims.

| Company | Publicly described mechanism | What to learn / what would be generic | Source |
|---|---|---|---|
| Rex, YC S26 | Agents run collections, portal submissions, deduction investigation and cash application, with supervised procedures. | A finance agent that diagnoses and acts on exceptions is already a category. | [YC profile](https://www.ycombinator.com/companies/rex-inc) |
| Alder, YC F25 | Reads invoices and conversation history, identifies the payment blocker, repairs Coupa/Ariba submissions, and tracks payment promises. | “Find why it is unpaid before writing a reminder” is useful but not unique. | [YC profile](https://www.ycombinator.com/companies/alder) |
| Glimpse, YC S20 | Retrieves deduction evidence, validates retailer charges, contests invalid deductions, and handles cash application. | Small recoverable amounts can become economical when evidence assembly is automated. Do not claim AI deductions recovery is new. | [Product site](https://www.tryglimpse.com/) |
| FlyCode, YC S22 | Optimizes subscription retries and coordinates messages; its newer launch also uses backup payment methods. | Alternate payment recovery is already offered beyond reminder sequences. | [YC profile](https://www.ycombinator.com/companies/flycode) |
| Butter Payments | Recovery platform with payment scoring and customer outreach announced in January 2026. | A sophisticated payment-retry engine would be difficult to out-demonstrate without real transaction history. | [Company announcement](https://www.butterpayments.com/blog/press-release/butter-drives-56-more-recurring-revenue-for-subscription-brands/) |
| Churnkey | Cancel flows, tailored retention offers, payment recovery, and controlled experiments that follow subsequent payment behaviour. | Offer acceptance is not enough; competitors already consider whether customers actually stay and pay. | [A/B testing documentation](https://docs.churnkey.co/cancel-flows/a-b-testing/) |
| Signals, YC W26 | Two-way post-purchase iMessage conversations, proactive customer care, exchange recommendations and repeat-purchase measurement. | “Ask after delivery, save the refund, then upsell” is already explicitly marketed. | [YC profile](https://www.ycombinator.com/companies/signals) |
| REVER, YC S22 | Returns operations and rapid refunds, with customer-facing return tools and logistics integrations. | Refund speed can protect future purchases; this is established territory, with an operational and financing burden. | [YC profile](https://www.ycombinator.com/companies/rever) |
| ReturnGO | Exchange incentives, inventory reservations, and payment/refund of price differences. | A refund-to-exchange agent needs more than stock checks or a bonus credit to stand out. | [Exchange documentation](https://support.returngo.ai/exchanges-faqs) |
| Claimlane | Applies product/supplier rules to post-purchase cases, inspects attachments, identifies missing evidence, and proposes or performs permitted actions. | Evidence-sensitive warranty triage already exists; a potential wedge is tracking supplier reimbursement through final reconciliation. | [AI agent documentation](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent) |
| Nibble | Historical ecommerce negotiation and a current procurement negotiation platform; its public architecture separates pricing functions from the LLM. | A haggling bot is generic. Negotiable bundles, timing, quantity and margin constraints matter more than generated language. | [Current site](https://nibbletechnology.com/), [B2B use cases](https://blog.nibbletechnology.com/4-ways-to-use-ai-negotiation-in-b2b/) |
| Toma, YC-backed | Automotive service phone agents that book appointments and perform business tasks. | The transferable lesson is a vertical with a specific lost-revenue event, rather than another general receptionist. | [YC profile](https://www.ycombinator.com/companies/toma) |
| CentralComs, YC P26 | Home-service intake, dispatch, open-estimate follow-up and customer reactivation inside established scheduling tools. | Missed-call recovery plus follow-up is already a broad competitive bundle. | [YC profile](https://www.ycombinator.com/companies/centralcoms) |
| Zenoti | Automated cancellation waitlists, notifications and booking conversion tracking. | Filling empty slots is not itself novel. A prototype needs resource constraints, deposits and double-booking prevention to be meaningful. | [Waitlist product](https://www.zenoti.com/platform/waitlist-management) |
| Loop | Return outlier detection, financial prioritisation and return-reason analysis; its documentation explicitly connects insights to product/size-chart improvements. | A “return reasons dashboard” or basic product-description suggestion is insufficient differentiation. | [Return Insights](https://help.loopreturns.com/en/articles/13680897) |

Additional inspiration: [Clearest Health](https://www.ycombinator.com/companies/clearest-health) describes recovery of underpaid out-of-network medical claims. The transferable pattern is a narrowly defined entitlement, evidence requirements and a recovery process. Its US healthcare/legal process is not a sensible domain to copy into this short India prototype.

##### What TechCrunch adds, and what it does not

TechCrunch reported Glimpse's $35 million funding round on **25 March 2026**. [Report](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/)

TechCrunch covered Toma's dealership focus on **5 June 2025**. [Report](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/)

TechCrunch profiled Barcelona-based REVER on **19 June 2023**. [Report](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/)

These are discovery signals. Product descriptions in this report rely on the companies' own pages and documentation. No independent recovery-rate audit was found in this research slice. Do not use fundraising as proof of an unmet market.

#### Deep competitive check: unbilled approved extras

**Candidate problem:** a merchant does additional work requested through chat, but the approved amount, completed delivery and invoice never reconcile. Plausible examples include event photographers, small event production teams, creative studios and custom fabrication businesses. Those local vertical choices are hypotheses, not validated segments.

This felt promising because the agent could do more than chase a known receivable. However, targeted research found direct competition, including products that already compare a client message with scope and obtain approval.

| Competitor | Closest observed overlap | Implication |
|---|---|---|
| [Rigby by Viberr](https://tryrigby.com/industries/construction) | Ingests field records and handwritten approvals, matches work to estimates/changes, and generates invoices. Lists professional services/agencies as an additional industry. | “Evidence to invoice” is not new. The agency page was not readable in this session; do not infer its exact feature depth. Its numerical market claims were not independently corroborated. |
| [Addenly](https://addenly.com/docs) | Pasted client messages, baseline scope comparison, editable change requests, a client approval link, invoicing, and evidence export. | Extremely close to chat-to-approved-extra. Public documentation is concrete; adoption and reliability are unknown. |
| [With Oversight](https://withoversight.com/) | Advertises detection of unbilled client requests, review of scope changes, and a recorded absorb/escalate/bill decision. Includes production and event agencies. | “Event agencies” alone is not a unique vertical claim. |
| [ClarAccord](https://claraccord.com/solutions/agencies) | Describes WhatsApp voice-note scope creep and an OTP-verified scope receipt after client conversations. | “WhatsApp + approval receipt” alone is also not a differentiator. |
| [Clearstory](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent) | Conversational/voice Time & Material tags; uses configured project rates and asks when information is missing; user saves/sends. | Voice entry, structured line items, rates and approval gates are established construction workflows. |
| [Adaptive](https://www.adaptive.build/) | Advertises an always-on change-order clerk comparing requests, contracts, job costs and field updates, plus approval routing and billing agents. | The broader autonomous project accountant direction is already occupied. |
| [Procore](https://www.procore.com/ai) | Agents create/update project records including Change Events with source tracing, permissions and sign-off. | A general construction agent would compete against deep systems of record. |
| [Siteline](https://www.siteline.com/blog/change-order-log) | Change-order documentation and approved lines moved into billing schedules. | The documentation-to-billing handoff is a known product area. |
| [Accelo](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/) | Reviewed timesheets can control invoice eligibility, with links from invoiced activities to the invoice. | Billability, approval and duplication controls are not optional extras. |
| [Monograph](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project) | Approved additional-service contracts can be recorded as fixed or capped hourly project phases. | An hourly maximum is not money earned; actual work and pricing basis matter. |

##### A defensible narrower prototype

**Working title: ExtraProof — reconcile one event's agreed extras before the final bill.** The claim should be: “We adapt an existing class of recovery workflow to small Indian event vendors, and demonstrate unusually careful evidence handling.” The claim should not be “No one turns chats into invoices.”

Use one synthetic event booking with an original package, a versioned rate card, an authorised client contact, an exported chat, crew completion notes, and existing invoice lines. Let the agent classify every candidate extra:

- In original scope.
- Extra requested but not priced.
- Priced but not explicitly approved.
- Approved but not delivered.
- Delivered, approved and already billed.
- Delivered, approved and unbilled.
- Waived, cancelled, disputed or ambiguous.

The interesting AI task is interpreting conversational ambiguity and contradictory evidence. A deterministic calculator handles amounts and a state machine controls actions. Every conclusion links to the supporting message, package clause, rate and completion record. Where evidence is missing, the agent drafts a question; it never treats silence, an emoji, “we can discuss,” or a crew member's approval as client agreement.

**Synthetic demonstration:** package includes two hours of coverage and one revision; an authorised buyer explicitly approves an additional hour at ₹3,000; the crew log shows three hours delivered; the final invoice contains only the base package. The agent proposes a ₹3,000 extra, shows the evidence, asks the merchant to review, then presents a client confirmation or approved invoice workflow, generates a test payment link, and reconciles the simulated payment. This is invented demo data, not measured revenue.

**Required counterexamples:** “add this as a free favour”; correction of the vendor's own mistake; included revision; request later withdrawn; approval by an unauthorised guest; old rate card; already invoiced under a different label; partial delivery; a capped fee; and a disputed amount. A compelling demo should show at least as many withheld charges as proposed charges.

**Two-to-four-day build:** one upload/export format, one contract template, 20–30 synthetic messages, six evidence statuses, a human review screen, one test payment action, and payment-state reconciliation. Skip live WhatsApp ingestion, tax inference, broad contract interpretation and support for arbitrary vendors. Show an Indian currency amount without making claims about tax or enforceability.

**Falsification:** speak to three event vendors. Do they actually forget approved charges, or consciously waive them? Is final billing already reconciled by one person? Are records available? Would a client confirm the charge after the event? If the dominant problem is unwillingness to charge, a software extraction agent may not solve it. If existing billing software is already used well, this may be only a minor feature.

#### Eight prototype-sized idea cards

These are **inferences for ideation**, not established unmet-market findings. Each explicitly names close competition. Implementation estimates assume a single builder, synthetic data, one merchant, and access to a model/API already working.

##### 1. ExtraProof: agreement-to-final-bill reconciliation

**Problem:** small approved extras are lost between chat, delivery and final invoicing. **Closest competition:** Addenly, With Oversight, ClarAccord, Rigby, and the construction platforms above. **Potential wedge:** one-event retrospective reconciliation across approval authority, delivery, waivers and existing invoice aliases. Merely generating a change order is too close to existing products.

**Agent action:** identify an evidence-backed unbilled item; request missing evidence; prepare a reviewed bill; create a payment request only at the appropriate approved state; stop after confirmed payment. **Tiny demo, 3 days:** the scenario above, with positive and negative cases visible side by side.

**Metric:** precision of billable-item detection first; value actually paid on approved, previously unbilled items second. Generated invoices are pipeline, not recovery. **Kill questions:** Is omission frequent? Is documentation obtainable? Would the merchant charge the extra if reminded? Can the system distinguish a generous waiver from a forgotten invoice?

##### 2. Recovery referee: prevent incompatible recovery actions

**Problem hypothesis:** a customer with one underlying order may simultaneously receive a cart coupon, a failed-payment message and a complaint/refund interaction from different automations. Optimising each in isolation could give away margin or damage trust. This overlap must be confirmed in merchant interviews.

**Closest competition:** multi-product retention suites such as Churnkey and platforms with coordinated retry/outreach such as FlyCode. This research did not verify a directly equivalent cross-campaign arbitration product; absence from this search is not proof of absence.

**Potential wedge:** one customer/order timeline, action precedence, a contact budget, complaint suppression, and payment-webhook cancellation of pending actions. The AI extracts unresolved intent from messages; rules enforce ordering and budget. **Tiny demo, 2–3 days:** feed 15 synthetic events, show four colliding proposed actions, approve the one appropriate intervention, then cancel all stale actions when payment arrives. Include an ambiguous identity match that escalates rather than merging two people.

**Metric:** duplicate contacts avoided, incorrect charges/offers prevented, net contribution in an eventual randomised pilot. **Kill questions:** Do merchants truly have conflicting agents? Does the existing CRM already solve this? Would they pay for coordination rather than a single replacement suite?

##### 3. Supplier-funded remedy recovery

**Problem hypothesis:** a merchant resolves a valid customer issue with a replacement/refund but fails to recover the supplier credit promised in its commercial terms. Customer service and supplier recovery are different workflows.

**Closest competition:** Claimlane covers supplier rules and warranty cases; Glimpse covers deduction evidence and recovery. **Potential wedge:** a small electronics/accessories reseller, one supplier's defect policy, and the linkage from each customer remedy through the supplier credit and reconciliation. Never withhold a legitimate customer remedy while chasing the supplier.

**Agent action:** match remedy to order and supplier batch; validate documentary requirements; request a missing serial-number photo; create a reviewed claim packet; record supplier acceptance and match a credit note/payment. **Tiny demo, 3–4 days:** 12 synthetic cases, two supplier policies, one rejected duplicate, one expired warranty, one accepted credit and one partial credit requiring review.

**Metric:** documented recoverable amount versus accepted amount versus realised credit; staff minutes per accepted claim. **Kill questions:** Are supplier terms machine-readable? Are claim amounts meaningful? Does the supplier actually honour claims? Is this already handled by the distributor portal? This is primarily margin/cash recovery, so confirm fit with the challenge's growth interpretation.

##### 4. Promise repair: change the exact statement driving returns

**Problem hypothesis:** a specific product promise, such as a dimension or compatible-device statement, generates preventable disappointed purchases. A generic feedback summary never reaches the page owner.

**Closest competition:** Loop already flags costly return outliers and supports the product-description improvement workflow; Signals examines post-purchase conversations. **Potential wedge:** trace a variant-level cluster to the exact conflicting claim, prepare an evidence-linked correction, obtain owner approval, and measure the cohort after the edit. Treat it as a tested hypothesis, not a causal fact inferred from a language model.

**Agent action:** join return reasons, customer text, purchased variant and the actual page version; propose the narrowest truthful correction; show a preview; publish only after merchant approval; track complaints and paid retained sales. **Tiny demo, 3 days:** three variants and 20 synthetic cases, with one real mismatch and one seasonal correlation that the agent refuses to blame on copy.

**Metric:** subsequent issue-specific refund rate and net contribution; page conversion is a secondary metric. **Kill questions:** Are product-page versions available? Does enough volume exist to evaluate the fix? Is the problem actually defective goods or fulfilment? Does changing copy merely suppress sales?

##### 5. Capacity recovery with a payment-backed, expiring reservation

**Problem:** perishable service capacity disappears when a booking cancels. **Closest competition:** Zenoti already automates waitlist filling; CentralComs does intake/dispatch and appointment follow-up. A generic waitlist bot is not distinctive.

**Potential wedge:** a narrowly constrained resource, such as a photography studio requiring the correct room, equipment and crew. Match only opted-in customers with a compatible session and enough arrival time; reserve the resource once; obtain a customer-approved deposit; release it if the payment expires. Avoid medical prioritisation and unnecessary sensitive data.

**Tiny demo, 2–3 days:** one cancelled two-hour slot; three eligible-looking people, only one genuinely compatible; two simultaneous acceptances; one atomic reservation; test payment and expiry. The booking is confirmed only after the required payment state.

**Metric:** additional contribution from completed replacement bookings, after discount/contact costs and displacement of future bookings. **Kill questions:** Is there a real standby list? Does the business have enough cancellations? Would customers shift existing full-price bookings just to obtain a discount? Does the current booking tool already support the needed constraints?

##### 6. “Do nothing” as a recovery decision, with a real holdout

**Problem hypothesis:** a merchant counts purchases following outreach as recovered revenue, even when customers would have paid anyway; discounts may increase conversion while reducing contribution.

**Closest competition:** Churnkey already supports controlled retention experiments and revenue per exposure; Nibble already emphasises disciplined negotiation. **Potential wedge:** a small, auditable contribution ledger across discounts, returns, delivery costs and repeated campaigns, plus a no-offer branch. The originality is limited; the differentiation would be clear economics and a useful merchant workflow.

**Tiny demo, 2 days:** use a labelled synthetic experiment where the highest gross-sales campaign loses on contribution. Have the agent explain the result, stop the harmful offer and recommend collecting more data for an inconclusive segment. The model cannot declare real uplift from the synthetic example.

**Metric:** contribution per randomised eligible customer, over a stated observation window. **Kill questions:** Are variable costs available? Is traffic high enough for a meaningful comparison? Can assignment persist across devices/campaigns? Does the merchant already have this in its retention platform? A dashboard alone is weaker than the agent taking a reviewed budget/policy action.

##### 7. Small deduction recovery with an honest evidence threshold

**Problem:** small disputed invoice deductions may cost more to investigate manually than their value. **Closest competition:** Glimpse explicitly pursues sub-threshold deductions, and Rex handles deductions too. The proposed business is a localised version of a known pattern.

**Potential wedge:** one Indian supplier-to-buyer relationship, one recurring reason code, one proof-of-delivery format, and a simplified export-based workflow. Establish merchant access before building; portal integrations can consume the entire week.

**Agent action:** match deduction to invoice, purchase order and delivery evidence; classify valid/invalid/insufficient-evidence; prepare the disputed amount and packet; follow the disposition through the next remittance. **Tiny demo, 3–4 days:** ten deductions including a genuine shortage, a duplicate claim, a missing receipt and a valid commercial discount. Show zero fabricated evidence and no automatic objection to legitimate deductions.

**Metric:** realised recovery less processing cost; false dispute rate; evidence completeness. **Kill questions:** Is this buyer permitted to deduct under the agreement? Can the supplier access the records? Is there an accepted claim channel? Are the amounts too small or the recovery too slow for a practical product? Track fit may be weaker if the challenge expects customer growth rather than back-office recovery.

##### 8. Restore value before asking for payment

**Problem hypothesis:** an apparently failed renewal may follow an unresolved service issue. The right recovery action could be completing a promised service or correcting the plan, followed by a consented payment request.

**Closest competition:** Alder diagnoses invoice blockers, Churnkey offers pauses/plan changes/onboarding help, and Signals handles post-purchase dissatisfaction. “Empathetic dunning” is not new.

**Potential wedge:** a tutoring or skills-class business with a verifiable undelivered entitlement, such as an approved replacement class. Reconcile attendance, entitlement, support history and billing before deciding whether there is anything to collect. Avoid making creditworthiness decisions.

**Tiny demo, 3 days:** three failed renewals: an ordinary payment failure, an unresolved missed class requiring rescheduling, and an explicit cancellation requiring no further recovery. Complete the service correction in a mock schedule; then offer the correct plan/payment amount only when appropriate.

**Metric:** corrected entitlements, valid payments retained after resolution, and complaints; never raw collection rate alone. **Kill questions:** Does service correction really restore intent? Can the business supply the replacement service? Is this merely a support feature already available? Are consumers comfortable with the flow? This is an accessible demo but needs a compelling merchant story to beat generic recovery agents.

#### Ranking for a short builderthon

This is qualitative judgement, not a market-size score.

| Candidate | Demo clarity | Competitive differentiation today | Main dependency | Recommendation |
|---|---|---|---|---|
| ExtraProof | High | Low for broad category; moderate only with rigorous reconciliation and specific local workflow | Three merchant interviews and realistic artefacts | Strong build candidate if merchants confirm frequent omissions |
| Recovery referee | High | Potentially moderate; exact gap unverified | Real examples of conflicting actions | Strong investigation candidate |
| Supplier-funded remedy | High | Moderate in a narrow merchant/supplier pair | Supplier policy and credit records | Good if access exists |
| Promise repair | High | Low to moderate; Loop is close | Product/variant/page history | Good alternate, but must show action and validation |
| Capacity reservation | Very high | Low without resource and payment nuance | Standby demand and schedule data | Reliable demo, weaker novelty |
| Contribution/holdout agent | Medium | Low as analytics; potentially better as action control | Cost data and traffic | Include as a quality layer in another idea |
| Small deduction recovery | High | Low globally; local access might matter | Buyer evidence/claim process | Strong problem, harder integration |
| Restore value first | High | Low to moderate in a selected vertical | Entitlement and schedule data | Interview first |

For the **13 October deadline**, the research supports a prototype that shows six cases correctly rather than a platform that claims to support six industries. The most persuasive failure case is often the agent correctly refusing to bill, discount, contact or claim when the evidence is inadequate.

#### Source ledger

Every URL was searched or opened on **6 October 2026**. “Undated” means no reliable publication/update date was established; it does not imply the company launched recently. Summaries are intentionally short. Company pages establish public positioning only.

| ID | Source and date | Evidence type | Short finding |
|---|---|---|---|
| S01 | [Rex, YC](https://www.ycombinator.com/companies/rex-inc), undated; S26 batch | Company-authored directory | Enterprise agents include procurement portals and exceptions, with staged autonomy. |
| S02 | [Alder, YC](https://www.ycombinator.com/companies/alder), undated; F25 batch | Company-authored directory | Payment-blocker diagnosis and repair are explicit features. |
| S03 | [Glimpse product](https://www.tryglimpse.com/), undated | Vendor product page | Evidence retrieval, deduction validation, disputes and reconciliation. |
| S04 | [Glimpse, YC](https://www.ycombinator.com/companies/glimpse-2), undated; S20 batch | Company-authored directory | Confirms the company's deductions/revenue recovery positioning. |
| S05 | [FlyCode, YC](https://www.ycombinator.com/companies/flycode), undated; S22 batch | Company-authored directory | Smart retries, coordinated outreach, and backup payment methods. |
| S06 | [Butter announcement](https://www.butterpayments.com/blog/press-release/butter-drives-56-more-recurring-revenue-for-subscription-brands/), 29 January 2026 | Vendor press release | Describes payment scoring and outreach expansion; growth claims unverified. |
| S07 | [Churnkey A/B testing](https://docs.churnkey.co/cancel-flows/a-b-testing/), undated | Product documentation | Experiments track downstream retention/payment, not just accepted offers. |
| S08 | [Signals, YC](https://www.ycombinator.com/companies/signals), undated; W26 batch | Company-authored directory | Proactive post-purchase care and exchange recommendations; experimental outcomes are vendor claims. |
| S09 | [REVER, YC](https://www.ycombinator.com/companies/rever), undated; S22 batch | Company-authored directory | Integrated returns and rapid-refund proposition. Profile metrics should not be assumed independently audited. |
| S10 | [ReturnGO exchange FAQs](https://support.returngo.ai/exchanges-faqs), updated 19 April 2026 | Product documentation | Product exchanges, price differences and inventory reservation. |
| S11 | [ReturnGO stockout prevention](https://support.returngo.ai/preventing-out-of-stock-exchanges), updated 14 April 2026 | Product documentation | Stock thresholds, reserves and instant exchanges are existing features. |
| S12 | [ReturnGO switch to exchange](https://support.returngo.ai/switch-to-exchange), updated 11 May 2026 | Product documentation | Refund-to-exchange prompts and optional bonus credits. |
| S13 | [Claimlane agent](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent), 2 September 2026 | Product documentation | Policy/context/action framework, evidence requests, and configurable human review. |
| S14 | [Nibble](https://nibbletechnology.com/), undated | Vendor product page | Procurement negotiation with controlled pricing functions outside the LLM. |
| S15 | [Nibble B2B cases](https://blog.nibbletechnology.com/4-ways-to-use-ai-negotiation-in-b2b/), date not established | Vendor article | Ecommerce clearance/quantity negotiation is an older adjacent use case. |
| S16 | [Toma, YC](https://www.ycombinator.com/companies/toma), undated | Company-authored directory | Vertical voice agents for automotive operations; performance claims not independently checked. |
| S17 | [CentralComs, YC](https://www.ycombinator.com/companies/centralcoms), undated; P26 batch | Company-authored directory | Intake, dispatch, estimate follow-up and reactivation form an existing bundle. |
| S18 | [Zenoti waitlists](https://www.zenoti.com/platform/waitlist-management), undated | Vendor product page | Cancellation notifications and automated replacement bookings. |
| S19 | [Loop Return Insights](https://help.loopreturns.com/en/articles/13680897), 9 September 2026 | Product documentation | Product-level outliers and dollar-impact prioritisation; variant detail requires another report. |
| S20 | [Loop analytics](https://help.loopreturns.com/en/articles/1914881), 8 January 2025 | Product documentation | Return data is explicitly connected to descriptions, sizing and product changes. |
| S21 | [Clearest Health, YC](https://www.ycombinator.com/companies/clearest-health), undated; S23 batch | Company-authored directory | A specialised underpayment/appeal recovery product, used only as business-pattern inspiration. |
| S22 | [TechCrunch / Glimpse](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/), 25 March 2026 | Reporting | Funding corroboration. |
| S23 | [TechCrunch / Toma](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/), 5 June 2025 | Reporting | Sector coverage. |
| S24 | [TechCrunch / REVER](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/), 19 June 2023 | Reporting | Earlier company profile. |
| S25 | [Rigby construction](https://tryrigby.com/industries/construction), undated | Vendor product page | Field evidence, approved changes and invoice generation; uncorroborated market statistics omitted. |
| S26 | [Addenly docs](https://addenly.com/docs), undated | Product documentation | Direct competitor to client-message scope comparison and approval-to-invoice flows. |
| S27 | [Addenly terms](https://addenly.com/legal/terms), updated 19 August 2026 | Vendor service description | Explicit editable drafts, human send action, client approval and EU freelancer positioning. Not used as legal advice. |
| S28 | [With Oversight](https://withoversight.com/), undated | Vendor product page | Unbilled request detection for agencies including production/events. Adoption unverified. |
| S29 | [ClarAccord agencies](https://claraccord.com/solutions/agencies), undated | Vendor product page | WhatsApp scope ambiguity and signed approval receipts. Adoption unverified. |
| S30 | [Clearstory tag agent](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent), undated | Product documentation | Conversational tags, configured rates, missing-information questions and human submission. |
| S31 | [Clearstory AI announcement](https://www.clearstory.build/construction-blog/introducing-clearstory-ai), exact date not established | Vendor announcement | Four agent roles described; announcement distinguishes current closed beta from subsequent planned betas. Do not imply all were fully live at publication. |
| S32 | [Adaptive](https://www.adaptive.build/), undated | Vendor product page | Change-order and billing clerks connecting contracts, costs and field updates. |
| S33 | [Adaptive updates](https://www.adaptive.build/product-updates), entries through September 2026 | Product changelog | Operational detail on approvals, draft change-order PDFs and Procore imports. |
| S34 | [Procore AI](https://www.procore.com/ai), undated | Vendor product page | Native actions, source references, permissions and sign-off. |
| S35 | [Siteline change-order log](https://www.siteline.com/blog/change-order-log), date not established | Vendor product article | Approved changes can progress into billing schedules. |
| S36 | [Accelo timesheet approvals](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/), date not established | Product documentation | Approval-controlled invoice eligibility and invoiced activity traceability. |
| S37 | [Monograph additional services](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project), 4 March 2025 | Product documentation | Fixed fees and capped hourly additional work have different earned-value treatment. |

#### Research limitations and useful next work

This sweep found concrete competitors and prevented several false novelty claims. It did not establish merchant willingness to pay, local adoption, the reliability of advertised agents, or the availability of all integrations in India. Search results also surfaced numerous small vendors and vendor-written “industry loss” statistics; those were not treated as market facts.

The fastest next research is not another hundred startup links. Obtain anonymised artefacts from three merchants in a single segment: the original agreement, the actual operational conversation, a final invoice and one genuine missed-revenue incident. Ask the merchant to identify the right action on ten cases before building a model. If the human cannot agree whether an amount is legitimately owed, the prototype should ask for clarification rather than automate collection.

---

<a id="archive-f"></a>
## Appendix F. Platform and API boundaries

> **Historical record — 6 October 2026.** Original platform/API findings; later qualifications in the consolidation add specificity. No new verification was performed during consolidation.

### Razorpay platform and prototype boundaries

Research date: 6 October 2026. These are public product/documentation observations, not confirmation of account access or a working integration.

#### Challenge brief

The supplied four-page PDF is the authority for this specific ISB challenge. Track 2 is Recover and Grow with AI, suited to AI Product Manager. The deadline is 13 October 2026 at 11:59 PM IST. It requests a one-page product note, 90-second video, demonstrable prototype and AI build log. Clickable prototypes and synthetic data are allowed; assumptions and outside tools should be disclosed. Evaluation emphasizes problem clarity, merchant understanding, prioritization, AI-assisted execution and communication. Page 2 requires a signal, AI justification, action, merchant control, learning loop, failure handling and business outcome. Page 4 explicitly allows extensions and adjacent opportunities with meaningful improvement. This report researches options; it does not submit or build an entry.

#### Sources and observations

##### R01 Agent Studio
https://razorpay.com/agent-studio/
Observed 6 October 2026. Razorpay advertises cart recovery, COD confirmation, KYC, dispute response, feedback, mandate activation, loan and subscription recovery. It describes review-first permissions and action validation. Public listings establish overlap, not measured effectiveness or universal availability. Do not pitch another general recovery bot as novel.

##### R02 Agentic Platform
https://razorpay.com/blog/razorpay-agentic-platform/
Published 12 March 2026. Advertises reconciliation from uploaded statements, complaint screenshot interpretation, failed-payment fixes including payment links, and automated high-value recovery flows. A screenshot-to-link flow is already within the public product direction.

##### R03 RAY on WhatsApp
https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/
Published 2 September 2026. Advertises conversational payment management, bulk failed-payment links, payment anomaly diagnosis and background corrective actions. WhatsApp, voice input and payment diagnostics are weak differentiators by themselves.

##### R04 Payments webhook events
https://razorpay.com/docs/webhooks/payments/
Canonical docs accessed 6 October 2026. Payment event payloads expose identifiers, amounts, state, method and error fields. Events are snapshots. Captured payment and paid Razorpay order do not prove that the merchant fulfilled the product or service; that requires merchant records.

##### R05 Create a standard payment link
https://razorpay.com/docs/api/payments/payment-links/create-standard/
Canonical docs accessed 6 October 2026. Standard links support amount, reference, expiry, optional partial payments and notification controls. The API documentation includes expiry validation constraints; do not assume arbitrarily short holds can be implemented through a payment link alone. Revalidate access and parameters while building.

##### R06 UPI Payment Links
https://razorpay.com/docs/payments/payment-links/upi/
Canonical docs accessed 6 October 2026. Dedicated UPI Payment Links are described as Android-only, live-mode-only, without partial payments. They differ from Standard Payment Links that can offer multiple payment methods. For a prototype, use a supported test-mode flow or visibly simulated completion instead of promising a dedicated UPI-link sandbox.

##### R07 Validate and test webhooks
https://razorpay.com/docs/webhooks/validate-test/
Canonical docs accessed 6 October 2026. Validate raw-body signatures, deduplicate using the event ID and handle events out of order. Public callback host restrictions exist. The prototype should have an app-level action ledger as well as event deduplication. A payment request is not evidence of successful collection.

##### R08 Refund events
https://razorpay.com/docs/webhooks/refunds/
Canonical docs accessed 6 October 2026. Refund created, processed and failed events are distinct. A proposed refund, created refund, and confirmed processed refund should not collapse into the same demo state.

##### R09 Baymard checkout research
https://baymard.com/blog/reduce-cart-abandonment
Published 19 May 2026. Primary usability research discusses fees, account creation, form friction and delivery expectations. It supports investigating the reason for abandonment rather than assuming every abandoned cart is recoverable. Do not transfer its shopper statistics to Indian SMEs or treat them as addressable revenue.

##### R10 Gorgias Shopify actions
https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792
Accessed 6 October 2026. Advertises cancellation, item replacement with stock checks, refunds for cheaper replacements and handoff for additional payment. Documents limits in propagating changes to fulfilment systems. Generic AI exchanges and order edits already exist; a possible extension is coordinated repair across payment, fulfilment and a specific customer promise.

##### R11 Gorgias action configuration
https://docs.gorgias.com/en-US/create-an-action-for-ai-agent-567325
Accessed 6 October 2026. Supports customer confirmation, connected-app steps and conditional actions. Approval and multi-tool execution are expected product capabilities, not novelty claims.

##### R12 Shopify draft inventory reservation
https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft
Accessed 6 October 2026. Draft-order inventory can be reserved until a chosen expiry if inventory is tracked. A payment link alone cannot reserve inventory. Integration permission and race handling remain separate implementation work.

##### R13 Fresha upfront payments
https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview
Accessed 6 October 2026. Booking deposits and no-show/cancellation payment policies are established features. A deposit reminder is not a distinctive idea.

##### R14 Fresha calendar
https://www.fresha.com/help-center/knowledge-base/calendar
Accessed 6 October 2026. Existing automated waitlist updates and scheduling features limit the novelty of an ordinary cancellation-refill agent. Investigate unstructured preferences and cross-system booking/payment failures instead.

##### R15 Narvar return overview
https://support.narvar.com/hc/en-us/articles/11307520101651-Narvar-Return-Overview
Accessed 6 October 2026. Return-to-exchange conversion, return policies and reasons analytics are established products. No vendor uplift percentages are adopted as forecasts for an ISB prototype.

##### R16 Statsig experiments
https://docs.statsig.com/experiments/overview
Accessed 6 October 2026. Defines experiments as randomized comparisons. The research recommendation is to compare eligible recovery cases under the current process versus the proposed process, measuring incremental net contribution rather than attributing every subsequent payment to AI.

##### R17 Razorpay Recon
https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/
Published 17 December 2024. Public announcement describes online, offline and custom reconciliation. Do not present ordinary payment-to-bank matching as a missing Razorpay capability. Vendor efficiency claims are not independent evidence.

#### Important inference boundaries

- A public Agent Studio listing is not proof of an open SDK, public build interface or account entitlement. A standalone companion prototype is sufficient for the challenge.
- Gateway data cannot establish customer intent, scope approval, stock, margin, delivery truth, complaint resolution or service access without other merchant-authorized records.
- Failure reasons should be represented at the documented resolution. Do not infer a customer's private bank balance or creditworthiness from a failed payment.
- Basic rules should own arithmetic, permissions, action limits, state transitions and duplicate prevention. AI earns its place by interpreting uncertain evidence and proposing a grounded decision.
- Financial treatment such as whether a deduction is valid remains a merchant/accountant decision. The prototype can classify supplied evidence without calculating legal tax obligations or inventing liabilities.

---

<a id="source-index"></a>
## Consolidated web-source index

This index contains **157 distinct web URLs** from the consolidated account and original records. Query-string or trailing-slash variants can refer to the same page. Repetition is not independent evidence. Addresses were preserved without new verification.

| ID | Source link | Recorded in |
|---|---|---|
| U001 | [Addenly docs](https://addenly.com/docs) | Appendix A, Appendix E |
| U002 | [Addenly terms](https://addenly.com/legal/terms) | Appendix A, Appendix E |
| U003 | [Open source](https://baymard.com/blog/reduce-cart-abandonment) | Appendix A, Appendix F |
| U004 | [Baymard research](https://baymard.com/lists/cart-abandonment-rate) | Appendix B |
| U005 | [Nibble B2B cases](https://blog.nibbletechnology.com/4-ways-to-use-ai-negotiation-in-b2b/) | Appendix A, Appendix E |
| U006 | [Churnkey — Growth infrastructure homepage](https://churnkey.co/) | Appendix A, Appendix C |
| U007 | [ClarAccord agencies](https://claraccord.com/solutions/agencies) | Appendix A, Appendix E |
| U008 | [Contentsquare](https://contentsquare.com/platform/voice-of-customer/) | Appendix B |
| U009 | [Adyen — Uplift documentation](https://docs.adyen.com/uplift) | Appendix A, Appendix C |
| U010 | [Churnkey A/B testing](https://docs.churnkey.co/cancel-flows/a-b-testing/) | Appendix A, Appendix E |
| U011 | [Churnkey — Recovery Methods](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/) | Appendix A, Appendix C |
| U012 | [dLocal — Pix Payment Retries](https://docs.dlocal.com/docs/payment-retries-pix) | Appendix A, Appendix C |
| U013 | [Open source](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792) | Appendix A, Appendix F |
| U014 | [Open source](https://docs.gorgias.com/en-US/create-an-action-for-ai-agent-567325) | Appendix A, Appendix F |
| U015 | [Recurly — Intelligent Retries](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic) | Appendix A, Appendix C |
| U016 | [Open source](https://docs.statsig.com/experiments/overview) | Appendix A, Appendix F |
| U017 | [Xendit delayed webhooks](https://docs.xendit.co/docs/delayed-webhooks/) | Appendix A, Appendix D |
| U018 | [Xendit — Recover failed payments](https://docs.xendit.co/docs/recover-failed-payments) | Appendix A, Appendix C |
| U019 | [Pen-ball/recover-ai](https://github.com/Pen-ball/recover-ai) | Appendix C |
| U020 | [Renukaprasad-dev/recoverai](https://github.com/Renukaprasad-dev/recoverai) | Appendix C |
| U021 | [Accelo timesheet approvals](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/) | Appendix A, Appendix E |
| U022 | [Loop Return Insights](https://help.loopreturns.com/en/articles/13680897) | Appendix A, Appendix E |
| U023 | [Loop bonus credit](https://help.loopreturns.com/en/articles/1912193) | Appendix A, Appendix D |
| U024 | [Loop instant exchanges](https://help.loopreturns.com/en/articles/1913025) | Appendix A, Appendix D |
| U025 | [Loop analytics](https://help.loopreturns.com/en/articles/1914881) | Appendix A, Appendix E |
| U026 | [Open source](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft) | Appendix A, Appendix F |
| U027 | [Open source](https://help.zenoti.com/en/appointments/redesigned-appointment-book.html) | Appendix A |
| U028 | [Clearstory tag agent](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent) | Appendix A, Appendix E |
| U029 | [Nibble](https://nibbletechnology.com/) | Appendix A, Appendix E |
| U030 | [Paystack DVAs](https://paystack.com/docs/payments/dedicated-virtual-accounts/) | Appendix A, Appendix D |
| U031 | [Paystack — Subscriptions](https://paystack.com/docs/payments/subscriptions/) | Appendix A, Appendix C |
| U032 | [Razorpay](https://razorpay.com/) | Consolidated account |
| U033 | [international payments](https://razorpay.com/accept-international-payments/) | Consolidated account |
| U034 | [Agent Studio](https://razorpay.com/agent-studio/) | Appendix A, Appendix F, Consolidated account |
| U035 | [Agentic Business Banking](https://razorpay.com/agentic-business-banking/) | Consolidated account |
| U036 | [Agentic Payments](https://razorpay.com/agentic-payments/) | Consolidated account |
| U037 | [Razorpay Agent Studio launch](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/) | Appendix A, Appendix D |
| U038 | [Engage refunds](https://razorpay.com/blog/how-razorpay-engage-transforms-customer-retention-with-instant-wallet-refunds/) | Consolidated account |
| U039 | [Wallet as a Service](https://razorpay.com/blog/incentivise-the-right-way-and-boost-customer-allegiance-with-razorpay-wallet-as-a-service/) | Consolidated account |
| U040 | [RAY](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/) | Appendix A, Appendix B, Appendix F, Consolidated account |
| U041 | [Razorpay agent guardrails](https://razorpay.com/blog/razorpay-agent-studio-principles-guardrails-and-merchant-control/) | Appendix B |
| U042 | [Agentic Platform](https://razorpay.com/blog/razorpay-agentic-platform/) | Appendix A, Appendix F, Consolidated account |
| U043 | [orders entity](https://razorpay.com/docs/api/orders/entity/) | Consolidated account |
| U044 | [capture API](https://razorpay.com/docs/api/payments/capture) | Consolidated account |
| U045 | [Payment entity](https://razorpay.com/docs/api/payments/entity/) | Appendix B |
| U046 | [Invoices API](https://razorpay.com/docs/api/payments/invoices/) | Appendix B |
| U047 | [Create Standard Payment Link](https://razorpay.com/docs/api/payments/payment-links/create-standard/) | Appendix A, Appendix B, Appendix F |
| U048 | [Update Standard Payment Link](https://razorpay.com/docs/api/payments/payment-links/update-standard) | Appendix B |
| U049 | [Payments docs](https://razorpay.com/docs/payments/) | Consolidated account |
| U050 | [Payment Link reminders](https://razorpay.com/docs/payments/payment-links/reminders/) | Appendix B |
| U051 | [Dedicated UPI Payment Links](https://razorpay.com/docs/payments/payment-links/upi/) | Appendix A, Appendix D, Appendix F |
| U052 | [Manage Payment Pages](https://razorpay.com/docs/payments/payment-pages/manage/) | Appendix B |
| U053 | [payment lifecycle](https://razorpay.com/docs/payments/payments) | Consolidated account |
| U054 | [capture settings](https://razorpay.com/docs/payments/payments/capture-settings/) | Consolidated account |
| U055 | [late authorizations](https://razorpay.com/docs/payments/payments/late-authorisation) | Consolidated account |
| U056 | [handling late authorizations](https://razorpay.com/docs/payments/payments/late-authorisation/handle) | Consolidated account |
| U057 | [Razorpay refund communication](https://razorpay.com/docs/payments/refunds/communication/) | Appendix A, Appendix D |
| U058 | [refund FAQ](https://razorpay.com/docs/payments/refunds/faqs/) | Consolidated account |
| U059 | [Instant Refunds](https://razorpay.com/docs/payments/refunds/instant/) | Consolidated account |
| U060 | [Route](https://razorpay.com/docs/payments/route/) | Consolidated account |
| U061 | [Razorpay subscription retries](https://razorpay.com/docs/payments/subscriptions/payment-retries/) | Appendix A, Appendix D |
| U062 | [Open source](https://razorpay.com/docs/webhooks/payments/) | Appendix A, Appendix F |
| U063 | [Open source](https://razorpay.com/docs/webhooks/refunds/) | Appendix A, Appendix F |
| U064 | [Razorpay webhook validation](https://razorpay.com/docs/webhooks/validate-test/) | Appendix A, Appendix D, Appendix F |
| U065 | [Engage](https://razorpay.com/engage/) | Appendix B, Consolidated account |
| U066 | [Vulcan](https://razorpay.com/foundation-model/) | Consolidated account |
| U067 | [Razorpay timeout/late authorisation](https://razorpay.com/learn/payment-timeout/) | Appendix A, Appendix D |
| U068 | [Magic Checkout](https://razorpay.com/magic-checkout/) | Consolidated account |
| U069 | [Open source](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/) | Appendix A, Appendix F |
| U070 | [Optimizer](https://razorpay.com/optimizer-intelligent-payments-routing/) | Consolidated account |
| U071 | [POS](https://razorpay.com/pos/) | Consolidated account |
| U072 | [Smart Collect](https://razorpay.com/smart-collect/) | Consolidated account |
| U073 | [Subscriptions](https://razorpay.com/subscriptions/) | Consolidated account |
| U074 | [UPI](https://razorpay.com/upi/) | Consolidated account |
| U075 | [RazorpayX](https://razorpay.com/x/) | Consolidated account |
| U076 | [AP Automation](https://razorpay.com/x/ap-automation/) | Consolidated account |
| U077 | [Spendback](https://spendback.ai/pricing) | Consolidated account |
| U078 | [Square waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments) | Appendix A, Appendix D |
| U079 | [Stripe — How we built it: Smart Retries](https://stripe.com/blog/how-we-built-it-smart-retries) | Appendix A, Appendix C |
| U080 | [Claimlane agent](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent) | Appendix A, Appendix E |
| U081 | [GoCardless — Introduction to Success+](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success) | Appendix A, Appendix C |
| U082 | [Monograph additional services](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project) | Appendix A, Appendix E |
| U083 | [Open source](https://support.narvar.com/hc/en-us/articles/11307520101651-Narvar-Return-Overview) | Appendix A, Appendix F |
| U084 | [Paystack — My transaction failed, but I was debited](https://support.paystack.com/en/articles/2127938) | Appendix A, Appendix C |
| U085 | [ReturnGO exchange FAQs](https://support.returngo.ai/exchanges-faqs) | Appendix A, Appendix E |
| U086 | [ReturnGO stockout prevention](https://support.returngo.ai/preventing-out-of-stock-exchanges) | Appendix A, Appendix E |
| U087 | [ReturnGO switch to exchange](https://support.returngo.ai/switch-to-exchange) | Appendix A, Appendix E |
| U088 | [Shiprocket delivery disputes](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-) | Appendix A, Appendix D |
| U089 | [Shiprocket NDR workflow](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-) | Appendix A, Appendix D |
| U090 | [REVER](https://techcrunch.com/2023/06/19/y-combinator-backed-rever-aims-to-modernize-refunds-and-returns/) | Appendix A, Appendix E, Consolidated account |
| U091 | [Toma](https://techcrunch.com/2025/06/05/tomas-ai-voice-agents-have-taken-off-at-car-dealerships-and-attracted-funding-from-a16z/) | Appendix A, Appendix E, Consolidated account |
| U092 | [Glimpse](https://techcrunch.com/2026/03/25/a16z-backed-glimpse-raises-new-funds-accelerates-dispute-tracking-automation-for-cpg-brands/) | Appendix A, Appendix E, Consolidated account |
| U093 | [RecoverAI at tryrecoverai.com](https://tryrecoverai.com/) | Appendix C |
| U094 | [Rigby construction](https://tryrigby.com/industries/construction) | Appendix A, Appendix E |
| U095 | [With Oversight](https://withoversight.com/) | Appendix A, Appendix E |
| U096 | [Amazon Pay Balance](https://www.aboutamazon.in/news/retail/how-to-use-amazon-pay-balance) | Consolidated account |
| U097 | [Adaptive](https://www.adaptive.build/) | Appendix A, Appendix E |
| U098 | [Adaptive updates](https://www.adaptive.build/product-updates) | Appendix A, Appendix E |
| U099 | [Banco Central Pix Automático](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico) | Appendix A, Appendix D |
| U100 | [Braze AI decisioning](https://www.braze.com/resources/articles/how-ai-decisioning-optimizes-retail-promotional-spend) | Appendix B |
| U101 | [Butter Payments](https://www.butterpayments.com/) | Appendix A, Appendix C |
| U102 | [Butter announcement](https://www.butterpayments.com/blog/press-release/butter-drives-56-more-recurring-revenue-for-subscription-brands/) | Appendix A, Appendix E |
| U103 | [Capterra page examined](https://www.capterra.com/p/179263/Razorpay/reviews/?page=2) | Consolidated account |
| U104 | [Cashfree Instant Refunds](https://www.cashfree.com/instant-refunds/) | Consolidated account |
| U105 | [PPI terms](https://www.cashfree.com/ppi-tnc/) | Consolidated account |
| U106 | [Chargebee — Failed Payment Recovery](https://www.chargebee.com/receivables/failed-payment-recovery/) | Appendix A, Appendix C |
| U107 | [Chargebee — Churn Management](https://www.chargebee.com/solutions/usecases/churn-management/) | Appendix A, Appendix C |
| U108 | [Chaser](https://www.chaserhq.com/features/payment-plans) | Appendix B |
| U109 | [Checkout.com — Intelligent Acceptance](https://www.checkout.com/products/intelligent-acceptance) | Appendix A, Appendix C |
| U110 | [Clearstory AI announcement](https://www.clearstory.build/construction-blog/introducing-clearstory-ai) | Appendix A, Appendix E |
| U111 | [dLocal — Payins](https://www.dlocal.com/our-solution/payins/) | Appendix A, Appendix C |
| U112 | [Open source](https://www.fresha.com/help-center/knowledge-base/calendar) | Appendix A, Appendix F |
| U113 | [Fresha upfront payment policies](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview) | Appendix A, Appendix D, Appendix F |
| U114 | [G2 page](https://www.g2.com/products/razorpay/reviews?like_me_login=true&page=4) | Consolidated account |
| U115 | [Gravy — Press](https://www.gravysolutions.io/press) | Appendix A, Appendix C |
| U116 | [HighRadius PoD automation](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/) | Appendix A, Appendix D |
| U117 | [Fin Tasks](https://www.intercom.com/help/en/articles/9569407-fin-tasks-explained) | Consolidated account |
| U118 | [InvoRec](https://www.invorec.com/) | Consolidated account |
| U119 | [RazorpayX escalation](https://www.linkedin.com/posts/ashwin-shankar-079b55bb_razorpayx-has-stalled-our-entire-vendor-payout-activity-7390960921772208128-xhMk) | Consolidated account |
| U120 | [Razorpay AI Labs](https://www.linkedin.com/pulse/our-obsession-merchant-experience-breaking-risk-review-black-n2ntc) | Consolidated account |
| U121 | [PayPal — Payment Optimization](https://www.paypal.com/us/enterprise/payment-processing/payment-optimization?locale=li) | Appendix A, Appendix C |
| U122 | [brand wallet](https://www.pinelabs.com/prepaid-solutions/brand-wallet) | Consolidated account |
| U123 | [Pine Labs refunds](https://www.pinelabs.com/prepaid-solutions/refunds) | Consolidated account |
| U124 | [Primer — Observability](https://www.primer.io/manage/observability) | Appendix A, Appendix C |
| U125 | [Procore AI](https://www.procore.com/ai) | Appendix A, Appendix E |
| U126 | [PPI Directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12156) | Consolidated account |
| U127 | [PA Directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12896) | Consolidated account |
| U128 | [Authorized systems](https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=12043) | Consolidated account |
| U129 | [merchant discussion](https://www.reddit.com/r/IndiaBusiness/comments/1vo58ol/thinking_of_switching_from_razorpay_anyone_else/) | Consolidated account |
| U130 | [“settlements are always short” post](https://www.reddit.com/r/Razorpay/comments/1skd2nr/razorpay_settlements_are_always_short_anyone_else/) | Consolidated account |
| U131 | [SaaS merchant account](https://www.reddit.com/r/Razorpay/comments/1vbqa46/razorpay_is_the_shittiest_pg_i_have_ever/) | Consolidated account |
| U132 | [test-mode subscription thread](https://www.reddit.com/r/Razorpay/comments/1vhzgnz/razorpay_subscriptions_in_test_mode_always_fail/) | Consolidated account |
| U133 | [settlement escalation account](https://www.reddit.com/r/Razorpay_Community/comments/1wuu9ru/razorpay_settlement_stuck_despite_multiple/) | Consolidated account |
| U134 | [TradingView thread](https://www.reddit.com/r/TradingView/comments/1w6ds2j/refund_issue/) | Consolidated account |
| U135 | [UPI AutoPay developer account](https://www.reddit.com/r/UPI/comments/1x03wrc/what_i_learned_integrating_razorpay_subscriptions/) | Consolidated account |
| U136 | [recurring-subscription discussion](https://www.reddit.com/r/indianstartups/comments/1iukxql/issues_with_razorpay_for_recurring_subscriptions/) | Consolidated account |
| U137 | [merchant discussion](https://www.reddit.com/r/indianstartups/comments/1td54mx/razorpay_is_silently_killing_my_international/) | Consolidated account |
| U138 | [merchant account](https://www.reddit.com/r/indianstartups/comments/1tgmey3/having_an_awful_experience_with_razorpay_i_am_fed/) | Consolidated account |
| U139 | [Indian D2C merchant discussion](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/) | Appendix A, Appendix D |
| U140 | [Shipway product page](https://www.shipway.com/) | Appendix A, Appendix D |
| U141 | [Siteline change-order log](https://www.siteline.com/blog/change-order-log) | Appendix A, Appendix E |
| U142 | [Trustpilot](https://www.trustpilot.com/review/razorpay.com) | Consolidated account |
| U143 | [Glimpse product](https://www.tryglimpse.com/) | Appendix A, Appendix E |
| U144 | [Alder, YC](https://www.ycombinator.com/companies/alder) | Appendix A, Appendix B, Appendix E |
| U145 | [CentralComs, YC](https://www.ycombinator.com/companies/centralcoms) | Appendix A, Appendix E |
| U146 | [Clearest Health, YC](https://www.ycombinator.com/companies/clearest-health) | Appendix A, Appendix E |
| U147 | [FlyCode, YC](https://www.ycombinator.com/companies/flycode) | Appendix A, Appendix E |
| U148 | [Glimpse, YC](https://www.ycombinator.com/companies/glimpse-2) | Appendix A, Appendix E |
| U149 | [REVER, YC](https://www.ycombinator.com/companies/rever) | Appendix A, Appendix E |
| U150 | [Rex, YC](https://www.ycombinator.com/companies/rex-inc) | Appendix A, Appendix E |
| U151 | [Signals, YC](https://www.ycombinator.com/companies/signals) | Appendix A, Appendix E |
| U152 | [Toma, YC](https://www.ycombinator.com/companies/toma) | Appendix A, Appendix E |
| U153 | [Zendesk outcomes](https://www.zendesk.com/blog/zendesk-insights/expertise/verified-outcomes-new-standard-for-service/) | Consolidated account |
| U154 | [Open source](https://www.zenoti.com/ai-workforce/ai-receptionist) | Appendix A |
| U155 | [Zenoti waitlists](https://www.zenoti.com/platform/waitlist-management) | Appendix A, Appendix E |
| U156 | [Zoho Books income TDS](https://www.zoho.com/in/books/help/settings/income-tds.html) | Appendix A, Appendix D |
| U157 | [Yuno — Enterprise Revenue Recovery Stack](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery) | Appendix A, Appendix C |

## Archive integrity notes

The six source bodies are preserved in full with Markdown headings shifted down two levels. The SHA-256 values identify the original text read during consolidation; they are provenance checks, not verification of web claims.

| Original record | SHA-256 of original UTF-8 text |
|---|---|
| output/Razorpay_Recover_and_Grow_Research.md | a06debfa8e4e2bef4cf225ab62cb81f3eed4fa585f5ca5cab1879ef988662dad |
| output/Razorpay_Broader_Concepts_Reassessment.md | 99607c28ccd19af7da7a951dbb29b74d24fb5c3c1fa0beaa261c28c6110e94e8 |
| research/global_competitors.md | c72d24d7594abfedd5ebe05732d4af97339acfe167fe5215afbdbd587d356d36 |
| research/merchant_problems.md | dd3233ac847e7ab9324a0f5c890838285e7b47f8998c89cd08ea7cd3a2fde15e |
| research/startup_frontier.md | c2291f553fd8f72548296e2bdceac2fe0e7d6cdb166971b3cdb4bea791c8479c |
| research/platform_findings.md | 5d3b28b37e52718631e5e5fa663ca61043cdf6c868ba03e579d6d61c848ec684 |

**End of archive. Current selected concept: SeatSaver.**
