# Razorpay platform and prototype boundaries

Research date: 6 October 2026. These are public product/documentation observations, not confirmation of account access or a working integration.

## Challenge brief

The supplied four-page PDF is the authority for this specific ISB challenge. Track 2 is Recover and Grow with AI, suited to AI Product Manager. The deadline is 13 October 2026 at 11:59 PM IST. It requests a one-page product note, 90-second video, demonstrable prototype and AI build log. Clickable prototypes and synthetic data are allowed; assumptions and outside tools should be disclosed. Evaluation emphasizes problem clarity, merchant understanding, prioritization, AI-assisted execution and communication. Page 2 requires a signal, AI justification, action, merchant control, learning loop, failure handling and business outcome. Page 4 explicitly allows extensions and adjacent opportunities with meaningful improvement. This report researches options; it does not submit or build an entry.

## Sources and observations

### R01 Agent Studio
https://razorpay.com/agent-studio/
Observed 6 October 2026. Razorpay advertises cart recovery, COD confirmation, KYC, dispute response, feedback, mandate activation, loan and subscription recovery. It describes review-first permissions and action validation. Public listings establish overlap, not measured effectiveness or universal availability. Do not pitch another general recovery bot as novel.

### R02 Agentic Platform
https://razorpay.com/blog/razorpay-agentic-platform/
Published 12 March 2026. Advertises reconciliation from uploaded statements, complaint screenshot interpretation, failed-payment fixes including payment links, and automated high-value recovery flows. A screenshot-to-link flow is already within the public product direction.

### R03 RAY on WhatsApp
https://razorpay.com/blog/meet-ray-your-always-on-ai-account-manager-now-live-on-whatsapp/
Published 2 September 2026. Advertises conversational payment management, bulk failed-payment links, payment anomaly diagnosis and background corrective actions. WhatsApp, voice input and payment diagnostics are weak differentiators by themselves.

### R04 Payments webhook events
https://razorpay.com/docs/webhooks/payments/
Canonical docs accessed 6 October 2026. Payment event payloads expose identifiers, amounts, state, method and error fields. Events are snapshots. Captured payment and paid Razorpay order do not prove that the merchant fulfilled the product or service; that requires merchant records.

### R05 Create a standard payment link
https://razorpay.com/docs/api/payments/payment-links/create-standard/
Canonical docs accessed 6 October 2026. Standard links support amount, reference, expiry, optional partial payments and notification controls. The API documentation includes expiry validation constraints; do not assume arbitrarily short holds can be implemented through a payment link alone. Revalidate access and parameters while building.

### R06 UPI Payment Links
https://razorpay.com/docs/payments/payment-links/upi/
Canonical docs accessed 6 October 2026. Dedicated UPI Payment Links are described as Android-only, live-mode-only, without partial payments. They differ from Standard Payment Links that can offer multiple payment methods. For a prototype, use a supported test-mode flow or visibly simulated completion instead of promising a dedicated UPI-link sandbox.

### R07 Validate and test webhooks
https://razorpay.com/docs/webhooks/validate-test/
Canonical docs accessed 6 October 2026. Validate raw-body signatures, deduplicate using the event ID and handle events out of order. Public callback host restrictions exist. The prototype should have an app-level action ledger as well as event deduplication. A payment request is not evidence of successful collection.

### R08 Refund events
https://razorpay.com/docs/webhooks/refunds/
Canonical docs accessed 6 October 2026. Refund created, processed and failed events are distinct. A proposed refund, created refund, and confirmed processed refund should not collapse into the same demo state.

### R09 Baymard checkout research
https://baymard.com/blog/reduce-cart-abandonment
Published 19 May 2026. Primary usability research discusses fees, account creation, form friction and delivery expectations. It supports investigating the reason for abandonment rather than assuming every abandoned cart is recoverable. Do not transfer its shopper statistics to Indian SMEs or treat them as addressable revenue.

### R10 Gorgias Shopify actions
https://docs.gorgias.com/en-US/ai-agent-actions-make-changes-to-shopify-orders-757792
Accessed 6 October 2026. Advertises cancellation, item replacement with stock checks, refunds for cheaper replacements and handoff for additional payment. Documents limits in propagating changes to fulfilment systems. Generic AI exchanges and order edits already exist; a possible extension is coordinated repair across payment, fulfilment and a specific customer promise.

### R11 Gorgias action configuration
https://docs.gorgias.com/en-US/create-an-action-for-ai-agent-567325
Accessed 6 October 2026. Supports customer confirmation, connected-app steps and conditional actions. Approval and multi-tool execution are expected product capabilities, not novelty claims.

### R12 Shopify draft inventory reservation
https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft
Accessed 6 October 2026. Draft-order inventory can be reserved until a chosen expiry if inventory is tracked. A payment link alone cannot reserve inventory. Integration permission and race handling remain separate implementation work.

### R13 Fresha upfront payments
https://www.fresha.com/help-center/knowledge-base/payments/613-payments-policies-overview
Accessed 6 October 2026. Booking deposits and no-show/cancellation payment policies are established features. A deposit reminder is not a distinctive idea.

### R14 Fresha calendar
https://www.fresha.com/help-center/knowledge-base/calendar
Accessed 6 October 2026. Existing automated waitlist updates and scheduling features limit the novelty of an ordinary cancellation-refill agent. Investigate unstructured preferences and cross-system booking/payment failures instead.

### R15 Narvar return overview
https://support.narvar.com/hc/en-us/articles/11307520101651-Narvar-Return-Overview
Accessed 6 October 2026. Return-to-exchange conversion, return policies and reasons analytics are established products. No vendor uplift percentages are adopted as forecasts for an ISB prototype.

### R16 Statsig experiments
https://docs.statsig.com/experiments/overview
Accessed 6 October 2026. Defines experiments as randomized comparisons. The research recommendation is to compare eligible recovery cases under the current process versus the proposed process, measuring incremental net contribution rather than attributing every subsequent payment to AI.

### R17 Razorpay Recon
https://razorpay.com/newsroom/razorpay-pos-launches-industry-first-ai-powered-razorpay-recon-to-automate-reconciliation-for-businesses-boosting-financial-operations-efficiency-by-80/
Published 17 December 2024. Public announcement describes online, offline and custom reconciliation. Do not present ordinary payment-to-bank matching as a missing Razorpay capability. Vendor efficiency claims are not independent evidence.

## Important inference boundaries

- A public Agent Studio listing is not proof of an open SDK, public build interface or account entitlement. A standalone companion prototype is sufficient for the challenge.
- Gateway data cannot establish customer intent, scope approval, stock, margin, delivery truth, complaint resolution or service access without other merchant-authorized records.
- Failure reasons should be represented at the documented resolution. Do not infer a customer's private bank balance or creditworthiness from a failed payment.
- Basic rules should own arithmetic, permissions, action limits, state transitions and duplicate prevention. AI earns its place by interpreting uncertain evidence and proposing a grounded decision.
- Financial treatment such as whether a deduction is valid remains a merchant/accountant decision. The prototype can classify supplied evidence without calculating legal tax obligations or inventing liabilities.
