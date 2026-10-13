import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { CheckCircle2, Play } from "lucide-react";
import { play, unlock } from "../../../shared/sound";
import { Avatar, RazorpayLogo } from "../components/Avatar";
import { Banner } from "../components/ui";
import { api } from "../lib/api";
import { useTour } from "../tour/Tour";

// Setup screen (storyboard §5.1): the bridge from the story. The payment is already done:
// a real Razorpay test payment (from the pool) or an honestly labelled replay of one.

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.5, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export function WelcomePage() {
  const tour = useTour();
  const [phase, setPhase] = useState<"start" | "story" | "ready">("start");
  const [source, setSource] = useState<"razorpay_test" | "simulated">("simulated");
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | undefined>();

  const start = async () => {
    await unlock();
    play("start");
    setError(null);
    setPhase("story");
    try {
      // Creates this visitor's private sandbox and starts Priya's case now, so the live AI runs while they read.
      const s = await api.session.start();
      setSource(s.payment.source);
      setPaymentId(s.payment.id);
      tour.setCase(s.caseId, s.payment.source);
      setTimeout(() => play("ding"), 500);
      setTimeout(() => setPhase("ready"), 1300);
    } catch (err) {
      setError((err as Error).message);
      setPhase("start");
    }
  };

  const real = source === "razorpay_test";

  return (
    <div className="welcome">
      <div className="welcome-visual">
        <div className="welcome-photo" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/P2-01.webp)` }}>
          <div className="welcome-photo-fallback"><Avatar who="ritu" size={96} ring /><span>Ritu · Clay &amp; Co.</span></div>
        </div>
      </div>

      <div className="welcome-content">
        <span className="welcome-kicker">Part 2 · The product</span>
        <h1 className="welcome-title">Remember Priya's ₹2,000?</h1>

        {phase === "start" && (
          <div className="stack" style={{ alignItems: "flex-start" }}>
            <p className="welcome-lead">Her payment is done and held. Let's see what SeatSaver does with it.</p>
            <button className="btn primary welcome-start" onClick={start}><Play size={18} /> Start</button>
            <span className="muted small">Sound on · about 2 minutes · you can leave the guide anytime</span>
            {error && <Banner tone="danger">{error}</Banner>}
          </div>
        )}

        {phase !== "start" && (
          <div className="welcome-cards">
            <motion.div className="w-card" variants={card} initial="hidden" animate="show" custom={0}>
              <div className="w-card-head">
                <RazorpayLogo height={18} />
                <span className={`tag ${real ? "test" : "sim"}`}>{real ? "Test mode · no real money" : "SIMULATED"}</span>
              </div>
              <div className="w-card-title">{real ? "We made a real Razorpay test payment as Priya, the customer." : "A replay of a real Razorpay test payment by Priya, the customer."}</div>
              <div className="w-receipt">
                <span className="num w-amount">₹2,000</span>
                <span className="muted small">Netbanking{paymentId && real ? ` · ${paymentId}` : ""}</span>
                <span className="w-status"><CheckCircle2 size={16} /> Authorised · held</span>
              </div>
            </motion.div>

            <motion.p className="w-intro" variants={card} initial="hidden" animate="show" custom={1}>
              Her seat is gone. <b>SeatSaver</b> turns this held payment into a seat she'll actually take.
            </motion.p>

            {phase === "ready" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="stack" style={{ alignItems: "flex-start" }}>
                <button
                  className="btn primary welcome-start breathe"
                  onClick={() => tour.caseId && tour.begin(tour.caseId, tour.paymentSource)}
                >
                  You're Ritu (owner of Clay &amp; Co.). Open your morning →
                </button>
                <span className="muted small">Gemini is already reading Priya's message in the background.</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
