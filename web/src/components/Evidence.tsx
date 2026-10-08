import { LANGUAGE_LABEL, constraintText, rupees, sessionReason } from "../lib/labels";
import type { CaseDetail, Constraint } from "../lib/types";
import { Tag } from "./ui";

export function ConstraintChips({ d }: { d: CaseDetail }) {
  const intent = d.case.intent;
  if (!intent) {
    return (
      <section className="card">
        <div className="card-head"><h3>What the customer needs</h3></div>
        <div className="card-body muted">
          {d.messages.some((m) => m.direction === "inbound")
            ? "The AI hasn't read the customer's messages for this case."
            : "Waiting for the customer to say what works for them."}
        </div>
      </section>
    );
  }
  const chip = (c: Constraint, hard: boolean, i: number) => (
    <div key={`${hard}-${i}`} className={`chip ${hard ? "hard" : ""}`}>
      <span className="chip-top">
        <span aria-label={hard ? "Must have" : "Preference"}>{hard ? "🔒" : "♡"}</span>
        {constraintText(c)}
      </span>
      {c.evidence_quote && <span className="chip-quote">“{c.evidence_quote}”</span>}
    </div>
  );
  const wantsLabel = { alternative: "Wants another session", refund: "Wants a refund", original_only: "Only the original slot", unclear: "Unclear" }[intent.wants];
  return (
    <section className="card">
      <div className="card-head">
        <h3>What the customer needs</h3>
        <Tag kind="ai">read by AI</Tag>
      </div>
      <div className="card-body stack">
        <div className="row wrap small">
          <span className="tag info">{wantsLabel}</span>
          <span className="tag neutral">{LANGUAGE_LABEL[intent.customer_language] ?? intent.customer_language}</span>
          <span className="tag neutral">{intent.seats_needed} seat{intent.seats_needed > 1 ? "s" : ""}</span>
          {intent.sentiment && intent.sentiment !== "calm" && <span className="tag warning">{intent.sentiment}</span>}
          {intent.injection_detected && <span className="tag danger">⚠ instruction injection flagged</span>}
          {intent.stop_contact_requested && <span className="tag danger">asked not to be contacted</span>}
        </div>
        {intent.hard_constraints.length + intent.soft_preferences.length === 0 ? (
          <div className="muted small">No specific requirements stated.</div>
        ) : (
          <div className="row wrap" style={{ alignItems: "stretch" }}>
            {intent.hard_constraints.map((c, i) => chip(c, true, i))}
            {intent.soft_preferences.map((c, i) => chip(c, false, i))}
          </div>
        )}
        {!!d.case.unverifiedConstraints?.length && (
          <div className="row wrap">
            {d.case.unverifiedConstraints.map((c, i) => (
              <div key={i} className="chip warn">
                <span className="chip-top">⚠ Can't check automatically</span>
                <span className="chip-quote">{c.value}</span>
              </div>
            ))}
          </div>
        )}
        {!!intent.open_questions.length && (
          <div className="small muted">Open questions: {intent.open_questions.join(" · ")}</div>
        )}
        {!!d.case.learnedFrom?.length && (
          <div className="banner ai small">✦ Learned from your earlier decision on {d.case.learnedFrom.map((id) => <a key={id} href={`#/case/${id}`}>{id.replace("case_", "case #")} </a>)}</div>
        )}
      </div>
    </section>
  );
}

type Col = "seats" | "price" | "day" | "time" | "instructor" | "policy";

function colFor(reason: string): Col | null {
  if (reason === "no_seats") return "seats";
  if (reason === "price_differs") return "price";
  if (/^violates:(day_of_week|exact_date|date_range)/.test(reason)) return "day";
  if (reason.startsWith("violates:time_window")) return "time";
  if (reason.startsWith("violates:instructor")) return "instructor";
  if (reason.startsWith("violates:")) return "policy";
  return "policy";
}

export function SessionsMatrix({ d }: { d: CaseDetail }) {
  if (!d.candidates.length) {
    return (
      <section className="card">
        <div className="card-head"><h3>Sessions checked</h3></div>
        <div className="card-body muted small">No alternatives evaluated for this case.</div>
      </section>
    );
  }
  const hard = d.case.intent?.hard_constraints ?? [];
  const applies = {
    day: hard.some((h) => ["day_of_week", "exact_date", "date_range"].includes(h.type)),
    time: hard.some((h) => h.type === "time_window"),
    instructor: hard.some((h) => h.type === "instructor"),
  };
  const offered = d.case.offeredSessionIds ?? [];
  const rejected = d.case.recommendation?.rejected_highlight;
  const rows = [...d.candidates].sort((a, b) => {
    const rank = (id: string, feasible: boolean) => (offered.includes(id) ? offered.indexOf(id) : feasible ? 10 : 20);
    return rank(a.sessionId, a.feasible) - rank(b.sessionId, b.feasible) || a.session.date.localeCompare(b.session.date) || a.session.start.localeCompare(b.session.start);
  });

  const cell = (reasons: string[], col: Col, value: string, applicable = true) => {
    const bad = reasons.filter((r) => colFor(r) === col);
    return (
      <td>
        <span className={bad.length ? "cell-bad" : applicable ? "cell-ok" : "muted"} aria-label={bad.length ? "fails" : "passes"}>
          {bad.length ? "✗" : applicable ? "✓" : "·"}
        </span>{" "}
        {value}
        {bad.length > 0 && <span className="cell-reason">{bad.map(sessionReason).join(", ")}</span>}
      </td>
    );
  };

  return (
    <section className="card">
      <div className="card-head">
        <h3>Sessions checked</h3>
        <span className="muted small">filtered by code · ranked by AI</span>
      </div>
      <div className="card-body matrix-wrap">
        <table className="matrix">
          <thead>
            <tr>
              <th>Session</th><th>Seats</th><th>Price</th><th>Day</th><th>Time</th><th>Instructor</th><th>Policy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ sessionId, feasible, reasons, session: s }) => {
              const isOffered = offered.includes(sessionId);
              const isRule = d.ruleBaselineSessionId === sessionId;
              const [dayPart, timePart] = s.label.split(", ");
              return (
                <tr key={sessionId} className={isOffered ? "offered" : feasible ? "" : "infeasible"}>
                  <td>
                    <div style={{ fontWeight: 600 }} className="num">{s.label.split(" · ")[0]}</div>
                    <div className="muted small">{s.label.split(" · ")[1]}</div>
                    <div className="row wrap small" style={{ gap: 4, marginTop: 2 }}>
                      {isOffered && <span className="tag success">Offered #{offered.indexOf(sessionId) + 1}</span>}
                      {sessionId === d.case.originalSessionId && <span className="tag neutral">Original booking</span>}
                      {isRule && !isOffered && <span className="tag warning" title="What 'offer the next same-price slot' would pick, ignoring the customer's words">A fixed rule would offer this</span>}
                      {isRule && isOffered && <span className="tag info">Rule agrees</span>}
                    </div>
                    {rejected?.session_id === sessionId && <div className="cell-reason">✦ AI: {rejected.reason}</div>}
                  </td>
                  {cell(reasons, "seats", String(s.seatsLeft))}
                  {cell(reasons, "price", rupees(s.pricePaise))}
                  {cell(reasons, "day", dayPart, applies.day)}
                  {cell(reasons, "time", (timePart ?? "").split(" · ")[0], applies.time)}
                  {cell(reasons, "instructor", s.instructor, applies.instructor)}
                  {cell(reasons, "policy", reasons.some((r) => colFor(r) === "policy") ? "" : "OK")}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted small" style={{ margin: "8px 0 0" }}>
          ✓ meets the requirement · ✗ ruled out · <span aria-hidden>·</span> not a stated requirement. The AI may only choose among rows with no ✗.
        </p>
      </div>
    </section>
  );
}
