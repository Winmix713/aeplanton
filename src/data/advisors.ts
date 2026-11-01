import { AntennaIcon, CompassIcon, CpuIcon, MicroscopeIcon } from 'lucide-react';
import type { AdvisorId, PillarId } from '../types/game';

export const advisorOrder: AdvisorId[] = ['nav', 'sci', 'sys', 'comm'];

export const advisors: Record<
  AdvisorId,
  {code: string;name: string;role: string;lead: string;icon: typeof CompassIcon;pillars: PillarId[];wants: string;}> =
{
  nav: {
    code: 'NAV',
    name: 'Navigation',
    role: 'Routes, sectors, NAV fleet',
    lead: 'Dr. Imani Okafor',
    icon: CompassIcon,
    pillars: ['water'],
    wants: 'Safe, verified routes even if they are longer'
  },
  sci: {
    code: 'SCI',
    name: 'Science',
    role: 'Samples, mining, the Paradox signal',
    lead: 'Dr. Lena Varga',
    icon: MicroscopeIcon,
    pillars: ['water', 'science'],
    wants: 'Risky but valuable targets, sooner'
  },
  sys: {
    code: 'SYS',
    name: 'Systems & Life Support',
    role: 'Grid, chemical loop, modules',
    lead: 'Dr. Marco Bellini',
    icon: CpuIcon,
    pillars: ['power'],
    wants: 'Protect the grid and keep reserves'
  },
  comm: {
    code: 'COMM',
    name: 'Communications',
    role: 'Orbital fleet link, crew morale',
    lead: 'Alex Mercer',
    icon: AntennaIcon,
    pillars: ['comms', 'science'],
    wants: 'Bandwidth and a clean link to the fleet'
  }
};

/** Proposal quality bands (estimates and alternatives). Four-tier AP effects live in data/colony.ts. */
export const TRUST_HIGH = 70;
export const TRUST_LOW = 30;
export const TRUST_START = 55;