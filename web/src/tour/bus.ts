// Tiny event bus connecting the product UI to the guided tour (clicks the tour waits for,
// fresh case data the tour pushes back after acting).

type Handler = (payload?: unknown) => void;
const handlers = new Map<string, Set<Handler>>();

export const bus = {
  on(event: string, fn: Handler): () => void {
    if (!handlers.has(event)) handlers.set(event, new Set());
    handlers.get(event)!.add(fn);
    return () => handlers.get(event)?.delete(fn);
  },
  emit(event: string, payload?: unknown): void {
    handlers.get(event)?.forEach((fn) => {
      try {
        fn(payload);
      } catch (err) {
        console.error(err);
      }
    });
  },
};
