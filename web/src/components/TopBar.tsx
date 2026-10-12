import { useEffect, useRef, useState } from "react";
import { ChevronDown, Eye, EyeOff, Moon, Sparkles, Sun, SunMoon, Volume2, VolumeX } from "lucide-react";
import { lensOn, onLensChange, setLens } from "../../../shared/judgeLens";
import { isMuted, onMuteChange, setMuted, unlock } from "../../../shared/sound";
import { bus } from "../tour/bus";
import { useTour } from "../tour/Tour";
import { RazorpayLogo } from "./Avatar";

type Theme = "system" | "light" | "dark";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("seatsaver.theme") as Theme) || "light";
    } catch {
      return "light";
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
  const next = () => setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));
  return [theme, next];
}

export function TopBar({ route, liveOpen, onToggleLive }: { route: string; liveOpen: boolean; onToggleLive: () => void }) {
  const [theme, nextTheme] = useTheme();
  const [muted, setM] = useState(isMuted);
  const [lens, setL] = useState(lensOn);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tour = useTour();

  useEffect(() => onMuteChange(setM), []);
  useEffect(() => onLensChange(setL), []);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="topbar">
      <a className="brand" href="#/welcome" aria-label="SeatSaver home">
        <span className="brand-logo"><RazorpayLogo tone="dark" height={20} /></span>
        <span className="brand-logo-dark"><RazorpayLogo tone="light" height={20} /></span>
        <span className="brand-divider" aria-hidden />
        <span className="brand-name">SeatSaver <small>for Clay &amp; Co.</small></span>
      </a>
      <nav className="nav" aria-label="Main">
        <a
          href="#/queue"
          data-tour="queue-nav"
          className={["queue", "case"].includes(route) ? "active" : ""}
          onClick={() => bus.emit("nav:queue")}
        >
          Rescue queue
        </a>
        <a href="#/policy" className={route === "policy" ? "active" : ""}>Guardrails</a>
        {tour.status === "closed" || tour.status === "done" ? (
          <a href="#/welcome" onClick={(e) => { e.preventDefault(); tour.restart(); }}>Guided tour</a>
        ) : null}
        <div className="more" ref={menuRef}>
          <button className={`more-btn ${menu ? "open" : ""}`} onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-haspopup="menu">
            More <ChevronDown size={14} />
          </button>
          {menu && (
            <div className="more-menu" role="menu" onClick={() => setMenu(false)}>
              <a role="menuitem" href="#/not-act">When SeatSaver doesn't act</a>
              <a role="menuitem" href="#/demo">Demo controls</a>
              <a role="menuitem" href="#/about">What's real vs simulated</a>
              <a role="menuitem" href="/">← Back to the story</a>
            </div>
          )}
        </div>
      </nav>
      <div className="spacer" />
      <div className="badges">
        <button className={`btn ghost sm ${liveOpen ? "on" : ""}`} onClick={onToggleLive} aria-pressed={liveOpen} title="Live AI panel">
          <Sparkles size={15} /> Live
        </button>
        <button className={`btn ghost sm ${lens ? "on" : ""}`} onClick={() => setLens(!lens)} aria-pressed={lens} title="Show what judges look for">
          {lens ? <Eye size={15} /> : <EyeOff size={15} />} Judge lens
        </button>
        <button className="btn ghost sm" onClick={async () => { await unlock(); setMuted(!muted); }} aria-label={muted ? "Turn sound on" : "Mute"}>
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button className="btn ghost sm" onClick={nextTheme} aria-label={`Theme: ${theme}. Change theme`}>
          {theme === "dark" ? <Moon size={15} /> : theme === "light" ? <Sun size={15} /> : <SunMoon size={15} />}
        </button>
      </div>
    </header>
  );
}
