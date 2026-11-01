export const checkSubsystems = [
{ name: 'Avionics', detail: 'Flight computers A/B in sync' },
{ name: 'Power', detail: 'Bus 28.1 V · batteries nominal' },
{ name: 'Propulsion', detail: 'CH₄ / LOX tanks pressurised' },
{ name: 'Comms', detail: 'X-band lock · relay TGO-2' },
{ name: 'Life support', detail: 'Cabin 101 kPa · O₂ nominal' },
{ name: 'GNC', detail: 'IMU aligned · star tracker lock' }];


export const CHECK_STEP = 0.85;
export const HOTFIRE_DURATION = 7.5;
export const HOTFIRE_ENGINE_OFF = 7;
export const COUNTDOWN_START = 10;
export const ASCENT_DURATION = 14;

export const countdownMilestones = [
{ t: 10, label: 'Terminal count' },
{ t: 6, label: 'Ignition sequence start' },
{ t: 3, label: 'Engines to full thrust' },
{ t: 0, label: 'Liftoff' }];