import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { terrainHeight } from '../terrain';
import { addMesh, solarTexture, std, strut } from './helpers';

export interface BaseRig {
  group: THREE.Group;
  /** Clickable infrastructure; each carries userData.pick. */
  pickables: THREE.Object3D[];
  /** Shared solar panel material, dimmed during dust storms. */
  panelMat: THREE.MeshStandardMaterial;
}

function picked(parent: THREE.Group, id: string): THREE.Group {
  const g = new THREE.Group();
  g.userData.pick = id;
  parent.add(g);
  return g;
}

/** Static base infrastructure: pad, rover dock, habitat, depot, comms tower and solar field. */
export function buildBase(): BaseRig {
  const group = new THREE.Group();
  const white = std('#e9e4dc', 0.55);
  const dark = std('#3a302a', 0.9);
  const padMat = std('#6d5444', 1);

  const { lander, dock, habitat, depot, tower, solar } = sitePositions;
  const pad = addMesh(group, new THREE.CylinderGeometry(7, 7.2, 0.16, 48), padMat, lander.x, terrainHeight(lander.x, lander.z) + 0.02, lander.z);
  pad.castShadow = false;
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(5.6, 5.8, 64),
    new THREE.MeshBasicMaterial({ color: '#f2ebe0', transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(lander.x, 0.12, lander.z);
  group.add(ring);

  const dockG = picked(group, 'dock');
  const dy = terrainHeight(dock.x, dock.z);
  const dockPad = addMesh(dockG, new THREE.BoxGeometry(4.4, 0.12, 5.4), dark, dock.x, dy + 0.06, dock.z);
  dockPad.castShadow = false;
  addMesh(dockG, new THREE.BoxGeometry(0.5, 1.6, 0.5), dark, dock.x - 2.7, dy + 0.8, dock.z + 1.6);
  addMesh(dockG, new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: '#7fe0a5' }), dock.x - 2.7, dy + 1.72, dock.z + 1.6);

  const habG = picked(group, 'habitat');
  const hy = terrainHeight(habitat.x, habitat.z);
  const main = addMesh(habG, new THREE.CylinderGeometry(2, 2, 7, 28), white, habitat.x, hy + 2.4, habitat.z);
  main.rotation.z = Math.PI / 2;
  [-3.5, 3.5].forEach((dx) => addMesh(habG, new THREE.SphereGeometry(2, 24, 16), white, habitat.x + dx, hy + 2.4, habitat.z));
  const side = addMesh(habG, new THREE.CylinderGeometry(1.5, 1.5, 4.5, 24), white, habitat.x - 2, hy + 2.1, habitat.z + 3);
  side.rotation.x = Math.PI / 2;
  [-3, 0, 3].forEach((dx) =>
  [-1.2, 1.2].forEach((dz) => addMesh(habG, new THREE.BoxGeometry(0.2, 0.9, 0.2), dark, habitat.x + dx, hy + 0.45, habitat.z + dz))
  );

  const depotPad = addMesh(group, new THREE.BoxGeometry(5, 0.1, 4), dark, depot.x, terrainHeight(depot.x, depot.z) + 0.05, depot.z);
  depotPad.castShadow = false;

  const towerG = picked(group, 'tower');
  const ty = terrainHeight(tower.x, tower.z);
  const corners = [
  [-0.9, -0.9],
  [0.9, -0.9],
  [0.9, 0.9],
  [-0.9, 0.9]];

  corners.forEach(([cx, cz]) =>
  strut(towerG, new THREE.Vector3(tower.x + cx, ty, tower.z + cz), new THREE.Vector3(tower.x + cx * 0.3, ty + 15, tower.z + cz * 0.3), 0.06, dark)
  );
  for (let y = 2; y < 15; y += 2.2) {
    const k = 1 - y / 15 * 0.7;
    for (let i = 0; i < 4; i++) {
      const [ax, az] = corners[i];
      const [bx, bz] = corners[(i + 1) % 4];
      strut(towerG, new THREE.Vector3(tower.x + ax * k, ty + y, tower.z + az * k), new THREE.Vector3(tower.x + bx * k, ty + y + 1.1, tower.z + bz * k), 0.03, dark);
    }
  }
  // Invisible proxy so the thin truss is easy to click.
  const towerHit = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 17, 8), new THREE.MeshBasicMaterial({ visible: false }));
  towerHit.position.set(tower.x, ty + 8.5, tower.z);
  towerG.add(towerHit);
  const dish = addMesh(towerG, new THREE.SphereGeometry(1.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3.2), white, tower.x, ty + 15.6, tower.z);
  dish.rotation.x = Math.PI + 0.6;

  const solarG = picked(group, 'solar');
  const panelMat = new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.4, metalness: 0.4 });
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const x = solar.x + (c - 1.5) * 3;
      const z = solar.z + (r - 1) * 3.4;
      const y = terrainHeight(x, z);
      addMesh(solarG, new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), dark, x, y + 0.55, z);
      const p = addMesh(solarG, new THREE.BoxGeometry(2.6, 0.05, 1.5), panelMat, x, y + 1.15, z);
      p.rotation.x = -0.55;
    }
  }
  return { group, pickables: [dockG, habG, towerG, solarG], panelMat };
}