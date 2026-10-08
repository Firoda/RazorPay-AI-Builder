import type { ReactNode } from "react";
import { useElapsed } from "../lib/hooks";
import { STATE_LABEL, countdownTone, formatCountdown, type Tone } from "../lib/labels";
import { TERMINAL, type CaseState } from "../lib/types";

export function Tag({ kind, children }: { kind: "ai" | "sim" | "test" | Tone; children?: ReactNode }) {
  const text = children ?? (kind === "ai" ? "AI" : kind === "sim" ? "SIMULATED" : kind === "test" ? "Razorpay test mode" : "");
  return <span className={`tag ${kind}`}>{kind === "ai" && "✦ "}{text}</span>;
}

export function StatePill({ state }: { state: CaseState }) {
  const s = STATE_LABEL[state];
  return (
    <span className={`pill ${s.tone}`} role="status">
      <span className="ico" aria-hidden>{s.icon}</span>
      {s.label}
    </span>
  );
}

export function CountdownChip({ ms, state }: { ms: number; state: CaseState }) {
  const closed = TERMINAL.includes(state);
  const tone = countdownTone(ms, closed);
  if (closed) return <span className="pill neutral num">Closed</span>;
  return (
    <span className={`pill ${tone} num`} title="Time left before Razorpay automatically refunds the held payment (demo clock)">
      <span className="ico" aria-hidden>⏱</span>
      {ms > 0 ? `Auto-refund in ${formatCountdown(ms)}` : "Window closed"}
    </span>
  );
}

export function Banner({ tone = "info", children }: { tone?: "info" | "danger" | "warning" | "success" | "ai"; children: ReactNode }) {
  return <div className={`banner ${tone}`} role={tone === "danger" ? "alert" : undefined}>{children}</div>;
}

export function Spinner() {
  return <span className="spinner" aria-hidden />;
}

/** Honest wait indicator for slow AI calls: shows what is happening and for how long. */
export function BusyLine({ label, startedAt }: { label: string | null; startedAt: number | null }) {
  const s = useElapsed(startedAt);
  if (!label) return null;
  return (
    <div className="banner ai" aria-live="polite">
      <Spinner />
      <span>
        {label} <span className="muted num">{s}s</span>
        {s > 15 && <span className="muted small"> · the AI model can take up to a minute when busy</span>}
      </span>
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="card card-pad" style={{ textAlign: "center", padding: 40 }}>
      <h2>{title}</h2>
      <div className="muted" style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}
