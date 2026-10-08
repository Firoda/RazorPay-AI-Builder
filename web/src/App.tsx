import { TopBar } from "./components/TopBar";
import { Empty } from "./components/ui";
import { api } from "./lib/api";
import { useHashRoute, usePolling } from "./lib/hooks";
import { CasePage } from "./pages/CasePage";
import { DemoPage } from "./pages/DemoPage";
import { PhonePage } from "./pages/PhonePage";
import { PolicyPage } from "./pages/PolicyPage";
import { QueuePage } from "./pages/QueuePage";
import { StartPage } from "./pages/StartPage";

export function App() {
  const [route, param] = useHashRoute();
  const { data: health } = usePolling(() => api.health(), [], 5000);

  if (route === "phone" && param) {
    return <main style={{ padding: 0 }}><PhonePage id={param} /></main>;
  }

  let page;
  switch (route) {
    case undefined:
      page = <StartPage health={health} />;
      break;
    case "queue":
      page = <QueuePage />;
      break;
    case "case":
      page = param ? <CasePage key={param} id={param} /> : <QueuePage />;
      break;
    case "demo":
      page = <DemoPage />;
      break;
    case "policy":
      page = <PolicyPage />;
      break;
    default:
      page = <Empty title="Page not found"><a href="#/">Go to start</a></Empty>;
  }

  return (
    <>
      <TopBar route={route ?? ""} health={health} />
      <main className="page">{page}</main>
    </>
  );
}
