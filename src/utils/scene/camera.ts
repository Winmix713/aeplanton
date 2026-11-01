import * as THREE from 'three';
import type { CameraState, LanderState } from '../../types/mission';
import { terrainHeight } from '../terrain';

interface CameraContext {
  roverPos: THREE.Vector3;
  routeDir: THREE.Vector3;
  landerPos: THREE.Vector3;
  rocketPos: THREE.Vector3;
  lander: LanderState;
}

/** Resolves where the camera wants to be and look at for the current mode. */
export function desiredCamera(cam: CameraState, ctx: CameraContext, pos: THREE.Vector3, look: THREE.Vector3): number {
  const z = cam.zoom;
  const { landerPos: l, lander } = ctx;

  if (lander.phase === 'countdown') {
    pos.set(l.x - 24, l.y + 9, l.z + 40);
    look.set(l.x, l.y + 7, l.z);
    return 2.4;
  }
  if (lander.phase === 'ascent') {
    const alt = ctx.rocketPos.y - l.y;
    pos.set(l.x - 30, l.y + 10 + alt * 0.5, l.z + 52 + alt * 0.08);
    look.copy(ctx.rocketPos);
    return 4;
  }
  if (cam.focus) {
    const fh = terrainHeight(cam.focus.x, cam.focus.z);
    pos.set(cam.focus.x - 10 * z, fh + 26 * z, cam.focus.z + 30 * z);
    look.set(cam.focus.x, fh, cam.focus.z);
    return 2.4;
  }
  if (cam.mode === 'atlas') {
    const t = ctx.routeDir;
    const right = new THREE.Vector3(-t.z, 0, t.x);
    pos.
    copy(ctx.roverPos).
    addScaledVector(t, -10 * z).
    addScaledVector(right, -2.2 * z).
    add(new THREE.Vector3(0, 5.6 * z, 0));
    look.copy(ctx.roverPos).addScaledVector(t, 7).add(new THREE.Vector3(0, 0.4, 0));
    return 2.4;
  }
  if (cam.mode === 'tactical') {
    pos.set(12, 95 * z, -12 + 28 * z);
    look.set(12, 0, -12);
    return 2.4;
  }
  if (cam.frame === 'lander') {
    pos.set(l.x - 14 * z, l.y + 2 + 9 * z, l.z + 30 * z);
    look.set(l.x, l.y + 6 + (ctx.rocketPos.y - l.y - 8), l.z);
    return 2.4;
  }
  pos.set(4 - 22 * z, 2 + 20 * z, 6 + 50 * z);
  look.set(8, 3, -6);
  return 2.4;
}