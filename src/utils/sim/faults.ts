import type { Fault, FaultSystem } from '../../types/mission';

let nextFaultId = 1;

export function activeFault(faults: Fault[], system: FaultSystem): Fault | undefined {
  return faults.find((f) => f.system === system && f.resolvedAt === null);
}

export function activeFaults(faults: Fault[]): Fault[] {
  return faults.filter((f) => f.resolvedAt === null);
}

/** Opens a fault unless one is already active for the system. Returns the new list and whether it opened. */
export function openFault(
faults: Fault[],
system: FaultSystem,
title: string,
severity: Fault['severity'],
at: number)
: {faults: Fault[];opened: boolean;} {
  if (activeFault(faults, system)) return { faults, opened: false };
  return { faults: [...faults, { id: nextFaultId++, system, title, severity, at, resolvedAt: null }], opened: true };
}

export function resolveFault(faults: Fault[], system: FaultSystem, at: number): {faults: Fault[];resolved: boolean;} {
  if (!activeFault(faults, system)) return { faults, resolved: false };
  return { faults: faults.map((f) => f.system === system && f.resolvedAt === null ? { ...f, resolvedAt: at } : f), resolved: true };
}