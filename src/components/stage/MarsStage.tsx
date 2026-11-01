import React, { useEffect, useRef } from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import * as THREE from 'three';
import { hotspots as hotspotDefs } from '../../data/hotspots';
import { sitePositions } from '../../data/mission';
import type { RegionDef } from '../../data/regions';
import type { CalloutId, CameraState, HotspotId, MissionState, PickId } from '../../types/mission';
import type { MapPoint } from '../../types/rover';
import { ROUTE_LENGTH, routePoint, routeTangent } from '../../utils/route';
import { buildBase } from '../../utils/scene/base';
import { desiredCamera } from '../../utils/scene/camera';
import { buildTacticalOverlay } from '../../utils/scene/tactical';
import { createDust } from '../../utils/scene/effects';
import { buildGround, buildMountains, buildRocks } from '../../utils/scene/ground';
import { disposeScene, freezeStatic } from '../../utils/scene/helpers';
import { buildLander } from '../../utils/scene/lander';
import { buildOutcrop, buildRoute } from '../../utils/scene/sector';
import { buildCargo, buildExplorer, buildRover } from '../../utils/scene/vehicles';
import { terrainHeight } from '../../utils/terrain';
import { cargoPose, explorerPose } from '../../utils/vehicles';

interface MarsStageProps {
  simRef: React.MutableRefObject<MissionState>;
  cameraRef: React.MutableRefObject<CameraState>;
  callouts: Partial<Record<CalloutId, React.ReactNode>>;
  /** Interactive part markers projected from the rover / lander rigs. */
  hotspots?: Partial<Record<HotspotId, React.ReactNode>>;
  onPick: (id: PickId) => void;
  onFlyTo: (p: MapPoint) => void;
  /** Region drives terrain palette, rock density, ridge height and sky. */
  region: RegionDef;
}

const CALLOUT_ORDER: CalloutId[] = ['sector', 'explorer', 'cargo', 'lander', 'rover'];

export function MarsStage({ simRef, cameraRef, callouts, hotspots = {}, onPick, onFlyTo, region }: MarsStageProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<Partial<Record<CalloutId, HTMLDivElement | null>>>({});
  const hotRefs = useRef<Partial<Record<HotspotId, HTMLDivElement | null>>>({});
  const onPickRef = useRef(onPick);
  const onFlyRef = useRef(onFlyTo);
  onPickRef.current = onPick;
  onFlyRef.current = onFlyTo;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;

    const scene = new THREE.Scene();
    const look$ = region.scene;
    const sky = new THREE.Color(look$.sky);
    scene.background = sky;
    scene.fog = new THREE.Fog(sky, 60, 340);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 8000);

    scene.add(new THREE.HemisphereLight('#ffe2c4', '#5a3424', 1.15));
    const sun = new THREE.DirectionalLight('#ffe3c2', 2.3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, far: 200 });
    sun.shadow.camera.updateProjectionMatrix();
    sun.shadow.bias = -0.0005;
    scene.add(sun, sun.target);

    const ground = buildGround(look$.ground);
    const base = buildBase();
    const statics = [ground, buildRocks(look$.rockCount, look$.rocks), buildMountains(look$.mountain, look$.mountainScale), base.group, buildRoute()];
    scene.add(...statics);
    const tactical = buildTacticalOverlay();
    scene.add(tactical.group);
    const clearSky = new THREE.Color(look$.sky);
    const stormSky = new THREE.Color(look$.stormSky);
    const outcrop = buildOutcrop();
    [...statics, outcrop.group].forEach(freezeStatic);
    const lander = buildLander();
    const lp = sitePositions.lander;
    const landerBase = new THREE.Vector3(lp.x, terrainHeight(lp.x, lp.z) + 0.1, lp.z);
    lander.root.position.copy(landerBase);
    const rover = buildRover();
    rover.group.rotation.order = 'YXZ';
    const cargo = buildCargo();
    const explorer = buildExplorer();
    const dust = createDust();
    dust.points.position.copy(landerBase);
    scene.add(outcrop.group, lander.root, rover.group, cargo.group, explorer.group, dust.points);

    lander.root.userData.pick = 'lander';
    rover.group.userData.pick = 'rover';
    cargo.group.userData.pick = 'cargo';
    explorer.group.userData.pick = 'explorer';
    outcrop.group.userData.pick = 'sector';
    const pickables: THREE.Object3D[] = [lander.root, rover.group, cargo.group, explorer.group, outcrop.group, ...base.pickables];

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const aim = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
    };
    const pickAt = (e: MouseEvent): PickId | null => {
      aim(e);
      for (const hit of raycaster.intersectObjects(pickables, true)) {
        let o: THREE.Object3D | null = hit.object;
        while (o) {
          if (o.userData.pick) return o.userData.pick as PickId;
          o = o.parent;
        }
      }
      return null;
    };
    const onClick = (e: MouseEvent) => {
      const id = pickAt(e);
      if (id) onPickRef.current(id);
    };
    const onDbl = (e: MouseEvent) => {
      aim(e);
      const hit = raycaster.intersectObject(ground)[0];
      if (hit) onFlyRef.current({ x: hit.point.x, z: hit.point.z });
    };
    let hoverQueued = false;
    const onMove = (e: MouseEvent) => {
      if (hoverQueued) return;
      hoverQueued = true;
      requestAnimationFrame(() => {
        hoverQueued = false;
        canvas.style.cursor = pickAt(e) ? 'pointer' : 'default';
      });
    };
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('dblclick', onDbl);
    canvas.addEventListener('pointermove', onMove);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let displayT = simRef.current.rover.t;
    let yaw = 0;
    let first = true;
    let last = performance.now();
    const camPos = new THREE.Vector3();
    const camLook = new THREE.Vector3();
    const desired = new THREE.Vector3();
    const look = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const hotPos = new THREE.Vector3();
    const anchors: Record<CalloutId, {pos: THREE.Vector3;visible: boolean;}> = {
      sector: { pos: outcrop.top.clone(), visible: true },
      explorer: { pos: new THREE.Vector3(), visible: true },
      cargo: { pos: new THREE.Vector3(), visible: true },
      lander: { pos: new THREE.Vector3(), visible: true },
      rover: { pos: new THREE.Vector3(), visible: true }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sim = simRef.current;
      const L = sim.lander;

      // Weather: storms darken the sky, pull the fog in and dim the solar field.
      const storm = sim.weather.intensity;
      sky.copy(clearSky).lerp(stormSky, storm);
      const fog = scene.fog as THREE.Fog;
      fog.color.copy(sky);
      fog.near = 60 - storm * 35;
      fog.far = 340 - storm * 200;
      base.panelMat.color.setScalar(Math.max(0.35, 1 - storm * 0.45 - sim.resources.arrayDust * 0.5));
      tactical.update(cameraRef.current.mode === 'tactical', sim.comms.open, sim.weather.phase !== 'clear');

      // Rover
      const prevT = displayT;
      displayT += (sim.rover.t - displayT) * Math.min(1, dt * 5);
      const p = routePoint(displayT);
      const tan = routeTangent(displayT);
      const face = sim.rover.status === 'returning' ? tan.clone().negate() : tan;
      const targetYaw = Math.atan2(face.x, face.z);
      if (first) yaw = targetYaw;
      const diff = Math.atan2(Math.sin(targetYaw - yaw), Math.cos(targetYaw - yaw));
      yaw += diff * Math.min(1, dt * 3);
      const fx = Math.sin(yaw);
      const fz = Math.cos(yaw);
      const pitch = Math.atan2(terrainHeight(p.x + fx, p.z + fz) - terrainHeight(p.x - fx, p.z - fz), 2);
      const roll = Math.atan2(terrainHeight(p.x + fz, p.z - fx) - terrainHeight(p.x - fz, p.z + fx), 2);
      const moving = sim.rover.status === 'navigating' || sim.rover.status === 'returning';
      rover.group.position.set(p.x, p.y + (moving ? Math.sin(now / 175) * 0.012 : 0), p.z);
      rover.group.rotation.set(-pitch, yaw, roll);
      const dist = Math.abs(displayT - prevT) * ROUTE_LENGTH;
      rover.wheels.forEach((w) => w.rotation.x += dist / 0.36);
      if (rover.beacon) rover.beacon.visible = Math.floor(now / 600) % 2 === 0;
      anchors.rover.pos.set(p.x, p.y + 3.3, p.z);

      // Lander
      let bodyY = 0;
      let bodyX = 0;
      let tilt = 0;
      if (L.phase === 'hotfire') bodyY = L.hover;
      if (L.phase === 'ascent' || L.phase === 'departed') {
        bodyY = L.altitude;
        bodyX = L.downrange;
        tilt = -Math.min(0.45, L.phaseTime * 0.03);
      }
      lander.body.position.set(bodyX, bodyY, 0);
      lander.body.rotation.z = tilt;
      lander.legs.position.y = L.phase === 'hotfire' ? L.hover : 0;
      lander.body.visible = L.phase !== 'departed';
      const firing = L.enginesOn;
      lander.flame.visible = firing;
      lander.glow.visible = firing;
      if (firing) {
        const f = 0.85 + Math.random() * 0.3;
        const len = L.phase === 'ascent' ? 1.7 : L.phase === 'countdown' ? 1.1 : 0.85;
        lander.flame.scale.set(f, len * f, f);
        lander.glow.scale.setScalar(L.phase === 'ascent' ? 9 + L.altitude * 0.012 : 7);
        lander.light.intensity = 6 + Math.random() * 2;
      } else {
        lander.light.intensity = 0;
      }
      dust.update(dt, firing && bodyY < 30 ? 1 : 0);
      const rocketPos = new THREE.Vector3(landerBase.x + bodyX, landerBase.y + bodyY + 8, landerBase.z);
      anchors.lander.pos.set(landerBase.x + bodyX, landerBase.y + bodyY + 16.4, landerBase.z);
      anchors.lander.visible = L.phase !== 'departed' && bodyY < 80;

      // Fleet
      const cp = cargoPose(sim.vehicles.cargoU);
      cargo.group.position.set(cp.x, terrainHeight(cp.x, cp.z), cp.z);
      cargo.group.rotation.y = cp.yaw;
      if (sim.vehicles.cargoDwell <= 0) cargo.wheels.forEach((w) => w.rotation.x += 2 * dt / 0.45);
      anchors.cargo.pos.set(cp.x, cargo.group.position.y + 3.4, cp.z);
      const ep = explorerPose(sim.vehicles.explorerT);
      explorer.group.position.set(ep.x, terrainHeight(ep.x, ep.z), ep.z);
      explorer.group.rotation.y = ep.yaw;
      explorer.wheels.forEach((w) => w.rotation.x += 0.6 * dt / 0.28);
      if (explorer.beacon) explorer.beacon.visible = Math.floor(now / 800) % 2 === 0;
      anchors.explorer.pos.set(ep.x, explorer.group.position.y + 3, ep.z);

      // Camera
      const rate = desiredCamera(
        cameraRef.current,
        { roverPos: p, routeDir: tan, landerPos: landerBase, rocketPos, lander: L },
        desired,
        look
      );
      if (first) {
        camPos.copy(desired);
        camLook.copy(look);
        first = false;
      } else {
        const k = 1 - Math.exp(-dt * rate);
        camPos.lerp(desired, k);
        camLook.lerp(look, k);
      }
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      const shadowCenter = tmp.set(camLook.x, 0, camLook.z);
      if (shadowCenter.distanceTo(landerBase) > 200) shadowCenter.copy(landerBase);
      sun.position.set(shadowCenter.x + 30, 50, shadowCenter.z + 12);
      sun.target.position.copy(shadowCenter);

      const w = container.clientWidth;
      const h = container.clientHeight;
      CALLOUT_ORDER.forEach((id) => {
        const el = tagRefs.current[id];
        if (!el) return;
        const v = tmp.copy(anchors[id].pos).project(camera);
        const visible = anchors[id].visible && v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
        el.style.transform = `translate3d(${((v.x + 1) / 2 * w).toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px, 0)`;
        el.style.opacity = visible ? '1' : '0';
      });

      rover.group.updateMatrixWorld();
      lander.root.updateMatrixWorld();
      const landerParked = lander.body.visible && bodyY < 1;
      hotspotDefs.forEach((def) => {
        const el = hotRefs.current[def.id];
        if (!el) return;
        hotPos.set(def.offset[0], def.offset[1], def.offset[2]);
        (def.vehicle === 'rover' ? rover.group : lander.body).localToWorld(hotPos);
        const v = hotPos.project(camera);
        const visible = (def.vehicle === 'rover' || landerParked) && v.z < 1 && Math.abs(v.x) < 0.98 && Math.abs(v.y) < 0.98;
        el.style.transform = `translate3d(${((v.x + 1) / 2 * w).toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px, 0)`;
        el.style.opacity = visible ? '1' : '0';
        el.style.visibility = visible ? 'visible' : 'hidden';
      });

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(frame);

    // Pause the render loop while the tab is hidden; resume without a dt spike.
    const onVisibility = () => {
      if (document.hidden) {
        renderer.setAnimationLoop(null);
      } else {
        last = performance.now();
        renderer.setAnimationLoop(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      renderer.setAnimationLoop(null);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('dblclick', onDbl);
      canvas.removeEventListener('pointermove', onMove);
      disposeScene(scene);
      renderer.dispose();
      container.removeChild(canvas);
    };
  }, [simRef, cameraRef, region]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" aria-label={t.stage.view(t.regions[region.id].name)} role="img" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CALLOUT_ORDER.map((id) =>
        callouts[id] ?
        <div
          key={id}
          ref={(el) => {
            tagRefs.current[id] = el;
          }}
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-200">
          
              {callouts[id]}
            </div> :
        null
        )}
        {hotspotDefs.map((h) =>
        hotspots[h.id] ?
        <div
          key={h.id}
          ref={(el) => {
            hotRefs.current[h.id] = el;
          }}
          className="invisible absolute left-0 top-0 z-[1] opacity-0 transition-[opacity,visibility] duration-200 focus-within:z-[2]">
          
              {hotspots[h.id]}
            </div> :
        null
        )}
      </div>
    </div>);

}