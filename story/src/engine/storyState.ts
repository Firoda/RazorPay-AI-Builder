import { useSyncExternalStore } from "react";

// Tiny shared state for the persistent UI (clock pill, chapter dots) driven by scene ScrollTriggers.

interface StoryState {
  clock: string;
  activeScene: string;
  started: boolean;
}

let state: StoryState = { clock: "Sat · 8:55 PM · Bengaluru", activeScene: "s01", started: false };
const listeners = new Set<() => void>();

export function setStory(patch: Partial<StoryState>): void {
  const next = { ...state, ...patch };
  if (next.clock === state.clock && next.activeScene === state.activeScene && next.started === state.started) return;
  state = next;
  listeners.forEach((l) => l());
}

export function getStory(): StoryState {
  return state;
}

export function useStory(): StoryState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}
