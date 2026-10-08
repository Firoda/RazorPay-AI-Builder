import { useEffect, useState } from "react";
import { Banner } from "../components/ui";
import { api } from "../lib/api";
import { useAction } from "../lib/hooks";
import type { Policy } from "../lib/types";

const PATTERNS: [string, string][] = [
  ["day_of_week+instructor+time_window", "Customer named a day, time and instructor (e.g. “Sunday mornings with Arjun”)"],
  ["instructor", "Customer only named an instructor"],
  ["day_of_week+time_window", "Customer named a day and time"],
];

export function PolicyPage() {
  const [p, setP] = useState<Policy | null>(null);
  const a = useAction();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.studio().then((s) => setP(s.policy));
  }, []);

  if (!p) return <div className="muted">Loading policy…</div>;

  const save = (patch: Partial<Policy>) =>
    a.run("Saving…", async () => {
      setP(await api.demo.policy(patch));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });

  return (
    <div className="stack" style={{ gap: 16, maxWidth: 860 }}>
      <div>
        <h1>Policy and autonomy</h1>
        <div className="muted">Clay &amp; Co.'s rules for SeatSaver. The AI can't change these, and customer messages can't override them.</div>
      </div>
      {a.error && <Banner tone="danger">{a.error}</Banner>}
      {saved && <Banner tone="success">Saved.</Banner>}

      <section className="card">
        <div className="card-head"><h3>Autonomy</h3></div>
        <div className="card-body stack">
          <label className="session-pick" style={{ cursor: "pointer" }}>
            <input type="radio" name="aut" checked={p.autonomy === "L1"} onChange={() => save({ autonomy: "L1" })} />
            <span><strong>Review-first</strong> <span className="tag neutral">default</span><br /><span className="muted small">You approve every offer before the customer sees it. Capture happens only after the customer accepts.</span></span>
          </label>
          <label className="session-pick" style={{ cursor: "pointer" }}>
            <input type="radio" name="aut" checked={p.autonomy === "L2"} onChange={() => save({ autonomy: "L2" })} />
            <span><strong>Auto-send for patterns you trust</strong><br /><span className="muted small">Offers matching the patterns below go out automatically. Everything else still needs you. Capture still needs the customer's acceptance.</span></span>
          </label>
          {p.autonomy === "L2" && (
            <div className="stack-sm" style={{ paddingLeft: 8 }}>
              {PATTERNS.map(([key, label]) => (
                <label key={key} className="row small">
                  <input
                    type="checkbox"
                    checked={p.autoApprovePatterns.includes(key)}
                    onChange={(e) => save({ autoApprovePatterns: e.target.checked ? [...p.autoApprovePatterns, key] : p.autoApprovePatterns.filter((x) => x !== key) })}
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <div className="card-head"><h3>Offer rules</h3></div>
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

      <section className="card">
        <div className="card-head"><h3>Fixed in this version</h3></div>
        <div className="card-body">
          <table className="simple">
            <tbody>
              <tr><td>Same price only</td><td><span className="tag neutral">🔒 on</span></td><td className="muted small">No partial refunds or extra charges in v1</td></tr>
              <tr><td>Escalate before auto-refund</td><td><span className="tag neutral">{p.escalateBeforeDeadlineHours}h</span></td><td className="muted small">So the capture window never passes silently</td></tr>
              <tr><td>Minimum notice before a session</td><td><span className="tag neutral">{p.minHoursBeforeStart}h</span></td><td className="muted small">Never offer a class that's about to start</td></tr>
              <tr><td>Restore the original seat if it frees up</td><td><span className="tag neutral">{p.restoreOriginalIfFree ? "on" : "off"}</span></td><td className="muted small">One tap, no AI needed</td></tr>
              <tr><td>“Stop” and “refund” end the flow</td><td><span className="tag neutral">🔒 always</span></td><td className="muted small">No persuasion, no discounts</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
