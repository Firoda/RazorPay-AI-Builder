import { PhoneChat } from "../components/PhoneChat";
import { Banner, BusyLine, Empty } from "../components/ui";
import { useCaseController } from "./CasePage";

/** The customer's phone alone, for mobile checks and phone-only recording. */
export function PhonePage({ id }: { id: string }) {
  const { data: d, error, run, action } = useCaseController(id);
  if (error && !d) return <Empty title="Case not found">{error}</Empty>;
  if (!d) return <div className="muted">Loading…</div>;
  return (
    <div className="stack" style={{ alignItems: "center", padding: 8 }}>
      <div style={{ width: "100%", maxWidth: 420 }} className="stack-sm">
        <BusyLine label={action.busy} startedAt={action.startedAt} />
        {action.error && <Banner tone="danger">{action.error}</Banner>}
      </div>
      <PhoneChat d={d} run={run} busy={Boolean(action.busy)} full />
      <a className="small" href={`#/case/${id}`}>Open the merchant view</a>
    </div>
  );
}
