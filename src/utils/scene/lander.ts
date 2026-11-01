import * as THREE from 'three';
import { addMesh, glowTexture, solarTexture, std, strut } from './helpers';

export interface LanderRig {
  root: THREE.Group;
  body: THREE.Group;
  legs: THREE.Group;
  flame: THREE.Group;
  glow: THREE.Sprite;
  light: THREE.PointLight;
}

/** IX-7 Hermes: ogive ascent vehicle on four landing legs. Height ≈ 15 m. */
export function buildLander(): LanderRig {
  const root = new THREE.Group();
  const body = new THREE.Group();
  const legs = new THREE.Group();
  root.add(body, legs);

  const metal = std('#8f8b84', 0.45, 0.55);
  const dark = std('#2c2926', 0.8, 0.3);
  const gold = std('#c59a4c', 0.35, 0.8);
  const white = std('#e6e0d6', 0.6);

  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2;
    addMesh(body, new THREE.CylinderGeometry(0.28, 0.5, 0.9, 16, 1, true), dark, Math.cos(a) * 0.75, 1.45, Math.sin(a) * 0.75);
  }
  addMesh(body, new THREE.CylinderGeometry(1.85, 1.95, 1.1, 32), gold, 0, 2.45, 0);
  addMesh(body, new THREE.CylinderGeometry(1.7, 1.8, 8, 32), metal, 0, 7, 0);
  [5, 8, 10.8].forEach((y) => addMesh(body, new THREE.CylinderGeometry(1.74, 1.74, 0.12, 32), dark, 0, y, 0));

  const profile: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const a = i / 14 * (Math.PI / 2);
    profile.push(new THREE.Vector2(Math.max(0.001, 1.7 * Math.pow(Math.cos(a), 0.75)), 3.6 * Math.sin(a)));
  }
  addMesh(body, new THREE.LatheGeometry(profile, 32), metal, 0, 11, 0);
  addMesh(body, new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), white, 0, 15, 0);
  addMesh(body, new THREE.SphereGeometry(0.45, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), white, 0, 15.3, 0);

  addMesh(body, new THREE.BoxGeometry(0.9, 1.3, 0.5), white, 0, 4.4, 1.85);
  const panelMat = new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.45, metalness: 0.35 });
  [-1, 1].forEach((side) => {
    const wing = addMesh(body, new THREE.BoxGeometry(2.6, 0.05, 1.1), panelMat, side * 3.1, 8.2, 0);
    wing.rotation.z = side * 0.35;
  });

  for (let i = 0; i < 4; i++) {
    const a = i / 4 * Math.PI * 2 + Math.PI / 4;
    const top = new THREE.Vector3(Math.cos(a) * 1.75, 4, Math.sin(a) * 1.75);
    const foot = new THREE.Vector3(Math.cos(a) * 4, 0.18, Math.sin(a) * 4);
    const knee = new THREE.Vector3(Math.cos(a) * 1.8, 2.2, Math.sin(a) * 1.8);
    strut(legs, top, foot, 0.08, white);
    strut(legs, knee, foot, 0.05, white);
    addMesh(legs, new THREE.CylinderGeometry(0.38, 0.45, 0.12, 16), white, foot.x, 0.08, foot.z);
  }

  const flame = new THREE.Group();
  flame.position.y = 1.0;
  flame.visible = false;
  const outer = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 6, 20, 1, true),
    new THREE.MeshBasicMaterial({ color: '#ff9f4a', transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  outer.rotation.x = Math.PI;
  outer.position.y = -3;
  const inner = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 3.6, 16, 1, true),
    new THREE.MeshBasicMaterial({ color: '#fff0c8', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  inner.rotation.x = Math.PI;
  inner.position.y = -1.8;
  flame.add(outer, inner);
  body.add(flame);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      color: '#ffc27a',
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false
    })
  );
  glow.position.y = -0.5;
  glow.scale.setScalar(7);
  glow.visible = false;
  body.add(glow);

  const light = new THREE.PointLight('#ffae5c', 0, 60, 1);
  light.position.y = -0.5;
  body.add(light);

  return { root, body, legs, flame, glow, light };
}