let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

type Cue = 'send' | 'alert' | 'ok' | 'tick';

const CUES: Record<Cue, {freq: number[];dur: number;type: OscillatorType;gain: number;}> = {
  send: { freq: [520, 780], dur: 0.09, type: 'sine', gain: 0.05 },
  alert: { freq: [440, 330], dur: 0.12, type: 'triangle', gain: 0.06 },
  ok: { freq: [660, 990], dur: 0.07, type: 'sine', gain: 0.04 },
  tick: { freq: [1200], dur: 0.03, type: 'sine', gain: 0.02 }
};

/** Short synthesized console blips. Silent when disabled or unsupported. */
export function playCue(cue: Cue): void {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AC = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext;}).webkitAudioContext;
    if (!AC) return;
    ctx = ctx ?? new AC();
    const c = CUES[cue];
    c.freq.forEach((f, i) => {
      const t0 = ctx!.currentTime + i * c.dur;
      const osc = ctx!.createOscillator();
      const g = ctx!.createGain();
      osc.type = c.type;
      osc.frequency.value = f;
      g.gain.setValueAtTime(c.gain, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + c.dur);
      osc.connect(g).connect(ctx!.destination);
      osc.start(t0);
      osc.stop(t0 + c.dur + 0.02);
    });
  } catch {

    /* audio unavailable */}
}