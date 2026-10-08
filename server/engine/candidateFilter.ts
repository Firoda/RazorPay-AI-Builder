import { HOUR_MS, dayName, daysBetween, sessionStart, timeWindowOf } from "../domain/time";
import type { CandidateResult, Constraint, Policy, Session } from "../domain/types";

const WEEKEND = ["saturday", "sunday"];
const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const DAY_ALIASES: Record<string, string> = {
  sun: "sunday", mon: "monday", tue: "tuesday", tues: "tuesday", wed: "wednesday",
  thu: "thursday", thur: "thursday", thurs: "thursday", fri: "friday", sat: "saturday",
};

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[,/|]|\bor\b|\band\b/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function expandDays(value: string): string[] | null {
  const days = new Set<string>();
  for (const raw of tokens(value)) {
    const t = raw.replace(/s$/, ""); // "sundays" → "sunday"
    if (t === "weekend") WEEKEND.forEach((d) => days.add(d));
    else if (t === "weekday") WEEKDAYS.forEach((d) => days.add(d));
    else if (WEEKEND.includes(t) || WEEKDAYS.includes(t)) days.add(t);
    else if (DAY_ALIASES[t]) days.add(DAY_ALIASES[t]);
    else return null; // unknown token → cannot verify in code
  }
  return days.size ? [...days] : null;
}

function expandWindows(value: string): string[] | null {
  const out = new Set<string>();
  for (const t of tokens(value)) {
    if (["morning", "afternoon", "evening"].includes(t)) out.add(t);
    else if (t === "night") out.add("evening");
    else return null;
  }
  return out.size ? [...out] : null;
}

/** true = satisfied, false = violated, null = this constraint can't be checked by code. */
export function satisfies(session: Session, c: Constraint): boolean | null {
  const v = c.value.trim().toLowerCase();
  switch (c.type) {
    case "day_of_week": {
      const days = expandDays(v);
      return days ? days.includes(dayName(session.date)) : null;
    }
    case "time_window": {
      const windows = expandWindows(v);
      return windows ? windows.includes(timeWindowOf(session.start)) : null;
    }
    case "instructor": {
      const name = v.replace(/\b(sir|ma'?am|madam|ji|mr\.?|ms\.?)\b/g, "").trim();
      return name ? session.instructor.toLowerCase().includes(name) : null;
    }
    case "exact_date":
      return /^\d{4}-\d{2}-\d{2}$/.test(v) ? session.date === v : null;
    case "date_range": {
      const m = v.match(/^(\d{4}-\d{2}-\d{2})\s*\.\.\s*(\d{4}-\d{2}-\d{2})$/);
      return m ? session.date >= m[1] && session.date <= m[2] : null;
    }
    case "workshop_type":
      return /^[a-z_]+$/.test(v) ? session.workshopType === v : null;
    case "language":
      return session.language === "en-hi" || session.language === v;
    default:
      return null;
  }
}

export interface FilterInput {
  sessions: Session[];
  original: Session;
  policy: Policy;
  hard: Constraint[];
  seatsNeeded: number;
  now: Date;
  exclude?: string[];
}

export interface FilterOutput {
  candidates: CandidateResult[];
  unverified: Constraint[];
}

/** Deterministic feasibility filter (build plan §2.2). The AI may only choose from feasible results. */
export function filterCandidates(input: FilterInput): FilterOutput {
  const { sessions, original, policy, hard, seatsNeeded, now, exclude = [] } = input;
  const unverified = new Map<string, Constraint>();

  const candidates = sessions.map((s) => {
      const reasons: string[] = [];
      if (s.id === original.id) reasons.push("original_session");
      if (exclude.includes(s.id)) reasons.push("previously_failed");
      if (s.capacity - s.booked < seatsNeeded) reasons.push("no_seats");
      if (policy.samePriceOnly && s.pricePaise !== original.pricePaise) reasons.push("price_differs");
      if (!(policy.equivalentTypes[original.workshopType] ?? [original.workshopType]).includes(s.workshopType)) {
        reasons.push("different_class_type");
      }
      const ahead = daysBetween(original.date, s.date);
      if (ahead > policy.maxDaysAhead) reasons.push("outside_policy_window");
      if (sessionStart(s.date, s.start).getTime() - now.getTime() < policy.minHoursBeforeStart * HOUR_MS) {
        reasons.push("too_soon_or_past");
      }
      for (const c of hard) {
        const ok = satisfies(s, c);
        if (ok === false) reasons.push(`violates:${c.type}:${c.value}`);
        if (ok === null) unverified.set(`${c.type}:${c.value}`, c);
      }
      return { sessionId: s.id, feasible: reasons.length === 0, reasons };
    });

  return { candidates, unverified: [...unverified.values()] };
}

/** Parse "type:value" strings from golden expectations into constraints (used by eval). */
export function parseConstraintTag(tag: string): Constraint {
  const [type, ...rest] = tag.split(":");
  return { type: type as Constraint["type"], value: rest.join(":"), evidence_quote: "" };
}
