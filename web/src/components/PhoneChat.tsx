import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import { formatIST } from "../lib/labels";
import type { CaseDetail } from "../lib/types";

type Run = (label: string, fn: () => Promise<CaseDetail>) => Promise<void>;

const UNKNOWN_NUMBER = "+919999999999";

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function PhoneChat({ d, run, busy, full = false }: { d: CaseDetail; run: Run; busy: boolean; full?: boolean }) {
  const [text, setText] = useState("");
  const [fromUnknown, setFromUnknown] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const name = d.customerName ?? "Customer";
  const contact = d.customer?.contact;

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [d.messages.length, d.state]);

  const send = async (msg: string) => {
    const t = msg.trim();
    if (!t) return;
    setText("");
    await run(`AI is reading ${name}'s message…`, () => api.customerMessage(d.id, t, fromUnknown ? UNKNOWN_NUMBER : undefined));
  };
  const choose = (choice: "accept" | "refund", sessionId?: string) =>
    run(choice === "accept" ? "Reserving the seat, then capturing the payment…" : "Releasing the payment…", () => api.customerChoice(d.id, choice, sessionId));

  const offerOpen = d.state === "OFFER_SENT";
  const suggestions = offerOpen
    ? [
        d.offered[0] ? `${ordinal(new Date(`${d.offered[0].date}T00:00:00Z`).getUTCDate())} works!` : "",
        "haan pehla wala theek hai",
        "either is fine",
        "nah, refund pls",
        "is there parking near the studio?",
      ].filter(Boolean)
    : d.state === "AWAITING_CUSTOMER" || d.state === "MERCHANT_REVIEW"
      ? [
          "I can only do Sunday mornings and I really want Arjun sir",
          "Sunday subah hi ho payega, Arjun sir wala chahiye",
          "Prefer mornings but anything works",
          "Just refund my money please",
          "Please stop messaging me",
        ]
      : [];

  return (
    <div className={`phone ${full ? "full" : ""}`} aria-label={`${name}'s phone (simulated WhatsApp)`}>
      <div className="phone-header">
        <div className="phone-avatar" aria-hidden>C</div>
        <div>
          <div style={{ fontWeight: 600 }}>Clay &amp; Co.</div>
          <div className="sub">Business account · {name}'s phone · simulated</div>
        </div>
      </div>
      <div className="chat" ref={chatRef} aria-live="polite">
        <div className="chat-day">Messages are simulated, not sent</div>
        {d.messages.map((m) => {
          const mine = m.direction === "inbound";
          const unverified = mine && m.fromContact && contact && m.fromContact !== contact;
          return (
            <div key={m.id} className={`bubble ${mine ? "me" : "biz"} ${unverified ? "unverified" : ""}`}>
              {!mine && m.kind === "ai_offer" && <span className="kind tag ai">✦ AI-drafted · approved</span>}
              {unverified && <span className="kind tag danger">from {m.fromContact} (not on booking)</span>}
              {m.text}
              <span className="time num">{formatIST(m.at, false)}</span>
            </div>
          );
        })}
        {offerOpen && d.offered.length > 0 && (
          <div className="chat-offer" role="group" aria-label="Offer options">
            {d.offered.map((s) => (
              <button key={s.id} disabled={busy} onClick={() => choose("accept", s.id)}>
                Book {s.label.split(" · ")[0]}
              </button>
            ))}
            <button className="refund" disabled={busy} onClick={() => choose("refund")}>Refund instead</button>
          </div>
        )}
        {d.state === "RESCUED" && <div className="chat-status">✓ Booking confirmed</div>}
        {d.case.stopContact && <div className="chat-status">Customer opted out. No more messages will be sent.</div>}
      </div>
      {suggestions.length > 0 && (
        <div className="chat-suggest" aria-label="Suggested replies">
          {suggestions.map((s) => (
            <button key={s} disabled={busy} onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={fromUnknown ? `Message as ${UNKNOWN_NUMBER}` : "Type a reply as the customer"}
          aria-label="Reply as the customer"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !text.trim()} aria-label="Send">➤</button>
      </form>
      <label className="small" style={{ padding: "0 12px 10px", display: "flex", gap: 6, alignItems: "center", color: "#667781" }}>
        <input type="checkbox" checked={fromUnknown} onChange={(e) => setFromUnknown(e.target.checked)} />
        Send from a different number (identity test)
      </label>
    </div>
  );
}
