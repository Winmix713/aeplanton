import * as THREE from 'three';
import { sectorPosition } from '../../data/mission';
import { routePoint } from '../route';
import { terrainHeight } from '../terrain';
import { jitter } from './helpers';

export function buildOutcrop(): {group: THREE.Group;top: THREE.Vector3;} {
  const group = new THREE.Group();
  const { x, z } = sectorPosition;
  const baseY = terrainHeight(x, z) - 0.4;
  const colors = ['#a7714d', '#8e5c40', '#b07a55', '#93603f', '#a46e4b'];
  const layers = 5;
  for (let i = 0; i < layers; i++) {
    const geo = jitter(new THREE.BoxGeometry(17 - i * 2.4, 0.95, 11 - i * 1.6, 4, 1, 3), 0.08, i * 9);
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.95, flatShading: true }));
    mesh.position.set(i % 2 * 0.5 - 0.25, baseY + i * 0.88, -i * 0.4);
    mesh.rotation.y = 0.25 + i % 3 * 0.06;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  group.position.set(x, 0, z);
  return { group, top: new THREE.Vector3(x - 1.5, baseY + layers * 0.88 + 0.6, z - 1) };
}

export function buildRoute(): THREE.Group {
  const group = new THREE.Group();
  const pts = Array.from({ length: 240 }, (_, i) => {
    const p = routePoint(i / 239);
    p.y += 0.08;
    return p;
  });
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineDashedMaterial({ color: '#f6efe6', dashSize: 0.45, gapSize: 0.55, transparent: true, opacity: 0.8 })
  );
  line.computeLineDistances();
  group.add(line);

  const end = routePoint(1);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.3, 1.42, 48),
    new THREE.MeshBasicMaterial({ color: '#f6efe6', transparent: true, opacity: 0.75, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(end.x, end.y + 0.08, end.z);
  group.add(ring);
  return group;
}