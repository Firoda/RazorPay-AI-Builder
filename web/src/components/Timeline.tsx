import { buildTimeline, formatIST } from "../lib/labels";
import type { CaseDetail } from "../lib/types";
import { Tag } from "./ui";

export function Timeline({ d }: { d: CaseDetail }) {
  const items = buildTimeline(d);
  return (
    <section className="card" data-tour="timeline">
      <div className="card-head"><h3>Timeline</h3></div>
      <div className="card-body">
        <ol className="timeline">
          {items.map((it, i) => (
            <li key={i}>
              <span className={`tl-dot ${it.tone}`} aria-hidden>{it.icon}</span>
              <div className="tl-meta num">{formatIST(it.at)}</div>
              <div className="tl-label">
                {it.label}{" "}
                {it.tag === "AI" && <Tag kind="ai" />}
                {it.tag === "SIMULATED" && <Tag kind="sim" />}
                {it.tag === "TEST MODE" && <Tag kind="test" />}
              </div>
              {it.detail && <div className="tl-detail">{it.detail}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
