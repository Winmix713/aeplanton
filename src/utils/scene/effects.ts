import * as THREE from 'three';
import { seeded } from './helpers';

export interface DustRig {
  points: THREE.Points;
  update: (dt: number, strength: number) => void;
}

/** Radial dust blown outward from the pad while engines fire near the ground. */
export function createDust(): DustRig {
  const count = 420;
  const rand = seeded(3);
  const positions = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  const angles = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    radii[i] = 1.5 + rand() * 14;
    angles[i] = rand() * Math.PI * 2;
    speeds[i] = 3 + rand() * 6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: '#c99673', size: 1.1, transparent: true, opacity: 0, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;

  const update = (dt: number, strength: number) => {
    mat.opacity += (strength * 0.55 - mat.opacity) * Math.min(1, dt * 3);
    points.visible = mat.opacity > 0.01;
    if (!points.visible) return;
    for (let i = 0; i < count; i++) {
      radii[i] += speeds[i] * dt * (0.4 + strength);
      if (radii[i] > 18) radii[i] = 1.5;
      const r = radii[i];
      positions[i * 3] = Math.cos(angles[i]) * r;
      positions[i * 3 + 1] = 0.2 + r / 18 * 2.2 * (0.5 + Math.sin(i) * 0.5);
      positions[i * 3 + 2] = Math.sin(angles[i]) * r;
    }
    geo.attributes.position.needsUpdate = true;
  };
  return { points, update };
}