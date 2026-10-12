import { useEffect, useRef, useState } from "react";
import { unlock } from "../../shared/sound";
import { TopBar } from "./components/TopBar";
import { Empty } from "./components/ui";
import { api } from "./lib/api";
import { useHashRoute, usePolling } from "./lib/hooks";
import { LiveAiPanel } from "./live/LiveAiPanel";
import { CasePage } from "./pages/CasePage";
import { DemoPage } from "./pages/DemoPage";
import { NotActPage } from "./pages/NotActPage";
import { PhonePage } from "./pages/PhonePage";
import { PolicyPage } from "./pages/PolicyPage";
import { QueuePage } from "./pages/QueuePage";
import { StartPage } from "./pages/StartPage";
import { WelcomePage } from "./pages/WelcomePage";
import { TourProvider, useTour } from "./tour/Tour";

export function App() {
  return (
    <TourProvider>
      <Shell />
    </TourProvider>
  );
}

function Shell() {
  const [route, param] = useHashRoute();
  const { data: health } = usePolling(() => api.health(), [], 8000);
  const tour = useTour();
  const [liveManual, setLiveManual] = useState<boolean | null>(null);
  const bootstrapped = useRef(false);

  // Any deliberate click unlocks sound (browsers don't allow audio before a gesture).
  useEffect(() => {
    const once = () => unlock();
    window.addEventListener("pointerdown", once, { once: true });
    return () => window.removeEventListener("pointerdown", once);
  }, []);

  // Visitors who land directly on a product page get their own sandbox (with Priya's case) automatically.
  useEffect(() => {
    if (!health || bootstrapped.current) return;
    if (health.session || route === undefined || route === "welcome") return;
    bootstrapped.current = true;
    api.session.start().then((s) => tour.setCase(s.caseId, s.payment.source)).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health, route]);

  if (route === "phone" && param) {
    return <main style={{ padding: 0 }}><PhonePage id={param} /></main>;
  }

  const liveCaseId = route === "case" && param ? param : tour.caseId;
  const liveOpen = liveManual ?? tour.status === "running";
  const showLive = route === "case" || route === "queue" || tour.status === "running";

  let page;
  switch (route) {
    case undefined:
    case "welcome":
      page = <WelcomePage />;
      break;
    case "queue":
      page = <QueuePage />;
      break;
    case "case":
      page = param ? <CasePage key={param} id={param} /> : <QueuePage />;
      break;
    case "not-act":
      page = <NotActPage />;
      break;
    case "demo":
      page = <DemoPage />;
      break;
    case "policy":
      page = <PolicyPage />;
      break;
    case "about":
      page = <StartPage health={health} />;
      break;
    default:
      page = <Empty title="Page not found"><a href="#/welcome">Go to start</a></Empty>;
  }

  return (
    <div className={`shell ${showLive && liveOpen ? "live-open" : ""} ${tour.status === "running" ? "tour-on" : ""}`}>
      <TopBar route={route ?? "welcome"} liveOpen={showLive && liveOpen} onToggleLive={() => setLiveManual(!(liveOpen && showLive))} />
      <main className="page">{page}</main>
      {showLive && (
        <LiveAiPanel
          caseId={liveCaseId}
          model={health?.aiMode === "gemini" ? health.model : health?.aiMode === "cache-only" ? "cached replies" : "offline stub"}
          open={liveOpen}
          onToggle={() => setLiveManual(!liveOpen)}
        />
      )}
    </div>
  );
}
