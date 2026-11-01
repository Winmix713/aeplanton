import { ActivityIcon, BotIcon, ClipboardListIcon, CloudSunIcon, CompassIcon, HeartPulseIcon, LayoutGridIcon, MicroscopeIcon, SatelliteDishIcon, SettingsIcon } from 'lucide-react';
import type { GameView } from '../types/game';

export const navItems: {id: GameView;icon: typeof CompassIcon;key: string;dividerBefore?: boolean;}[] = [
{ id: 'command', icon: LayoutGridIcon, key: '1' },
{ id: 'colony', icon: HeartPulseIcon, key: '2' },
{ id: 'robotics', icon: BotIcon, key: '3' },
{ id: 'navigation', icon: CompassIcon, key: '4' },
{ id: 'science', icon: MicroscopeIcon, key: '5' },
{ id: 'systems', icon: ActivityIcon, key: '6' },
{ id: 'environment', icon: CloudSunIcon, key: '7' },
{ id: 'comms', icon: SatelliteDishIcon, key: '8' },
{ id: 'reports', icon: ClipboardListIcon, key: '9', dividerBefore: true },
{ id: 'settings', icon: SettingsIcon, key: '0' }];