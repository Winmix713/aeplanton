import React from 'react';
import type { ModuleId, ModuleMode } from '../../types/colony';
import type { GameState, GameView } from '../../types/game';
import { ColonyPanel } from '../colony/ColonyPanel';
import { RoboticsPanel } from '../colony/RoboticsPanel';
import { CommsPanel } from '../views/CommsPanel';
import { EnvironmentPanel } from '../views/EnvironmentPanel';
import { NavigationPanel } from '../views/NavigationPanel';
import { ReportsPanel } from '../views/ReportsPanel';
import { SciencePanel } from '../views/SciencePanel';
import { SettingsPanel } from '../views/SettingsPanel';
import { SystemsPanel } from '../views/SystemsPanel';

export interface SettingsBindings {
  canLoad: boolean;
  onSave: (slot: number) => void;
  onLoad: (slot: number) => void;
  onQuit: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  lightGlass: boolean;
  onToggleGlass: () => void;
  hapticsOn: boolean;
  onToggleHaptics: () => void;
}

interface ViewPanelProps {
  view: Exclude<GameView, 'command'>;
  game: GameState;
  settings: SettingsBindings;
  onLeaderboard: () => void;
  colonyLocked: boolean;
  onModuleMode: (id: ModuleId, mode: ModuleMode) => void;
}

export function ViewPanel({ view, game, settings, onLeaderboard, colonyLocked, onModuleMode }: ViewPanelProps) {
  switch (view) {
    case 'colony':
      return <ColonyPanel game={game} locked={colonyLocked} onMode={onModuleMode} />;
    case 'robotics':
      return <RoboticsPanel game={game} />;
    case 'navigation':
      return <NavigationPanel game={game} />;
    case 'science':
      return <SciencePanel game={game} />;
    case 'systems':
      return <SystemsPanel game={game} />;
    case 'environment':
      return <EnvironmentPanel game={game} />;
    case 'comms':
      return <CommsPanel game={game} />;
    case 'reports':
      return <ReportsPanel game={game} onLeaderboard={onLeaderboard} />;
    case 'settings':
      return <SettingsPanel game={game} {...settings} />;
  }
}