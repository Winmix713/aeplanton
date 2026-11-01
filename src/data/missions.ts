import type { ActId, AdvisorId } from '../types/game';
import type { ColonyEffect } from '../types/colony';

export interface MissionOption {
  id: string;
  /** Advisor who argues for this option. */
  backer?: AdvisorId;
  effect: ColonyEffect;
  /** Invisible consequence: lands `inSols` later unless `cancelledBy` is set by then. */
  delayed?: {inSols: number;effect: ColonyEffect;cancelledBy?: string;};
}

export interface MissionDef {
  id: string;
  sol: number;
  act: ActId;
  kind: 'decision' | 'briefing';
  options: MissionOption[];
}

/** Act I · Discovery (M001–M009) from the ARES 2051 design, plus act-opening briefings II–VI. */
export const missions: MissionDef[] = [
{
  id: 'M001',
  sol: 1,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'o2', backer: 'sys', effect: { o2: 70, ap: 2, moduleMode: { electrolysis: 'overclock' }, integrity: { wrs: -12 } }, delayed: { inSols: 12, effect: { water: -90, morale: -4 } } },
  { id: 'wrs', backer: 'sci', effect: { water: 90, o2: -24, ap: 2, trust: { sys: 4 } } },
  { id: 'both', backer: 'comm', effect: { ap: 4, morale: 6, water: 30, o2: 20 } }]

},
{
  id: 'M002',
  sol: 2,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'rover', backer: 'sci', effect: { route: 0.08, wheels: -8, trust: { nav: -5, sci: 4 } }, delayed: { inSols: 20, effect: { wheels: -18, delaySols: 1 }, cancelledBy: 'secret:nav' } },
  { id: 'drone', backer: 'nav', effect: { ap: 2, verifyWaypoints: true, trust: { nav: 6 } } },
  { id: 'abandon', backer: 'sys', effect: { trust: { sci: -8, sys: 3 }, delaySols: 1 } }]

},
{
  id: 'M003',
  sol: 3,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'force', backer: 'sci', effect: { water: 72, h2: -16, integrity: { sabatier: -25 }, trust: { sys: -6 } }, delayed: { inSols: 15, effect: { integrity: { sabatier: -30 }, morale: -3 }, cancelledBy: 'sabatierExposed' } },
  { id: 'shutdown', backer: 'sys', effect: { ap: 1, moduleMode: { sabatier: 'off' }, trust: { sys: 6 }, delaySols: 1 } }]

},
{
  id: 'M004',
  sol: 5,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'ration', backer: 'sys', effect: { food: 220, morale: -10, trust: { comm: -4 } } },
  { id: 'reserves', backer: 'comm', effect: { food: -220, morale: 5 }, delayed: { inSols: 18, effect: { food: -300, morale: -6 } } },
  { id: 'overclock', backer: 'sci', effect: { o2: 80, integrity: { electrolysis: -20 }, moduleMode: { electrolysis: 'overclock' } } }]

},
{
  id: 'M005',
  sol: 7,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'isolate', backer: 'sys', effect: { trust: { sys: 5, sci: -5 }, flags: ['signalIsolated'] } },
  { id: 'monitor', backer: 'sci', effect: { trust: { sci: 6, sys: -4 }, flags: ['signalMonitored'] }, delayed: { inSols: 14, effect: { battery: -160, flags: ['signalSurge'] } } }]

},
{
  id: 'M006',
  sol: 10,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'slow', backer: 'nav', effect: { flareSols: 2, ap: 3, morale: -2 } },
  { id: 'fast', backer: 'sys', effect: { flareSols: 2, robotsLost: { nav: 5 }, morale: 2 } },
  { id: 'sacrifice', backer: 'sci', effect: { flareSols: 2, robotsLost: { comm: 10 }, trust: { comm: -12 } }, delayed: { inSols: 16, effect: { morale: -8, trust: { comm: -6 } } } }]

},
{
  id: 'M007',
  sol: 15,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'safe', backer: 'sys', effect: { ap: 2, water: 120 } },
  { id: 'aggressive', backer: 'sci', effect: { water: 260, regolith: 20, trust: { sci: 5, sys: -6 } }, delayed: { inSols: 12, effect: { lavaTube: -10, delaySols: 1 } } }]

},
{
  id: 'M008',
  sol: 21,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'expose', backer: 'comm', effect: { trust: { sys: -15, comm: 8 }, morale: -4, integrity: { sabatier: 20 }, flags: ['sabatierExposed'], revealSecret: 'sys' } },
  { id: 'cover', backer: 'sys', effect: { trust: { sys: 10, comm: -10 } }, delayed: { inSols: 20, effect: { integrity: { sabatier: -40 }, morale: -6, delaySols: 1 }, cancelledBy: 'sabatierExposed' } }]

},
{
  id: 'M009',
  sol: 28,
  act: 'discovery',
  kind: 'decision',
  options: [
  { id: 'vault', backer: 'sci', effect: { trust: { sci: 25, sys: -30 }, flags: ['vaultOpened'] } },
  { id: 'drain', backer: 'sys', effect: { trust: { sys: 25, sci: -30 }, battery: 220, flags: ['vaultDrained'] } }]

},
{ id: 'A2', sol: 31, act: 'foundation', kind: 'briefing', options: [{ id: 'ack', effect: {} }] },
{ id: 'A3', sol: 91, act: 'silentSignal', kind: 'briefing', options: [{ id: 'ack', effect: {} }] },
{ id: 'A4', sol: 161, act: 'humanFactor', kind: 'briefing', options: [{ id: 'ack', effect: {} }] },
{ id: 'A5', sol: 261, act: 'lastArrival', kind: 'briefing', options: [{ id: 'ack', effect: {} }] },
{ id: 'A6', sol: 381, act: 'newHumanity', kind: 'briefing', options: [{ id: 'ack', effect: {} }] }];


export function missionDef(id: string): MissionDef | undefined {
  return missions.find((m) => m.id === id);
}