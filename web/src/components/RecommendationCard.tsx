import { useEffect, useState } from "react";
import { api, type MerchantAction } from "../lib/api";
import { formatIST, reasonText, rupees } from "../lib/labels";
import type { CaseDetail, Session } from "../lib/types";
import { Banner, Tag } from "./ui";

type Run = (label: string, fn: () => Promise<CaseDetail>) => Promise<void>;

const REJECT_REASONS = ["Wrong session", "Customer would prefer a refund", "Weekend customers don't want weekdays", "I'll call the customer", "Other"];

export function RecommendationCard({ d, run, busy }: { d: CaseDetail; run: Run; busy: boolean }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const c = d.case;
  const rec = c.recommendation;
  const act = (label: string, action: MerchantAction) => run(label, () => api.merchant(d.id, action));
  const releaseBtn = (
    <button className="btn danger" disabled={busy} onClick={() => act("Releasing the payment…", { type: "release" })}>
      Release · let it refund
    </button>
  );
  const deadline = d.payment ? formatIST(d.payment.captureDeadline) : "";

  let body: React.ReactNode;
  switch (d.state) {
    case "MERCHANT_REVIEW":
      body = (
        <div className="stack">
          <div className="row wrap">
            <h2>Offer {d.offered.length} session{d.offered.length > 1 ? "s" : ""} at the same price</h2>
            {rec && <Tag kind="ai">confidence: {rec.confidence}</Tag>}
          </div>
          <div className="rec-options">
            {d.offered.map((s, i) => {
              const opt = rec?.ranked_options.find((o) => o.session_id === s.id);
              return (
                <div key={s.id} className="rec-option">
                  <div className="rank">OPTION {i + 1}</div>
                  <div className="name num">{s.label}</div>
                  <div className="muted small">{s.seatsLeft} seat{s.seatsLeft === 1 ? "" : "s"} left · {rupees(s.pricePaise)} · no extra charge</div>
                  {opt?.fit_explanation && <div className="small" style={{ marginTop: 4 }}>✦ {opt.fit_explanation}</div>}
                </div>
              );
            })}
          </div>
          {rec?.merchant_summary && (
            <div className="ai-block small"><Tag kind="ai">summary</Tag> {rec.merchant_summary}</div>
          )}
          {c.offerMessage && (
            <div className="stack-sm">
              <span className="section-title">Message the customer will get</span>
              <div className="msg-preview" data-tour="offer-preview">{c.offerMessage}</div>
              <span className="muted small">Amounts and dates are filled in by code, never written by the AI.</span>
            </div>
          )}
          {d.reason === "unverified_constraints" && <Banner tone="warning">{reasonText(d.reason)}</Banner>}
          <div className="actions">
            <button className="btn primary" data-tour="approve-btn" disabled={busy} onClick={() => act("Sending the offer…", { type: "approve" })}>
              Approve &amp; send
            </button>
            <button className="btn" disabled={busy} onClick={() => setEditing(true)}>Edit</button>
            <button className="btn" disabled={busy} onClick={() => setRejecting((v) => !v)} aria-expanded={rejecting}>Reject</button>
            <div className="spacer" />
            {releaseBtn}
          </div>
          {rejecting && (
            <div className="stack-sm">
              <span className="small muted">Why? This is remembered for similar cases.</span>
              <div className="reject-reasons">
                {REJECT_REASONS.map((r) => (
                  <button key={r} className={reason === r ? "active" : ""} onClick={() => setReason(r)}>{r}</button>
                ))}
              </div>
              <div>
                <button className="btn danger sm" disabled={busy || !reason} onClick={() => act("Recording your decision…", { type: "reject", reasonChip: reason ?? undefined })}>
                  Reject proposal
                </button>
              </div>
            </div>
          )}
        </div>
      );
      break;
    case "RESTORE_PROPOSED":
      body = (
        <div className="stack">
          <h2>The original seat is free again</h2>
          <p className="muted" style={{ margin: 0 }}>{d.originalSession}. Restoring it reserves the seat, then captures the held {d.amount}. No AI was needed for this case.</p>
          <div className="actions">
            <button className="btn primary" disabled={busy} onClick={() => act("Reserving the seat, then capturing…", { type: "approve" })}>
              Restore &amp; capture {d.amount}
            </button>
            <div className="spacer" />
            {releaseBtn}
          </div>
        </div>
      );
      break;
    case "AWAITING_CUSTOMER":
      body = (
        <div className="stack">
          <h2>Waiting for {d.customerName}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {d.decision === "ask_customer"
              ? "Their intent was unclear, so SeatSaver asked whether they want another session or a refund."
              : "SeatSaver told the customer their money is safe and asked what works for them. Nothing is captured until they accept an offer."}
          </p>
          <div className="actions"><div className="spacer" />{releaseBtn}</div>
        </div>
      );
      break;
    case "OFFER_SENT":
      body = (
        <div className="stack">
          <h2>Offer sent · waiting for {d.customerName}</h2>
          <div className="row wrap">{d.offered.map((s) => <span key={s.id} className="tag info num">{s.label}</span>)}</div>
          {d.flags.includes("customer_question") && <Banner tone="warning">The customer asked a question. Reply to them directly; the offer stays open until {deadline}.</Banner>}
          <p className="muted small" style={{ margin: 0 }}>The payment stays held. It's captured only after the customer accepts and the seat is reserved.</p>
          <div className="actions"><div className="spacer" />{releaseBtn}</div>
        </div>
      );
      break;
    case "ESCALATED":
      body = (
        <div className="stack">
          <h2>Needs your decision</h2>
          <Banner tone="danger"><span>{reasonText(d.reason)}</span></Banner>
          {d.moneyMode === "capture" && (
            <div className="actions">
              <button className="btn" disabled={busy} onClick={() => setEditing(true)}>Choose a session &amp; send an offer</button>
              <div className="spacer" />
              {releaseBtn}
            </div>
          )}
        </div>
      );
      break;
    case "PENDING_RESOLUTION":
      body = (
        <div className="stack">
          <h2>A step failed. Nothing was charged twice.</h2>
          <Banner tone="danger">{reasonText(d.reason)}</Banner>
          <p className="muted small" style={{ margin: 0 }}>Retry before {deadline}, or Razorpay returns the money automatically and any held seat is released.</p>
          <div className="actions">
            <button className="btn primary" disabled={busy} onClick={() => act("Retrying…", { type: "retry" })}>Retry</button>
            <div className="spacer" />
            {releaseBtn}
          </div>
        </div>
      );
      break;
    case "RESCUED": {
      const s = d.candidates.find((x) => x.sessionId === c.rescuedSessionId)?.session ?? d.offered.find((x) => x.id === c.rescuedSessionId);
      const real = d.payment?.source === "razorpay_test";
      body = (
        <div className="stack">
          <Banner tone="success">
            <div className="stack-sm">
              <strong style={{ fontSize: 16 }}>✓ Rescued. {d.customerName} is booked{s ? ` for ${s.label}` : ""}.</strong>
              <span>
                {d.moneyMode === "capture" ? `${d.amount} captured once` : `Rebooked; ${d.amount} was already captured`} · {d.payment?.id}{" "}
                {real ? <Tag kind="test" /> : <Tag kind="sim" />}
              </span>
            </div>
          </Banner>
        </div>
      );
      break;
    }
    default:
      body = (
        <div className="stack">
          <h2>{d.state === "RELEASED" ? "Released: not captured" : d.state === "AUTO_REFUNDED" ? "Auto-refunded" : "No action needed"}</h2>
          <p style={{ margin: 0 }}>{reasonText(d.reason)}</p>
          {d.state === "RELEASED" && <p className="muted small" style={{ margin: 0 }}>Razorpay returns the held {d.amount} automatically by {deadline}.</p>}
        </div>
      );
  }

  return (
    <section className="card rec-card" aria-label="Decision" data-tour="decision">
      <div className="card-body">{body}</div>
      {editing && <EditOfferModal d={d} onClose={() => setEditing(false)} onSubmit={async (sessionIds, message) => {
        setEditing(false);
        await act("Sending your edited offer…", { type: "edit", sessionIds, message: message || undefined });
      }} />}
    </section>
  );
}

function EditOfferModal({ d, onClose, onSubmit }: { d: CaseDetail; onClose: () => void; onSubmit: (ids: string[], message: string) => void }) {
  const [sessions, setSessions] = useState<Session[]>(d.candidates.map((c) => c.session));
  const [picked, setPicked] = useState<string[]>(d.case.offeredSessionIds ?? []);
  const [message, setMessage] = useState("");
  const originalPrice = d.candidates.find((c) => c.sessionId === d.case.originalSessionId)?.session.pricePaise ?? d.amountPaise;
  const seatsNeeded = d.booking?.seats ?? 1;

  useEffect(() => {
    if (sessions.length) return;
    api.studio().then((s) => setSessions(s.sessions.map((x) => ({ ...x, label: `${x.date} ${x.start} · ${x.workshopType} with ${x.instructor}`, seatsLeft: x.capacity - x.booked }))));
  }, [sessions.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= 2 ? [p[1], id] : [...p, id]));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal" role="dialog" aria-modal="true" aria-label="Edit offer" onClick={(e) => e.stopPropagation()}>
        <div className="card-head"><h2>Edit offer</h2><div className="spacer" /><button className="btn ghost sm" onClick={onClose} aria-label="Close">✕</button></div>
        <div className="card-body stack">
          <span className="muted small">Pick 1–2 sessions. Only same-price sessions with seats can be offered (v1 never asks for more money).</span>
          <div className="stack-sm">
            {[...sessions].sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)).map((s) => {
              const why = s.id === d.case.originalSessionId ? "Original (full)" : s.pricePaise !== originalPrice ? "Different price" : s.seatsLeft < seatsNeeded ? "No seats" : null;
              const sel = picked.includes(s.id);
              return (
                <label key={s.id} className={`session-pick ${why ? "disabled" : ""} ${sel ? "selected" : ""}`}>
                  <input type="checkbox" checked={sel} disabled={!!why} onChange={() => toggle(s.id)} />
                  <span className="stack-sm" style={{ gap: 0 }}>
                    <span className="num" style={{ fontWeight: 600 }}>{s.label}</span>
                    <span className="muted small">{why ?? `${s.seatsLeft} seats left · ${rupees(s.pricePaise)}`}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <label className="field">
            Custom message <span className="muted small">(optional; leave empty to use the standard wording. Placeholders: {"{{NAME}} {{AMOUNT}} {{SESSION_1}} {{SESSION_2}}"})</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hi {{NAME}}, we can move you to {{SESSION_1}} at no extra charge…" />
          </label>
          <div className="banner ai small">✦ Your correction is remembered and used as an example for similar future cases.</div>
          <div className="actions">
            <button className="btn primary" disabled={!picked.length} onClick={() => onSubmit(picked, message)}>Send offer</button>
            <button className="btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
