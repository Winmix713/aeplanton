import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { routeSamples } from '../route';
import { terrainHeight, valueNoise } from '../terrain';
import { jitter, seeded, speckleTexture } from './helpers';

export function buildGround(color = '#c99069'): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(640, 640, 280, 280);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(color);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, terrainHeight(x, z));
    const n = 0.86 + valueNoise(x * 0.06 + 40, z * 0.06) * 0.24;
    colors[i * 3] = base.r * n;
    colors[i * 3 + 1] = base.g * n;
    colors[i * 3 + 2] = base.b * n;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const tex = speckleTexture(150);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, bumpMap: tex, bumpScale: 1.4, roughness: 1 })
  );
  mesh.receiveShadow = true;
  mesh.name = 'ground';
  return mesh;
}

const ROCK_VARIANTS = 6;

/** Scattered rocks as a handful of InstancedMeshes (one draw call per shape variant). */
export function buildRocks(count = 170, paletteHex: string[] = ['#8d5d42', '#7b513a', '#9b6a4c', '#6f4733']): THREE.Group {
  const group = new THREE.Group();
  const rand = seeded(42);
  const avoid = routeSamples(80);
  const palette = paletteHex.map((c) => new THREE.Color(c));
  const buckets: THREE.Object3D[][] = Array.from({ length: ROCK_VARIANTS }, () => []);
  const colors: THREE.Color[][] = Array.from({ length: ROCK_VARIANTS }, () => []);

  let placed = 0;
  let tries = 0;
  while (placed < count && tries < 6000) {
    tries++;
    const x = (rand() - 0.5) * 220;
    const z = (rand() - 0.5) * 220 - 10;
    if (Math.hypot(x - 16, z - 6) < 27) continue;
    if (avoid.some((p) => Math.hypot(p.x - x, p.z - z) < 3.2)) continue;
    if (Math.hypot(x - sitePositions.sector.x, z - sitePositions.sector.z) < 12) continue;
    const big = rand() < 0.08;
    const s = big ? 1.6 + rand() * 1.8 : 0.15 + Math.pow(rand(), 2) * 0.9;
    const d = new THREE.Object3D();
    d.scale.set(s * (1 + rand() * 0.6), s * (0.45 + rand() * 0.3), s * (0.8 + rand() * 0.5));
    d.rotation.set(rand() * 0.4, rand() * Math.PI * 2, rand() * 0.3);
    d.position.set(x, terrainHeight(x, z) + s * 0.12, z);
    d.updateMatrix();
    const v = Math.floor(rand() * ROCK_VARIANTS);
    buckets[v].push(d);
    colors[v].push(palette[Math.floor(rand() * palette.length)]);
    placed++;
  }

  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95, flatShading: true });
  buckets.forEach((items, v) => {
    if (!items.length) return;
    const mesh = new THREE.InstancedMesh(jitter(new THREE.DodecahedronGeometry(1, 0), 0.55, v * 17 + 1), material, items.length);
    items.forEach((d, i) => {
      mesh.setMatrixAt(i, d.matrix);
      mesh.setColorAt(i, colors[v][i]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });
  return group;
}

export function buildMountains(color = '#a2735a', scale = 1): THREE.Group {
  const group = new THREE.Group();
  const rand = seeded(9);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true });
  for (let i = 0; i < 34; i++) {
    const a = i / 34 * Math.PI * 2 + rand() * 0.12;
    const r = 190 + rand() * 90;
    const h = (28 + rand() * 70) * scale;
    const radius = 34 + rand() * 40;
    const geo = jitter(new THREE.ConeGeometry(radius, h, 7, 3), 0.35, i * 3);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(16 + Math.cos(a) * r, h / 2 - 6, 6 + Math.sin(a) * r);
    m.rotation.y = rand() * Math.PI;
    group.add(m);
  }
  return group;
}