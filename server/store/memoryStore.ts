import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
  Actor,
  AuditEntry,
  Booking,
  ChatMessage,
  Customer,
  LearningRecord,
  LedgerEntry,
  Payment,
  Policy,
  RescueCase,
  Session,
} from "../domain/types";

const FIXTURES_DIR = join(process.cwd(), "fixtures");

function readFixture<T>(name: string): T {
  return JSON.parse(readFileSync(join(FIXTURES_DIR, name), "utf8")) as T;
}

/**
 * In-memory store seeded from fixtures. The prototype runs as a single instance
 * (Cloud Run max-instances = 1), so state lives here and is resettable for demos.
 */
export class Store {
  studio = { name: "", city: "", owner: "" };
  policy!: Policy;
  sessions = new Map<string, Session>();
  customers = new Map<string, Customer>();
  bookings = new Map<string, Booking>();
  payments = new Map<string, Payment>();
  cases = new Map<string, RescueCase>();
  messages: ChatMessage[] = [];
  audit: AuditEntry[] = [];
  ledger = new Map<string, LedgerEntry>();
  learning: LearningRecord[] = [];
  seenEvents = new Set<string>();
  /** Demo fault injection: number of upcoming failures to simulate. */
  faults = { reserveFailures: 0, captureFailures: 0 };

  private clock: Date | null = null;
  private counters = new Map<string, number>();

  constructor() {
    this.reset();
  }

  reset(): void {
    const { studio, policy } = readFixture<{ studio: Store["studio"]; policy: Policy }>("policy.json");
    this.studio = studio;
    this.policy = structuredClone(policy);
    this.sessions = new Map(readFixture<Session[]>("sessions.json").map((s) => [s.id, s]));
    this.customers.clear();
    this.bookings.clear();
    this.payments.clear();
    this.cases.clear();
    this.messages = [];
    this.audit = [];
    this.ledger.clear();
    this.learning = [];
    this.seenEvents.clear();
    this.faults = { reserveFailures: 0, captureFailures: 0 };
    this.clock = null;
    this.counters.clear();
  }

  now(): Date {
    return this.clock ? new Date(this.clock) : new Date();
  }

  nowIso(): string {
    return this.now().toISOString();
  }

  setNow(iso: string | null): void {
    this.clock = iso ? new Date(iso) : null;
  }

  advance(ms: number): void {
    this.clock = new Date(this.now().getTime() + ms);
  }

  nextId(prefix: string): string {
    const n = (this.counters.get(prefix) ?? 0) + 1;
    this.counters.set(prefix, n);
    return `${prefix}_${n}`;
  }

  private logListeners = new Set<(entry: AuditEntry) => void>();

  log(actor: Actor, action: string, caseId?: string, detail?: unknown): void {
    const entry: AuditEntry = { id: this.nextId("aud"), caseId, at: this.nowIso(), actor, action, detail };
    this.audit.push(entry);
    for (const fn of this.logListeners) {
      try {
        fn(entry);
      } catch {
        /* a broken listener must never break the engine */
      }
    }
  }

  /** Subscribe to new audit entries (used by the Live AI feed). Returns an unsubscribe function. */
  onLog(fn: (entry: AuditEntry) => void): () => void {
    this.logListeners.add(fn);
    return () => this.logListeners.delete(fn);
  }

  seatsLeft(sessionId: string): number {
    const s = this.sessions.get(sessionId);
    return s ? s.capacity - s.booked : 0;
  }

  caseForPayment(paymentId: string): RescueCase | undefined {
    for (const c of this.cases.values()) if (c.paymentId === paymentId) return c;
    return undefined;
  }

  messagesFor(customerId: string): ChatMessage[] {
    return this.messages.filter((m) => m.customerId === customerId);
  }
}
