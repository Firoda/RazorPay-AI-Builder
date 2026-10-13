/**
 * Golden-set evaluation (build plan §8).
 *
 *   npm run eval                 # dev set, live Gemini (needs GEMINI_API_KEY in .env)
 *   npm run eval -- --held-out   # held-out set only (run once at the end!)
 *   npm run eval -- --all        # everything
 *   EVAL_RUNS=3 npm run eval     # consistency: run each case 3 times
 *   npm run eval -- --only=G01,G03   # re-run specific cases
 *   AI_MODE=fake npm run eval    # smoke-test the harness offline (scores the keyword stub, not the product)
 *
 * Writes a markdown report to eval/results/.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildAi, buildContainer } from "../server/container";
import { filterCandidates, parseConstraintTag, satisfies } from "../server/engine/candidateFilter";
import type { RescueCase } from "../server/domain/types";
import { applyScenario, loadScenarios, type Scenario } from "../server/scenarios";
import { Store } from "../server/store/memoryStore";

try {
  process.loadEnvFile(".env");
} catch {
  /* optional */
}

const args = new Set(process.argv.slice(2));
const RUNS = Math.max(1, Number(process.env.EVAL_RUNS ?? 1));
const env = { ...process.env, AI_CACHE: process.env.EVAL_USE_CACHE === "1" ? "on" : "off" };
const built = buildAi(env);

const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const scenarios = loadScenarios().filter((s) => {
  if (s.group === "system") return false;
  if (only) return only.includes(s.id);
  if (args.has("--all")) return true;
  if (args.has("--held-out")) return Boolean(s.heldOut);
  return !s.heldOut;
});

function observedDecision(c: RescueCase): string {
  if (c.state === "MERCHANT_REVIEW" && c.decision === "offer_alternative") return "offer_alternative";
  if (c.state === "RELEASED") return "release_refund";
  if (c.state === "ESCALATED") return "escalate";
  if (c.state === "AWAITING_CUSTOMER" && c.decision === "ask_customer") return "ask_customer";
  return `${c.state.toLowerCase()}`;
}

interface RunResult {
  id: string;
  run: number;
  decision: string;
  offered: string[];
  checks: Record<string, boolean>;
  hardViolations: number;
  mustNotViolations: number;
  falseMoneyActions: number;
  schemaRetries: number;
  aiCalls: number;
  latencyMs: number;
  models: string[];
  note?: string;
  error?: string;
}

async function runScenario(sc: Scenario, run: number): Promise<RunResult> {
  // Evals always use the fixed fixture dates, so results stay comparable across runs.
  const { store, engine } = buildContainer({ ...env, LIVE_TIME: "0" }, built.ai);
  const base: RunResult = {
    id: sc.id, run, decision: "", offered: [], checks: {}, hardViolations: 0, mustNotViolations: 0,
    falseMoneyActions: 0, schemaRetries: 0, aiCalls: 0, latencyMs: 0, models: [],
  };
  try {
    const event = applyScenario(store, sc);
    const { caseId } = await engine.ingestPaymentEvent(event);
    const c = store.cases.get(caseId!)!;
    const e = sc.expected;

    if (sc.group === "reply") {
      if (sc.offer) await engine.merchantAction(c.id, { type: "edit", sessionIds: sc.offer });
      else if (c.state === "MERCHANT_REVIEW") await engine.merchantAction(c.id, { type: "approve" });
      if (c.state !== "OFFER_SENT") throw new Error(`could not reach OFFER_SENT (state ${c.state}, reason ${c.reason})`);
      await engine.customerMessage(c.id, sc.reply!);
      const r = c.replyInterpretation;
      base.decision = r?.intent ?? `no_interpretation:${c.state}`;
      base.checks.intent = Boolean(r && e.replyIntent?.includes(r.intent));
      if (e.replySelected) base.checks.selected = r?.selected_session_id === e.replySelected;
      if (e.injection) base.checks.injection = c.flags.includes("injection_detected");
      if (e.state) base.checks.state = e.state.includes(c.state);
      if (e.finalOfferIncludes) base.checks.finalOffer = Boolean(c.offeredSessionIds?.includes(e.finalOfferIncludes));
    } else {
      base.decision = observedDecision(c);
      base.checks.decision = Boolean(e.decision?.includes(base.decision));
      if (base.decision === "offer_alternative") {
        base.offered = c.offeredSessionIds ?? [];
        if (e.topAnyOf) base.checks.top = e.topAnyOf.includes(base.offered[0]);
        if (e.allowedOptions) base.checks.allowed = base.offered.every((id) => e.allowedOptions!.includes(id));
      }
      if (e.injection) base.checks.injection = c.flags.includes("injection_detected");
      if (e.stopContact) base.checks.stopContact = c.stopContact;
    }

    const offeredEver = new Set(
      store.messages.filter((m) => m.caseId === c.id && m.kind === "ai_offer").length ? c.offeredSessionIds ?? [] : base.offered,
    );
    const hard = (e.hard ?? []).map(parseConstraintTag);
    for (const id of offeredEver) {
      const s = store.sessions.get(id)!;
      if (hard.some((h) => satisfies(s, h) === false)) base.hardViolations++;
      if (e.mustNotOffer?.includes(id)) base.mustNotViolations++;
    }
    const captured = store.audit.some((a) => a.caseId === c.id && a.action === "payment.captured");
    if (captured && !(e.state ?? []).includes("RESCUED")) base.falseMoneyActions++;

    const aiAudit = store.audit.filter((a) => a.caseId === c.id && a.actor === "ai");
    base.aiCalls = aiAudit.length;
    base.models = [...new Set(aiAudit.map((a) => (a.detail as { meta?: { model?: string } })?.meta?.model ?? "?"))];
    base.latencyMs = aiAudit.reduce((sum, a) => sum + ((a.detail as { meta?: { latencyMs?: number } })?.meta?.latencyMs ?? 0), 0);
    base.schemaRetries = store.audit.filter(
      (a) => a.caseId === c.id && /^ai\..*\.validated$/.test(a.action) && (a.detail as { ok: boolean }).ok === false,
    ).length;
    if (c.reason) base.note = `${c.state}${c.reason ? ` (${c.reason})` : ""}`;
  } catch (err) {
    base.error = String((err as Error).message ?? err);
  }
  return base;
}

/** B0: do nothing (auto-refund). B1: offer the next same-price, same-type session, ignoring the customer's words. */
function baselines(sc: Scenario) {
  const store = new Store();
  applyScenario(store, sc);
  const original = store.sessions.get("S-1011-AM")!;
  const { candidates } = filterCandidates({
    sessions: [...store.sessions.values()], original, policy: store.policy, hard: [], seatsNeeded: 1, now: store.now(),
  });
  const ruleId = candidates.find((x) => x.feasible)?.sessionId;
  const e = sc.expected;
  const b0 = Boolean(e.decision?.includes("release_refund"));
  let b1 = Boolean(e.decision?.includes("offer_alternative"));
  if (b1 && e.topAnyOf) b1 = e.topAnyOf.includes(ruleId!);
  const hard = (e.hard ?? []).map(parseConstraintTag);
  const b1Violation = ruleId && hard.some((h) => satisfies(store.sessions.get(ruleId)!, h) === false) ? 1 : 0;
  const b1MustNot = ruleId && e.mustNotOffer?.includes(ruleId) ? 1 : 0;
  return { b0, b1, b1Violation, b1MustNot, ruleId };
}

const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "n/a");

async function main() {
  console.log(`Evaluating ${scenarios.length} scenarios × ${RUNS} run(s) with ${built.mode}/${built.model}…`);
  const results: RunResult[] = [];
  for (const sc of scenarios) {
    for (let run = 1; run <= RUNS; run++) {
      const r = await runScenario(sc, run);
      results.push(r);
      const pass = !r.error && Object.values(r.checks).every(Boolean) && !r.hardViolations && !r.mustNotViolations;
      console.log(`${pass ? "PASS" : "FAIL"} ${sc.id} run${run}: ${r.decision} ${r.offered.join(",")} ${r.error ?? ""}`);
    }
  }

  const first = results.filter((r) => r.run === 1);
  const infra = (r: RunResult) => /ai_unavailable|ai_error/.test(r.note ?? "");
  const passed = (r: RunResult) =>
    !infra(r) && !r.error && Object.values(r.checks).every(Boolean) && !r.hardViolations && !r.mustNotViolations;
  const aiCases = scenarios.filter((s) => s.group === "ai");
  const aiFirst = first.filter((r) => aiCases.some((s) => s.id === r.id));
  const replyFirst = first.filter((r) => !aiCases.some((s) => s.id === r.id));
  const base = aiCases.map(baselines);

  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const consistency = RUNS > 1
    ? pct(
        scenarios.filter((s) => {
          const rs = results.filter((r) => r.id === s.id);
          return rs.every((r) => r.decision === rs[0].decision && r.offered[0] === rs[0].offered[0]);
        }).length,
        scenarios.length,
      )
    : "n/a (EVAL_RUNS=1)";

  const lines: string[] = [];
  const set = only ? `selected-${only.join("-")}` : args.has("--all") ? "all" : args.has("--held-out") ? "held-out" : "dev";
  lines.push(`# SeatSaver eval: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(`- Provider: **${built.mode} / ${built.model}**${built.mode === "fake" ? " (keyword stub: harness smoke test, NOT product quality)" : ""}`);
  lines.push(`- Set: **${set}**, ${scenarios.length} scenarios, ${RUNS} run(s) each. All data synthetic.`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Metric | SeatSaver | B1: rule (next same-price slot) | B0: do nothing |");
  lines.push("|---|---|---|---|");
  lines.push(`| Decision-case pass rate (${aiFirst.length}) | ${pct(aiFirst.filter(passed).length, aiFirst.length)} | ${pct(base.filter((b) => b.b1).length, base.length)} | ${pct(base.filter((b) => b.b0).length, base.length)} |`);
  lines.push(`| Hard-constraint violations (must be 0) | ${sum(first.map((r) => r.hardViolations))} | ${sum(base.map((b) => b.b1Violation))} | 0 |`);
  lines.push(`| Must-not-offer violations (must be 0) | ${sum(first.map((r) => r.mustNotViolations))} | ${sum(base.map((b) => b.b1MustNot))} | 0 |`);
  lines.push(`| False money actions (must be 0) | ${sum(first.map((r) => r.falseMoneyActions))} | n/a | 0 |`);
  lines.push(`| Reply-interpretation pass rate (${replyFirst.length}) | ${pct(replyFirst.filter(passed).length, replyFirst.length)} | n/a | n/a |`);
  lines.push(`| Schema validation failures (retried) | ${sum(first.map((r) => r.schemaRetries))} | | |`);
  lines.push(`| Errors | ${first.filter((r) => r.error).length} | | |`);
  lines.push(`| Infra failures (model unavailable/timeout; not a quality signal) | ${first.filter(infra).length} | | |`);
  const answered = first.filter((r) => !infra(r));
  lines.push(`| Pass rate where the model answered (${answered.length}) | ${pct(answered.filter(passed).length, answered.length)} | | |`);
  lines.push(`| Consistency across runs | ${consistency} | | |`);
  const modelCounts = new Map<string, number>();
  for (const r of first) for (const m of r.models) modelCounts.set(m, (modelCounts.get(m) ?? 0) + 1);
  lines.push(`| Models that answered | ${[...modelCounts].map(([m, n]) => `${m} (${n})`).join(", ") || "none"} | | |`);
  lines.push(`| Avg AI latency per case | ${Math.round(sum(first.map((r) => r.latencyMs)) / Math.max(1, first.length))} ms | | |`);
  lines.push("");
  lines.push("## Per case (run 1)");
  lines.push("");
  lines.push("| Case | Held-out | Result | Observed | Offered | Checks | Notes |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const r of first) {
    const sc = scenarios.find((s) => s.id === r.id)!;
    const checks = Object.entries(r.checks).map(([k, v]) => `${v ? "✓" : "✗"}${k}`).join(" ");
    const viol = [r.hardViolations ? `hard×${r.hardViolations}` : "", r.mustNotViolations ? `mustNot×${r.mustNotViolations}` : ""].filter(Boolean).join(" ");
    lines.push(`| ${r.id}: ${sc.title} | ${sc.heldOut ? "yes" : ""} | ${passed(r) ? "PASS" : "**FAIL**"} | ${r.decision} | ${r.offered.join(", ")} | ${checks} ${viol} | ${r.error ?? r.note ?? ""}${r.models.length ? ` [${r.models.join(", ")}]` : ""} |`);
  }

  mkdirSync(join(process.cwd(), "eval", "results"), { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const file = join("eval", "results", `${stamp}-${set}-${built.mode}.md`);
  writeFileSync(file, lines.join("\n") + "\n");
  writeFileSync(file.replace(/\.md$/, ".json"), JSON.stringify(results, null, 2));
  console.log("\n" + lines.slice(0, 20).join("\n"));
  console.log(`\nReport: ${file}`);
}

main();
