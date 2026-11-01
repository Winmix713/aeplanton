export type RoverStatus =
'docked' |
'navigating' |
'holding' |
'on-target' |
'scanning' |
'collecting' |
'returning' |
'transferring';

export interface RoverState {
  t: number;
  status: RoverStatus;
  speed: number;
  battery: number;
  odometer: number;
  motorTemp: number;
  speedLimit: number;
  scanned: boolean;
  samples: number;
  /** 0–1 dust coverage on the deck solar array. */
  panelDust: number;
  /** 0–1.4 drill heat; ≥ 1 overheats. */
  drillHeat: number;
  drillOverheated: boolean;
  /** Seconds left in an operator-requested cooling cycle. */
  drillCooling: number;
  reachedTarget: boolean;
  sampleDelivered: boolean;
  timer: number;
  speedHistory: number[];
  batteryHistory: number[];
}

export type ToastTone = 'ok' | 'warn' | 'info';

export interface ToastMessage {
  id: number;
  text: string;
  tone: ToastTone;
}

export interface MapPoint {
  x: number;
  z: number;
}