import { useEffect, useRef, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { reasonText } from "../lib/labels";

// The Live AI panel: plain-English lines streamed from the server's real audit log (SSE).
// Nothing here is scripted; if a line appears, the system actually did it.

interface LiveLine {
  id: string;
  at: string;
  kind: "ai" | "check" | "razorpay" | "merchant" | "customer" | "warn" | "success" | "info";
  text: string;
  pending?: "intent" | "recommend" | "reply";
  resolves?: "intent" | "recommend" | "reply";
  ms?: number;
  cached?: boolean;
  reason?: string;
}

const ICON: Record<LiveLine["kind"], string> = {
  ai: "✦", check: "✓", razorpay: "₹", merchant: "◉", customer: "◍", warn: "!", success: "✓", info: "•",
};

function clock(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export function useLiveFeed(caseId: string | undefined) {
  const [lines, setLines] = useState<LiveLine[]>([]);
  useEffect(() => {
    setLines([]);
    if (!caseId) return;
    const es = new EventSource(`/api/live/${caseId}`);
    es.addEventListener("line", (ev) => {
      const line = JSON.parse((ev as MessageEvent).data) as LiveLine;
      setLines((prev) => (prev.some((l) => l.id === line.id) ? prev : [...prev, line]));
    });
    return () => es.close();
  }, [caseId]);
  return lines;
}

function Elapsed({ since }: { since: number }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="num">{Math.max(0, Math.floor((Date.now() - since) / 1000))}s</span>;
}

export function LiveFeed({ caseId, compact = false }: { caseId: string | undefined; compact?: boolean }) {
  const lines = useLiveFeed(caseId);
  const listRef = useRef<HTMLDivElement>(null);
  const seenAt = useRef(new Map<string, number>());
  lines.forEach((l) => {
    if (!seenAt.current.has(l.id)) seenAt.current.set(l.id, Date.now());
  });

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [lines.length]);

  // A pending line is "resolved" when a later line resolves the same AI call kind.
  const resolvedPending = new Set<string>();
  lines.forEach((l, i) => {
    if (!l.pending) return;
    if (lines.slice(i + 1).some((m) => m.resolves === l.pending)) resolvedPending.add(l.id);
  });

  return (
    <div className={`live-list ${compact ? "compact" : ""}`} ref={listRef} aria-live="polite">
      {lines.length === 0 && <div className="live-empty">Waiting for activity…</div>}
      {lines.map((l) => {
        const pending = l.pending && !resolvedPending.has(l.id);
        return (
          <div key={l.id} className={`live-line live-${l.kind} ${pending ? "is-pending" : ""}`}>
            <span className="live-time num">{clock(l.at)}</span>
            <span className="live-icon" aria-hidden>{pending ? <span className="live-spin" /> : ICON[l.kind]}</span>
            <span className="live-text">
              {l.kind === "razorpay" && <span className="live-tag">Razorpay</span>}
              {l.text}
              {l.reason && <span className="live-reason"> · {reasonText(l.reason)}</span>}
              {pending && <span className="live-meta"> <Elapsed since={seenAt.current.get(l.id) ?? Date.now()} /></span>}
              {typeof l.ms === "number" && <span className="live-meta"> {(l.ms / 1000).toFixed(1)}s{l.cached ? " · cached" : ""}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function LiveAiPanel({ caseId, model, open, onToggle }: { caseId: string | undefined; model: string; open: boolean; onToggle: () => void }) {
  if (!open) {
    return (
      <button className="live-tab" onClick={onToggle} aria-label="Open the Live AI panel">
        <Sparkles size={14} /> Live
      </button>
    );
  }
  return (
    <aside className="live-panel" aria-label="Live AI activity">
      <div className="live-head">
        <span className="live-dot" aria-hidden />
        <span className="live-title">LIVE</span>
        <span className="live-model">{model}</span>
        <button className="btn ghost sm live-close" onClick={onToggle} aria-label="Collapse the Live AI panel"><ChevronRight size={16} /></button>
      </div>
      <p className="live-sub">What the system is doing right now, straight from its audit log.</p>
      <LiveFeed caseId={caseId} />
    </aside>
  );
}
