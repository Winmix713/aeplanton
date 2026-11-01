import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { routePoint } from '../route';
import { terrainHeight } from '../terrain';

const COVERAGE_RADIUS = 70;

/** Flat ground ring at a point. */
function groundRing(inner: number, outer: number, color: string, opacity: number): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.RingGeometry(inner, outer, 96),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
  );
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 2;
  return m;
}

/** Steepest point along the traverse, sampled from terrain height. */
function steepestRoutePoint(): THREE.Vector3 {
  let best = 0;
  let at = routePoint(0.5);
  const N = 80;
  for (let i = 1; i < N; i++) {
    const a = routePoint((i - 1) / N);
    const b = routePoint(i / N);
    const run = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const slope = Math.abs(b.y - a.y) / run;
    if (slope > best) {
      best = slope;
      at = b;
    }
  }
  return new THREE.Vector3(at.x, at.y, at.z);
}

/**
 * Tactical-camera overlay: link coverage around the antenna tower, the steepest route
 * segment, and the inbound storm direction. Static (no animation) so it respects reduced motion.
 */
export function buildTacticalOverlay() {
  const group = new THREE.Group();
  group.visible = false;
  const { tower, lander } = sitePositions;

  const coverage = groundRing(COVERAGE_RADIUS - 0.8, COVERAGE_RADIUS, '#9cc2f0', 0.55);
  coverage.position.set(tower.x, terrainHeight(tower.x, tower.z) + 0.3, tower.z);
  const coverageFill = new THREE.Mesh(
    new THREE.CircleGeometry(COVERAGE_RADIUS, 96),
    new THREE.MeshBasicMaterial({ color: '#9cc2f0', transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false })
  );
  coverageFill.rotation.x = -Math.PI / 2;
  coverageFill.position.copy(coverage.position);
  group.add(coverage, coverageFill);

  const steep = steepestRoutePoint();
  const risk = groundRing(1.8, 2.4, '#f5a857', 0.9);
  risk.position.set(steep.x, steep.y + 0.25, steep.z);
  const riskPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4, 6), new THREE.MeshBasicMaterial({ color: '#f5a857' }));
  riskPost.position.set(steep.x, steep.y + 2, steep.z);
  group.add(risk, riskPost);

  // Storm front: a chevron upwind of the base pointing at the landing site.
  const stormGroup = new THREE.Group();
  const chevron = new THREE.Shape();
  chevron.moveTo(0, 6);
  chevron.lineTo(5, -3);
  chevron.lineTo(0, 0);
  chevron.lineTo(-5, -3);
  chevron.closePath();
  const stormMat = new THREE.MeshBasicMaterial({ color: '#f5a857', transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false });
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.ShapeGeometry(chevron), stormMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(0, 0, i * 9);
    stormGroup.add(m);
  }
  const from = new THREE.Vector3(lander.x + 55, 0, lander.z - 35);
  const dir = new THREE.Vector3(lander.x - from.x, 0, lander.z - from.z).normalize();
  stormGroup.position.set(from.x, terrainHeight(from.x, from.z) + 0.6, from.z);
  stormGroup.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI;
  group.add(stormGroup);

  const coverageMat = coverage.material as THREE.MeshBasicMaterial;
  return {
    group,
    update(visible: boolean, linkOpen: boolean, stormInbound: boolean) {
      group.visible = visible;
      if (!visible) return;
      coverageMat.color.set(linkOpen ? '#9cc2f0' : '#8a8580');
      coverageMat.opacity = linkOpen ? 0.55 : 0.3;
      stormGroup.visible = stormInbound;
    }
  };
}