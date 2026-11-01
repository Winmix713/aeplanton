import * as THREE from 'three';

export function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** Radially jitters vertices; identical positions move identically so faces stay closed. */
export function jitter<T extends THREE.BufferGeometry>(geo: T, amount: number, seed: number): T {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const k =
    Math.sin(Math.round(v.x * 1000) * 12.9898 + Math.round(v.y * 1000) * 78.233 + Math.round(v.z * 1000) * 37.719 + seed) *
    43758.5453;
    const f = k - Math.floor(k);
    v.multiplyScalar(1 + (f - 0.5) * amount);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function std(color: string, roughness = 0.8, metalness = 0, flatShading = false): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, flatShading });
}

/** Adds a shadow-casting mesh to a parent at a position. */
export function addMesh(
parent: THREE.Object3D,
geo: THREE.BufferGeometry,
mat: THREE.Material,
x: number,
y: number,
z: number)
: THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

/** A cylinder strut between two points. */
export function strut(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 8), mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  m.castShadow = true;
  parent.add(m);
  return m;
}

export function speckleTexture(repeat: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const img = ctx.createImageData(size, size);
  const rand = seeded(7);
  for (let i = 0; i < size * size; i++) {
    let v = 212 + rand() * 43;
    if (rand() < 0.05) v = 140 + rand() * 40;
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v * 0.97;
    img.data[i * 4 + 2] = v * 0.94;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let solarCache: THREE.CanvasTexture | null = null;
export function solarTexture(): THREE.CanvasTexture {
  if (solarCache) return solarCache;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#4f555e';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#9aa1aa';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
  }
  for (let i = 0; i <= 128; i += 32) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }
  solarCache = new THREE.CanvasTexture(canvas);
  solarCache.colorSpace = THREE.SRGBColorSpace;
  return solarCache;
}

export function glowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,248,230,1)');
  g.addColorStop(0.3, 'rgba(255,190,110,0.8)');
  g.addColorStop(1, 'rgba(255,140,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Bakes matrices once for objects that never move, skipping per-frame matrix recomposition. */
export function freezeStatic(obj: THREE.Object3D): void {
  obj.updateMatrixWorld(true);
  obj.traverse((o) => {
    o.matrixAutoUpdate = false;
  });
}

export function disposeScene(scene: THREE.Scene): void {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());else
    if (mat) mat.dispose();
  });
  solarCache = null;
}