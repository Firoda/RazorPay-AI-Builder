import { randomUUID } from "node:crypto";

/**
 * Per-visitor sandboxes. Each visitor (browser) gets an isolated store + engine so judges trying the
 * demo at the same time never reset each other. Idle sandboxes expire; the oldest is evicted at capacity.
 */
export class SessionRegistry<T> {
  private map = new Map<string, { value: T; lastSeen: number }>();

  constructor(
    private factory: () => T,
    private opts: { max: number; ttlMs: number } = { max: 200, ttlMs: 2 * 60 * 60 * 1000 },
  ) {}

  /** Returns a fresh sandbox. Reuses the id if given (e.g. "start over"), otherwise issues a new one. */
  start(existingId?: string): { id: string; value: T } {
    this.sweep();
    const id = existingId && this.map.has(existingId) ? existingId : randomUUID();
    const value = this.factory();
    this.map.set(id, { value, lastSeen: Date.now() });
    while (this.map.size > this.opts.max) {
      const oldest = [...this.map.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen)[0];
      this.map.delete(oldest[0]);
    }
    return { id, value };
  }

  get(id: string | undefined): T | undefined {
    if (!id) return undefined;
    const entry = this.map.get(id);
    if (!entry) return undefined;
    if (Date.now() - entry.lastSeen > this.opts.ttlMs) {
      this.map.delete(id);
      return undefined;
    }
    entry.lastSeen = Date.now();
    return entry.value;
  }

  get size(): number {
    return this.map.size;
  }

  sweep(): void {
    const now = Date.now();
    for (const [id, e] of this.map) if (now - e.lastSeen > this.opts.ttlMs) this.map.delete(id);
  }
}
