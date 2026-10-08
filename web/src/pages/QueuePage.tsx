import { useState } from "react";
import { OutcomeStrip } from "../components/OutcomeStrip";
import { Banner, CountdownChip, Empty, StatePill, Tag } from "../components/ui";
import { api } from "../lib/api";
import { navigate, useAction, usePolling } from "../lib/hooks";
import { reasonText } from "../lib/labels";
import { TERMINAL, type CaseState, type CaseSummary } from "../lib/types";

const NEEDS_ACTION: CaseState[] = ["MERCHANT_REVIEW", "RESTORE_PROPOSED", "ESCALATED", "PENDING_RESOLUTION"];
const WAITING: CaseState[] = ["AWAITING_CUSTOMER", "OFFER_SENT", "EXECUTING", "DETECTED"];

type Filter = "all" | "action" | "waiting" | "closed";

const FLAG_LABEL: Record<string, string> = {
  identity_unverified: "🪪 identity check",
  injection_detected: "⚠ injection flagged",
  refreshed_after_seat_loss: "🪑 seat lost, refreshed",
  customer_question: "❓ customer question",
};

export function QueuePage() {
  const { data: cases, error } = usePolling(() => api.cases(), []);
  const { data: metrics } = usePolling(() => api.metrics(), []);
  const [filter, setFilter] = useState<Filter>("all");
  const load = useAction();

  const list = (cases ?? [])
    .filter((c) => filter === "all" || (filter === "action" ? NEEDS_ACTION : filter === "waiting" ? WAITING : TERMINAL).includes(c.state))
    .sort((a, b) => urgency(a) - urgency(b) || a.msToDeadline - b.msToDeadline);

  const counts = {
    action: (cases ?? []).filter((c) => NEEDS_ACTION.includes(c.state)).length,
    waiting: (cases ?? []).filter((c) => WAITING.includes(c.state)).length,
    closed: (cases ?? []).filter((c) => TERMINAL.includes(c.state)).length,
  };

  const loadHero = () =>
    load.run("AI is reading Priya's message…", async () => {
      const r = await api.demo.inject("G01", true);
      if (r.caseId) navigate(`/case/${r.caseId}`);
    });

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row wrap">
        <div>
          <h1>Rescue queue</h1>
          <div className="muted">Payments your customers' banks confirmed <em>after</em> their seat was gone. Each one is held until you capture it or Razorpay refunds it.</div>
        </div>
      </div>
      <OutcomeStrip m={metrics} />
      {error && <Banner tone="danger">Can't reach the SeatSaver backend: {error}</Banner>}
      <div className="row wrap">
        <div className="filters" role="tablist" aria-label="Filter cases">
          {([["all", `All (${cases?.length ?? 0})`], ["action", `Needs action (${counts.action})`], ["waiting", `Waiting on customer (${counts.waiting})`], ["closed", `Closed (${counts.closed})`]] as [Filter, string][]).map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>{label}</button>
          ))}
        </div>
      </div>
      {cases && cases.length === 0 ? (
        <Empty title="No late payments right now">
          <p>Load the main demo case to see SeatSaver work end to end.</p>
          <button className="btn primary" disabled={!!load.busy} onClick={loadHero}>{load.busy ? "Loading… (the AI is reading the message)" : "Load the main demo case (Priya)"}</button>
          {load.error && <p className="small" style={{ color: "var(--danger)" }}>{load.error}</p>}
        </Empty>
      ) : (
        <div className="case-list">
          {list.map((c) => <CaseCard key={c.id} c={c} />)}
          {cases && list.length === 0 && <div className="muted">Nothing in this filter.</div>}
        </div>
      )}
    </div>
  );
}

function urgency(c: CaseSummary): number {
  if (NEEDS_ACTION.includes(c.state)) return 0;
  if (WAITING.includes(c.state)) return 1;
  return 2;
}

function CaseCard({ c }: { c: CaseSummary }) {
  return (
    <a className="card case-card" href={`#/case/${c.id}`}>
      <div className="stack-sm" style={{ gap: 2 }}>
        <div className="row wrap">
          <span className="who">{c.customerName}</span>
          <span className="num" style={{ fontWeight: 700 }}>{c.amount}</span>
          <StatePill state={c.state} />
        </div>
        <div className="muted small">Booked {c.originalSession} · {c.moneyMode === "capture" ? "held" : "already captured"}</div>
      </div>
      <div className="row" style={{ alignSelf: "start" }}>
        <CountdownChip ms={c.msToDeadline} state={c.state} />
      </div>
      <div className="summary row wrap">
        {c.summary && c.state === "MERCHANT_REVIEW" ? <><Tag kind="ai" /> <span>{c.summary}</span></> : <span>{reasonText(c.reason)}</span>}
        {c.flags.map((f) => FLAG_LABEL[f] && <span key={f} className="tag warning">{FLAG_LABEL[f]}</span>)}
      </div>
    </a>
  );
}
