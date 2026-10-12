import type { CaseDetail, CaseSummary, Health, Metrics, Policy, ScenarioInfo, Studio } from "./types";

const TOKEN_KEY = "seatsaver.adminToken";

export function getAdminToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setAdminToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable: token just won't persist */
  }
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  const token = getAdminToken();
  if (token) headers["x-admin-token"] = token;
  const res = await fetch(path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new ApiError(data.error ?? `${res.status} ${res.statusText}`, res.status);
  return data as T;
}

export type MerchantAction =
  | { type: "approve" }
  | { type: "edit"; sessionIds: string[]; message?: string }
  | { type: "reject"; reasonChip?: string; note?: string }
  | { type: "release" }
  | { type: "retry" };

export interface SessionStart {
  sessionId: string;
  caseId: string;
  payment: { source: "razorpay_test" | "simulated"; id?: string };
}

export const api = {
  session: {
    start: () => request<SessionStart>("POST", "/api/session/start"),
    scenario: (id: string, opts?: { autonomy?: "L2" }) => request<{ caseId: string; eventId: string }>("POST", "/api/session/scenario", { id, ...opts }),
    reset: () => request<{ ok: boolean }>("POST", "/api/session/reset"),
  },
  health: () => request<Health>("GET", "/api/health"),
  studio: () => request<Studio>("GET", "/api/studio"),
  metrics: () => request<Metrics>("GET", "/api/metrics"),
  cases: () => request<CaseSummary[]>("GET", "/api/cases"),
  case: (id: string) => request<CaseDetail>("GET", `/api/cases/${id}`),
  merchant: (id: string, action: MerchantAction) => request<CaseDetail>("POST", `/api/cases/${id}/merchant`, action),
  customerMessage: (id: string, text: string, fromContact?: string) =>
    request<CaseDetail>("POST", `/api/cases/${id}/customer-message`, { text, fromContact }),
  customerChoice: (id: string, choice: "accept" | "refund" | "other", sessionId?: string) =>
    request<CaseDetail>("POST", `/api/cases/${id}/customer-choice`, { choice, sessionId }),
  demo: {
    scenarios: () => request<ScenarioInfo[]>("GET", "/api/demo/scenarios"),
    reset: () => request<{ ok: boolean }>("POST", "/api/demo/reset"),
    inject: (id: string, reset = false) =>
      request<{ status: string; caseId?: string; eventId: string }>("POST", `/api/demo/inject/${id}${reset ? "?reset=1" : ""}`),
    replay: (eventId: string) => request<{ status: string; caseId?: string }>("POST", `/api/demo/replay/${eventId}`),
    capacity: (sessionId: string, booked: number) => request<unknown>("POST", "/api/demo/capacity", { sessionId, booked }),
    faults: (f: { reserveFailures?: number; captureFailures?: number }) =>
      request<{ reserveFailures: number; captureFailures: number }>("POST", "/api/demo/faults", f),
    clock: (c: { advanceHours?: number; set?: string }) => request<{ now: string }>("POST", "/api/demo/clock", c),
    policy: (p: Partial<Policy>) => request<Policy>("PUT", "/api/demo/policy", p),
  },
};
