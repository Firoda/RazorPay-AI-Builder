import { Fragment, useState } from "react";
import { ACTOR_LABEL, formatIST } from "../lib/labels";
import type { CaseDetail } from "../lib/types";
import { Tag } from "./ui";

function summarise(detail: unknown): string {
  if (!detail || typeof detail !== "object") return "";
  const d = detail as Record<string, unknown>;
  if (d.meta && typeof d.meta === "object") {
    const m = d.meta as Record<string, unknown>;
    return `${m.model} · ${m.latencyMs} ms${m.cached ? " · cached" : ""} · prompt ${m.promptVersion}`;
  }
  if ("from" in d && "to" in d) return `${d.from} → ${d.to}${d.reason ? ` (${d.reason})` : ""}`;
  if ("issues" in d) return (d.ok ? "valid" : "rejected") + ((d.issues as string[]).length ? `: ${(d.issues as string[]).join(", ")}` : "");
  return Object.entries(d).slice(0, 3).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`).join(" · ");
}

export function AuditTrail({ d }: { d: CaseDetail }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="stack">
      <section className="card" data-tour="ledger">
        <div className="card-head"><h3>Money and seat actions (idempotency ledger)</h3></div>
        <div className="card-body">
          {d.ledger.length === 0 ? <span className="muted small">No reservation or capture attempted.</span> : (
            <table className="audit">
              <thead><tr><th>Key</th><th>Status</th><th>When</th><th>Detail</th></tr></thead>
              <tbody>
                {d.ledger.map((l) => (
                  <tr key={l.key} data-ledger-row>
                    <td className="num">{l.key}</td>
                    <td><span className={`tag ${l.status === "succeeded" ? "success" : l.status === "failed" ? "danger" : "neutral"}`}>{l.status}</span></td>
                    <td className="num">{formatIST(l.at)}</td>
                    <td className="small muted">{l.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="muted small" style={{ margin: "8px 0 0" }}>Each key can succeed only once, so replays and double clicks can't capture or book twice.</p>
        </div>
      </section>
      <section className="card">
        <div className="card-head"><h3>Audit trail</h3><span className="muted small">click an AI row to see its raw output</span></div>
        <div className="card-body matrix-wrap">
          <table className="audit">
            <thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Detail</th></tr></thead>
            <tbody>
              {d.audit.map((a) => {
                const expandable = a.detail !== undefined;
                return (
                  <Fragment key={a.id}>
                    <tr className={expandable ? "clickable" : ""} onClick={() => expandable && setOpen(open === a.id ? null : a.id)}>
                      <td className="num" style={{ whiteSpace: "nowrap" }}>{formatIST(a.at)}</td>
                      <td>{a.actor === "ai" ? <Tag kind="ai" /> : a.actor === "razorpay" ? <Tag kind="info">Razorpay</Tag> : ACTOR_LABEL[a.actor]}</td>
                      <td className="num">{a.action}</td>
                      <td className="small muted">{summarise(a.detail)}</td>
                    </tr>
                    {open === a.id && (
                      <tr><td colSpan={4}><pre className="json">{JSON.stringify(a.detail, null, 2)}</pre></td></tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
