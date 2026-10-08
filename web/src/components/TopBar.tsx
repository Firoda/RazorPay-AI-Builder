import { useEffect, useState } from "react";
import { formatIST } from "../lib/labels";
import type { Health } from "../lib/types";
import { Tag } from "./ui";

type Theme = "system" | "light" | "dark";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("seatsaver.theme") as Theme) || "system";
    } catch {
      return "system";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("seatsaver.theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);
  const next = () => setTheme((t) => (t === "system" ? "dark" : t === "dark" ? "light" : "system"));
  return [theme, next];
}

export function TopBar({ route, health }: { route: string; health: Health | null }) {
  const [theme, nextTheme] = useTheme();
  const link = (path: string, label: string, match: string[]) => (
    <a href={`#/${path}`} className={match.includes(route) ? "active" : ""}>{label}</a>
  );
  const ai = health?.aiMode === "gemini" ? health.model : health?.aiMode === "cache-only" ? "cached replies" : "offline stub";
  return (
    <header className="topbar">
      <a className="brand" href="#/" aria-label="SeatSaver home">
        <span className="brand-mark" aria-hidden>✓</span>
        <span>SeatSaver <small>· Clay &amp; Co.</small></span>
      </a>
      <nav className="nav" aria-label="Main">
        {link("queue", "Rescue queue", ["queue", "case"])}
        {link("demo", "Demo controls", ["demo"])}
        {link("policy", "Policy", ["policy"])}
      </nav>
      <div className="spacer" />
      <div className="badges">
        {health && (
          <>
            <Tag kind="ai">{ai}</Tag>
            {health.razorpayTest ? <Tag kind="test">Razorpay test API on</Tag> : <Tag kind="sim">Razorpay simulated</Tag>}
            <span className="tag neutral num" title="Demo clock (scenarios run on a simulated clock)">🕒 {formatIST(health.now)}</span>
          </>
        )}
        <button className="btn ghost sm" onClick={nextTheme} aria-label={`Theme: ${theme}. Change theme`}>
          {theme === "dark" ? "☾" : theme === "light" ? "☀" : "◐"}
        </button>
      </div>
    </header>
  );
}
