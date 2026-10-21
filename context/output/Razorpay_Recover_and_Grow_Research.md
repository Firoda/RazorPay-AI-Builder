# Razorpay Recover and Grow with AI Opportunity Research

Research and prototype selection for the ISB AI PM Build Challenge

Prepared 6 October 2026 | Submission deadline 13 October 2026 at 11:59 PM IST

## 1 What I would investigate first

**Start with a merchant whose customer still wants to buy, but whose payment, order and fulfilment records disagree.** The most promising initial concept is a small agent that rescues a paid booking after its original slot has expired. It verifies the money, understands the customer's remaining constraints, offers a genuinely available alternative, and completes the approved booking change. If no acceptable alternative exists, it prepares the appropriate refund or human handoff. This is a research recommendation, not a claim of validated demand or global novelty.

The strongest insight from the research is that many recovery products already persuade, remind, retry and discount. A more interesting question is **what has to become true before collecting or retaining this particular customer's money is appropriate?** The answer might be a valid replacement booking, a corrected delivery instruction, evidence resolving an invoice dispute, or a repaired recurring authorization.

My first three merchant-discovery candidates are:

1. **Paid booking rescue.** Payment is confirmed to the merchant after the original reservation expires. Recover an acceptable experience, with no second charge. Best for a crisp demonstration; frequency and overlap with integrated booking software are the biggest unanswered questions.
2. **Contested delivery rescue.** A courier reports an unsuccessful attempt while the customer still wants delivery. Assemble the evidence and actionable reattempt instructions before the parcel returns. Strong documented workflow; dependence on the courier is the biggest constraint.
3. **Short-payment resolution.** Work out which part of an invoice difference is genuinely collectable, resolve the documentary blocker, and request only the approved balance. Strong AI use on messy evidence; existing accounting and collections products create substantial competition.

Two further candidates deserve attention: **repairing the next renewal after a one-time payment rescue**, and **coordinating competing recovery actions so that the merchant does not simultaneously discount, chase and refund the same order**. The latter is an interesting product hypothesis with weaker direct evidence of unmet demand.

Do not commit to a concept purely because this report ranks it highly. One merchant who can show three recent examples is more useful than another attractive agent name. The best idea for this deadline is the intersection of a repeated problem, accessible records, a meaningful AI decision and a small action that can be demonstrated end to end.

### How to use this report

Read Sections 1 to 5 to choose a direction. Sections 6 to 10 contain the five strongest concept briefs. Section 11 is a wider idea library, including ideas that were downgraded after finding close competitors. Sections 12 to 16 cover data, evaluation, merchant discovery and the remaining build week. The final source registers preserve the evidence behind the recommendations.

**Evidence labels.** A documented capability is supported by official product documentation. A vendor claim is a company's own description or result. An anecdote is an unverified individual account. A hypothesis is our proposed interpretation or product opportunity. Illustrative examples and all prototype financial figures are synthetic. None of the proposed products has been tested with merchants in this research.

## 2 What the challenge actually asks for

The supplied four-page challenge brief is the source for this event's requirements. The two product tracks are Razorpay in Your Pocket, aligned with Full Stack Builder, and Recover and Grow with AI, aligned with AI Product Manager. Your stated preference is the second track.

Track 2 asks for an AI-native experience that identifies and acts on a measurable merchant growth or revenue-recovery opportunity. The expected chain is: a meaningful signal; an explanation of why AI helps beyond a fixed rule; a recommendation or action; merchant review and control; outcome learning; handling of mistakes and permissions; and a business metric. A generic chatbot or an explanatory dashboard is explicitly discouraged. [Challenge brief, page 2]

The evaluation emphasizes problem importance, merchant understanding, product prioritization, effective use of AI during the build, and communication. No numerical scoring weights are published in the supplied brief. The ranking in this report is our judgement, not an official judging formula.

### Submission implications

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

## 3 The baseline has moved further than a generic recovery agent

### Razorpay already occupies much of the obvious territory

The public Agent Studio page lists cart recovery, COD confirmation, verification, disputes, feedback and several recurring-payment recovery uses, with merchant controls and action checks. Those features are the starting baseline, not a differentiated proposal. [R01](https://razorpay.com/agent-studio/)

Razorpay's March 2026 Agentic Platform announcement also describes interpreting complaint screenshots, identifying payment problems and generating recovery links. Its September 2026 RAY article describes WhatsApp operations and payment anomaly diagnosis. Changing the interface to chat, voice or WhatsApp would therefore add little on its own. These are public product claims; the research did not test access or reliability. [R02](https://razorpay.com/blog/razorpay-agentic-platform/), [R03](https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/)

The Agent Studio launch article also includes RTO-focused agents. Ordinary address correction, COD verification, RTO scoring or an RTO dashboard should not be pitched as missing Razorpay capabilities. Razorpay Recon further reduces the novelty of basic transaction-to-bank matching. [P1](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/), [R17](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/)

### The international competitive map

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

### What could still distinguish an entry

Differentiation can come from a specific unresolved exception, a better action boundary, unusually good evidence handling, a neglected merchant segment, or a more honest success metric. It should be demonstrated against the closest known alternative. “Nobody is doing this” is neither established by this research nor necessary for a strong submission.

For example, a waitlist is ordinary. Recovering the same customer's already-paid experience after a capacity/payment mismatch is a different decision. Invoice reminders are ordinary. Separating a valid outstanding balance from an approved deduction, then supplying the missing proof that unlocks payment, is a more precise job. Both still need merchant validation.

## 4 Useful patterns from other markets

### Southeast Asia separates payment success from order viability

Xendit documents delayed confirmation after an order expiry and discusses whether the merchant can still fulfil the order. This directly supports investigating the gap between receiving money and delivering the promised outcome. It does not establish how often Indian merchants face the same exception. [P6](https://docs.xendit.co/docs/delayed-webhooks/)

Xendit's recurring recovery documentation also distinguishes paying the current cycle from changing the method used in future cycles. A one-time rescue does not automatically update the stored recurring methods. This is a concrete inspiration for a two-status product: invoice paid; future collection ready. Do not assume identical Razorpay behaviour without checking the selected integration. [G17](https://docs.xendit.co/docs/recover-failed-payments)

### African payment workflows emphasize checking received money

Paystack's subscription documentation describes provider-specific retry and authorization-update behaviour. Its customer support materials recognize failed-payment/debit ambiguity, while dedicated virtual-account documentation includes delayed-notification handling. The transferable principle is to establish the authoritative money state before asking a customer to pay again. This is not a claim about every provider or country in Africa. [G15](https://paystack.com/docs/payments/subscriptions/), [G16](https://support.paystack.com/en/articles/2127938), [P16](https://paystack.com/docs/payments/dedicated-virtual-accounts/)

### Brazil makes recurring permission a distinct object

Banco Central's Pix Automático material and dLocal's Pix retry documentation illustrate that recurring authorization and an individual collection have separate rules and states. The design lesson transfers; the legal permissions, timings and payment rails do not. A prototype should never treat a one-time payment as permission for future recurring debits. [P17](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico), [G14](https://docs.dlocal.com/docs/payment-retries-pix)

### European and global platforms optimize several outcomes together

Adyen, GoCardless and other platforms expose conversion, retry, risk or cost controls. The useful lesson is to give the agent valid outcomes such as wait, stop, request clarification and escalate. A successful product does not maximize attempts at any cost. [G02](https://docs.adyen.com/uplift), [G18](https://support.gocardless.com/hc/en-us/articles/17143474597916-Introduction-to-Success)

### Vertical software is often the real competitor

An Indian service merchant may compare the proposal with a booking app, accountant, customer support tool or spreadsheet. Studying only payment gateways would miss that competition. The path to a strong idea is to identify the unresolved handoff between systems, then prove why a small addition improves it. It is not necessary to replace those systems.

## 5 Ranked shortlist and selection logic

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

## 6 Concept one Paid booking rescue

### The merchant problem

A workshop operator, studio or class business has limited capacity. A booking expires while payment is unresolved. The money later confirms, but the original slot has been sold or is no longer available. Support now needs to verify the transaction, understand the customer's constraints, check alternatives and resolve the booking without collecting twice or making an impossible promise.

The existence of late payment confirmation and order-feasibility decisions is documented. The size of the opportunity in the proposed Indian segment is a hypothesis. This should be sold as an exception-resolution feature until interviews establish enough repeated demand for a larger product. [P6](https://docs.xendit.co/docs/delayed-webhooks/), [P7](https://razorpay.com/learn/payment-timeout/)

### The decision the agent owns

The agent asks: given confirmed payment, current capacity and the customer's remaining requirements, can we restore an acceptable experience? Its answer is one of four bounded actions: offer a feasible alternative; restore the original booking if genuinely available; prepare a refund under policy; or escalate because the evidence is incomplete.

For the first prototype, choose **already-paid, expired workshop bookings only**. Do not combine unpaid-cart rescue, airline ticketing, subscription management and refunds across industries. The payment is already received, so a replacement booking does not require a second payment link. If an optional price difference is not in scope, keep every approved alternative at the original paid price.

### Why AI helps

Payment verification and seat availability are deterministic. AI interprets language such as “Sunday morning only, same instructor, I need to attend with my friend,” checks which constraints are hard, and explains eligible alternatives. It must cite the customer statement and the supplied availability. If every preference is already structured, a filtered menu may be sufficient; the product note should acknowledge that boundary.

### The minimum data

- Payment ID, captured amount, refund amount/status, any refund in flight and original booking reference from a Razorpay-shaped payment feed. Keep payment occurrence, provider confirmation, webhook receipt and booking expiry as separate timestamps.
- Booking state, expiry, workshop schedule, seat counts and instructor from the merchant calendar.
- The customer's explicit preferences and consent, from a simulated conversation or an authorized export.
- Merchant policy defining equivalent sessions, allowed price treatment, refund path and approval permissions.

The gateway does not know instructor preference, physical attendance, calendar capacity or why the customer bought. Those must be explicitly supplied.

### A demonstration that shows judgement

**Synthetic case:** INR 2,000 is confirmed after booking B-104 expires. The original Sunday 10 AM class is full. The customer wants the same instructor on a Sunday morning. One later session matches; a cheaper evening class does not. The agent proposes the matching session, cites both the payment and preference evidence, and shows that there will be no additional charge. The merchant approves, the customer accepts, and the booking adapter reserves one seat and records the original payment reference.

Then replay the same payment event. Nothing changes. Show a second customer who requires the original date: no alternative meets the requirement, so the agent prepares a refund review. These two cases reveal more product quality than ten polished chat replies.

### Controls and failure handling

Use authoritative captured payment state, never a screenshot alone. Verify that the amount remains available for the booking and has not already been refunded or committed to a refund. Resolve a refund in flight before offering a replacement against the same money. Check capacity immediately before confirming. Prevent duplicate reservation and money actions with a business-level action key. If the calendar write fails after a proposal is accepted, show pending resolution and retain the case for follow-up; do not display a confirmed booking. A customer can reject alternatives and follow the refund route without repeated persuasion. A refund request and a processed refund remain separate statuses.

### Learning and business outcome

Record which constraint ruled an option out, merchant overrides, customer acceptance, actual attendance or fulfilment, and subsequent refunds. Improve retrieval and suggested alternatives from those labeled outcomes. Do not claim automatic model improvement merely because a log exists.

The main live-pilot metric would be **incremental retained contribution per eligible late-paid booking**, compared with the merchant's current refund/support process. Track time to resolution, wrong confirmations, duplicate actions and complaints. A saved booking is initially a retained-sale candidate; completion and later refunds determine the realized outcome.

### Closest alternatives and the honest pitch

Zenoti already advertises AI rescheduling that checks availability and provider preferences; its appointment documentation also supports moving paid appointments at the same price. Preference-aware rescheduling is therefore established. The remaining hypothesis is resolving an external payment-confirmation/expired-booking mismatch for merchants whose separate systems do not handle it. That narrower gap remains unvalidated. [R18](https://www.zenoti.com/ai-workforce/ai-receptionist), [R19](https://help.zenoti.com/en/appointments/redesigned-appointment-book.html)

Gateways already provide reconciliation mechanisms. This concept should not use AI to repair ordinary webhook plumbing. Keep it ranked first for demonstration clarity only if merchant examples confirm the cross-system exception; otherwise prefer a better-evidenced alternative.

**Pitch:** “When a customer has paid but their booking has expired, help the merchant restore a valid experience using the customer's actual constraints, or resolve the refund cleanly.”

**Kill criteria:** merchants cannot produce repeated examples; most cases have a single automatic resolution; the calendar cannot expose availability; or an existing booking tool already solves the same exception satisfactorily.

## 7 Concept two Contested delivery rescue

### The merchant problem

A D2C order enters a non-delivery queue. The courier says unavailable or refused; the buyer says no attempt happened and still wants the parcel. A routine COD confirmation or reminder does not resolve that contradiction. The merchant needs useful evidence, a current delivery instruction and an actionable courier request while recovery is still possible.

Shiprocket's official support workflow explicitly distinguishes an incorrect NDR reason and allows buyer conversation or chat proof to support the case. This is stronger evidence of the workflow than an unsourced industry RTO percentage. An Indian merchant discussion supplies an anecdotal interview lead, not proof of frequency or wrongdoing. [P2](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-), [P3](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-), [P4](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/)

### A small and distinctive scope

Choose one case family: disputed “customer unavailable” while the parcel remains eligible for another attempt. Exclude broad RTO prediction, address-risk scoring, COD confirmation and all-courier orchestration. Shiprocket, Shipway and Razorpay already occupy much of that territory. [P1](https://razorpay.com/blog/agent-studio-ai-agents-by-razorpay/), [P2](https://support.shiprocket.in/support/solutions/articles/43000617306-shiprocket-app-how-to-process-an-ndr-shipment-), [P3](https://support.shiprocket.in/support/solutions/articles/152000000285-how-to-raise-a-delivery-dispute-in-shiprocket-), [P4](https://www.reddit.com/r/smallbusinessindia/comments/1tgifgq/d2c_founders_in_india_which_shipping_partner_are/), [P5](https://www.shipway.com/)

The agent reads the courier record and buyer explanation, separates facts from disputed claims, asks one missing question, and prepares a reviewed reattempt or evidence-escalation packet. It should say “buyer disputes the recorded attempt,” not accuse the courier of fraud.

### Data and AI contribution

Shipment/AWB history, current parcel state, courier action eligibility and deadline come from shipping records. The customer supplies an access instruction or availability. Payment status comes from the order/payment system, where available; a pure COD order may have no captured gateway payment.

AI turns colloquial explanations into a concise, evidence-linked request: correct gate, reception contact, permitted time or contested attempt. Rules enforce what can be changed, the allowed action window, contact limits and case status. Unsupported claims remain visibly unresolved.

### Prototype

Use 12 synthetic shipments and three customer responses. Case A supplies a missing gate number and availability, producing a reviewed reattempt request. Case B explicitly refuses the order, stopping outreach. Case C disputes the recorded attempt, producing a packet with the relevant message and timestamps. The courier action adapter can be simulated; label it. A later simulated delivery event closes the case.

The screen should show requested, accepted by carrier, attempted, delivered and unresolved as different states. A submitted escalation is not a delivery. If API submission is unavailable, the honest final action is an exportable packet plus a merchant task, followed by a manually entered outcome.

### Outcome and validation

Measure delivered contribution recovered relative to the current NDR process, cost per resolved case, correct classification and customer contact burden. Count prepaid orders retained and COD collections separately. A friendly reply is not collected or retained revenue.

Ask merchants to show their last five disputed NDRs: what proof changed the result; when did the parcel become unrecoverable; did the carrier accept the request; and what does the current tool already automate? Reject the idea if the bottleneck is entirely carrier capacity rather than missing evidence or coordination.

**Pitch:** “Turn a disputed delivery attempt into a precise, reviewed recovery request, and follow it through to the actual delivery outcome.”

## 8 Concept three Short-payment resolution

### The merchant problem

An invoice is larger than the cash received. The difference might be an approved credit, recorded withholding, disputed delivery, payment allocation error or genuine unpaid balance. A generic collection agent treats the full difference as debt and can send an incorrect demand. An accountant instead reconstructs the reason and determines the next action.

Zoho documents withholding treatment in customer payments; HighRadius documents proof-of-delivery workflows for disputes. Newer AR companies such as Rex, Alder and Glimpse also handle exceptions. The opportunity is therefore a narrow, accessible small-merchant workflow, not a new collections category. [P8](https://www.zoho.com/in/books/help/settings/income-tds.html), [P9](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/), [S01](https://www.ycombinator.com/companies/rex-inc), [S02](https://www.ycombinator.com/companies/alder), [S03](https://www.tryglimpse.com/), [S04](https://www.ycombinator.com/companies/glimpse-2)

### Scope and agent decision

Start with one Indian wholesaler or service business and three reason codes: documented deduction awaiting review, missing delivery/acceptance evidence, and unexplained outstanding amount. The product proposes an explanation, shows the source, identifies what remains unknown, and suggests an action. It never invents a tax rate, approves a credit or writes off a balance.

The merchant or accountant confirms what is due. Only that confirmed amount can be turned into a payment request. If the customer is waiting for a delivery document, supply the correct authorized evidence before asking again. If evidence indicates the money is already accounted for, suppress the reminder.

### Synthetic demo

Use an invoice of INR 50,000 with INR 46,000 received. The difference is INR 4,000, but that arithmetic does not establish debt. In one case, the remittance refers to an approved adjustment and is routed for review. In another, the buyer withheld INR 4,000 while waiting for a delivery record. The agent finds the matching document, drafts a response, and proposes a payment link only after the merchant verifies the balance. A third ambiguous note triggers a clarification request.

These figures illustrate state handling, not tax treatment. The prototype uses merchant-supplied classifications and amounts, with no legal or accounting determination by the model.

### What makes AI useful

Unstructured remittance notes, abbreviated invoice references, contradictory email threads and document matching create the AI task. Exact amounts, invoice status, allocations and permission checks belong in code. A synthetic dataset where every difference equals the same percentage would demonstrate a rule, not meaningful AI reasoning.

### Data and minimal build

Ten invoice rows, payment records, four remittance notes, a delivery document and an approved adjustment ledger are enough. Use uploads or CSV rather than live accounting integrations. Provide source highlighting, three reason categories, an editable decision, a reviewed message draft and one Standard Payment Link test flow if supported. Simulate the buyer response and label it.

### Outcome and risk

Measure false payment demands first, correctly resolved exceptions second, and cash actually collected on validated balances third. Reclassifying received money is not recovery. A generated link is not recovery. If the concept only saves bookkeeping time without resolving a collection blocker, its fit with Track 2 is weaker.

The learning loop stores corrected reason labels, document relevance and whether the blocker was actually resolved. Accounting approval remains a separate action. Expand reason codes only after demonstrating high precision on the initial set.

**Pitch:** “Explain the difference before collecting it, then remove the specific blocker preventing a valid payment.”

**Kill criteria:** the current accounting tool already resolves the cases; evidence is inaccessible; deductions are mostly deliberate commercial disputes needing negotiation; or volumes are too small to matter.

## 9 Concept four Repair the next renewal

### The problem hidden by a successful rescue

A merchant collects this month's failed subscription invoice through a one-time payment. The recurring authorization remains invalid, unchanged or intentionally revoked. Next month the same customer fails again. Xendit's documentation provides a concrete example of this distinction, while payment-update and retention tools from major providers establish close competition. [G17](https://docs.xendit.co/docs/recover-failed-payments), [G05](https://www.chargebee.com/receivables/failed-payment-recovery/), [G06](https://www.chargebee.com/solutions/usecases/churn-management/), [G07](https://docs.recurly.com/recurly-subscriptions/docs/retry-logic), [G08](https://churnkey.co/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/)

A standalone payment must first be allocated to the correct subscription obligation; it may not automatically settle that invoice or stop an existing retry. Verify allocation and reconcile any scheduled collection before labeling the current invoice paid.

The proposed product has two independently verified statuses: **current invoice paid** and **next cycle ready**. Neither status implies the other. “Ready” means the configured recurring arrangement passes the provider's supported checks; it cannot guarantee a future payment will succeed.

### Narrow prototype

Choose an adult learning membership or non-essential class subscription. Show six explanations: an expired method, a changed bank, a one-time family payment, a temporary failure, an intentional switch to manual payment, and an ambiguous status. The agent interprets the customer's preference and offers a permitted next step. A rule can detect the status mismatch; AI earns its place only in resolving the different meanings of that mismatch.

The action might be opening the correct authorization-update flow, recording an explicit choice to remain manual, or escalating a contradiction. Customer consent is required for any new recurring permission. Do not propose repeated debits after an explicit cancellation. Actual mandate availability and supported transitions must be checked for the selected Razorpay product; a labeled adapter simulation is enough for the concept demo.

### Measurement and product boundary

The intended long-term metric is repeat failure or next-cycle first-attempt success in a predefined cohort that opts to repair recurring payment, accompanied by customer opt-outs and repeated support work. Report deliberate manual-payment and cancellation choices separately; respecting either choice is not a failed repair. A week is insufficient to establish a monthly cohort result. Replay scenarios to demonstrate the distinction, and describe the prospective measurement honestly.

A payment-method update screen by itself is generic. The improvement would be finding apparently closed recovery cases whose underlying setup remains unresolved, then respecting the customer's intended future arrangement. Reject the concept if existing billing flows already do this reliably or a simple notification resolves nearly all cases.

**Pitch:** “A recovered invoice should not hide an unresolved renewal. Close both states, with the customer's explicit choice.”

## 10 Concept five Coordinate recovery actions

### Problem hypothesis

Separate automations can act on one customer journey: a cart coupon, a failed-payment reminder, a scheduled retry and a complaint response. The merchant needs a single current decision about which action is appropriate. This research found coordinated suites and recovery experimentation, so the broad idea is not unoccupied. The narrower hypothesis is that some merchants still have conflicting actions across tools. [G08](https://churnkey.co/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [G19](https://www.primer.io/manage/observability), [S05](https://www.ycombinator.com/companies/flycode), [S07](https://docs.churnkey.co/cancel-flows/a-b-testing/)

### The proposed product

Build a queue of proposed actions around one verified customer/order identity. The agent interprets unresolved customer intent or a service complaint. Rules then apply precedence: stop after confirmed payment; pause discretionary sales outreach during a material unresolved complaint; respect an opt-out; avoid overlapping incentives; and limit contact. The merchant can inspect why each proposal was allowed, delayed, replaced or stopped.

This is useful only if it executes or suppresses actions. A dashboard explaining that two tools disagree is too weak. Avoid claiming to integrate every tool; use three simulated proposal sources and one action adapter.

### A three-case demo

The prototype controls its own action queue. Canceling or rescheduling a provider-owned retry requires an independently verified supported control; otherwise the product can only warn or escalate.

Case A has a scheduled retry plus a coupon proposal: wait and avoid unnecessary discounting. Case B has an unresolved complaint: prepare the service-resolution action. Case C is paid while a reminder is queued: cancel the reminder. Include an uncertain identity match that cannot safely combine two timelines.

A merchant sees a policy preview before changing contact or offer budgets. The first implementation should use explicit priorities, not an opaque model-generated score. If structured state alone determines the result, admit that the coordinator is mostly rules and use AI only for the genuinely ambiguous evidence.

### Why the business metric matters

Attributed payments after outreach are not causal recovery. Churnkey already has experimentation features, and other vendors already offer attribution and payment experiments. The stronger product discipline is an action loop that uses net contribution and an appropriate control, not claiming to invent holdouts. [S07](https://docs.churnkey.co/cancel-flows/a-b-testing/), [G09](https://docs.churnkey.co/failed-payment-recovery/analytics/recovery-methods/), [G19](https://www.primer.io/manage/observability)

Treat this as a feature that can strengthen Concepts 1 to 4 if a standalone coordination problem is not validated. The main kill question is whether merchants actually suffer costly cross-tool collisions and whether their existing platform already prevents them.

**Pitch:** “Before another recovery action fires, decide whether it is still appropriate for this order, this customer and this margin.”

## 11 Wider idea library

The following alternatives preserve useful findings from the wider search. They are not equally recommended. Each is a hypothesis that can become worthwhile with a specific merchant example and accessible data.

### 11A Recover a feasible basket after the original cart becomes invalid

**Merchant and problem:** a D2C merchant starts recovery after stock, price or delivery availability has changed. A generic link points to a purchase the merchant can no longer fulfil.

**Proposed difference:** interpret the customer's actual must-have requirement, then build an approved alternative basket with fresh availability and a margin floor. Inventory and price remain deterministic. This differs from Concept 1 because the original payment has not succeeded: a new payment request may be appropriate only after the new basket is accepted and the old payment state is verified.

**Closest competition:** Yuno/Razorpay recovery, Gorgias order actions, and commerce inventory reservation. Merely checking stock is not enough. [G12](https://y.uno/en/blog/the-enterprise-revenue-recovery-stack-from-routing-logic-to-ai-driven-transaction-recovery), [R01](https://razorpay.com/agent-studio/), [R10](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792), [R12](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft)

**Small demo and metric:** 20 products, eight customer statements and two substitutions, including a no-suitable-option case. Measure contribution from fulfilled recovered orders after returns, not link clicks. Reject if the inventory rarely changes during recovery or the existing storefront already handles the alternative well.

### 11B Recover approved additional work missing from the final bill

**Merchant and problem:** an event vendor or creative agency delivers an approved extra, but final billing misses it. Compare the original scope, authorized approval, delivered work, waivers and existing invoice lines.

**Proposed difference:** retrospective reconciliation with negative cases: included work, free favour, unauthorized requester, withdrawn request, old price, undelivered extra or an item already billed under another name. AI interprets the evidence; calculation and approval are fixed controls.

**Closest competition:** Addenly, With Oversight, ClarAccord and Rigby are unusually close. Established construction and agency tools add further overlap. This is an adaptation opportunity with weak category novelty. [S25](https://tryrigby.com/industries/construction), [S26](https://addenly.com/docs), [S27](https://addenly.com/legal/terms), [S28](https://withoversight.com/), [S29](https://claraccord.com/solutions/agencies), [S30](https://knowledge.clearstory.build/how-to-use-the-tm-tag-agent), [S31](https://www.clearstory.build/construction-blog/introducing-clearstory-ai), [S32](https://www.adaptive.build/), [S33](https://www.adaptive.build/product-updates), [S34](https://www.procore.com/ai), [S35](https://www.siteline.com/blog/change-order-log), [S36](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/timesheet-approvals/), [S37](https://support.monograph.com/en/articles/4438472-how-to-add-additional-services-to-your-project)

**Small demo and metric:** one event, a package, 25 messages, completion notes and a final bill. Propose a reviewed extra only when every required condition is satisfied. Measure precision first and actual collection second. Reject if merchants knowingly waive most extras; software detection does not solve unwillingness to charge.

### 11C Recover supplier credits after resolving the customer problem

**Merchant and problem:** a reseller refunds or replaces a valid defective item, but never completes the supplier reimbursement process.

**Proposed difference:** link customer remedy, serial/batch evidence, supplier policy, submitted claim, approved credit and realized credit. Customer resolution proceeds independently; supplier recovery must not delay it. AI matches narrative evidence to a policy; dates, duplication and amounts are checked deterministically.

**Closest competition:** Claimlane handles supplier/product rules and claims; Glimpse covers recovery evidence. The local reseller workflow and realized-credit reconciliation are the hypotheses. [S03](https://www.tryglimpse.com/), [S13](https://support.claimlane.com/en/articles/16780950-about-the-claimlane-ai-agent)

**Small demo and metric:** two supplied policies, 12 cases and four outcomes: accepted, missing evidence, duplicate, ineligible. Measure realized credits less processing cost. Reject if supplier rules are inaccessible or most valid claims are still refused. This is a margin-recovery story and needs explicit connection to the track's merchant outcome.

### 11D Repair the exact product promise causing avoidable returns

**Merchant and problem:** customers buy a specific variant because a product statement is misleading or incomplete. A feedback summary fails to change the page.

**Proposed difference:** connect variant, purchased page version, return reason and source-backed product facts; draft the smallest truthful correction; obtain merchant approval; then evaluate future retained sales. AI can cluster and explain, but correlation is not proof that wording caused returns.

**Closest competition:** Loop already identifies costly return patterns and connects insights with description and sizing changes; Signals adds post-purchase conversation. A generic return-insights agent is weak. [S08](https://www.ycombinator.com/companies/signals), [S19](https://help.loopreturns.com/en/articles/13680897), [S20](https://help.loopreturns.com/en/articles/1914881)

**Small demo and metric:** three variants, 20 fictional cases and a page preview with one justified correction. Include a seasonal pattern that does not warrant a copy change. Track issue-specific refunds and contribution, alongside conversion. Reject if there is no page/version evidence or the real problem is faulty goods.

### 11E Fill a cancelled service slot with a compatible paid booking

**Merchant and problem:** a studio or salon has a last-minute opening and customer preferences scattered in messages.

**Proposed difference:** interpret service/resource constraints, reserve the feasible slot once, and obtain the agreed deposit. Rules own resource feasibility, concurrent acceptance, price and expiry. Choose a non-medical service.

**Closest competition:** Square, Fresha and Zenoti already provide waitlist or booking recovery features. Resource complexity and fragmented local workflow must justify the addition. [P10](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments), [P11](https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview), [S18](https://www.zenoti.com/platform/waitlist-management)

**Small demo and metric:** one cancellation, five interested people and two simultaneous acceptances. Confirm only one booking. Measure contribution from attended replacement bookings, subtracting displaced future bookings and discounts. Reject if no genuine standby demand exists. A payment link alone cannot lock a calendar resource.

### 11F Find a replacement that fixes the actual return reason

**Merchant and problem:** the standard exchange is unavailable or repeats the same problem, such as unsuitable fit.

**Proposed difference:** interpret the return explanation and match only catalog attributes that the merchant has verified. Keep refunds easy and respect explicit refusal. Show the customer why the replacement addresses the problem rather than recommending a popular product.

**Closest competition:** Loop, ReturnGO and Gorgias already support exchanges, incentives, reservations and order changes. Good product semantics would be the meaningful addition. [P12](https://help.loopreturns.com/en/articles/1913025), [P13](https://help.loopreturns.com/en/articles/1912193), [S10](https://support.returngo.ai/exchanges-faqs), [S11](https://support.returngo.ai/preventing-out-of-stock-exchanges), [S12](https://support.returngo.ai/switch-to-exchange), [R10](https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792)

**Small demo and metric:** 20 synthetic footwear variants with explicit fit attributes, five complaints and a no-match result. Measure kept-order contribution after second returns and exchange shipping. Reject if reliable attributes do not exist. Do not invent fit, compatibility or delivery claims.

### 11G Restore access after confirmed payment

**Merchant and problem:** payment is captured but the correct course, software account or membership remains inactive.

**Proposed difference:** resolve ambiguous customer/account mapping and the promised entitlement, then propose a bounded access repair. Straightforward missed-webhook handling should already be fixed with ordinary engineering. AI only helps when evidence and identity are ambiguous.

**Closest competition:** payment and entitlement systems, ordinary reconciliation, and support agents. The market gap is unproven. [R04](https://razorpay.com/docs/webhooks/payments/), [R17](https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/)

**Small demo and metric:** three timelines, one duplicate customer identity and one case that cannot be matched safely. Measure avoided erroneous suspensions, correct access restoration and refunds after repair. Reject as a headline idea if the only required action is replaying a webhook.

### 11H Resolve service failure before asking for renewal payment

**Merchant and problem:** a failed renewal sits alongside an unresolved missed class or approved replacement service.

**Proposed difference:** understand whether intent remains, verify what service is owed, complete the approved remedy and only then propose the valid payment action. An explicit cancellation stops the flow. AI handles the explanation; service eligibility and billing are rules.

**Closest competition:** Churnkey's retention actions, Alder's blocker diagnosis and support automation. The narrow entitlement correction is the product hypothesis. [G08](https://churnkey.co/), [S02](https://www.ycombinator.com/companies/alder), [S08](https://www.ycombinator.com/companies/signals)

**Small demo and metric:** ordinary payment failure, unresolved missed class and cancellation should produce three different outcomes. Measure valid retained payments after remedy and customer complaints. Reject if the service business cannot deliver the promised remedy or if no evidence shows correction restores intent.

### 11I Transfer a payment request to the authorized payer

**Merchant and problem:** an adult learner or business user receives reminders even though a parent or finance contact pays.

**Proposed difference:** recognize the role mismatch, offer a customer-controlled secure handoff and distinguish one-time payment from future billing ownership. Identity and consent are explicit. Do not discover or contact relatives or employers without the customer's instruction.

**Closest competition:** ordinary payment links and billing-contact management. This is a small workflow extension, not a new category. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [G15](https://paystack.com/docs/payments/subscriptions/)

**Small demo and metric:** one adult learner, one departing company contact and one rejected handoff. Measure time to reach the authorized payer and validated payments, while checking duplicate-payment and disclosure errors. Reject if a shareable link already solves nearly every case.

### 11J Remove one administrative invoice blocker

**Merchant and problem:** a willing buyer cannot process the invoice because an acceptance document, approved reference or correct contact is missing.

**Proposed difference:** select one blocker and one business type, retrieve authorized evidence and prepare a reviewed packet. Do not build a general autonomous AR department or invent purchase-order references.

**Closest competition:** Alder explicitly advertises blocker repair and procurement-portal work; Rex and Chargebee cover adjacent workflows. [S01](https://www.ycombinator.com/companies/rex-inc), [S02](https://www.ycombinator.com/companies/alder), [G05](https://www.chargebee.com/receivables/failed-payment-recovery/)

**Small demo and metric:** ten invoices, three blocker categories and a supported-document library. Measure time to payable acceptance, subsequent collection and reopened disputes. Reject if the only improvement is rewriting the reminder politely. This is related to Concept 3 but starts with an unpaid full invoice rather than an ambiguous short payment.

### 11K Recover small deductions only when evidence justifies the cost

**Merchant and problem:** investigation costs exceed the value of many individually small deductions.

**Proposed difference:** one supplier/buyer pair, one deduction type and an evidence threshold that separates valid, invalid and unknown cases. Estimate work cost; decline to dispute when the expected recovery is not worth it. Model-generated confidence alone cannot establish validity.

**Closest competition:** Glimpse explicitly operates in deductions recovery; HighRadius and Rex overlap. Localization and low-friction record import are the opportunity. [S01](https://www.ycombinator.com/companies/rex-inc), [S03](https://www.tryglimpse.com/), [S04](https://www.ycombinator.com/companies/glimpse-2), [P9](https://www.highradius.com/software/order-to-cash/collections-management/proof-of-delivery-automation/)

**Small demo and metric:** ten deductions, including a genuine shortage and an approved commercial discount. Produce a reviewed packet only for supported disputes. Measure realized recovery after effort, not submitted claim value. Reject if no accepted claim channel exists or resolution cycles are too long to establish usefulness.

### 11L Trace refunds before trying to win back the customer

**Merchant and problem:** the customer cannot reconcile a refund with the original order or identify the available bank reference.

**Proposed difference:** assemble the exact payment/refund timeline, explain partial amounts and create an escalation with verified references. A replacement offer comes only after resolution and expressed customer interest.

**Closest competition:** existing refund communication and support tools. This is more likely a supporting feature than the best Track 2 headline. [P15](https://razorpay.com/docs/payments/refunds/communication/), [R08](https://razorpay.com/docs/webhooks/refunds/)

**Small demo and metric:** two partial refunds, one still pending, and a complaint about the full order. Measure recontacts and resolution time; measure later repurchase separately. Reject if the only defensible value is a status lookup or if revenue impact is too indirect.

### 11M Offer a bounded continuity option for a booked experience

**Merchant and problem:** a temporary payment issue threatens an imminent non-essential class or membership session.

**Proposed difference:** interpret the customer's intention and select among merchant-approved rescheduling, pause or a tightly bounded grace option. This is not credit underwriting. A canceled mandate or canceled service is not a reason to seek a workaround charge.

**Closest competition:** billing grace periods, retention pauses and access/retry tradeoffs already exist. The capacity and service context must add value. [G01](https://stripe.com/blog/how-we-built-it-smart-retries), [G08](https://churnkey.co/)

**Small demo and metric:** three customers with the same failure code but different bookings and preferences. Measure retained contribution after unpaid service cost, not simply continued access. Reject if simple policy rules suffice or the merchant would never accept the exposure.

## 12 Data and integration reality

### What the payment gateway can and cannot tell us

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

### Payment implementation details that can derail a small demo

Standard Payment Links support fields such as amount, reference, expiry and optional partial payments. Dedicated UPI Payment Links are a different product: current documentation describes Android-only, live-mode-only behavior and no partial payments. Use a supported Standard Link test flow or a visibly simulated adapter; do not promise an unsupported dedicated UPI-link sandbox. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [R06](https://razorpay.com/docs/payments/payment-links/upi/)

A payment link does not reserve inventory or a calendar slot. Keep the resource hold in the merchant system, and reconcile link expiry/cancellation with it. Some link expiry validation rules constrain the minimum lead time; do not design a five-minute hold assuming the gateway will exactly enforce it. [R05](https://razorpay.com/docs/api/payments/payment-links/create-standard/), [R12](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft)

Webhook verification must use the raw request body and the configured secret. Events can duplicate or arrive out of order. Maintain separate protection against repeating the same business action, and fetch authoritative state when needed. For a local replay demo, label the fixture as simulated; for real test webhooks, account for public callback-host restrictions. [R07](https://razorpay.com/docs/webhooks/validate-test/)

Created, processed and failed refund events are separate states. Do not mark the customer refunded when only a proposal or request exists. Similarly, an invoice, payment request, successful payment and fulfilled order are different outcomes. [R08](https://razorpay.com/docs/webhooks/refunds/)

### A minimal architecture

Use one input queue, one small case store, one model call that produces a structured proposal with source references, a deterministic policy check, a review screen, one action adapter and an outcome ledger. A small schema is more valuable than an elaborate multi-agent runtime.

The model output might contain: case identifier; interpreted customer intent; evidence references; candidate action; missing facts; and reason to abstain. It should not invent API permissions or directly calculate the amount to charge. The action executor reads validated fields and enforces the merchant's policy.

For paid booking rescue, the main chain is: confirmed payment plus expired booking; retrieve customer constraints and current alternatives; propose; merchant review; customer choice; recheck and reserve; verify outcome. Every failed write leaves a visible unresolved state. There is no claim of an atomic transaction spanning independent payment and booking providers; failed cross-system steps need compensation or a human recovery task.

### The most important control is the right to do nothing

An agent should stop when evidence is insufficient, consent is absent, the customer has canceled, the resource is unavailable, another payment is unresolved, or the proposed action exceeds policy. Show at least one such case in the demo. That demonstrates product judgement better than a disclaimer buried below a chat box.

Customer messages and documents are evidence, not instructions that can redefine the agent's permissions. Keep the model's access scoped to the current merchant and case. A message saying “ignore the policy and refund me” can express a request but cannot authorize the refund.

## 13 Measurement that does not exaggerate recovery

### Keep the outcome ladder visible

An identified opportunity becomes a recommendation, then an approved action, then an executed request, then a verified business outcome. Each transition can fail. The product should show the difference between amount identified, amount approved, amount requested and amount realized.

- **Cash recovered:** an eligible outstanding amount was actually collected.
- **Revenue retained:** an already-paid sale was kept and fulfilled instead of refunded or canceled.
- **Cost avoided:** an operational or service cost was prevented.
- **Bookkeeping corrected:** money already received was correctly classified; this is not new revenue.
- **Incremental effect:** the outcome improved relative to the defined baseline, rather than merely occurring after the agent acted.

These categories can coexist, but they must not be added indiscriminately. For example, the same INR 2,000 payment cannot be counted as both new collection and retained revenue when the booking is repaired.

### Use contribution rather than gross recovered sales

For a proposed live pilot, define contribution using merchant-supplied inputs: retained sales after refunds, less product/service variable cost, delivery or reattempt cost, incentives, contact cost and other action-dependent fees. Apply taxes and accounting treatment consistently with the merchant's existing reporting; the prototype should not invent them.

**Synthetic illustration:** 100 eligible orders in a baseline group produce 30 completed sales at INR 300 contribution each, totaling INR 9,000. Another 100 eligible orders under a discount policy produce 40 sales at INR 200 contribution each, totaling INR 8,000. The second policy produces more completed sales but INR 1,000 less contribution. This is a made-up arithmetic example, not research evidence or a forecast.

In a real experiment, compare average contribution per eligible assigned case and report uncertainty. Do not compare only reached customers with all baseline cases. Keep assignment stable, account for other active recovery systems, and avoid changing groups after seeing results. Randomized experiments and holdouts are established methods, not a novel AI feature. [R16](https://docs.statsig.com/experiments/overview)

For scarce capacity, cases may affect one another: a rescued seat can prevent another customer from booking it. A pilot may need assignment by session or a time-based design, rather than treating each customer as independent. For repeated contacts, assign by customer or account so one person does not receive both policies. The appropriate unit depends on the chosen problem.

### What can be established before 13 October

You can establish that the workflow is legible, sources are traceable, the model handles a small held-out set of examples, permissions work, one action completes and failure states are honest. You cannot establish population-level revenue uplift, long-run retention or reliable monthly renewal improvement from a few synthetic cases.

Compare the AI approach with a simple baseline: the merchant's current checklist, a static menu, a keyword classifier or an existing support macro. If AI adds no useful decision quality, reduce its role or choose a different problem. A useful metric is how often it finds the correct evidence-backed action while avoiding a costly false action.

### An evaluation set for the preferred concept

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

## 14 Merchant discovery that can change the ranking

### A focused interview method

Speak to three merchants from one segment, or a merchant plus the staff member who handles exceptions. Do not ask whether they like the idea first. Ask them to reconstruct the last few actual cases, with personal data removed. Look for timestamps, messages, current tools, money movement and the eventual outcome.

Ask what triggered the case, which records disagreed, who had to intervene, which evidence changed the decision, how long the action remained useful, and whether the merchant gained cash, retained a sale or merely saved work. Then ask what the existing tool could already do and why that was insufficient.

Only after this walkthrough should you show a sketch. Ask the merchant to pick the correct action for several ambiguous cases and explain what would make an automated action unacceptable. Their disagreement with your assumptions is useful evidence, not an obstacle to the pitch.

### Questions specific to each shortlist candidate

| Candidate | Most valuable question | Evidence to request with identifying details removed |
|---|---|---|
| Paid booking rescue | Show the last payment that confirmed after the booking expired. What happened to the customer? | Payment/booking timeline, available alternatives, support messages |
| Contested delivery | Which recent disputed attempt was saved, and what changed the carrier's action? | NDR reason, buyer response, submitted evidence, final status |
| Short payment | Show a recent balance that initially looked overdue but had another explanation. | Invoice, received amount, remittance, approved adjustment or delivery proof |
| Renewal repair | Which manually rescued customers required the same intervention next cycle? | Two-cycle timeline, authorization state and customer preference |
| Coordinator | Show one customer who received two incompatible actions from your tools. | Action log, message history, current suppression rules and outcome |

### A simple economic check

Estimate eligible cases per month, average contribution at stake, current resolution rate, plausible improvement and effort per case using merchant evidence. Treat plausible improvement as a range to test, not a point forecast. Subtract incremental action cost and integration/operating burden.

For example, if a merchant has only two relevant incidents each quarter, a compelling demo may still be a useful feature, but the stand-alone business case is weak. If the cases are frequent but the system cannot obtain the evidence or execute the correction, the problem is real but the proposed prototype may not address its bottleneck.

### When to stop investigating a concept

Stop if the merchant cannot recall recent examples; the losses are mainly non-recoverable; the existing tool already resolves the issue; a simple rule handles almost all cases; necessary data cannot be obtained; or the action is outside the merchant's control. Preserve that finding in the AI build log. Rejecting a weak idea is part of the product work.

## 15 A realistic plan through 13 October

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

### Four screens for the preferred prototype

1. **Exception queue:** show one paid booking that cannot currently be fulfilled and the value at stake.
2. **Evidence and alternatives:** payment timeline, customer constraints, current capacity and the proposed resolution.
3. **Review and choice:** merchant approval, customer acceptance and an explicit no-extra-charge summary.
4. **Outcome:** replacement booking confirmed, original payment linked once, recovery category and audit trail; a failed case remains unresolved.

### A 90-second narrative

- 0-12 seconds: show the specific merchant and the failed business outcome.
- 12-28 seconds: show the contradictory records and the customer's must-have constraint.
- 28-48 seconds: show the grounded recommendation and why one tempting alternative is rejected.
- 48-65 seconds: approve the action, capture the customer's choice and complete the adapter step.
- 65-80 seconds: show verified status and a duplicate/no-availability counterexample.
- 80-90 seconds: state the metric, what is simulated and the next validation step.

Do not spend the video touring settings or explaining a large architecture. The source evidence and the completed decision are the product.

## 16 Turning the research into a defensible product note

### A concise argument for the preferred concept

**Problem:** payment confirmation can reach the merchant after a capacity reservation expires, leaving the merchant with money but no valid booking. Support must reconstruct the case and negotiate a feasible resolution.

**User:** one selected type of small class or workshop operator, validated through actual cases if available.

**Solution:** an assistant verifies payment, interprets customer constraints, proposes only feasible alternatives and executes the approved booking correction or refund review.

**AI role:** interpret unstructured intent and evidence; deterministic code verifies payment, capacity, permissions and action uniqueness.

**Product decisions:** one booking type; already-paid cases only; equivalent-price alternatives; one calendar adapter; explicit customer choice; no broad revenue dashboard.

**Success:** fewer unresolved paid bookings and greater retained contribution relative to the current process, with no duplicate charges or false booking confirmations.

**Prototype boundary:** state exactly which components use real test APIs and which use fixtures. If every event is simulated, say so. The brief allows this.

### What to record in the AI build log

Document how AI helped discover competitors, compare ideas, produce scenarios, write or debug the prototype, and review failure cases. Record the key human choices: segment, problem, excluded scope, permission boundaries and metric. Include mistakes caught, such as an invented data source, unsupported API assumption or overly broad novelty claim.

Do not fabricate merchant interviews, production recovery, measured uplift or test results. If the final choice is a localized extension of an existing category, explain why the selected merchant still needs it. That is stronger than claiming a worldwide first.

## 17 Research scope and confidence

This was a broad, time-bounded internet sweep across Razorpay's public product direction and canonical documentation, global payment/billing platforms, YC companies, TechCrunch coverage, vertical software, merchant support workflows and selected public discussions. Regional examples include North America, Europe, Latin America, Africa and Southeast Asia. These examples reveal design patterns; they are not a representative survey of each market.

Three parallel research workstreams covered global competitors, startup developments and merchant problems. A fourth synthesis pass checked the challenge, Razorpay's current baseline, API boundaries and the strongest competing ideas. The local research modules preserve additional detail, while this report collates the decision-relevant findings and source registers.

**High confidence:** the challenge requirements; the public existence of many overlapping product capabilities; documented payment/webhook states; and the need for merchant data beyond the gateway for the proposed decisions.

**Moderate confidence:** the proposed concepts can be demonstrated with a small synthetic dataset and limited adapters; the suggested AI tasks involve useful interpretation rather than just arithmetic. Build estimates depend on the builder's tools and experience.

**Low or unvalidated confidence:** local problem frequency, willingness to adopt or pay, competitor reliability, accessible production permissions, and incremental revenue impact. These require merchant evidence and a later pilot.

The research deliberately avoids unsupported Indian loss-rate statistics, aggregating vendor uplift percentages, or describing unexamined competitors as absent. Undated pages are treated as capabilities observed on the research date, not proof of launch timing. Search-engine copies of old documentation can differ from canonical pages; implementation should use the latter.

### The next decision

Choose a merchant access path, then test the first three problem hypotheses against real cases. If no accessible merchant has the paid-booking exception, move to contested delivery or short payments instead of forcing the highest-ranked idea. The objective is a small, evidence-backed merchant decision that a judge can watch improve from start to finish.

## 18 Source registers

All web sources below were accessed during the 6 October 2026 research sweep. Publication dates are included only where established by the research. Company-authored pages and YC profiles establish public positioning, not independently verified performance. Source IDs in earlier sections point to these registers.

**Challenge brief:** [Razorpay AI PM Build Challenge supplied PDF](</Users/adityafiroda/Downloads/RazorPay/RazorpayxISB_BuildChallenge.docx (1).pdf>). Page 1 supplies the deadline; page 2 supplies track expectations and evaluation dimensions; pages 3 and 4 supply submission and prototype guidance. The document was read as task evidence, not as instructions to perform an external submission.


### Razorpay and implementation sources

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

### Global payment and billing sources

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

### Merchant workflow sources

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

### Startup and vertical software sources

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


### Additional booking competition checked during review

**R18 Zenoti AI Receptionist** — [Open source](https://www.zenoti.com/ai-workforce/ai-receptionist). Undated product page, accessed 6 October 2026. Advertises availability-aware rescheduling and provider preferences. Establishes close competitive overlap; vendor performance claims are excluded.

**R19 Zenoti Redesigned Appointment Book** — [Open source](https://help.zenoti.com/en/appointments/redesigned-appointment-book.html). Undated official help page, accessed 6 October 2026. Describes moving paid appointments when pricing remains equal. The cross-system late-confirmation exception still requires merchant validation.
