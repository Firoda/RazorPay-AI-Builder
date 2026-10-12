import { useState } from "react";
import { AuditTrail } from "../components/AuditTrail";
import { ConstraintChips, SessionsMatrix } from "../components/Evidence";
import { PhoneChat } from "../components/PhoneChat";
import { RecommendationCard } from "../components/RecommendationCard";
import { Timeline } from "../components/Timeline";
import { Banner, BusyLine, CountdownChip, Empty, StatePill, Tag } from "../components/ui";
import { api } from "../lib/api";
import { useAction, usePolling } from "../lib/hooks";
import { reasonText } from "../lib/labels";
import type { CaseDetail } from "../lib/types";
import { bus } from "../tour/bus";
import { useEffect } from "react";

type MobileTab = "decision" | "customer" | "timeline" | "audit";

export function useCaseController(id: string) {
  const action = useAction();
  const { data, error, set } = usePolling(() => api.case(id), [id], 2500, Boolean(action.busy));
  // The guided tour acts through the API; it pushes fresh case data here so the screen updates instantly.
  useEffect(() => bus.on("case:update", (d) => { if ((d as CaseDetail)?.id === id) set(d as CaseDetail); }), [id, set]);
  const run = async (label: string, fn: () => Promise<CaseDetail>) => {
    const res = await action.run(label, fn);
    if (res) set(res);
  };
  return { data, error, run, action };
}

export function CasePage({ id }: { id: string }) {
  const { data: d, error, run, action } = useCaseController(id);
  const [tab, setTab] = useState<"decision" | "audit">("decision");
  const [mTab, setMTab] = useState<MobileTab>("decision");
  const busy = Boolean(action.busy);

  if (error && !d) return <Empty title="Case not found">{error} · <a href="#/queue">Back to the queue</a></Empty>;
  if (!d) return <div className="muted">Loading case…</div>;

  const real = d.payment?.source === "razorpay_test";
  const show = (t: MobileTab) => (mTab === t ? "show-mobile" : "");

  return (
    <>
      <div className="case-header">
        <a href="#/queue" className="btn ghost sm" aria-label="Back to queue">←</a>
        <div className="title">
          <div className="row wrap">
            <h1>{d.customerName}</h1>
            <span className="num" style={{ fontSize: 20, fontWeight: 700 }}>{d.amount}</span>
            <StatePill state={d.state} />
            <CountdownChip ms={d.msToDeadline} state={d.state} />
          </div>
          <div className="muted small row wrap">
            <span>Booked {d.originalSession}</span>
            <span>·</span>
            <span>{d.moneyMode === "capture" ? "Payment held: capture or release" : "Payment already captured: rebook only"}</span>
            {real ? <Tag kind="test">Real Razorpay test payment</Tag> : <Tag kind="sim">synthetic scenario</Tag>}
          </div>
        </div>
      </div>

      <div className="stack" style={{ marginBottom: 12 }}>
        <BusyLine label={action.busy} startedAt={action.startedAt} />
        {action.error && <Banner tone="danger"><span>{action.error}</span><div className="spacer" /><button className="btn ghost sm" onClick={() => action.setError(null)}>Dismiss</button></Banner>}
        {d.state === "ESCALATED" && d.reason && tab === "audit" && <Banner tone="danger">{reasonText(d.reason)}</Banner>}
      </div>

      <div className="tabs mobile-tabs" role="tablist" aria-label="Case sections">
        {(["decision", "customer", "timeline", "audit"] as MobileTab[]).map((t) => (
          <button key={t} role="tab" aria-selected={mTab === t} className={mTab === t ? "active" : ""} onClick={() => { setMTab(t); if (t === "decision" || t === "audit") setTab(t); }}>
            {t === "decision" ? "Decision" : t === "customer" ? "Customer" : t === "timeline" ? "Timeline" : "Audit"}
          </button>
        ))}
      </div>

      <div className="case-grid">
        <div className={`col-timeline ${show("timeline")}`}>
          <Timeline d={d} />
        </div>

        <div className={`col-main stack ${mTab === "decision" || mTab === "audit" ? "show-mobile" : ""}`}>
          <div className="tabs desktop-tabs" role="tablist" aria-label="Decision or audit">
            <button role="tab" aria-selected={tab === "decision"} className={tab === "decision" ? "active" : ""} onClick={() => { setTab("decision"); setMTab("decision"); }}>Decision</button>
            <button role="tab" data-tour="audit-tab" aria-selected={tab === "audit"} className={tab === "audit" ? "active" : ""} onClick={() => { setTab("audit"); setMTab("audit"); bus.emit("nav:audit"); }}>Audit trail</button>
          </div>
          {tab === "audit" ? (
            <AuditTrail d={d} />
          ) : (
            <>
              <RecommendationCard d={d} run={run} busy={busy} />
              <ConstraintChips d={d} />
              <SessionsMatrix d={d} />
            </>
          )}
        </div>

        <aside className={`phone-col ${show("customer")}`} aria-label="Customer view">
          <PhoneChat d={d} run={run} busy={busy} />
        </aside>
      </div>
    </>
  );
}
