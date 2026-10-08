import { dayName, formatClock, formatDate, timeWindowOf } from "./time";
import type { Session } from "./types";

export const WORKSHOP_NAMES: Record<string, string> = {
  wheel_basics: "Wheel Basics",
  hand_building: "Hand-building",
  glazing_masterclass: "Glazing Masterclass",
};

/** e.g. "Sun 18 Oct, 10 AM · Wheel Basics with Arjun" */
export function sessionLabel(s: Session): string {
  return `${formatDate(s.date)}, ${formatClock(s.start)} · ${WORKSHOP_NAMES[s.workshopType] ?? s.workshopType} with ${s.instructor}`;
}

/** Customer-facing form, e.g. "Sun 18 Oct, 10 AM (Wheel Basics with Arjun)" */
export function sessionLabelForCustomer(s: Session): string {
  return `${formatDate(s.date)}, ${formatClock(s.start)} (${WORKSHOP_NAMES[s.workshopType] ?? s.workshopType} with ${s.instructor})`;
}

/** Compact view handed to the AI: facts it may reason about, never prices. */
export function sessionView(s: Session, seatsLeft: number) {
  return {
    id: s.id,
    label: sessionLabel(s),
    date: s.date,
    day: dayName(s.date),
    time_window: timeWindowOf(s.start),
    start: s.start,
    instructor: s.instructor,
    workshop: s.workshopType,
    seats_left: seatsLeft,
  };
}
