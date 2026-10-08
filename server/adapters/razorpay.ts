import { createHmac, timingSafeEqual } from "node:crypto";
import { DAY_MS } from "../domain/time";
import type { Payment } from "../domain/types";
import type { Store } from "../store/memoryStore";

export interface PaymentGateway {
  /** Fetch authoritative current state (events are snapshots and may be stale). */
  getPayment(payment: Payment): Promise<Payment>;
  /** Capture an authorised payment. Throws on failure. */
  capture(payment: Payment, amountPaise: number): Promise<Payment>;
}

/** Simulated Razorpay used for synthetic scenarios. Mirrors the documented state rules. */
export class SimulatedGateway implements PaymentGateway {
  constructor(private store: Store) {}

  async getPayment(payment: Payment): Promise<Payment> {
    return this.store.payments.get(payment.id) ?? payment;
  }

  async capture(payment: Payment, amountPaise: number): Promise<Payment> {
    if (this.store.faults.captureFailures > 0) {
      this.store.faults.captureFailures--;
      throw new Error("Simulated gateway error (fault injection)");
    }
    const p = this.store.payments.get(payment.id);
    if (!p) throw new Error("payment not found");
    if (p.status !== "authorized") throw new Error(`BAD_REQUEST_ERROR: payment status is ${p.status}, only authorized payments can be captured`);
    if (p.amountPaise !== amountPaise) throw new Error("BAD_REQUEST_ERROR: capture amount must equal the authorised amount");
    p.status = "captured";
    p.capturedAt = this.store.nowIso();
    return p;
  }
}

type RazorpayPaymentEntity = {
  id: string;
  amount: number;
  currency: string;
  status: Payment["status"];
  method: string;
  order_id?: string;
  created_at: number;
  captured?: boolean;
  refund_status?: string | null;
  amount_refunded?: number;
  notes?: Record<string, string> | unknown[];
};

/** Real Razorpay API in TEST mode (key_id/key_secret from env). */
export class RazorpayTestGateway implements PaymentGateway {
  private auth: string;
  constructor(keyId: string, keySecret: string, private store: Store) {
    if (!keyId.startsWith("rzp_test_")) throw new Error("Refusing to run with non-test Razorpay keys");
    this.auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  }

  async getPayment(payment: Payment): Promise<Payment> {
    const res = await fetch(`https://api.razorpay.com/v1/payments/${payment.id}`, { headers: { Authorization: this.auth } });
    if (!res.ok) throw new Error(`Razorpay fetch failed: ${res.status} ${await res.text()}`);
    return this.merge(payment, (await res.json()) as RazorpayPaymentEntity);
  }

  async capture(payment: Payment, amountPaise: number): Promise<Payment> {
    if (this.store.faults.captureFailures > 0) {
      this.store.faults.captureFailures--;
      throw new Error("Simulated gateway error (fault injection)");
    }
    const res = await fetch(`https://api.razorpay.com/v1/payments/${payment.id}/capture`, {
      method: "POST",
      headers: { Authorization: this.auth, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountPaise, currency: "INR" }),
    });
    if (!res.ok) throw new Error(`Razorpay capture failed: ${res.status} ${await res.text()}`);
    return this.merge(payment, (await res.json()) as RazorpayPaymentEntity);
  }

  private merge(local: Payment, remote: RazorpayPaymentEntity): Payment {
    const merged = { ...local, ...paymentFromRazorpayEntity(remote) , source: "razorpay_test" as const };
    this.store.payments.set(merged.id, merged);
    return merged;
  }
}

export function paymentFromRazorpayEntity(e: RazorpayPaymentEntity): Payment {
  const createdAt = new Date(e.created_at * 1000).toISOString();
  const notes = (Array.isArray(e.notes) ? {} : (e.notes ?? {})) as Record<string, string>;
  return {
    id: e.id,
    orderId: e.order_id,
    amountPaise: e.amount,
    currency: "INR",
    status: e.status,
    method: (["upi", "card", "netbanking"].includes(e.method) ? e.method : "card") as Payment["method"],
    createdAt,
    captureDeadline: new Date(e.created_at * 1000 + 3 * DAY_MS).toISOString(),
    notes: { booking_id: notes.booking_id ?? "", customer_id: notes.customer_id ?? "" },
    refundStatus: e.refund_status === "full" || e.refund_status === "partial" ? "processed" : "none",
    source: "razorpay_test",
  };
}

/** Razorpay webhook signature: HMAC-SHA256 of the raw request body with the webhook secret. */
export function verifyWebhookSignature(rawBody: Buffer | string, signature: string | undefined, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Routes each payment to the right gateway: real test API for razorpay_test payments, simulator otherwise. */
export class GatewayRouter implements PaymentGateway {
  constructor(private simulated: PaymentGateway, private real: PaymentGateway | null) {}
  private pick(p: Payment): PaymentGateway {
    if (p.source === "razorpay_test") {
      if (!this.real) throw new Error("Razorpay test keys not configured for a razorpay_test payment");
      return this.real;
    }
    return this.simulated;
  }
  getPayment(p: Payment) {
    return this.pick(p).getPayment(p);
  }
  capture(p: Payment, amountPaise: number) {
    return this.pick(p).capture(p, amountPaise);
  }
}
