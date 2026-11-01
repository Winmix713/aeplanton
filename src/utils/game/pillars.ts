import { COMMS_STREAK, ICE_CORES, POWER_STREAK, POWER_TARGET_W, pillarOrder } from '../../data/pillars';
import type { GameState, PillarId } from '../../types/game';
import type { Dict } from '../../types/i18n';

export type PillarStepKey = keyof Dict['pillarSteps'];

export function farmOutput(game: Pick<GameState, 'pillars' | 'storm'>): number {
  return Math.round(game.pillars.power.farmW * (1 - 0.55 * game.storm.intensity) + game.pillars.power.rtgW);
}

export function pillarComplete(game: GameState, id: PillarId): boolean {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return p.water.coverage >= 100 && p.water.cores >= ICE_CORES && p.water.uplinked;
    case 'power':
      return p.power.streak >= POWER_STREAK;
    case 'comms':
      return p.comms.relay >= 100 && p.comms.streak >= COMMS_STREAK;
    case 'science':
      return p.science.c012 === 'uplinked';
  }
}

export interface PillarStep {
  /** Key into the dictionary's `pillarSteps`. */
  label: PillarStepKey;
  done: boolean;
  value?: string;
}

export function pillarSteps(game: GameState, id: PillarId): PillarStep[] {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return [
      { label: 'coverage', done: p.water.coverage >= 100, value: `${Math.round(p.water.coverage)}%` },
      { label: 'cores', done: p.water.cores >= ICE_CORES, value: `${p.water.cores}/${ICE_CORES}` },
      { label: 'iceUplinked', done: p.water.uplinked }];

    case 'power':
      return [
      { label: 'farmOutput', done: farmOutput(game) >= POWER_TARGET_W, value: `${farmOutput(game)}/${POWER_TARGET_W} W` },
      { label: 'stableSols', done: p.power.streak >= POWER_STREAK, value: `${p.power.streak}/${POWER_STREAK}` }];

    case 'comms':
      return [
      { label: 'relay', done: p.comms.relay >= 100, value: `${Math.round(p.comms.relay)}%` },
      { label: 'unbroken', done: p.comms.streak >= COMMS_STREAK, value: `${p.comms.streak}/${COMMS_STREAK}` }];

    case 'science':
      return [
      { label: 'c012Cored', done: ['sampled', 'sealed', 'checked', 'analyzed', 'packetReady', 'uplinked'].includes(p.science.c012) },
      { label: 'analyzed', done: ['analyzed', 'packetReady', 'uplinked'].includes(p.science.c012) },
      { label: 'onEarth', done: p.science.c012 === 'uplinked' }];

  }
}

/** 0–1 progress used by the HUD. */
export function pillarProgress(game: GameState, id: PillarId): number {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return Math.min(1, p.water.coverage / 100 * 0.4 + Math.min(p.water.cores, ICE_CORES) / ICE_CORES * 0.4 + (p.water.uplinked ? 0.2 : 0));
    case 'power':
      return Math.min(1, Math.min(1, farmOutput(game) / POWER_TARGET_W) * 0.7 + Math.min(p.power.streak, POWER_STREAK) / POWER_STREAK * 0.3);
    case 'comms':
      return Math.min(1, p.comms.relay / 100 * 0.6 + Math.min(p.comms.streak, COMMS_STREAK) / COMMS_STREAK * 0.4);
    case 'science':
      return {
        none: 0,
        selected: 0.08,
        surveyed: 0.16,
        spectrographed: 0.27,
        sampled: 0.4,
        sealed: 0.52,
        checked: 0.64,
        analyzed: 0.76,
        packetReady: 0.88,
        uplinked: 1
      }[p.science.c012];
  }
}

export function allPillarProgress(game: GameState): Record<PillarId, number> {
  return Object.fromEntries(pillarOrder.map((id) => [id, pillarProgress(game, id)])) as Record<PillarId, number>;
}

export function pillarsDone(game: GameState): number {
  return pillarOrder.filter((id) => pillarComplete(game, id)).length;
}