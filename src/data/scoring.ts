import type { Medal } from '../types/game';

/** First-pass medal thresholds on the 0–3000 total. Tune after playtesting. */
export const medalThresholds: {medal: Medal;min: number;label: string;}[] = [
{ medal: 'gold', min: 2200, label: 'Gold' },
{ medal: 'silver', min: 1700, label: 'Silver' },
{ medal: 'bronze', min: 0, label: 'Bronze' }];


export const scoreAxes = [
{ id: 'efficiency', label: 'Efficiency', hint: 'Resources saved, action points used, Sols to spare' },
{ id: 'risk', label: 'Risk management', hint: 'Faults avoided, crises handled, advisor trust balance' },
{ id: 'science', label: 'Science value', hint: 'Sample quality, C-012 uplink, ice map accuracy' }] as
const;