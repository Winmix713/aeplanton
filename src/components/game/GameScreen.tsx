import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { advisorOrder } from '../../data/advisors';
import { regionDef } from '../../data/regions';
import { useCamera } from '../../hooks/useCamera';
import { useGame } from '../../hooks/useGame';
import { type StageTarget, useStageDriver } from '../../hooks/useStageDriver';
import type { GameView } from '../../types/game';
import { navItems } from '../../data/navigation';
import { useI18n } from '../../contexts/LanguageContext';
import { findConflicts } from '../../utils/game/proposals';
import { setHapticsEnabled } from '../../utils/haptics';
import { setSoundEnabled } from '../../utils/sound';
import { Debrief } from '../endgame/Debrief';
import { MissionDecision } from '../missions/MissionDecision';
import { BentoDrawer } from '../drawer/BentoDrawer';
import { MissionData } from '../drawer/MissionData';
import { CameraControls } from '../layout/CameraControls';
import { NavRail } from '../layout/NavRail';
import { TopBar } from '../layout/TopBar';
import { PillarsHud } from '../pillars/PillarsHud';
import { SolReport } from '../report/SolReport';
import { ExecutionFeed } from '../sequence/ExecutionFeed';
import { SequenceDock } from '../sequence/SequenceDock';
import { Toast } from '../shared/Toast';
import { MarsStage } from '../stage/MarsStage';
import { RoverTag, SectorLabel } from '../stage/StageLabels';
import { Leaderboard } from '../title/Leaderboard';
import { NewMissionSetup } from '../title/NewMissionSetup';
import { TitleScreen } from '../title/TitleScreen';
import { AdvisorList } from './AdvisorList';
import { type SettingsBindings, ViewPanel } from './ViewPanel';

interface GameScreenProps {
  startScreen: 'title' | 'game';
  drawerDefaultOpen: boolean;
  hapticsEnabled: boolean;
}

export function GameScreen({ startScreen, drawerDefaultOpen, hapticsEnabled }: GameScreenProps) {
  const { t } = useI18n();
  const g = useGame(startScreen);
  const { game, phase, progress } = g;
  const [view, setView] = useState<GameView>('command');
  const [drawerOpen, setDrawerOpen] = useState(drawerDefaultOpen);
  const [lightGlass, setLightGlass] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticsOn, setHapticsOn] = useState(hapticsEnabled);
  const cam = useCamera();

  useEffect(() => setHapticsOn(hapticsEnabled), [hapticsEnabled]);
  useEffect(() => setHapticsEnabled(hapticsOn), [hapticsOn]);
  useEffect(() => setSoundEnabled(soundOn), [soundOn]);
  useEffect(() => setDrawerOpen(drawerDefaultOpen), [drawerDefaultOpen]);

  const region = useMemo(() => regionDef(game?.region ?? 'chryse'), [game?.region]);
  const inGame = g.screen === 'game' && !!game;
  const planning = phase === 'planning';
  const playing = phase === 'uplink' || phase === 'executing' || phase === 'night';

  // Chase cam while the sequence plays out; back to the site view for planning.
  useEffect(() => {
    if (phase === 'executing') cam.setMode('atlas');
    if (phase === 'planning') cam.setMode('site');
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const step = progress && progress.stepIndex >= 0 ? progress.steps[progress.stepIndex] : null;
  const target: StageTarget = {
    route: phase === 'night' && progress?.steps.length ? progress.steps[progress.steps.length - 1].routeAfter : step ? step.routeAfter : game?.route ?? 0.08,
    action: phase === 'executing' && step ? step.command : null,
    storm: phase === 'night' && g.playbackNext ? g.playbackNext.storm.intensity : game?.storm.intensity ?? 0,
    linkOpen: !(step && step.command === 'uplink' && !step.ok),
    speed: 2
  };
  const simRef = useStageDriver(target);

  const lmst = progress ? 7.5 + progress.fraction * 20.5 : 7.5;
  const roverStatus = !game ?
  { text: t.stage.standby, tone: 'neutral' as const } :
  phase === 'executing' && step ?
  { text: t.commands[step.command].label, tone: 'amber' as const } :
  phase === 'uplink' ?
  { text: t.stage.awaiting, tone: 'neutral' as const } :
  phase === 'night' ?
  { text: t.stage.sleep, tone: 'neutral' as const } :
  game.rover.safeModeSols > 0 ?
  { text: t.stage.safeMode, tone: 'red' as const } :
  { text: t.stage.battery(Math.round(game.rover.battery)), tone: game.rover.battery < 30 ? 'red' as const : 'green' as const };

  const conflicts = useMemo(() => game ? findConflicts(game.proposals) : [], [game]);

  const selectView = useCallback((v: GameView) => setView(v), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('[role="listbox"]') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!inGame || g.report || g.debriefOpen || game?.colony.pendingMission) return;
      if (e.key === ' ' && playing) {
        e.preventDefault();
        g.togglePause();
        return;
      }
      if (e.key === 'b' || e.key === 'B') {
        setDrawerOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
        return;
      }
      const item = navItems.find((n) => n.key === e.key);
      if (item) setView(item.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inGame, g, playing, drawerOpen]);

  const settings: SettingsBindings = {
    canLoad: !!game && !game.permadeath && planning,
    onSave: g.saveNow,
    onLoad: (slot) => {
      g.loadSlot(slot);
      setView('command');
    },
    onQuit: g.quitToTitle,
    soundOn,
    onToggleSound: () => setSoundOn((v) => !v),
    lightGlass,
    onToggleGlass: () => setLightGlass((v) => !v),
    hapticsOn,
    onToggleHaptics: () => setHapticsOn((v) => !v)
  };
  const openLeaderboard = () => g.setScreen('leaderboard');
  const reportsAlert = !!game && game.events[0]?.tone === 'red' && view !== 'reports';

  const dock =
  game && inGame ?
  planning ?
  <SequenceDock
    game={game}
    queue={g.queue}
    safe={g.safe}
    capacity={g.capacity}
    onAdd={g.addCommand}
    onRemove={g.removeItem}
    onMove={g.moveItem}
    onToggleSafe={g.toggleSafe}
    onSend={g.send}
    onRest={g.restSols} /> :

  progress ?
  <ExecutionFeed
    phase={phase}
    delayMin={game.delayMin}
    uplinkLeft={progress.uplinkLeft}
    uplinkDur={progress.uplinkDur}
    stepIndex={progress.stepIndex}
    steps={progress.steps}
    paused={g.paused} /> :

  null :
  null;

  const advisorProps = game ? { game, accepted: g.accepted, onAccept: g.acceptProposal, locked: !planning, conflicts } : null;

  return (
    <div data-glass={lightGlass ? 'light' : 'dark'} className="min-h-[100dvh] w-full max-w-full overflow-x-clip bg-obsidian font-sans text-ink">
      <main className={`relative w-full overflow-hidden ${inGame ? 'h-[clamp(380px,60dvh,560px)] lg:h-[100dvh] lg:min-h-[760px]' : 'h-[100dvh] min-h-[640px]'}`}>
        <MarsStage
          simRef={simRef}
          cameraRef={cam.cameraRef}
          region={region}
          onPick={() => undefined}
          onFlyTo={cam.fly}
          callouts={inGame ? { rover: <RoverTag status={roverStatus.text} tone={roverStatus.tone} />, sector: <SectorLabel /> } : {}} />
        
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: inGame ?
            'linear-gradient(180deg, rgba(12,11,10,0.5) 0%, rgba(12,11,10,0) 16%, rgba(12,11,10,0) 62%, rgba(12,11,10,0.55) 100%)' :
            'linear-gradient(180deg, rgba(12,11,10,0.35) 0%, rgba(12,11,10,0.15) 40%, rgba(12,11,10,0.75) 100%)'
          }} />
        

        {!inGame &&
        <div className="absolute inset-0 z-20 grid place-items-center overflow-y-auto p-4 md:p-8">
            {g.screen === 'setup' ?
          <NewMissionSetup onBack={() => g.setScreen('title')} onStart={(o) => {g.startNew(o);setView('command');}} /> :
          g.screen === 'leaderboard' ?
          <Leaderboard onBack={() => g.setScreen(game && !game.outcome ? 'game' : 'title')} /> :

          <TitleScreen onContinue={(s) => {g.loadSlot(s);setView('command');}} onNew={() => g.setScreen('setup')} onLeaderboard={openLeaderboard} />
          }
          </div>
        }

        {inGame && game && advisorProps &&
        <>
            <TopBar game={game} region={region} phase={phase} lmst={lmst} paused={g.paused} onTogglePause={g.togglePause} speed={g.speed} onSpeed={g.setSpeed} />

            <NavRail active={view} onSelect={selectView} alert={reportsAlert} className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex" />

            <div className="absolute left-1/2 top-[68px] z-10 hidden w-[min(680px,calc(100%-800px))] -translate-x-1/2 xl:block">
              <PillarsHud game={game} />
            </div>

            <aside
            aria-label={view === 'command' ? t.layout.leftCommand : t.layout.leftView}
            className="scroll-quiet absolute bottom-[252px] left-[88px] top-[68px] z-10 hidden w-[320px] flex-col gap-3 overflow-y-auto pb-2 lg:flex xl:w-[350px]">
            
              <div className="xl:hidden">
                <PillarsHud game={game} layout="grid" />
              </div>
              {view === 'command' ?
            <AdvisorList ids={['nav', 'sci']} {...advisorProps} className="flex flex-col gap-3" /> :

            <ViewPanel view={view} game={game} settings={settings} onLeaderboard={openLeaderboard} colonyLocked={!planning} onModuleMode={g.setModuleMode} />
            }
            </aside>

            <aside
            aria-label={view === 'command' ? t.layout.rightCommand : t.layout.rightView}
            className="scroll-quiet absolute bottom-[252px] right-5 top-[68px] z-10 hidden w-[300px] flex-col gap-3 overflow-y-auto pb-2 lg:flex xl:w-[330px]">
            
              {view === 'command' ?
            <AdvisorList ids={['sys', 'comm']} {...advisorProps} className="flex flex-col gap-3" /> :

            <AdvisorList ids={advisorOrder} {...advisorProps} compact className="flex flex-col gap-2.5" />
            }
            </aside>

            <div className="absolute left-1/2 top-[148px] z-40 w-full max-w-[520px] -translate-x-1/2 px-4 lg:top-[140px]">
              <Toast toast={g.toast} />
            </div>

            <div className="absolute bottom-[252px] left-1/2 z-10 hidden -translate-x-1/2 2xl:block">
              <CameraControls mode={cam.mode} onMode={cam.setMode} onZoom={cam.zoom} showHints={false} />
            </div>

            <div className="absolute bottom-[56px] left-[88px] right-5 z-20 hidden lg:block">{dock}</div>

            <BentoDrawer open={drawerOpen} onToggle={() => setDrawerOpen((v) => !v)} game={game} />
          </>
        }
      </main>

      {inGame && game && advisorProps &&
      <div className="space-y-3 px-4 py-4 lg:hidden">
          <NavRail active={view} onSelect={selectView} alert={reportsAlert} orientation="horizontal" />
          <PillarsHud game={game} layout="grid" />
          {dock}
          <section aria-label={t.layout.advisors}>
            <h2 className="hud-label mb-2 px-1">{t.advisor.proposals(game.sol)}</h2>
            <AdvisorList
            ids={advisorOrder}
            {...advisorProps}
            compact={view !== 'command'}
            className="scroll-quiet -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
            itemClassName="w-[min(86vw,340px)] shrink-0 snap-start" />
          
          </section>
          {view !== 'command' && <ViewPanel view={view} game={game} settings={settings} onLeaderboard={openLeaderboard} colonyLocked={!planning} onModuleMode={g.setModuleMode} />}
          <div className="flex justify-center">
            <CameraControls mode={cam.mode} onMode={cam.setMode} onZoom={cam.zoom} showHints={false} />
          </div>
          <section aria-label={t.drawer.title} className="glass rounded-[18px] p-4">
            <h2 className="hud-label mb-3">{t.drawer.title}</h2>
            <MissionData game={game} />
          </section>
        </div>
      }

      <SolReport report={g.report} ended={!!game?.outcome} canUndo={g.canUndo} onContinue={g.continueAfterReport} onUndo={g.undo} />
      <MissionDecision open={inGame && planning && !g.report && !game?.outcome && !!game?.colony.pendingMission} game={game} onChoose={g.chooseMission} />
      <Debrief
        open={g.debriefOpen && g.screen === 'game'}
        game={game}
        onClose={g.closeDebrief}
        onNew={() => g.setScreen('setup')}
        onLeaderboard={openLeaderboard}
        onTitle={g.quitToTitle} />
      
    </div>);

}