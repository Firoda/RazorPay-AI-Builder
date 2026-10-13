# SeatSaver build timeline, 3 to 13 October 2026

This is the detailed, day-by-day companion to the main [AI Build Log](AI_build_log.md). Each day records the premise, the objective, the approach, how AI was used, what went wrong and what I changed.

**Builder:** Aditya Firoda · **Track:** 2, Recover and Grow with AI · **Period:** 3 to 13 October 2026

SeatSaver rescues a booking when a customer's payment is confirmed late, after their seat has already been resold. This log records how the product was built over eleven days by one person, which AI tools were used at each stage, and where the key decisions were mine.

## Tools used

- **Claude (Claude Code):** research synthesis, product framework, system design, backend and frontend code, test runs, documentation.
- **[Research tool used on 3 to 5 October]:** reading and summarising public sources, reviews and competitor material.
- **Gemini 3.8 Flash (Google AI Studio):** the AI inside the product. It reads the customer's message, ranks feasible sessions and drafts the offer.
- **Google AI Studio:** first deployment of the prototype.
- **OpenAI image generation:** the photographs of the characters and the studio.
- **Google Flow (Veo):** the three short video clips that open the story.
- **Razorpay test mode:** real test payments with manual capture, so the money flow is genuine rather than mocked.

---

## 3 October · Understanding the brief and the platform

**Premise**
- The brief for Track 2 asks for an AI experience that finds a measurable revenue opportunity for merchants and acts on it, not a dashboard that only explains one.
- I had a broad interest in payment recovery but no specific problem yet.

**Objective**
- Understand exactly what the brief rewards, and map what Razorpay already offers so that I do not rebuild something that exists.

**Approach**
- Read the brief line by line and turned its seven Track 2 questions into a checklist. Every later decision was tested against it.
- Mapped Razorpay's current AI products: Agent Studio, the Agentic Platform and RAY on WhatsApp. Agent Studio already lists payment retry, drop-off recovery, cart recovery and dispute handling.
- Studied the payment mechanics that any idea would depend on: webhooks, payment links, refunds, reconciliation, and how a late-authorised payment behaves.
- Set a rule for myself early: if Razorpay already ships it, I need a sharper problem, not a better chatbot.

**AI leverage**
- I used AI to read and summarise seventeen official and third-party sources into one note on platform boundaries: what the gateway can see, what it cannot, and what a prototype can honestly claim.
- This gave me a complete picture of the landscape in a single day, which let me spend my own time on judgement rather than on reading documentation.

**Missteps**
- My first instinct was a general "failed payment recovery agent". The platform review showed this space is already covered by Razorpay itself.
- I initially assumed I could build on top of Agent Studio. Its public listing does not offer an open build interface.

**Recalibration**
- Moved from "recover failed payments" towards "recover a sale where the money has moved but the outcome is unclear".
- Decided the prototype would be a standalone companion product that uses real Razorpay test APIs, rather than an Agent Studio extension.

**Output**
- `research/platform_findings.md`

---

## 4 October · Finding real merchant problems

**Premise**
- I knew which areas were crowded. I now needed problems that merchants actually face and that existing tools handle poorly.

**Objective**
- Build a list of concrete merchant problems with evidence behind each one, and understand them from both the merchant's and the customer's side.

**Approach**
- Collected merchant and customer complaints from public reviews and forums across platforms. [Add the platforms, volume and main themes from the reviews research notes.]
- Grouped the evidence into seven problem areas, each describing a sale where the customer's intent still exists but the operational state is unclear:

| # | Problem area | What goes wrong | Evidence found |
|---|---|---|---|
| 1 | Contested delivery | The courier marks "customer unavailable", the buyer says nobody came, and the parcel heads back to the seller | Shiprocket's support workflow for disputed delivery reasons |
| 2 | Late-paid order | The payment is confirmed after the booking or stock reservation has expired | Razorpay's payment timeout guide; Xendit's delayed-webhook documentation |
| 3 | Short-paid invoice | A B2B buyer pays less than the invoice, and nobody knows whether the gap is a valid deduction | Accounting product documentation |
| 4 | Cancelled service slot | A slot frees up but is hard to refill with a suitable customer | Shipped waitlist products such as Zenoti |
| 5 | Unavailable exchange | The customer wants an exchange, but the size or colour is out of stock, so they take a refund | Return platforms such as ReturnGO and Loop |
| 6 | Subscription continuity | A renewal payment is recovered once, but the underlying mandate problem remains | Gateway subscription documentation |
| 7 | Refund that loses the next sale | A slow or unclear refund damages the customer's trust | Refund communication documentation |

- For each area I wrote down the trigger, the merchant's current workaround, the data needed, and whether AI would genuinely add something a rule could not.
- Wrote an evidence standard before drawing conclusions: documented fact, vendor claim, anecdote and hypothesis are kept separate and labelled.

**AI leverage**
- AI helped me organise a large amount of scattered material into a consistent structure: problem statement, evidence, workaround, signals, why AI, closest existing solution, and risks.
- It also checked official documentation for each problem, which is how I found that both Razorpay and Xendit document the "payment confirmed after the order expired" case.

**Missteps**
- Many vendor pages quote failure or return rates without a clear sample or method. I nearly used one of these figures as a market size.

**Recalibration**
- Removed every India-wide statistic I could not verify. The problem would be justified by documented mechanisms and real complaints, and the opportunity size would be stated as a hypothesis to test.

**Output**
- `research/merchant_problems.md` and my reviews research notes.

---

## 5 October · Studying competitors and ranking the ideas

**Premise**
- I had seven problem areas and a growing list of ideas. Before choosing, I needed to know who else was already solving each one, in India and abroad.

**Objective**
- Separate the ideas that are already commoditised from those where a narrow, well-designed product could still stand out, and produce a ranked shortlist.

**Approach**
- **Mapped what is already commoditised.** Each layer of payment recovery already has strong players, so building in these layers would not stand out:
  - Retry timing: Stripe Smart Retries, Recurly, Butter Payments, GoCardless.
  - Routing and acceptance: Adyen, Checkout.com, PayPal, Primer.
  - Customer outreach after a failure: Yuno NOVA, Churnkey, Gravy.
  - Subscription retention: Chargebee, Churnkey.
  - Backup payment methods: dLocal, Xendit.
- **Studied other markets.** North America optimises the customer relationship, not only the authorisation. Europe treats recovery as an optimisation problem with several goals at once. Latin America's instant payment rails change the workflow. In Africa, failure handling differs widely between providers. Southeast Asia showed the most useful lesson: a payment can succeed while the order itself is no longer viable.
- **Reviewed fifteen startups** that set the current baseline, including Rex, Alder and Glimpse (finance exceptions and deductions), FlyCode (subscription retries), Signals, REVER, ReturnGO and Loop (returns and post-purchase), Claimlane (warranty claims), and Zenoti (filling cancelled slots). The conclusion was that "find the blocker, then act" is already a known pattern, so the distinctiveness had to come from a narrower decision.
- **Listed the ideas.** Combining the merchant problems, the international patterns and the startup review, I ended up with about ten distinct ideas:

| # | Idea | One-line description | Main reason it did or did not make the cut |
|---|---|---|---|
| 1 | Paid booking rescue | Payment confirmed after the seat was resold; find a seat the customer will actually take, then capture | Clear conflict, verifiable action, strong demo |
| 2 | Contested delivery rescue | Gather evidence and arrange a reattempt when courier and buyer disagree | Real workflow, but cannot guarantee the physical reattempt |
| 3 | Short-payment resolver | Work out why an invoice was short-paid before chasing the balance | Good use of AI, but drifts into accounting |
| 4 | Durable renewal repair | Fix the next renewal, not just today's failed payment | Could collapse into a simple "update card" flow |
| 5 | Recovery coordinator | Stop different automations from contacting the same customer in conflicting ways | Unmet need weakly evidenced |
| 6 | Fulfilable basket recovery | Rebuild a cart when items are no longer available | Needs realistic inventory and order data |
| 7 | Authorised payer handoff | Move a payment request to the person who actually pays | Easy to demo, but probably infrequent |
| 8 | Cancelled slot backfill | Refill a freed slot with a suitable waiting customer | Zenoti and others already do this |
| 9 | Return intent repair | Offer the exchange the customer wanted instead of a refund | Return platforms are close competitors |
| 10 | Unbilled approved extras | Find extra work that was approved but missed on the final bill | Strong if merchants confirm it; competitors exist |
- **Ranked the ideas** on four criteria: the problem is documented, AI is genuinely needed, the outcome can be measured, and a convincing demo is possible within a week. The top five were:

| Rank | Concept | Why it deserves attention | Main weakness |
|---|---|---|---|
| 1 | Paid booking rescue | Concrete conflict between money and seat, customer constraints, verifiable action, strong 90-second story | The frequency may be low; rules may solve many cases |
| 2 | Contested delivery rescue | Documented workflow with buyer evidence and courier action | Cannot guarantee the reattempt; existing delivery tools are close |
| 3 | Short-payment resolver | Messy evidence gives AI a clear role and avoids false demands | Accounts-receivable competition and scope creep |
| 4 | Durable renewal repair | Memorable distinction between this invoice and the next cycle | Could reduce to updating a payment method |
| 5 | Recovery coordinator | Makes "stop" and "hold" decisions visible | Weak evidence that merchants want it |
- Prepared a short merchant interview script designed to disprove a weak idea quickly, for use in validation.

**AI leverage**
- AI compared dozens of companies and patterns side by side and drafted idea cards in a consistent format. This let me evaluate a much wider field than I could have covered alone in the time available.
- It also produced a ranked shortlist with the reasoning for each position, which I then challenged and reordered.

**Missteps**
- The idea list kept growing. With variations it went beyond ten, and breadth started to replace focus.
- Several public projects already used the same pattern of webhook, then AI, then payment link. An idea built on that pattern alone would not be distinctive.

**Recalibration**
- Stopped adding ideas and cut the list to a ranked top five.
- Wrote a decision rule for the next day: choose the highest-ranked idea for which I could get real merchant examples, and if none were available by 7 October, choose the idea that gives the clearest honest demonstration with synthetic data.
- Agreed that originality had to come from the problem and the decision the agent makes, not from the chat interface.

**Output**
- `research/global_competitors.md`, `research/startup_frontier.md`, and the consolidated report `output/Razorpay_Recover_and_Grow_Research.md`.

---

## 6 October · Choosing the segment and the problem

**Premise**
- I had a ranked shortlist of five concepts and an evidence base behind each one. The day was for making the main product choice.

**Objective**
- Move from a broad problem space to one user segment and one pain point that I could defend in a pitch.

**Approach**
- **Understanding the problems.** I had each of the five concepts explained back to me in plain language with a worked example. If I could not explain an idea simply, I treated that as a warning sign.
- **Segmenting users.** Grouped merchants by how their revenue gets stuck: capacity-limited bookings, e-commerce deliveries, B2B invoices and subscriptions.
- **Picking a segment.** Chose small, capacity-limited experience businesses such as pottery studios, workshops and classes. Their seats are perishable, capacity is small, customers pay by UPI, and the owner usually runs operations alone.
- **Generating pain points.** Mapped the journey of a customer, Priya, booking at a studio, Clay & Co.: the app says the payment failed, her bank says it was debited, her seat is resold, and the bank confirms the payment hours later.
- **Picking one pain point.** Ranked five pain points: lost revenue from willing customers, the risk of charging wrongly, the owner's time, unsuitable offers, and the silent three-day deadline. I chose the first one, a late-authorised payment for a seat that has already been resold.
- Agreed on free tools only, with Gemini and Google AI Studio as the core stack.

**AI leverage**
- AI turned my choices into a full product framework in one sitting: personas, jobs to be done, a journey map, a problem statement, "how might we" questions, opportunity sizing and metrics.
- It also reviewed the official links from my research and surfaced items I had missed, including Razorpay's own AI article on RAY, which the brief refers to.

**Missteps**
- My first problem statement, "help customers whose payment failed", was too wide and overlapped with products Razorpay already has.
- Contested delivery and short-payment resolution both scored well, but each depends on systems I could not show honestly in a prototype: courier networks for one, accounting records for the other.

**Recalibration**
- Applied the decision rule from 5 October. Without merchant examples for delivery or invoicing, paid booking rescue was the strongest idea I could demonstrate end to end and honestly, with the market size stated as a hypothesis.
- Narrowed the problem to one precise situation: the money is authorised and held, the seat is gone, and Razorpay will refund automatically if nothing is done within three days.
- Reframed the product as a capture-or-release decision made on a three-day clock.

**Output**
- `01_Concept1_Product_Framework.md`

---

## 7 October · Designing the solution

**Premise**
- The problem was fixed. I now needed to choose the solution, set its limits and design it in enough detail to start building the next morning.

**Objective**
- Compare solution options, choose one, and define exactly what the AI may do, what code must do, and how I would prove that it works.

**Approach**
- **Listing solutions.** Compared five options: refund automatically (today's default), capture every late payment, a fixed rule that offers the next free slot, a chatbot that explains the situation, and an agent that finds a seat the customer would actually take.
- **Applying the "why AI" test.** Split every step between code and AI. Facts such as the amount, seat availability, price and deadline stay in code. AI handles only what a rule cannot: reading free-text, often mixed Hindi and English messages, and ranking options by fit.
- **Picking the solution.** Chose the agent, SeatSaver, with four non-negotiable rules: same price only, reserve the seat before capturing the money, the AI never writes amounts, and the merchant reviews every offer by default.
- **Planning the proof.** Designed a golden test set of thirty cases with a held-out split, including Hinglish messages, a customer who asks to stop, a duplicate payment and an attempt to trick the AI. A fixed-rule baseline would be measured on the same cases.
- Scoped the build with MoSCoW so that the core journey would be finished before anything optional.

**AI leverage**
- From these decisions, AI produced a complete build plan in one sitting: architecture, data model, state machine, API endpoints, three prompts, guardrails, screen designs, synthetic fixtures and the thirty-case test set.
- This meant the next day could start with writing code rather than with design work.

**Missteps**
- The first design allowed the AI to choose from the entire class calendar. That gave it room to suggest sessions at a different price or with no seats.
- An early draft let the AI write the offer message in full, including the amount and the date.

**Recalibration**
- Code now filters the sessions first, and the AI may only rank what code has already approved.
- Amounts and dates are inserted into the message by code. The AI writes only the wording around them.
- Review-first became the default, with automatic sending allowed only for patterns the merchant chooses to trust, matching how Razorpay's Agent Studio works.

**Output**
- `02_Concept1_Prototype_Build_Plan.md`

---

## 8 October · Building the engine and the money flow

**Premise**
- The design was complete and the repository was empty. I had a build plan, prompts and a thirty-case test set on paper.

**Objective**
- Have a working backend by the end of the day: a real Razorpay test payment, Gemini making decisions, and results measured against the test set, all before writing a single screen.

**Approach**
- Built the backend first. A demo that looks right but handles money wrongly is worse than no demo, so the engine had to be proven before the interface.
- Implemented the case state machine, the guardrails and an idempotency ledger, so that a repeated webhook or a double click can never capture or book twice.
- Created a Razorpay test account and set up manual-capture orders, so a payment stays authorised until SeatSaver decides. I completed a real test payment and confirmed that the capture worked.
- Moved Gemini to the paid tier once the free tier's daily limit started blocking test runs, but pinned the cheapest suitable model, Gemini 3.8 Flash, to keep costs under control.
- Ran the full development set against two baselines: a fixed rule that offers the next same-price slot, and doing nothing.
- Built the first version of the merchant dashboard in the evening, once the engine results were in.

**AI leverage**
- Claude wrote the engine, the Razorpay integration, the evaluation harness and the first frontend in one day, working from the decisions in the build plan.
- The evaluation harness compared SeatSaver with both baselines on every run, so I could see the effect of each change straight away rather than checking cases by hand.

**Missteps**
- I placed my Gemini API key in the example configuration file, which would have been committed. It was moved to the private local file before the commit.
- The model named in the plan had been retired for new users, and the free tier allowed only twenty requests a day. The first evaluation therefore ran across a chain of older fallback models and scored 42% on decision cases.
- Some Gemini calls took over a minute or failed outright during peak hours. These timeouts were initially counted as wrong answers, which made the results look worse than they were.
- The test card was declined inside the embedded browser, and the netbanking pop-up was blocked. The payment had to be completed in Chrome.

**Recalibration**
- Separated infrastructure failures from quality failures in the evaluation, so that a Google timeout can never be counted as a correct or incorrect decision.
- Set Gemini's thinking level to low and the timeout to 120 seconds. On the pinned model, the decision pass rate rose to 58%, with zero safety violations.
- Added a rule in code that refuses any Razorpay key that is not a test key, so live money can never be touched by accident.
- Chose not to rerun the timed-out cases that night. I would rerun them when demand was lower, at a fraction of the cost.

**Output**
- Commits `ac54864`, `33f5f49`, `d074b01` and `fff0d9d`; evaluation reports in `eval/results/`.

---

## 9 October · Measuring honestly, fixing the prompt, deploying

**Premise**
- The engine and the first dashboard worked, but the development results were mixed up with timeouts. I did not yet have numbers I could put in a product note.

**Objective**
- Produce honest accuracy figures, fix the failures that were real, and put the prototype online.

**Approach**
- Reran only the three cases that had timed out, early in the morning when demand was low. That brought the development set to 17 of 18 correct.
- Ran the held-out cases once, as an unseen test. Three of the four that received an answer were correct.
- Read both failures closely. In one, a customer asked for the premium glazing class and was offered the basic class instead of being passed to the owner. In the other, a customer asked for November and was offered October.
- Rewrote the prompt so that a named month, date or class type is treated as a must-have unless the customer says they are flexible.
- Added a safety net in code: if an offer contradicts something the customer named, the case goes to the owner instead of being sent.
- Retired the held-out case that had informed the fix, because it was no longer unseen. I wrote three new held-out cases before running them, and all three passed.
- Asked what else the submission needed beyond a working demo, and planned the product note, the video and this log.
- Deployed the prototype on Google AI Studio.

**AI leverage**
- Claude diagnosed both failures from the evaluation reports, wrote the new prompt, the code safety net and the new test cases, and reran only what was needed to keep costs low.
- Gemini in Google AI Studio migrated the project to its hosting runtime.

**Missteps**
- I had used a held-out case to guide a prompt fix. That case could no longer count as an unseen test.
- The AI Studio import introduced regressions: it deleted the dependency lockfile, hard-coded the server port, used a route pattern that crashes the server framework, and turned empty settings into zero-second timeouts.

**Recalibration**
- Set a rule for held-out discipline: prompts are tuned on development cases only, and any held-out case that informs a fix is retired and replaced before the next run.
- Fixed all four regressions and recorded the honest caveats next to the results: a small synthetic sample, one run per case, and version 2 rerun only on the most relevant cases.

**Output**
- Final figures: development set 17 of 18; new held-out cases 3 of 3; the fixed-rule baseline 0% with violations on every run; zero wrong money actions.
- Commits `b711f64`, `792a35f`, `2715104` and `437e209`; decision log in `backend.md`.

---

## 10 October · Reviewing the prototype as a judge would

**Premise**
- A working prototype was online. The engine was sound and the numbers were honest.

**Objective**
- Use the prototype the way a judge would on first contact, and decide whether it communicated the idea.

**Approach**
- Walked through the deployed demo as a first-time viewer with no background on late payments.
- Checked it against the brief's guidance for the video and prototype: show the product rather than explaining every detail.
- Listed every point where a newcomer would get lost: the queue assumed the viewer already understood late authorisation, the case page was dense, and the most important moment, reserving the seat before capturing the money, was easy to miss.

**AI leverage**
- I asked AI to review the demo against the judging criteria and list what a first-time viewer would not understand. This made the review systematic instead of relying on my own familiarity with the product.

**Missteps**
- I had optimised for feature completeness and correctness. The result was a product that worked but read like theory.

**Recalibration**
- Decided that the demo must tell the story first and then show the product: the viewer should feel the problem before seeing the solution.

**Output**
- A list of comprehension gaps, used to plan the redesign.

---

## 11 October · Designing the experience

**Premise**
- I knew what was wrong with the demo. I needed a structure that a judge could follow without any explanation from me.

**Objective**
- Design an experience in two parts, a short story and then a guided product walkthrough, and plan the visuals and the video.

**Approach**
- Split the demo into two portals. Portal 1 tells the story of Priya, Ritu, Rohan and Arjun. Portal 2 lets the viewer act as Ritu, the studio owner, in the real product.
- Decided that Portal 2 begins after the payment has already been made, so the story hands over cleanly to the product.
- Planned the characters' actions in the product as animations that call the real system, so the viewer watches a genuine rescue rather than a recording.
- Set the visual direction: realistic photographs of people, no text or logos inside images, and Razorpay's colours throughout.
- Sketched the 90-second video around the same structure.

**AI leverage**
- AI drafted the story beats and character descriptions, and compared storytelling formats such as scroll-driven pages and guided product tours. This gave me several fully formed options to choose from in the time it would take to outline one.

**Missteps**
- The first story outline ran to eleven scenes. It felt complete on paper but later proved too long for a judge's attention span.

**Recalibration**
- Ended the story on a deliberate question rather than an answer: "What if the money could still find her a seat?" That question leads directly into the product.

**Output**
- The plan that became `storyboard.md` and the image prompts the next morning.

---

## 12 October · Building the two portals

**Premise**
- The experience was designed. Everything had to be built in one day, so the next day could go to the video, the documents and the submission.

**Objective**
- Build Portal 1 (the story) and Portal 2 (the guided product) on top of the existing engine.

**Approach**
- Gave every visitor a private sandbox, so several judges can use the demo at once without affecting each other, and added a live AI panel that shows each real step as it happens.
- Built Portal 1 completely before starting Portal 2. I reviewed it scene by scene, rewrote unclear copy, added a prompt to keep scrolling, and replaced the original colours with Razorpay's palette and official logo.
- Generated the photographs with OpenAI and reviewed each one for consistency. I rejected one image in which a background character looked like Priya.
- Built Portal 2 as a guided tour. The viewer clicks through the product, while Ritu's approval and Priya's booking play as animated cursors that call the real system.
- Made guardrails the climax of the tour. The AI is working with money, so the viewer should finish by seeing the limits it cannot cross.
- Noticed a gap in the business logic: Razorpay handles payments but does not manage the merchant's seats. I added a section showing that SeatSaver needs only three calls to the merchant's booking system (check availability, hold a seat, confirm or release) and falls back to the owner's own check when there is no system.

**AI leverage**
- Claude built both portals in a single day: the story scenes, the guided tour, the animations, the live AI panel and the guardrails chapter, all connected to the real engine.
- OpenAI generated the full set of character and studio photographs from one shared prompt, which kept the cast consistent across scenes.

**Missteps**
- The guided tour originally ended before the guardrails page, leaving the viewer on the most important screen with no guidance.
- The guardrail cards relied on an animation that could fail to start, leaving them invisible.
- The final card of the tour reappeared on every page after it had been seen once.

**Recalibration**
- Extended the tour into five guardrail steps, including one where the viewer tries to switch off a hard limit and sees it refuse.
- Reframed the chapter as "Guardrails for an AI that touches money", and made the three cases where SeatSaver chooses not to act an optional live proof.

**Output**
- Commits `5e0d0ca` to `b0cce2a`; `storyboard.md`, `technical_implementation.md` and `OpenAI_image.md`.

---

## 13 October · Cutting the story to a film and shipping

**Premise**
- Both portals worked, but the story in Portal 1 took too long to reach the point. With the product walkthrough being detailed, the opening needed to be much shorter.

**Objective**
- Replace the long scroll story with a short film, polish the hand-over to the product, and complete the build log and product note for submission.

**Approach**
- Reduced Portal 1 to four screens: an opening, a short film, a card explaining how Razorpay handles late payments today, and the closing question.
- Generated three eight-second clips with Google Flow. To keep the characters consistent, each clip features only one person and starts from an approved photograph.
- Reviewed the clips frame by frame before using them. One had a caption burned into the corner, which I cropped out. Flow's AI watermark was left visible, with a credit line.
- Added title cards between the clips so that each cut explains how the next scene connects to the last, and rewrote every caption as a complete sentence.
- Let the viewer set the pace: each part waits for a scroll before moving on, so slow readers have time and fast readers are not held back.
- Added each person's role next to their name, such as "Ritu, owner of Clay & Co.", because viewers found it hard to remember who was who.

**AI leverage**
- Google Flow produced the film footage in minutes from three detailed prompts, something I could not have filmed myself in the time available.
- Claude wrote the Flow prompts, checked each clip's frames and audio levels, built the film player with its timed overlays, and fixed the issues found in testing.

**Missteps**
- The first version of the Flow prompts was hard to use. I asked for it to be rewritten as three complete prompts, ready to paste.
- The first cut of the film moved too fast, and the clips felt disjointed because nothing explained the jumps between them.
- The "Let's find out" button at the end of Portal 1 led to a "page not found" screen.
- A soft background music loop, added because the clips came back without music, repeated constantly and competed with the dialogue.

**Recalibration**
- Fixed the link and made sure that arriving from the story always starts a fresh tour.
- Removed the music loop and kept only the clips' own audio and short sound cues at key moments.
- Shortened Portal 2's welcome screen to a single card, since the film now covers the set-up.

**Output**
- Commit `e5c068e`; `Google_Flow_video.md`; this build log; the product note.

---

## Decisions I made myself

- **The problem.** I chose late-authorised payments for seats that had already been resold, over nine other ideas, using a decision rule I set in advance.
- **The money rules.** Same price only, reserve the seat before capturing, the AI never writes amounts, and the merchant reviews every offer by default.
- **Building the backend first.** Correct money handling had to be proven before any interface was built.
- **Cost control.** Moving to Gemini's paid tier while pinning the cheapest suitable model.
- **Honest measurement.** Separating timeouts from quality failures, keeping held-out cases unseen, and reporting the caveats next to the results.
- **Rejecting my own first demo.** It worked but read like theory, so I redesigned it around a story.
- **Guardrails as the climax.** An AI that handles money should end its demo by showing what it cannot do.
- **The inventory question.** Recognising that Razorpay does not own the merchant's seats, and designing a minimal integration with a manual fallback.
- **Pace and clarity over speed.** Letting the viewer control the film and writing complete sentences, even at the cost of a longer opening.

## Where AI was not used, or was deliberately limited

- **No real customer data.** Every case is synthetic, and nothing personal is sent to Gemini.
- **No AI on money or facts.** Amounts, prices, seat availability, deadlines, reservations and captures are all handled by code.
- **No AI where it is not needed.** If the original seat becomes free, or the customer simply asks for a refund, code handles it without any model call.
- **The final decisions are human.** The merchant approves offers by default, and in this project every product, scope and design decision was mine.
