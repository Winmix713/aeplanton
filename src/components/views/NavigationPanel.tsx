import React from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DRILL_RANGE, SURVEY_RANGE } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const ROUTE_KM = 4.2;
const POINTS: [number, number][] = [
[16, 150],
[62, 140],
[102, 112],
[142, 94],
[192, 82],
[232, 60],
[272, 36],
[318, 18]];


const SEGS = POINTS.slice(1).map((p, i) => Math.hypot(p[0] - POINTS[i][0], p[1] - POINTS[i][1]));
const TOTAL = SEGS.reduce((a, b) => a + b, 0);

function pointAt(t: number): [number, number] {
  let d = Math.min(1, Math.max(0, t)) * TOTAL;
  for (let i = 0; i < SEGS.length; i++) {
    if (d <= SEGS[i]) {
      const k = d / SEGS[i];
      return [POINTS[i][0] + (POINTS[i + 1][0] - POINTS[i][0]) * k, POINTS[i][1] + (POINTS[i + 1][1] - POINTS[i][1]) * k];
    }
    d -= SEGS[i];
  }
  return POINTS[POINTS.length - 1];
}

export function NavigationPanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const region = regionDef(game.region);
  const left = (1 - game.route) * ROUTE_KM;
  const perDrive = 0.13 * region.driveFactor * (game.rover.wheels < 40 ? 0.6 : 1) * (1 - 0.3 * game.storm.intensity);
  const drivesLeft = game.route >= 1 ? 0 : Math.ceil((1 - game.route) / perDrive);
  const pts = POINTS.map((p) => p.join(',')).join(' ');
  const [rx, ry] = pointAt(game.route);
  return (
    <Panel title={t.navigation.title} aside={<span className="text-[11px] text-ink-4">{t.regions[game.region].name}</span>}>
      <svg viewBox="0 0 334 170" className="w-full" role="img" aria-label={t.navigation.routeAria(Math.round(game.route * 100))}>
        <polyline points={pts} fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="3 5" strokeLinejoin="round" />
        <polyline points={pts} fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${game.route} 1`} />
        {[SURVEY_RANGE, DRILL_RANGE].map((r, i) => {
          const [x, y] = pointAt(r);
          return <circle key={r} cx={x} cy={y} r="3.5" fill="var(--bg)" stroke={i === 0 ? 'var(--blue)' : 'var(--green)'} strokeWidth="1.5" />;
        })}
        <circle cx={POINTS[7][0]} cy={POINTS[7][1]} r="4" fill="none" stroke="var(--ink-3)" strokeWidth="1.2" />
        <circle cx={rx} cy={ry} r="6" fill="var(--amber)" stroke="var(--bg)" strokeWidth="2" />
        <text x="16" y="166" fill="var(--ink-4)" fontSize="9">
          {t.navigation.landing}
        </text>
        <text x="306" y="12" fill="var(--ink-3)" fontSize="9" textAnchor="end">
          {t.navigation.ridge}
        </text>
      </svg>
      <div className="mt-1 flex gap-4 text-[11px] text-ink-4">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-blue" />
          {t.navigation.radarRange}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-green" />
          {t.navigation.drillRange}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-3">
        <div>
          <dt className="hud-label">{t.navigation.remaining}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">{left.toFixed(1)} km</dd>
        </div>
        <div>
          <dt className="hud-label">{t.navigation.drivesLeft}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">~{drivesLeft}</dd>
        </div>
        <div>
          <dt className="hud-label">{t.navigation.perDrive}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">{Math.round(perDrive * ROUTE_KM * 1000)} m</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3">
        <Meter label={t.navigation.wheels} value={`${Math.round(game.rover.wheels)}%`} fraction={game.rover.wheels / 100} tone={healthTone(game.rover.wheels)} />
        <Meter label={t.navigation.wear} value={`×${region.wearMult.toFixed(1)}`} fraction={region.wearMult / 2} />
      </div>

      <p className={`mt-4 flex items-start gap-2 rounded-lg px-3 py-2 text-[12px] text-ink ${game.waypointsVerified ? 'bg-green-soft' : 'bg-amber-soft'}`}>
        {game.waypointsVerified ? <CheckIcon size={14} className="mt-0.5 shrink-0 text-green" /> : <TriangleAlertIcon size={14} className="mt-0.5 shrink-0 text-amber" />}
        {game.waypointsVerified ? t.navigation.verified : t.navigation.unverified}
      </p>
    </Panel>);

}