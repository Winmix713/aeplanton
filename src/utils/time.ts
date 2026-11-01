const SESSION_START = Date.now();
const LMST_START_MINUTES = 15 * 60 + 48;

export function utcString(d: Date = new Date()): string {
  return d.toISOString().slice(11, 19);
}

export function lmstString(d: Date = new Date()): string {
  const minutes = LMST_START_MINUTES + Math.floor((d.getTime() - SESSION_START) / 61650);
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}