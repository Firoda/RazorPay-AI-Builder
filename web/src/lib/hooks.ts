import { useCallback, useEffect, useRef, useState } from "react";

/** Minimal hash router: "#/case/case_1" → ["case", "case_1"]. */
export function useHashRoute(): string[] {
  const parse = () => (window.location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
  const [parts, setParts] = useState<string[]>(parse);
  useEffect(() => {
    const on = () => setParts(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return parts;
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith("#") ? path : `#${path}`;
}

/**
 * Fetch + poll. `paused` stops polling (e.g. while an action is in flight).
 * `set` lets callers push a fresh value (from an action response) without waiting for the next poll.
 */
export function usePolling<T>(fetcher: () => Promise<T>, deps: unknown[], intervalMs = 2500, paused = false) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refresh = useCallback(async () => {
    try {
      setData(await fetcherRef.current());
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    setData(null);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(refresh, intervalMs);
    return () => clearInterval(t);
  }, [paused, intervalMs, refresh]);

  return { data, error, refresh, set: setData };
}

/** Seconds elapsed since `since` (ms timestamp), updated every second while active. */
export function useElapsed(since: number | null): number {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (since === null) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [since]);
  return since === null ? 0 : Math.max(0, Math.floor((now - since) / 1000));
}

/** Runs an async action with a busy flag and an error message. */
export function useAction() {
  const [busy, setBusy] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const run = useCallback(async <T,>(label: string, fn: () => Promise<T>): Promise<T | undefined> => {
    setBusy(label);
    setStartedAt(Date.now());
    setError(null);
    try {
      return await fn();
    } catch (e) {
      setError((e as Error).message);
      return undefined;
    } finally {
      setBusy(null);
      setStartedAt(null);
    }
  }, []);
  return { busy, startedAt, error, setError, run };
}
