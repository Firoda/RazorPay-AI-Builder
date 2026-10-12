import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { RazorpayPaymentEntity, RazorpayTestGateway } from "./adapters/razorpay";

/**
 * Pool of real Razorpay TEST-mode payments, made in advance by the operator (manual capture, held as
 * `authorized` for up to 5 days). Each visitor's guided tour claims one, so the capture they watch is real.
 * Sources: PAYMENT_POOL env (comma list, survives Cloud Run restarts) + a local file for payments added at runtime.
 */
export class PaymentPool {
  private ids: string[] = [];
  private claimed = new Set<string>();

  constructor(
    envList: string,
    private file = join(process.cwd(), ".cache", "payment-pool.json"),
    private expectedAmountPaise = 200000,
  ) {
    const fromFile: string[] = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
    this.ids = [...new Set([...envList.split(",").map((s) => s.trim()).filter(Boolean), ...fromFile])];
  }

  add(paymentId: string): number {
    if (!this.ids.includes(paymentId)) {
      this.ids.push(paymentId);
      try {
        mkdirSync(dirname(this.file), { recursive: true });
        writeFileSync(this.file, JSON.stringify(this.ids, null, 1));
      } catch {
        /* read-only filesystem: the in-memory pool still works for this process */
      }
    }
    return this.available();
  }

  available(): number {
    return this.ids.filter((id) => !this.claimed.has(id)).length;
  }

  status() {
    return { total: this.ids.length, claimed: this.claimed.size, available: this.available() };
  }

  /** Claims the first pooled payment that Razorpay still reports as authorised for the expected amount. */
  async claim(gateway: RazorpayTestGateway | null): Promise<RazorpayPaymentEntity | null> {
    if (!gateway) return null;
    for (const id of this.ids) {
      if (this.claimed.has(id)) continue;
      this.claimed.add(id); // claim first (single-threaded) so concurrent visitors never share one
      try {
        const entity = await gateway.fetchPaymentEntity(id);
        if (entity.status === "authorized" && entity.amount === this.expectedAmountPaise) return entity;
      } catch {
        /* unreachable or invalid id: leave it claimed so it's skipped */
      }
    }
    return null;
  }
}
