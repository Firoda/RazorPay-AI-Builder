// SeatSaver sound: every cue is synthesised live with the Web Audio API. No audio files to load
// or license, and nothing copied from WhatsApp, banks or apps (storyboard §8).
//
// Browsers only allow audio after a tap/click/key press (scrolling doesn't count), so each portal
// calls unlock() from a deliberate "Tap to begin" / "Start" gesture. Cues requested before that are dropped.

export type Cue =
  | "start" | "tick" | "pop" | "hum" | "tap" | "errorThud" | "smsDing" | "whoosh" | "unlock" | "booked"
  | "faint" | "ding" | "ding2" | "ding3" | "countdown" | "heartbeat" | "rising" | "sparkle" | "buzzWrong"
  | "tickRight" | "padlock" | "coin" | "stamp" | "success" | "shield";

const MUTE_KEY = "ss.muted";
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = readMuted();
const listeners = new Set<(muted: boolean) => void>();

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* storage unavailable */
  }
  if (master && ctx) master.gain.setTargetAtTime(value ? 0 : 1, ctx.currentTime, 0.02);
  listeners.forEach((l) => l(value));
}

export function onMuteChange(fn: (muted: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Call from a click/tap/key handler. Safe to call repeatedly. */
export async function unlock(): Promise<void> {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") await ctx.resume().catch(() => undefined);
}

export function isUnlocked(): boolean {
  return !!ctx && ctx.state === "running";
}

// ── synthesis primitives ──

function tone(freq: number, dur: number, opts: { type?: OscillatorType; gain?: number; at?: number; attack?: number; slideTo?: number } = {}) {
  if (!ctx || !master) return;
  const t0 = ctx.currentTime + (opts.at ?? 0);
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(freq, t0);
  if (opts.slideTo) osc.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + dur);
  const peak = opts.gain ?? 0.3;
  const attack = opts.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function noise(dur: number, opts: { gain?: number; at?: number; filter?: BiquadFilterType; freq?: number; q?: number; sweepTo?: number } = {}) {
  if (!ctx || !master) return;
  const t0 = ctx.currentTime + (opts.at ?? 0);
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = opts.filter ?? "bandpass";
  f.frequency.setValueAtTime(opts.freq ?? 1000, t0);
  if (opts.sweepTo) f.frequency.exponentialRampToValueAtTime(opts.sweepTo, t0 + dur);
  f.Q.value = opts.q ?? 1;
  const g = ctx.createGain();
  const peak = opts.gain ?? 0.2;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f).connect(g).connect(master);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

const CUES: Record<Cue, () => void> = {
  start: () => { tone(523, 0.5, { gain: 0.18 }); tone(784, 0.7, { gain: 0.12, at: 0.08 }); },
  tick: () => noise(0.04, { gain: 0.12, freq: 3500, q: 6 }),
  pop: () => tone(660, 0.12, { gain: 0.18, slideTo: 990 }),
  hum: () => { tone(110, 2, { gain: 0.05, attack: 0.4, type: "triangle" }); tone(165, 2, { gain: 0.03, attack: 0.5 }); },
  tap: () => noise(0.05, { gain: 0.15, freq: 1800, q: 2 }),
  errorThud: () => { tone(110, 0.35, { gain: 0.35, type: "triangle", slideTo: 70 }); noise(0.15, { gain: 0.1, filter: "lowpass", freq: 400 }); },
  smsDing: () => { noise(0.18, { gain: 0.08, filter: "lowpass", freq: 180 }); tone(1318, 0.35, { gain: 0.22, at: 0.18 }); tone(1760, 0.45, { gain: 0.12, at: 0.18 }); },
  whoosh: () => noise(0.45, { gain: 0.12, filter: "bandpass", freq: 400, sweepTo: 2600, q: 0.8 }),
  unlock: () => { noise(0.03, { gain: 0.18, freq: 2500, q: 4 }); noise(0.03, { gain: 0.14, freq: 1800, q: 4, at: 0.07 }); },
  booked: () => { tone(880, 0.25, { gain: 0.16 }); tone(1175, 0.4, { gain: 0.14, at: 0.12 }); },
  faint: () => tone(1046, 0.8, { gain: 0.04, attack: 0.1 }),
  ding: () => { tone(988, 0.35, { gain: 0.22 }); tone(1480, 0.4, { gain: 0.08 }); },
  ding2: () => { tone(1046, 0.35, { gain: 0.22 }); tone(1568, 0.4, { gain: 0.08 }); },
  ding3: () => { tone(932, 0.35, { gain: 0.22 }); tone(1397, 0.4, { gain: 0.08 }); },
  countdown: () => noise(0.025, { gain: 0.05, freq: 4200, q: 8 }),
  heartbeat: () => { tone(60, 0.18, { gain: 0.4, type: "sine" }); tone(55, 0.22, { gain: 0.3, at: 0.2 }); },
  rising: () => tone(392, 0.9, { gain: 0.12, slideTo: 784, attack: 0.2 }),
  sparkle: () => { [2093, 2637, 3136].forEach((f, i) => tone(f, 0.18, { gain: 0.06, at: i * 0.04 })); },
  buzzWrong: () => tone(140, 0.22, { gain: 0.18, type: "sawtooth" }),
  tickRight: () => tone(1568, 0.12, { gain: 0.14 }),
  padlock: () => { noise(0.04, { gain: 0.25, freq: 1200, q: 3 }); tone(220, 0.12, { gain: 0.2, type: "square", at: 0.02 }); },
  coin: () => { tone(1975, 0.25, { gain: 0.14 }); tone(2637, 0.35, { gain: 0.1, at: 0.06 }); },
  stamp: () => { tone(90, 0.18, { gain: 0.4, type: "triangle" }); noise(0.08, { gain: 0.15, filter: "lowpass", freq: 600 }); },
  success: () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.9, { gain: 0.09, at: i * 0.05, attack: 0.02 })); },
  shield: () => { tone(330, 0.5, { gain: 0.12, type: "triangle" }); tone(495, 0.6, { gain: 0.08, at: 0.05 }); },
};

/** Plays a cue if audio is unlocked and not muted. Never throws. */
export function play(cue: Cue): void {
  if (!ctx || ctx.state !== "running" || muted) return;
  try {
    CUES[cue]();
  } catch {
    /* audio is decorative; ignore failures */
  }
}
