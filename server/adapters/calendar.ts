import type { Store } from "../store/memoryStore";

/** The merchant's booking calendar. In the prototype it is the in-memory session table. */
export class CalendarAdapter {
  constructor(private store: Store) {}

  seatsLeft(sessionId: string): number {
    return this.store.seatsLeft(sessionId);
  }

  /** Atomically reserve seats (single-threaded Node: check-and-increment cannot interleave). */
  reserve(sessionId: string, seats: number): void {
    if (this.store.faults.reserveFailures > 0) {
      this.store.faults.reserveFailures--;
      throw new Error("Calendar write failed (fault injection)");
    }
    const s = this.store.sessions.get(sessionId);
    if (!s) throw new Error(`Unknown session ${sessionId}`);
    if (s.capacity - s.booked < seats) throw new Error("NO_SEATS");
    s.booked += seats;
  }

  release(sessionId: string, seats: number): void {
    const s = this.store.sessions.get(sessionId);
    if (s) s.booked = Math.max(0, s.booked - seats);
  }
}
