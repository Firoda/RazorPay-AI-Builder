import { paymentFromRazorpayEntity, verifyCheckoutSignature, type RazorpayPaymentEntity, type RazorpayTestGateway } from "./adapters/razorpay";
import { EngineError, type CaseEngine } from "./engine/caseEngine";
import type { PaymentPool } from "./paymentPool";
import { getScenario, prepareBooking } from "./scenarios";
import type { Store } from "./store/memoryStore";

// Real Razorpay TEST-mode payments:
//  • Live (/pay-test): create a manual-capture order → pay in Checkout → verify signature → hand to the engine.
//  • Pool: the operator pre-makes authorised payments (5-day hold) so every visitor's tour captures a real one.
// The *lateness* of the authorisation is the only simulated part, and it is labelled as such.

const LIVE_EXPIRY_MINUTES = 3 * 24 * 60; // matches the dashboard's 3-day story
const POOL_EXPIRY_MINUTES = 7200; // Orders API maximum (5 days): keeps pooled payments valid through judging

interface PendingOrder {
  scenarioId: string;
  bookingId?: string;
  customerId?: string;
  amountPaise: number;
  pool: boolean;
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
    private pool: PaymentPool | null = null,
  ) {}

  get enabled(): boolean {
    return Boolean(this.gateway);
  }

  async createOrder(scenarioId: string, opts: { pool?: boolean } = {}) {
    if (!this.gateway) throw new EngineError("Razorpay test keys are not configured", 503);
    const sc = getScenario(scenarioId);
    if (!sc || sc.group === "system") throw new EngineError("Pick a customer scenario (e.g. G01)", 404);
    const amountPaise = this.store.sessions.get(this.store.sessionIdFor("S-1011-AM"))!.pricePaise;
    let bookingId: string | undefined;
    let customerId: string | undefined;
    if (!opts.pool) ({ bookingId, customerId } = prepareBooking(this.store, sc, `-R${++this.counter}`));
    const order = await this.gateway.createManualCaptureOrder({
      amountPaise,
      receipt: bookingId ?? `POOL-${Date.now()}`,
      notes: { scenario: scenarioId, purpose: opts.pool ? "SeatSaver demo pool (test mode)" : "SeatSaver prototype (test mode)", ...(bookingId ? { booking_id: bookingId, customer_id: customerId! } : {}) },
      manualExpiryMinutes: opts.pool ? POOL_EXPIRY_MINUTES : LIVE_EXPIRY_MINUTES,
    });
    this.pending.set(order.id, { scenarioId, bookingId, customerId, amountPaise, pool: Boolean(opts.pool) });
    this.store.log("razorpay", "order.created", undefined, { orderId: order.id, bookingId, capture: "manual", pool: Boolean(opts.pool), testMode: true });
    const customerName = customerId ? this.store.customers.get(customerId)!.name : "Priya";
    return { orderId: order.id, keyId: this.keyId, amountPaise, currency: "INR", bookingId, customerName, pool: Boolean(opts.pool) };
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
    this.pending.delete(input.orderId);

    if (pending.pool) {
      if (!this.pool) throw new EngineError("Payment pool not configured", 503);
      if (entity.status !== "authorized") throw new EngineError(`Payment is ${entity.status}, not authorized`, 400);
      const available = this.pool.add(entity.id);
      this.store.log("razorpay", "pool.payment_added", undefined, { paymentId: entity.id, available });
      return { pooled: true, paymentId: entity.id, paymentStatus: entity.status, poolAvailable: available };
    }
    return this.attach(entity, pending.bookingId!, pending.customerId!, LIVE_EXPIRY_MINUTES);
  }

  /** Visitor tour: claim a pooled real payment and run it as Priya's late-authorised payment. */
  async startFromPool(scenarioId = "G01"): Promise<{ caseId?: string; paymentId: string } | null> {
    const entity = await this.pool?.claim(this.gateway);
    if (!entity) return null;
    const sc = getScenario(scenarioId)!;
    const { bookingId, customerId } = prepareBooking(this.store, sc, "-P");
    const res = await this.attach(entity, bookingId, customerId, POOL_EXPIRY_MINUTES, { background: true });
    return { caseId: res.caseId, paymentId: entity.id };
  }

  private async attach(
    entity: RazorpayPaymentEntity,
    bookingId: string,
    customerId: string,
    expiryMinutes: number,
    opts: { background?: boolean } = {},
  ) {
    // Map the real capture window onto the demo clock so the countdown stays consistent.
    const realDeadline = entity.created_at * 1000 + expiryMinutes * 60_000;
    const simDeadline = new Date(this.store.now().getTime() + (realDeadline - Date.now())).toISOString();
    const payment = {
      ...paymentFromRazorpayEntity(entity),
      notes: { booking_id: bookingId, customer_id: customerId },
      createdAt: this.store.nowIso(),
      authorizedAt: this.store.nowIso(),
      captureDeadline: simDeadline,
    };
    this.store.payments.set(payment.id, payment);
    this.store.log("razorpay", "checkout.payment_verified", undefined, {
      paymentId: payment.id, status: payment.status, testMode: true, lateArrivalSimulated: true,
    });
    const event = { id: `evt_real_${payment.id}`, type: "payment.authorized" as const, paymentId: payment.id, source: "razorpay_webhook" as const };
    if (opts.background) {
      // The case is created synchronously inside ingest; the AI work continues in the background.
      void this.engine.ingestPaymentEvent(event).catch((err) => this.store.log("system", "ingest.failed", undefined, { error: String(err) }));
      return { status: "case_created", caseId: this.store.caseForPayment(payment.id)?.id, paymentId: payment.id, paymentStatus: payment.status };
    }
    const result = await this.engine.ingestPaymentEvent(event);
    return { ...result, paymentId: payment.id, paymentStatus: payment.status };
  }
}
