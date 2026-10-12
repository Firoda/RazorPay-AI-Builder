import { useState } from "react";
import { BRAND } from "../story.config";

/**
 * Official Razorpay logo (vector taken from razorpay.com). `light` = white wordmark for dark surfaces,
 * `dark` = the original navy wordmark for light surfaces. The blue glyph is never recoloured.
 */
export function RazorpayMark({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        className={`rzp-logo rzp-logo-${tone} ${className}`}
        src={tone === "light" ? "/brand/razorpay-light.svg" : "/brand/razorpay.svg"}
        width={140}
        height={30}
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
