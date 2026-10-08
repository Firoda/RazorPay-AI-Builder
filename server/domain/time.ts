// Time helpers. All studio times are IST (+05:30).

const IST = "+05:30";
const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const HOUR_MS = 3_600_000;
export const DAY_MS = 24 * HOUR_MS;

export function sessionStart(date: string, start: string): Date {
  return new Date(`${date}T${start}:00${IST}`);
}

export function dayIndex(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

export function dayName(date: string): string {
  return DAY_NAMES[dayIndex(date)];
}

export function daysBetween(fromDate: string, toDate: string): number {
  return Math.round((Date.parse(`${toDate}T00:00:00Z`) - Date.parse(`${fromDate}T00:00:00Z`)) / DAY_MS);
}

export function timeWindowOf(start: string): "morning" | "afternoon" | "evening" {
  const h = Number(start.slice(0, 2));
  if (h < 12) return "morning";
  if (h < 16) return "afternoon";
  return "evening";
}

export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return `${SHORT_DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** Format an instant in IST, e.g. "Tue 13 Oct, 9 PM". */
export function formatInstantIST(iso: string): string {
  const shifted = new Date(Date.parse(iso) + 5.5 * HOUR_MS);
  const date = shifted.toISOString().slice(0, 10);
  const clock = shifted.toISOString().slice(11, 16);
  return `${formatDate(date)}, ${formatClock(clock)}`;
}

export function istDateOf(iso: string): string {
  return new Date(Date.parse(iso) + 5.5 * HOUR_MS).toISOString().slice(0, 10);
}

export function formatRupees(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}
