import { useState } from "react";

// Character avatars from the OpenAI image set (web/public/img/P2-0x.webp); initials until the image exists.
const PEOPLE = {
  priya: { name: "Priya", img: "P2-03", bg: "#f1c27d", fg: "#4a2b14" },
  ritu: { name: "Ritu", img: "P2-04", bg: "#e4704a", fg: "#fff" },
  arjun: { name: "Arjun", img: "P1-10", bg: "#6b8f5e", fg: "#fff" },
  arnav: { name: "Arnav", img: "P2-05", bg: "#94a3b8", fg: "#fff" },
  sneha: { name: "Sneha", img: "P2-06", bg: "#2a9d8f", fg: "#fff" },
  amit: { name: "Amit", img: "P2-07", bg: "#475569", fg: "#fff" },
  rohan: { name: "Rohan", img: "P2-08", bg: "#305eff", fg: "#fff" },
} as const;

export type Person = keyof typeof PEOPLE;

export function Avatar({ who, size = 32, ring = false }: { who: Person; size?: number; ring?: boolean }) {
  const p = PEOPLE[who];
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`avatar ${ring ? "avatar-ring" : ""}`}
      style={{ width: size, height: size, background: p.bg, color: p.fg, fontSize: size * 0.42 }}
      title={p.name}
    >
      {!failed ? (
        <img src={`${import.meta.env.BASE_URL}img/${p.img}.webp`} alt={p.name} onError={() => setFailed(true)} />
      ) : (
        p.name[0]
      )}
    </span>
  );
}

export function RazorpayLogo({ tone = "dark", height = 20 }: { tone?: "dark" | "light"; height?: number }) {
  return (
    <img
      className="rzp-logo"
      src={`${import.meta.env.BASE_URL}brand/${tone === "light" ? "razorpay-light" : "razorpay"}.svg`}
      alt="Razorpay"
      height={height}
      width={Math.round((height * 140) / 30)}
    />
  );
}
