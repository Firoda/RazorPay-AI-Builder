import { rupees } from "../lib/labels";
import type { Metrics } from "../lib/types";

/** Outcome ladder: identified → offered → rescued, with released shown separately. Never summed. */
export function OutcomeStrip({ m }: { m: Metrics | null }) {
  const c = m?.counts ?? {};
  const count = (...states: string[]) => states.reduce((a, s) => a + (c[s] ?? 0), 0);
  const tiles = [
    { key: "eligible", label: "Late payments held", value: m?.eligiblePaise, n: Object.entries(c).filter(([s]) => s !== "NO_ACTION").reduce((a, [, v]) => a + v, 0), hint: "Authorised payments for bookings whose seat was gone" },
    { key: "offered", label: "Offered to customers", value: m?.offeredPaise, n: count("OFFER_SENT", "EXECUTING", "RESCUED", "PENDING_RESOLUTION"), hint: "Cases where a seat offer reached the customer" },
    { key: "rescued", label: "Rescued (captured)", value: m?.rescuedPaise, n: count("RESCUED"), hint: "Seat booked and payment captured once" },
    { key: "released", label: "Released / refunded", value: m?.releasedPaise, n: count("RELEASED", "AUTO_REFUNDED"), hint: "Deliberately not captured; money returns to the customer" },
  ];
  return (
    <section className="outcome-strip" aria-label="Outcome ladder">
      {tiles.map((t, i) => (
        <div key={t.key} className={`card outcome-tile ${t.key}`} title={t.hint}>
          <div className="label">
            {i > 0 && i < 3 && <span className="arrow" aria-hidden>→</span>}
            {t.label}
          </div>
          <div className="value num">{rupees(t.value ?? 0)}</div>
          <div className="muted small num">{t.n} case{t.n === 1 ? "" : "s"}</div>
        </div>
      ))}
    </section>
  );
}
