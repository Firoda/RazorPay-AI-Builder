import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Lock, Play, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { lensOn, notesFor, onLensChange } from "../../../shared/judgeLens";
import { play } from "../../../shared/sound";
import { Avatar, type Person } from "../components/Avatar";
import { Banner } from "../components/ui";
import { api } from "../lib/api";
import { useAction } from "../lib/hooks";
import type { CaseDetail, Policy } from "../lib/types";
import { LiveFeed } from "../live/LiveAiPanel";
import { useTour } from "../tour/Tour";

// Final chapter: the rules behind every decision. Every outcome the visitor just saw traces back to a rule
// here; the locked rules live in code (not the prompt); the trust dial is the merchant's to turn.

const TRACES: { who: Person; name: string; outcome: string; tone: string; rules: string[] }[] = [
  { who: "priya", name: "Priya", outcome: "Rescued", tone: "success", rules: ["Same price only", "Seat reserved before money moves", "Capture only after she accepts"] },
  { who: "arnav", name: "Arnav", outcome: "Released", tone: "info", rules: ["Never capture a duplicate payment"] },
  { who: "sneha", name: "Sneha", outcome: "Refunded", tone: "info", rules: ["“Refund” and “stop” end the flow"] },
  { who: "amit", name: "Amit", outcome: "Escalated", tone: "warning", rules: ["Customer messages can't give orders", "Unclear or risky → Ritu decides"] },
];

const PATTERNS: [string, string][] = [
  ["day_of_week+instructor+time_window", "Customer named a day, time and instructor (like Priya: “Sunday mornings with Arjun”)"],
  ["instructor", "Customer only named an instructor"],
  ["day_of_week+time_window", "Customer named a day and time"],
];

export function PolicyPage() {
  const [p, setP] = useState<Policy | null>(null);
  const [shaking, setShaking] = useState<string | null>(null);
  const [lens, setLens] = useState(lensOn());
  const a = useAction();
  const tour = useTour();

  useEffect(() => {
    api.studio().then((s) => setP(s.policy));
    return onLensChange(setLens);
  }, []);

  if (!p) return <div className="muted">Loading the rules…</div>;

  const save = (patch: Partial<Policy>) => a.run("Saving…", async () => setP(await api.demo.policy(patch)));

  const LOCKS: { id: string; title: string; detail: string }[] = [
    { id: "price", title: "Same price only", detail: "No upsells, no partial refunds in v1." },
    { id: "accept", title: "No capture without a yes", detail: "Money moves only after the customer accepts and the seat is reserved." },
    { id: "once", title: "Capture happens once", detail: "An idempotency key blocks double clicks and replays." },
    { id: "stop", title: "“Stop” and “refund” end it", detail: "No persuasion, no discounts, no follow-ups." },
    { id: "amounts", title: "The AI never writes amounts", detail: "Prices and dates are filled in by code." },
    { id: "deadline", title: `Escalate ${p.escalateBeforeDeadlineHours}h before auto-refund`, detail: "The capture window never passes silently." },
  ];

  const tryUnlock = (id: string) => {
    setShaking(id);
    play("buzzWrong");
    setTimeout(() => setShaking((s) => (s === id ? null : s)), 1400);
  };

  return (
    <div className="stack policy" style={{ gap: 22, maxWidth: 1080 }}>
      <div>
        <span className="welcome-kicker">Final chapter</span>
        <h1 style={{ fontSize: 32 }}>The rules behind every decision.</h1>
        <p className="muted" style={{ fontSize: 17, maxWidth: 680, margin: "6px 0 0" }}>
          Ritu sets the rules. SeatSaver follows them. The AI can't change them, and no customer message can override them.
        </p>
      </div>
      {a.error && <Banner tone="danger">{a.error}</Banner>}

      <section className="stack-sm">
        <h2 className="policy-h">Why each outcome happened</h2>
        <div className="trace-grid">
          {TRACES.map((t, i) => (
            <motion.div key={t.name} className="card trace" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12 }}>
              <div className="row"><Avatar who={t.who} size={40} /><b>{t.name}</b><span className={`tag ${t.tone}`}>{t.outcome}</span></div>
              <div className="trace-rules">
                {t.rules.map((r) => <span key={r} className="rule-chip"><Lock size={12} /> {r}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="stack-sm">
        <h2 className="policy-h">Locked in code <span className="muted small" style={{ fontWeight: 500 }}>· try to switch one off</span></h2>
        <div className="lock-grid">
          {LOCKS.map((l) => (
            <button key={l.id} className={`lock-tile ${shaking === l.id ? "shake" : ""}`} onClick={() => tryUnlock(l.id)} aria-describedby={`lock-${l.id}`}>
              <span className="lock-ico"><Lock size={16} /></span>
              <span className="stack-sm" style={{ gap: 2, textAlign: "left" }}>
                <b>{l.title}</b>
                <span id={`lock-${l.id}`} className="muted small">
                  {shaking === l.id ? "Fixed. Not the AI, not a customer message, not a prompt can change this." : l.detail}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <TrustDial p={p} save={save} busy={Boolean(a.busy)} />

      <section className="card">
        <div className="card-head"><h3>Ritu's other dials</h3></div>
        <div className="card-body grid-2">
          <label className="field">
            Offer sessions up to N days after the original
            <input type="number" min={1} max={30} value={p.maxDaysAhead} onChange={(e) => setP({ ...p, maxDaysAhead: Number(e.target.value) })} onBlur={() => save({ maxDaysAhead: p.maxDaysAhead })} />
          </label>
          <label className="field">
            Max messages without a customer reply
            <input type="number" min={1} max={3} value={p.maxUnansweredContacts} onChange={(e) => setP({ ...p, maxUnansweredContacts: Number(e.target.value) })} onBlur={() => save({ maxUnansweredContacts: p.maxUnansweredContacts })} />
          </label>
        </div>
      </section>

      {lens && notesFor(2, "policy").map((n) => (
        <div key={n.label} className="ss-lens"><b>{n.label}</b>{n.text}</div>
      ))}

      <section className="card card-pad policy-close">
        <ShieldCheck size={30} className="notact-icon" />
        <h2>Ritu sets the rules. SeatSaver follows them, and shows its work.</h2>
        <p className="muted" style={{ margin: 0 }}>A late payment used to mean a lost sale or a support ticket. Now it's a seat she'll actually take.</p>
        <div className="actions" style={{ justifyContent: "center", marginTop: 14 }}>
          <a className="btn primary" href="/">Back to the story</a>
          <a className="btn" href="#/queue">Explore on your own</a>
          <button className="btn" onClick={() => tour.restart()}>Replay the guided tour</button>
        </div>
      </section>
    </div>
  );
}

function TrustDial({ p, save, busy }: { p: Policy; save: (patch: Partial<Policy>) => Promise<void>; busy: boolean }) {
  const [caseId, setCaseId] = useState<string | undefined>();
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<CaseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auto = p.autonomy === "L2";

  // Prove it: re-run Priya's case live with auto-send on, and stop at the point where it differs.
  const rerun = async () => {
    setError(null);
    setResult(null);
    setRunning(true);
    try {
      const r = await api.session.scenario("G01", { autonomy: "L2" });
      setCaseId(r.caseId);
      for (let i = 0; i < 90; i++) {
        const d = await api.case(r.caseId);
        if (d.state !== "DETECTED" && d.state !== "MERCHANT_REVIEW" || i > 60) {
          setResult(d);
          play(d.state === "OFFER_SENT" ? "success" : "tick");
          break;
        }
        await new Promise((res) => setTimeout(res, 900));
      }
      await save({}); // the re-run reset the sandbox with auto-send on; reflect it in the dial
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="card">
      <div className="card-head"><h3>The trust dial</h3><span className="muted small">autonomy is earned, one pattern at a time</span></div>
      <div className="card-body stack">
        <div className="dial" role="radiogroup" aria-label="Autonomy">
          <button role="radio" aria-checked={!auto} className={!auto ? "on" : ""} disabled={busy} onClick={() => save({ autonomy: "L1" })}>
            <UserCheck size={16} /> Review-first <span className="tag neutral">default</span>
          </button>
          <button role="radio" aria-checked={auto} className={auto ? "on" : ""} disabled={busy} onClick={() => save({ autonomy: "L2", autoApprovePatterns: p.autoApprovePatterns.length ? p.autoApprovePatterns : [PATTERNS[0][0]] })}>
            <Sparkles size={16} /> Auto-send for patterns I trust
          </button>
        </div>

        {auto && (
          <div className="stack-sm">
            {PATTERNS.map(([key, label]) => (
              <label key={key} className="row small">
                <input type="checkbox" checked={p.autoApprovePatterns.includes(key)} disabled={busy}
                  onChange={(e) => save({ autoApprovePatterns: e.target.checked ? [...p.autoApprovePatterns, key] : p.autoApprovePatterns.filter((x) => x !== key) })} />
                {label}
              </label>
            ))}
          </div>
        )}

        <div className="dial-compare">
          <div className="dial-row"><span className="dial-step">Gemini reads her message and ranks sessions</span><span className="dial-same">same</span></div>
          <div className={`dial-row ${auto ? "changed" : ""}`}>
            <span className="dial-step">The offer goes to Priya</span>
            <span className={auto ? "dial-auto" : "dial-wait"}>{auto ? "sent the moment Gemini finishes" : "waits for Ritu's approval"}</span>
          </div>
          <div className="dial-row"><span className="dial-step">Seat reserved, then ₹2,000 captured once</span><span className="dial-same">only after Priya says yes, always</span></div>
        </div>

        <div className="row wrap">
          <button className="btn primary" disabled={running} onClick={rerun}><Play size={15} /> {running ? "Running Priya's case with auto-send…" : "Prove it: re-run Priya's case with auto-send on"}</button>
          <span className="muted small">Runs live. It resets this demo's queue.</span>
        </div>
        {error && <Banner tone="danger">{error}</Banner>}
        {(running || result) && <LiveFeed caseId={caseId} compact />}
        {result && (
          result.state === "OFFER_SENT" ? (
            <Banner tone="success">
              <span><b>Offer sent with no approval needed.</b> The ₹2,000 is still only authorised: nothing is captured until Priya taps Book.</span>
            </Banner>
          ) : (
            <Banner tone="warning"><span>This run stopped at <b>{result.state.replace(/_/g, " ").toLowerCase()}</b>: when anything is unclear, auto-send steps back and Ritu decides.</span></Banner>
          )
        )}
      </div>
    </section>
  );
}
