import { useState } from "react";
import { BRAND } from "../story.config";

/**
 * Razorpay mark. Uses the official logo file if it's placed at story/public/brand/razorpay.svg;
 * otherwise a plain text wordmark (we don't redraw Razorpay's logo).
 */
export function RazorpayMark({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        className={`rzp-logo ${tone === "light" ? "rzp-logo-light" : ""} ${className}`}
        src="/brand/razorpay.svg"
        alt="Razorpay"
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className={`rzp-wordmark ${tone} ${className}`}>Razorpay</span>;
}

/** Top-left builder credit: Razorpay · AI Build Challenge · Track 2 · by Aditya Firoda */
export function BuilderBadge() {
  return (
    <div className="builder-badge">
      <RazorpayMark />
      <span className="builder-divider" aria-hidden />
      <span className="builder-text">
        <span className="builder-track">{BRAND.track}</span>
        <span className="builder-author">by {BRAND.author}</span>
      </span>
    </div>
  );
}
