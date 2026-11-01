import { useEffect, useRef } from 'react';
import type { CommandId } from '../types/game';
import type { MissionState } from '../types/mission';
import { createMission, stepMission } from '../utils/sim/mission';

export interface StageTarget {
  /** 0–1 route progress the rover should be at. */
  route: number;
  /** Command currently playing out, if any. */
  action: CommandId | null;
  /** 0–1 storm intensity. */
  storm: number;
  linkOpen: boolean;
  /** Playback multiplier for rover drive speed. */
  speed: number;
}

const TICK = 0.1;
const WORK: CommandId[] = ['survey', 'drill', 'sample', 'analyze', 'prep', 'navigate', 'deploySolar', 'buildRelay', 'repair'];

/**
 * Keeps a MissionState-shaped ref alive for the 3D stage. The ambient sim (fleet, sky, wheels)
 * keeps running; the rover route, weather and link are driven by the turn-based game.
 */
export function useStageDriver(target: StageTarget) {
  const simRef = useRef<MissionState>(createMission(false));
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    const t = targetRef.current;
    const r = simRef.current.rover;
    simRef.current = { ...simRef.current, rover: { ...r, t: t.route, status: t.route >= 1 ? 'on-target' : 'holding' } };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const tgt = targetRef.current;
      const { next } = stepMission(simRef.current, TICK);
      const rv = { ...next.rover, speedLimit: 1.6 * Math.min(4, tgt.speed), timer: 999, drillHeat: 0, drillOverheated: false, battery: 80 };
      const gap = tgt.route - rv.t;
      if (gap > 0.002) {
        rv.status = 'navigating';
      } else if (gap < -0.002) {
        rv.status = 'returning';
      } else {
        rv.t = tgt.route;
        rv.status = tgt.action && WORK.includes(tgt.action) ? 'scanning' : tgt.route >= 1 ? 'on-target' : 'holding';
      }
      if (rv.status === 'navigating' && rv.t > tgt.route) rv.t = tgt.route;
      if (rv.status === 'returning' && rv.t < tgt.route) rv.t = tgt.route;
      if (rv.t <= 0 && rv.status !== 'navigating') {
        rv.t = 0;
        rv.status = 'holding';
      }
      const prevI = simRef.current.weather.intensity;
      const intensity = prevI + (tgt.storm - prevI) * 0.04;
      simRef.current = {
        ...next,
        rover: rv,
        weather: { phase: intensity > 0.05 ? 'storm' : 'clear', timer: 999, duration: 999, intensity },
        comms: { ...next.comms, open: tgt.linkOpen, calibration: 1 },
        faults: []
      };
    }, TICK * 1000);
    return () => window.clearInterval(id);
  }, []);

  return simRef;
}