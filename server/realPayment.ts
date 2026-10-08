import { paymentFromRazorpayEntity, verifyCheckoutSignature, type RazorpayTestGateway } from "./adapters/razorpay";
import { EngineError, type CaseEngine } from "./engine/caseEngine";
import { getScenario, prepareBooking } from "./scenarios";
import type { Store } from "./store/memoryStore";

// Real Razorpay TEST-mode payment for the hero case:
//   1. create a manual-capture order        (real API)
//   2. customer pays in Checkout, test mode (real API, test instrument)
//   3. we verify the signature, fetch the payment (must be `authorized`) and hand it to the engine.
// The *lateness* of the authorisation is the only simulated part, and it is labelled as such.

const MANUAL_EXPIRY_MINUTES = 3 * 24 * 60; // match the dashboard's 3-day story

interface PendingOrder {
  scenarioId: string;
  bookingId: string;
  customerId: string;
  amountPaise: number;
}

export class RealPaymentFlow {
  private pending = new Map<string, PendingOrder>();
  private counter = 0;

  constructor(
    private store: Store,
    private engine: CaseEngine,
    private gateway: RazorpayTestGateway | null,
    private keyId: string,
    private keySecret: string,
  ) {}

  get enabled(): boolean {
    return Boolean(this.gateway);
  }

  async createOrder(scenarioId: string) {
    if (!this.gateway) throw new EngineError("Razorpay test keys are not configured", 503);
    const sc = getScenario(scenarioId);
    if (!sc || sc.group === "system") throw new EngineError("Pick a customer scenario (e.g. G01)", 404);
    const { bookingId, customerId } = prepareBooking(this.store, sc, `-R${++this.counter}`);
    const amountPaise = this.store.sessions.get(this.store.bookings.get(bookingId)!.sessionId)!.pricePaise;
    const order = await this.gateway.createManualCaptureOrder({
      amountPaise,
      receipt: bookingId,
      notes: { booking_id: bookingId, customer_id: customerId, scenario: scenarioId, purpose: "SeatSaver prototype (test mode)" },
      manualExpiryMinutes: MANUAL_EXPIRY_MINUTES,
    });
    this.pending.set(order.id, { scenarioId, bookingId, customerId, amountPaise });
    this.store.log("razorpay", "order.created", undefined, { orderId: order.id, bookingId, capture: "manual", testMode: true });
    const customer = this.store.customers.get(customerId)!;
    return { orderId: order.id, keyId: this.keyId, amountPaise, currency: "INR", bookingId, customerName: customer.name };
  }

  async confirmPayment(input: { orderId: string; paymentId: string; signature: string }) {
    if (!this.gateway) throw new EngineError("Razorpay test keys are not configured", 503);
    const pending = this.pending.get(input.orderId);
    if (!pending) throw new EngineError("Unknown order", 404);
    if (!verifyCheckoutSignature(input.orderId, input.paymentId, input.signature, this.keySecret)) {
      this.store.log("razorpay", "checkout.signature_invalid", undefined, { orderId: input.orderId });
      throw new EngineError("Invalid payment signature", 400);
    }
    const entity = await this.gateway.fetchPaymentEntity(input.paymentId);
    if (entity.order_id !== input.orderId) throw new EngineError("Payment does not belong to this order", 400);
    if (entity.amount !== pending.amountPaise) throw new EngineError("Amount mismatch", 400);

    // Map the real capture window onto the demo clock so the countdown stays consistent.
    const realDeadline = entity.created_at * 1000 + MANUAL_EXPIRY_MINUTES * 60_000;
    const simDeadline = new Date(this.store.now().getTime() + (realDeadline - Date.now())).toISOString();
    const payment = {
      ...paymentFromRazorpayEntity(entity),
      notes: { booking_id: pending.bookingId, customer_id: pending.customerId },
      createdAt: this.store.nowIso(),
      authorizedAt: this.store.nowIso(),
      captureDeadline: simDeadline,
    };
    this.store.payments.set(payment.id, payment);
    this.pending.delete(input.orderId);
    this.store.log("razorpay", "checkout.payment_verified", undefined, {
      paymentId: payment.id, status: payment.status, testMode: true, lateArrivalSimulated: true,
    });
    const result = await this.engine.ingestPaymentEvent({
      id: `evt_real_${payment.id}`, type: "payment.authorized", paymentId: payment.id, source: "razorpay_webhook",
    });
    return { ...result, paymentId: payment.id, paymentStatus: payment.status };
  }
}
