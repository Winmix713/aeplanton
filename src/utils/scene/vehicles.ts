import * as THREE from 'three';
import { addMesh, solarTexture, std } from './helpers';

export interface VehicleRig {
  group: THREE.Group;
  wheels: THREE.Mesh[];
  beacon?: THREE.Mesh;
}

function addWheels(group: THREE.Group, xs: number[], zs: number[], radius: number, width: number, y: number): THREE.Mesh[] {
  const geo = new THREE.CylinderGeometry(radius, radius, width, 18);
  geo.rotateZ(Math.PI / 2);
  const mat = std('#2b2622', 0.9);
  const wheels: THREE.Mesh[] = [];
  xs.forEach((x) => zs.forEach((z) => wheels.push(addMesh(group, geo, mat, x, y, z))));
  return wheels;
}

/** ATLAS-01 six-wheel science rover. Front faces +z. */
export function buildRover(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#e6dfd3', 0.6);
  const dark = std('#2b2622', 0.9);
  addMesh(group, new THREE.BoxGeometry(1.45, 0.55, 2.05), white, 0, 0.98, 0);
  addMesh(group, new THREE.BoxGeometry(1.8, 0.08, 2.3), new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.45, metalness: 0.35 }), 0, 1.3, 0);
  addMesh(group, new THREE.SphereGeometry(0.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), white, -0.45, 1.34, -0.5);
  addMesh(group, new THREE.CylinderGeometry(0.05, 0.05, 1.5, 10), white, 0.3, 2.05, 0.75);
  addMesh(group, new THREE.BoxGeometry(0.5, 0.18, 0.24), white, 0.3, 2.85, 0.75);
  const beacon = addMesh(group, new THREE.BoxGeometry(0.12, 0.06, 0.12), new THREE.MeshBasicMaterial({ color: '#ffd77e' }), 0.45, 1.36, -0.3);
  [-0.95, 0.95].forEach((x) => addMesh(group, new THREE.BoxGeometry(0.08, 0.08, 1.9), dark, x, 0.78, 0));
  const wheels = addWheels(group, [-0.95, 0.95], [-0.8, 0, 0.8], 0.36, 0.3, 0.38);
  return { group, wheels, beacon };
}

/** CARGO-03 hauler: cab plus cargo container on six wheels. */
export function buildCargo(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#ece6dc', 0.55);
  const dark = std('#3a302a', 0.85);
  addMesh(group, new THREE.BoxGeometry(2.2, 0.35, 4.6), dark, 0, 0.75, 0);
  addMesh(group, new THREE.BoxGeometry(2.1, 1.5, 3), white, 0, 1.7, -0.7);
  addMesh(group, new THREE.BoxGeometry(2.1, 1.2, 1.3), white, 0, 1.55, 1.65);
  addMesh(group, new THREE.BoxGeometry(1.9, 0.5, 0.05), std('#2d3238', 0.3, 0.4), 0, 1.8, 2.31);
  const wheels = addWheels(group, [-1.15, 1.15], [-1.6, 0, 1.6], 0.45, 0.35, 0.45);
  return { group, wheels };
}

/** EXPLORER-12 small survey scout with a tall sensor mast. */
export function buildExplorer(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#e2dbcf', 0.6);
  addMesh(group, new THREE.BoxGeometry(1, 0.4, 1.4), white, 0, 0.6, 0);
  addMesh(group, new THREE.CylinderGeometry(0.035, 0.035, 1.6, 8), white, 0, 1.6, 0.4);
  addMesh(group, new THREE.SphereGeometry(0.18, 12, 8), white, 0, 2.45, 0.4);
  const beacon = addMesh(group, new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#9cc2f0' }), 0, 2.7, 0.4);
  const wheels = addWheels(group, [-0.6, 0.6], [-0.5, 0.5], 0.28, 0.2, 0.28);
  return { group, wheels, beacon };
}