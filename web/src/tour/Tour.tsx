import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import { notesFor, lensOn } from "../../../shared/judgeLens";
import { play } from "../../../shared/sound";
import { Avatar } from "../components/Avatar";
import { api } from "../lib/api";
import { navigate } from "../lib/hooks";
import { reasonText } from "../lib/labels";
import type { CaseDetail } from "../lib/types";
import { confetti, flyWordsToChips, ghostTap, hideGhost, offerFlight, ruleRace, seatThenMoney, stampLedger } from "../fx/fx";
import { removeAll } from "../fx/ghost";
import { bus } from "./bus";
import { BLOCKED_STATES, STEPS, type TourStep } from "./steps";

type Status = "idle" | "running" | "closed" | "done";

interface TourState {
  status: Status;
  step: number;
  caseId?: string;
  paymentSource?: "razorpay_test" | "simulated";
  celebrated?: boolean;
}

interface TourApi extends TourState {
  begin: (caseId: string, paymentSource?: TourState["paymentSource"]) => void;
  setCase: (caseId: string, paymentSource?: TourState["paymentSource"]) => void;
  close: () => void;
  resume: () => void;
  restart: () => void;
  step0: TourStep | undefined;
}

const KEY = "ss.tour";
const Ctx = createContext<TourApi | null>(null);

export function useTour(): TourApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTour outside TourProvider");
  return v;
}

function load(): TourState {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as TourState;
  } catch {
    /* ignore */
  }
  return { status: "idle", step: 0 };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForElement(sel: string, token: () => boolean, timeoutMs = 12000): Promise<Element | null> {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs && token()) {
    const el = document.querySelector(sel);
    if (el && (el as HTMLElement).offsetParent !== null) return el;
    await sleep(120);
  }
  return null;
}

function hashRoute(): string {
  return window.location.hash.replace(/^#\/?/, "");
}

export function TourProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TourState>(load);
  const [doneOpen, setDoneOpen] = useState(false);
  const drv = useRef<Driver | null>(null);
  const runToken = useRef(0);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const destroyDriver = () => {
    drv.current?.destroy();
    drv.current = null;
  };

  const goto = useCallback((step: number) => setState((s) => ({ ...s, step, status: step >= STEPS.length ? "done" : "running" })), []);

  const close = useCallback(() => {
    runToken.current++;
    destroyDriver();
    removeAll();
    setState((s) => (s.status === "done" ? s : { ...s, status: "closed" }));
  }, []);

  const api_: TourApi = {
    ...state,
    step0: STEPS[state.step],
    begin: (caseId, paymentSource) => setState({ status: "running", step: 0, caseId, paymentSource }),
    setCase: (caseId, paymentSource) => setState((s) => ({ ...s, caseId, paymentSource })),
    close,
    resume: () => setState((s) => ({ ...s, status: "running" })),
    restart: () => {
      close();
      navigate("/welcome");
      setState({ status: "idle", step: 0 });
    },
  };

  // Drive the current step.
  useEffect(() => {
    if (state.status === "done") {
      destroyDriver();
      removeAll();
      if (state.celebrated) return; // the done card shows once, not on every reload or route change
      setState((s) => ({ ...s, celebrated: true }));
      setDoneOpen(true);
      play("success");
      confetti();
      return;
    }
    if (state.status !== "running" || !state.caseId) return;
    const myToken = ++runToken.current;
    const alive = () => runToken.current === myToken;
    const step = STEPS[state.step];
    if (!step) return;
    const caseId = state.caseId;
    let offEvent: (() => void) | null = null;

    const fetchCase = async (): Promise<CaseDetail | null> => {
      try {
        const d = await api.case(caseId);
        bus.emit("case:update", d);
        return d;
      } catch {
        return null;
      }
    };

    const ensureDriver = () => {
      if (!drv.current) {
        drv.current = driver({
          animate: true,
          overlayOpacity: 0.55,
          stagePadding: 8,
          stageRadius: 14,
          allowClose: true,
          overlayClickBehavior: "none",
          popoverClass: "ss-tour",
          smoothScroll: true,
          allowKeyboardControl: false,
          onCloseClick: () => close(),
        });
      }
      return drv.current;
    };

    const lens = () =>
      lensOn()
        ? notesFor(2, step.id === "ledger" ? "audit" : step.id === "timeline" ? "needs" : step.id)
            .map((n) => `<div class="ss-lens"><b>${n.label}</b> ${n.text}</div>`)
            .join("")
        : "";

    const show = (el: Element, opts: { body?: string; buttons: ("next" | "previous" | "close")[]; nextText?: string; onNext?: () => void; disableNext?: boolean }) => {
      ensureDriver().highlight({
        element: el as HTMLElement,
        popover: {
          title: step.title,
          description: `${opts.body ?? step.body}${lens()}`,
          showButtons: opts.buttons,
          disableButtons: opts.disableNext ? ["next"] : [],
          nextBtnText: opts.nextText ?? "Next →",
          prevBtnText: "← Back",
          side: "bottom",
          align: "start",
          onNextClick: () => opts.onNext?.(),
          onPrevClick: () => goto(Math.max(0, state.step - 1)),
          onCloseClick: () => close(),
        },
      });
    };

    (async () => {
      // Route: click steps wait for the viewer; other steps bring the right page into view.
      const r = hashRoute();
      if (step.route === "case" && !r.startsWith(`case/${caseId}`)) navigate(`/case/${caseId}`);
      if (step.route === "queue" && !r.startsWith("queue")) navigate("/queue");

      const el = await waitForElement(step.target, alive);
      if (!alive()) return;
      if (!el) {
        close();
        return;
      }

      // Wait for live AI results (honest wait, never a dead screen).
      if (step.waitFor) {
        let d = await fetchCase();
        if (d && !step.waitFor(d)) {
          show(el, { body: `<div class="ss-wait"><span class="ss-spin"></span>${step.waitText ?? "Working…"}</div>`, buttons: ["close"] });
          while (alive() && d && !step.waitFor(d) && !BLOCKED_STATES.includes(d.state)) {
            await sleep(1000);
            d = await fetchCase();
          }
        }
        if (!alive()) return;
        if (d && !step.waitFor(d) && BLOCKED_STATES.includes(d.state)) {
          show(el, {
            body: `<div class="ss-blocked">${reasonText(d.reason)}</div><p>The live AI step didn't complete, so this walkthrough can't continue automatically. You can explore the case yourself, or restart.</p>`,
            buttons: ["close"],
          });
          return;
        }
      }

      if (step.advance) {
        show(el, { body: `${step.body}<div class="ss-hint">👆 ${step.advance.hint}</div>`, buttons: ["previous", "close"] });
        offEvent = bus.on(step.advance.event, () => {
          if (alive()) goto(state.step + 1);
        });
        return;
      }

      if (step.action) {
        show(el, {
          buttons: ["previous", "next", "close"],
          nextText: step.nextText,
          onNext: async () => {
            destroyDriver(); // let the viewer watch the character act
            const d = await fetchCase();
            if (!d || !alive()) return;
            try {
              if (step.action === "approve") {
                await ghostTap(document.querySelector('[data-tour="approve-btn"]'), "ritu");
                const res = await api.merchant(caseId, { type: "approve" });
                bus.emit("case:update", res);
                await sleep(250);
                await offerFlight();
                hideGhost("ritu");
              } else {
                const sid = d.case.offeredSessionIds?.[0];
                await sleep(300);
                await ghostTap(document.querySelector(`[data-offer-session="${sid}"]`), "priya");
                const res = await api.customerChoice(caseId, "accept", sid);
                bus.emit("case:update", res);
                hideGhost("priya");
                await seatThenMoney(res.amount ?? "₹2,000");
                play("success");
              }
            } catch (err) {
              console.error(err);
            }
            if (alive()) goto(state.step + 1);
          },
        });
        return;
      }

      show(el, { buttons: ["previous", "next", "close"], onNext: () => goto(state.step + 1) });
      if (step.fx === "words") await flyWordsToChips();
      if (step.fx === "race") {
        const d = await fetchCase();
        if (d && alive()) await ruleRace(d.ruleBaselineSessionId, d.case.offeredSessionIds?.[0]);
      }
      if (step.fx === "stamps") await stampLedger();
    })();

    return () => {
      offEvent?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.step, state.caseId]);

  return (
    <Ctx.Provider value={api_}>
      {children}
      {state.status === "running" && <MissionBar step={state.step} />}
      {state.status === "closed" && (
        <button className="resume-pill" onClick={() => api_.resume()}>▶ Resume tour</button>
      )}
      {doneOpen && <DoneCard onClose={() => setDoneOpen(false)} />}
    </Ctx.Provider>
  );
}

function MissionBar({ step }: { step: number }) {
  const s = STEPS[step];
  if (!s) return null;
  const priya = s.persona === "priya";
  return (
    <div className="mission-bar" role="status" aria-live="polite">
      <Avatar who={priya ? "priya" : "ritu"} size={26} ring />
      <span className="mission-text">{priya ? "Now watch Priya's phone" : <>You are <b>Ritu</b>, the studio owner</>}</span>
      <span className="mission-step num">Step {step + 1} of {STEPS.length}</span>
      <span className="mission-progress"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></span>
    </div>
  );
}

function DoneCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="done-backdrop" role="dialog" aria-modal="true" aria-label="You rescued ₹2,000">
      <div className="done-card">
        <div className="done-hero" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/P2-02.webp), linear-gradient(135deg, #305eff, #7a5af8)` }} />
        <div className="done-body">
          <h2>You rescued ₹2,000.</h2>
          <p className="muted">Priya keeps her Sunday. Ritu keeps the sale. Razorpay keeps the payment.</p>
          <div className="done-stats">
            <div><b className="num">1</b><span>seat filled</span></div>
            <div><b className="num">₹2,000</b><span>kept, captured once</span></div>
            <div><b className="num">0</b><span>support tickets</span></div>
          </div>
          <div className="actions" style={{ justifyContent: "center" }}>
            <button className="btn primary" onClick={() => { onClose(); navigate("/not-act"); }}>See when SeatSaver chooses NOT to act →</button>
            <button className="btn" onClick={onClose}>Explore on your own</button>
          </div>
        </div>
      </div>
    </div>
  );
}
