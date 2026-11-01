import * as THREE from 'three';
import { routeWaypoints } from '../data/mission';
import { terrainHeight } from './terrain';

const curve = new THREE.CatmullRomCurve3(routeWaypoints.map(([x, z]) => new THREE.Vector3(x, 0, z)));

export const ROUTE_LENGTH = curve.getLength();

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function routePoint(t: number): THREE.Vector3 {
  const p = curve.getPointAt(clamp01(t));
  p.y = terrainHeight(p.x, p.z);
  return p;
}

export function routeTangent(t: number): THREE.Vector3 {
  const v = curve.getTangentAt(clamp01(t));
  v.y = 0;
  return v.normalize();
}

export function routeSamples(count: number): {x: number;z: number;}[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const p = curve.getPointAt(i / count);
    return { x: p.x, z: p.z };
  });
}