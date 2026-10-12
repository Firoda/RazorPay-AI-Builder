import type { ReactNode } from "react";
import { BatteryFull, Lock, LockOpen, Signal, Wifi, X } from "lucide-react";

// Device mockups are HTML/CSS (not images) so dings, shakes and typing stay crisp and animatable.
// All brands are generic: no Razorpay, WhatsApp or bank marks.

export function Phone({ children, className = "", time = "9:00", dark = false }: { children: ReactNode; className?: string; time?: string; dark?: boolean }) {
  return (
    <div className={`phone ${dark ? "phone-dark" : ""} ${className}`}>
      <div className="phone-notch" />
      <div className="phone-status">
        <span className="num">{time}</span>
        <span className="phone-status-icons"><Signal size={12} /><Wifi size={12} /><BatteryFull size={14} /></span>
      </div>
      <div className="phone-screen">{children}</div>
    </div>
  );
}

export function Checkout({ merchant, item, amount, state = "ready" }: { merchant: string; item: string; amount: string; state?: "ready" | "processing" | "failed" }) {
  return (
    <div className="checkout" data-state={state}>
      <div className="checkout-merchant">
        <span className="checkout-logo">C</span>
        <div>
          <div className="checkout-name">{merchant}</div>
          <div className="checkout-item">{item}</div>
        </div>
      </div>
      <div className="checkout-amount num">{amount}</div>
      <div className="checkout-state checkout-ready">
        <button className="checkout-pay" tabIndex={-1}>Pay via UPI<span className="tap-ripple" /></button>
      </div>
      <div className="checkout-state checkout-processing">
        <span className="spinner" />
        <div className="checkout-processing-text">Processing…</div>
        <div className="checkout-hint">Do not press back</div>
      </div>
      <div className="checkout-state checkout-failed">
        <span className="checkout-x"><X size={28} strokeWidth={3} /></span>
        <div className="checkout-failed-title">Payment failed</div>
        <div className="checkout-hint">Please try again</div>
      </div>
    </div>
  );
}

export function SmsNotification({ from, text }: { from: string; text: string }) {
  return (
    <div className="sms">
      <div className="sms-top"><span className="sms-app">Messages</span><span className="sms-now">now</span></div>
      <div className="sms-from">{from}</div>
      <div className="sms-text">{text}</div>
    </div>
  );
}

export function LockNotification({ text }: { text: string }) {
  return (
    <div className="lock-notif">
      <span className="lock-notif-icon">₹</span>
      <div>
        <div className="lock-notif-app">Payments</div>
        <div className="lock-notif-text">{text}</div>
      </div>
    </div>
  );
}

export function ChatHeader({ name }: { name: string }) {
  return (
    <div className="chat-head">
      <span className="chat-avatar">{name[0]}</span>
      <div>
        <div className="chat-name">{name}</div>
        <div className="chat-sub">online</div>
      </div>
    </div>
  );
}

export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <div className={`typing ${className}`} aria-hidden>
      <span /><span /><span />
    </div>
  );
}

export function SeatRow({ total = 8, filled = 7, className = "" }: { total?: number; filled?: number; className?: string }) {
  return (
    <div className={`seat-row ${className}`} aria-label={`${filled} of ${total} seats taken`}>
      {Array.from({ length: total }, (_, i) => (
        <svg key={i} className={`seat ${i < filled ? "seat-filled" : "seat-free"}`} viewBox="0 0 24 24" aria-hidden>
          <ellipse cx="12" cy="7" rx="8" ry="3" />
          <path d="M5 8v2c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V8" />
          <path d="M8 12.2 6.5 21M16 12.2 17.5 21M12 12.6V21" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

export function ClassCard({ title, when, who, left }: { title: string; when: string; who: string; left: string }) {
  return (
    <div className="class-card">
      <div className="class-title">{title}</div>
      <div className="class-when num">{when}</div>
      <div className="class-who"><span className="class-avatar">A</span>{who}</div>
      <SeatRow className="class-seats" />
      <div className="class-left">{left}</div>
    </div>
  );
}

export function BookingLaptop() {
  return (
    <div className="laptop">
      <div className="laptop-screen">
        <div className="booking" data-state="hold">
          <div className="booking-bar"><span className="checkout-logo sm">C</span>Clay &amp; Co. · Book a class</div>
          <div className="booking-body">
            <div className="booking-title">Wheel Basics · Sun 10 AM · with Arjun</div>
            <SeatRow className="booking-seats" />
            <div className="booking-status">
              <span className="booking-soldout">Sold out · 0 left</span>
              <span className="booking-hold"><Lock size={13} className="hold-lock" /><LockOpen size={13} className="hold-unlock" /> Held for another customer · <span className="hold-timer num">0:59</span></span>
              <span className="booking-available">1 seat available</span>
            </div>
            <div className="booking-actions">
              <button className="booking-btn" tabIndex={-1}>Book</button>
              <span className="booking-done">Booked ✓</span>
              <span className="booking-cursor" aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#fff" stroke="#111" strokeWidth="1.5" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

export function Vault({ label = "Auto-refund in" }: { label?: string }) {
  return (
    <div className="vault">
      <div className="vault-top"><Lock size={18} /> <span className="num">₹2,000</span></div>
      <div className="vault-label">{label}</div>
      <div className="vault-count num" data-countdown>2d 13h 58m 00s</div>
    </div>
  );
}
