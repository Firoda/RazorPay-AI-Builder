import { useEffect, useState } from "react";
import { Banner, BusyLine } from "../components/ui";
import { api } from "../lib/api";
import { navigate, useAction, usePolling } from "../lib/hooks";
import { formatIST } from "../lib/labels";
import type { ScenarioInfo, Studio } from "../lib/types";

const GROUPS: [ScenarioInfo["group"], string][] = [["ai", "Customer cases (AI decides)"], ["reply", "Reply cases (AI reads the reply)"], ["system", "System cases (deterministic guardrails)"]];

export function DemoPage() {
  const a = useAction();
  const [scenarios, setScenarios] = useState<ScenarioInfo[]>([]);
  const [picked, setPicked] = useState("G01");
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const { data: studio, refresh: refreshStudio } = usePolling<Studio>(() => api.studio(), [], 5000);
  const { data: health, refresh: refreshHealth } = usePolling(() => api.health(), [], 5000);
  // Session ids follow the live calendar's dates, so default to the first Sunday-morning class with Arjun.
  const [pickedSeatSession, setSeatSession] = useState("");

  useEffect(() => {
    api.demo.scenarios().then(setScenarios).catch((e) => setNote(String(e.message)));
  }, []);

  const done = (msg: string) => {
    setNote(msg);
    refreshStudio();
    refreshHealth();
  };

  const inject = (reset: boolean) =>
    a.run(`Loading ${picked}… (AI reads the customer's message)`, async () => {
      const r = await api.demo.inject(picked, reset);
      setLastEvent(r.eventId);
      if (r.caseId) navigate(`/case/${r.caseId}`);
    });

  const seatSession = pickedSeatSession
    || studio?.sessions.find((s) => s.id.endsWith("-AM") && s.instructor === "Arjun" && s.capacity > s.booked && new Date(`${s.date}T12:00:00+05:30`).getUTCDay() === 0)?.id
    || studio?.sessions[0]?.id
    || "";
  const session = studio?.sessions.find((s) => s.id === seatSession);

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div>
        <h1>Demo controls</h1>
        <div className="muted">Everything here is a labelled simulation for demonstrating the product's judgement and guardrails.</div>
      </div>
      <BusyLine label={a.busy} startedAt={a.startedAt} />
      {a.error && <Banner tone="danger">{a.error}</Banner>}
      {note && <Banner tone="info"><span>{note}</span><div className="spacer" /><button className="btn ghost sm" onClick={() => setNote(null)}>Dismiss</button></Banner>}

      <div className="grid-2">
        <section className="card">
          <div className="card-head"><h3>Load a golden scenario</h3></div>
          <div className="card-body stack">
            <label className="field">
              Scenario
              <select value={picked} onChange={(e) => setPicked(e.target.value)}>
                {GROUPS.map(([g, label]) => (
                  <optgroup key={g} label={label}>
                    {scenarios.filter((s) => s.group === g).map((s) => (
                      <option key={s.id} value={s.id}>{s.id}: {s.title}{s.heldOut ? " (held-out)" : ""}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <div className="actions">
              <button className="btn primary" disabled={!!a.busy} onClick={() => inject(true)}>Reset &amp; load</button>
              <button className="btn" disabled={!!a.busy} onClick={() => inject(false)}>Add to queue</button>
            </div>
            <span className="muted small">Reply cases (R1–R6) need an offer sent first: open the case, approve, then reply from the phone.</span>
          </div>
        </section>

        <section className="card">
          <div className="card-head"><h3>Guardrail demos</h3></div>
          <div className="card-body stack">
            <div className="row wrap">
              <button className="btn" disabled={!lastEvent || !!a.busy} onClick={() => a.run("Replaying event…", async () => {
                const r = await api.demo.replay(lastEvent!);
                done(`Replayed ${lastEvent}: ${r.status === "duplicate_event" ? "ignored as a duplicate. Nothing changed." : r.status}`);
              })}>Replay last payment event</button>
              <span className="muted small">{lastEvent ?? "load a scenario first"}</span>
            </div>
            <div className="row wrap">
              <select value={seatSession} onChange={(e) => setSeatSession(e.target.value)} style={{ width: "auto" }} aria-label="Session">
                {studio?.sessions.map((s) => <option key={s.id} value={s.id}>{s.id} ({s.capacity - s.booked} left)</option>)}
              </select>
              <button className="btn" disabled={!session || !!a.busy} onClick={() => a.run("Selling the last seat…", async () => {
                await api.demo.capacity(seatSession, session!.capacity);
                done(`${seatSession} is now full (another customer took the last seat).`);
              })}>Sell remaining seats</button>
            </div>
            <div className="row wrap">
              <button className="btn" disabled={!!a.busy} onClick={() => a.run("Arming failure…", async () => {
                await api.demo.faults({ reserveFailures: 1 });
                done("The next seat reservation will fail.");
              })}>Fail next reservation</button>
              <button className="btn" disabled={!!a.busy} onClick={() => a.run("Arming failure…", async () => {
                await api.demo.faults({ captureFailures: 2 });
                done("The next capture (and its one retry) will fail.");
              })}>Fail next capture</button>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-head"><h3>Demo clock</h3><span className="muted small num">{health ? formatIST(health.now) : ""}</span></div>
          <div className="card-body stack">
            <div className="row wrap">
              {[1, 6, 24].map((h) => (
                <button key={h} className="btn" disabled={!!a.busy} onClick={() => a.run("Moving the clock…", async () => {
                  const r = await api.demo.clock({ advanceHours: h });
                  done(`Clock moved +${h}h to ${formatIST(r.now)}. Deadlines re-checked.`);
                })}>+{h}h</button>
              ))}
            </div>
            <span className="muted small">Cases escalate 6 hours before Razorpay's auto-refund and close as auto-refunded at the deadline.</span>
          </div>
        </section>

        <section className="card">
          <div className="card-head"><h3>Real payment and reset</h3></div>
          <div className="card-body stack">
            <a className="btn" href="/pay-test" target="_blank" rel="noreferrer">Make a real Razorpay test payment ↗</a>
            <button className="btn danger" disabled={!!a.busy} onClick={() => a.run("Resetting…", async () => {
              await api.demo.reset();
              done("Everything reset to the seeded studio data.");
            })}>Reset everything</button>
          </div>
        </section>
      </div>
    </div>
  );
}
