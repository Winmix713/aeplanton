import {
  CONSUMPTION,
  ELECTROLYSIS,
  HABITAT_KW,
  HYDROPONICS_FOOD,
  OVERCLOCK_MULT,
  RTG_KW,
  SABATIER,
  SOLAR_BASE_KW,
  SOLAR_FULL_SUN_HOURS,
  SOLAR_PER_KIT_KW,
  SOL_HOURS,
  WRS,
  moduleDefs,
  moduleOrder } from
'../../data/colony';
import { SOLAR_KIT_W } from '../../data/pillars';
import type { ModuleId, ModuleState, ResourceBalance } from '../../types/colony';
import type { GameState } from '../../types/game';

export function solarCapacityKw(g: GameState): number {
  return SOLAR_BASE_KW + Math.round(g.pillars.power.farmW / SOLAR_KIT_W) * SOLAR_PER_KIT_KW;
}

export function solarOutputKw(g: GameState): number {
  const c = g.colony;
  return solarCapacityKw(g) * (1 - c.solarDust) * (1 - 0.7 * g.storm.intensity) * (c.flareSols > 0 ? 0.9 : 1);
}

/** Output multiplier: 0 when off/failed, ×1.5 overclocked, −15 % below 75 % integrity, −40 % below 25 %. */
export function moduleFactor(mod: ModuleState): number {
  if (mod.mode === 'off' || mod.failed) return 0;
  const eff = mod.integrity < 25 ? 0.6 : mod.integrity < 75 ? 0.85 : 1;
  return (mod.mode === 'overclock' ? OVERCLOCK_MULT : 1) * eff;
}

export function modulePowerKw(mod: ModuleState, id: ModuleId): number {
  if (mod.mode === 'off' || mod.failed) return 0;
  return moduleDefs[id].powerKw * (mod.mode === 'overclock' ? OVERCLOCK_MULT : 1);
}

export interface LifeSupportResult extends ResourceBalance {
  gridLevel: number;
  batteryAfter: number;
  shortfallKwh: number;
}

/**
 * One Sol of the chemical loop and power grid. Pure — used both for the night tick and the planning forecast.
 * Load is shed in order SCI → NAV → SYS (modules) → life support when the bank can't cover the night.
 */
export function simulateLifeSupport(g: GameState): LifeSupportResult {
  const c = g.colony;
  const k = c.colonists / 100;
  const generationKwh = solarOutputKw(g) * SOLAR_FULL_SUN_HOURS + RTG_KW * SOL_HOURS;
  const habitatKwh = HABITAT_KW * SOL_HOURS;
  const modulesKwh = moduleOrder.reduce((s, id) => s + modulePowerKw(c.modules[id], id) * SOL_HOURS, 0);
  const loadKwh = habitatKwh + modulesKwh;
  const net = c.resources.battery + generationKwh - loadKwh;
  const shortfallKwh = Math.max(0, -net);

  let gridLevel = 0;
  if (shortfallKwh > 0) gridLevel = 1;
  if (shortfallKwh > 120) gridLevel = 2;
  if (shortfallKwh > 250) gridLevel = 3;
  const modulesRun = gridLevel < 3;
  let batteryAfter = net;
  if (!modulesRun) {
    batteryAfter = c.resources.battery + generationKwh - habitatKwh;
    if (batteryAfter < 0) gridLevel = 4;
  }
  batteryAfter = Math.max(0, batteryAfter);

  let water = -CONSUMPTION.water * k;
  let o2 = -CONSUMPTION.o2 * k;
  const food = -CONSUMPTION.food * k + (gridLevel < 4 ? HYDROPONICS_FOOD : 0);
  let h2 = 0;

  if (modulesRun) {
    water += WRS.waterOut * k * moduleFactor(c.modules.wrs);
    const sab = moduleFactor(c.modules.sabatier);
    if (sab > 0) {
      const scale = Math.min(1, (c.resources.h2 + h2) / (SABATIER.h2In * sab));
      h2 -= SABATIER.h2In * sab * scale;
      water += SABATIER.waterOut * sab * scale;
    }
    const el = moduleFactor(c.modules.electrolysis);
    if (el > 0) {
      const available = Math.max(0, c.resources.water + water);
      const scale = Math.min(1, available / (ELECTROLYSIS.waterIn * el));
      water -= ELECTROLYSIS.waterIn * el * scale;
      o2 += ELECTROLYSIS.o2Out * el * scale;
      h2 += ELECTROLYSIS.h2Out * el * scale;
    }
  }

  return {
    water: Math.round(water),
    o2: Math.round(o2),
    food: Math.round(food),
    h2: Math.round(h2),
    generationKwh: Math.round(generationKwh),
    loadKwh: Math.round(loadKwh),
    gridLevel,
    batteryAfter: Math.round(batteryAfter),
    shortfallKwh: Math.round(shortfallKwh)
  };
}

/** Sols of reserve left at the forecast rate (Infinity when stable or growing). */
export function solsOfReserve(stock: number, perSol: number): number {
  if (perSol >= 0) return Infinity;
  return Math.max(0, Math.floor(stock / -perSol));
}