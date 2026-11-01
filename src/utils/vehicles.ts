import * as THREE from 'three';
import { cargoLoop, sitePositions } from '../data/mission';

const loop = new THREE.CatmullRomCurve3(
  cargoLoop.map(([x, z]) => new THREE.Vector3(x, 0, z)),
  true
);

export const CARGO_LOOP_LENGTH = loop.getLength();

export interface Pose {
  x: number;
  z: number;
  yaw: number;
}

export function cargoPose(u: number): Pose {
  const w = (u % 1 + 1) % 1;
  const p = loop.getPointAt(w);
  const tan = loop.getTangentAt(w);
  return { x: p.x, z: p.z, yaw: Math.atan2(tan.x, tan.z) };
}

export function explorerPose(t: number): Pose {
  const c = sitePositions.explorerCenter;
  const a = t * 0.035;
  const x = c.x + Math.cos(a) * 14;
  const z = c.z + Math.sin(a * 1.6) * 6;
  const dx = -Math.sin(a) * 14;
  const dz = Math.cos(a * 1.6) * 6 * 1.6;
  return { x, z, yaw: Math.atan2(dx, dz) };
}