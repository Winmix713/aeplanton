import type { HotspotId } from '../types/mission';

export interface HotspotDef {
  id: HotspotId;
  vehicle: 'rover' | 'lander';
  name: string;
  part: string;
  /** Local offset on the vehicle rig (rover group / lander body), meters. */
  offset: [number, number, number];
  /** Camera zoom used when inspecting this part. */
  zoom: number;
}

export const hotspots: HotspotDef[] = [
{ id: 'drill', vehicle: 'rover', name: 'Coring drill', part: 'ATLAS-01 · Arm', offset: [0, 0.8, 1.15], zoom: 0.45 },
{ id: 'solar', vehicle: 'rover', name: 'Solar array', part: 'ATLAS-01 · Deck', offset: [-0.55, 1.36, -0.65], zoom: 0.45 },
{ id: 'navcam', vehicle: 'rover', name: 'Navigation camera', part: 'ATLAS-01 · Mast', offset: [0.3, 2.85, 0.75], zoom: 0.45 },
{ id: 'engine', vehicle: 'lander', name: 'Main engines', part: 'IX-7 · Aft section', offset: [0, 1.5, 0], zoom: 1 },
{ id: 'airlock', vehicle: 'lander', name: 'Sample airlock', part: 'IX-7 · Service bay', offset: [0, 4.4, 1.95], zoom: 1 },
{ id: 'antenna', vehicle: 'lander', name: 'High-gain antenna', part: 'IX-7 · Upper stage', offset: [-1.75, 10.4, 0.3], zoom: 1 }];