import React from 'react';
import { ArrowRightIcon, CheckIcon, MinusIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { advisorOrder, advisors } from '../../data/advisors';
import { pillarOrder } from '../../data/pillars';
import type { SolReport as SolReportData } from '../../types/game';
import { medalFor } from '../../utils/game/scoring';
import { MedalBadge } from '../endgame/MedalBadge';
import { Modal } from '../shared/Modal';
import { EventsLog } from '../views/EventsLog';

interface SolReportProps {
  report: SolReportData | null;
  ended: boolean;
  canUndo: boolean;
  onContinue: () => void;
  onUndo: () => void;
}

export function SolReport({ report, ended, canUndo, onContinue, onUndo }: SolReportProps) {
  const { t, f } = useI18n();
  return (
    <Modal open={!!report} labelledBy="sol-report-title" onClose={onContinue} closeOnBackdrop={false} className="max-w-[760px]">
      {report &&
      <div className="p-5 md:p-7">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="hud-label">{t.report.received} · {t.acts[report.act].name}</p>
              <h2 id="sol-report-title" className="mt-1 text-[22px] font-[650] text-ink">
                {t.report.title(report.sol)}
                {report.restSkip ? <span className="ml-2 text-[14px] font-normal text-ink-3">{t.report.rested(report.restSkip)}</span> : null}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-[22px] font-[650] text-ink">{report.score.total}</div>
              <div className="mt-0.5 flex items-center justify-end gap-1.5 text-[11.5px] text-ink-4">
                {t.report.score} <MedalBadge medal={medalFor(report.score.total)} />
              </div>
            </div>
          </header>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <section aria-label={t.report.cmdsAria}>
              <h3 className="hud-label mb-2">{t.report.sequence(report.apUsed, report.apBudget)}</h3>
              {report.steps.length ?
            <ol className="space-y-2">
                  {report.steps.map((s, i) =>
              <li key={i} className="flex items-start gap-2.5 text-[12.5px]">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${s.skipped ? 'bg-fill-3 text-ink-3' : s.ok ? 'bg-green-soft text-green' : 'bg-fill-3 text-red'}`}>
                        {s.skipped ? <MinusIcon size={10} /> : s.ok ? <CheckIcon size={10} strokeWidth={3} /> : <XIcon size={10} strokeWidth={3} />}
                      </span>
                      <div className="min-w-0">
                        <span className="font-[600] text-ink">{f(s.title)}</span>
                        <span className="ml-1.5 text-[10.5px] text-ink-4">{s.source === 'manual' ? t.common.you : advisors[s.source].code}</span>
                        <div className="text-ink-3">{f(s.detail)}</div>
                      </div>
                    </li>
              )}
                </ol> :

            <p className="text-[12.5px] text-ink-4">{t.report.idle}</p>
            }
              <p className="mt-3 text-[12px] text-ink-3">
                {t.report.night(report.nightTemp)}
                {report.heated ? t.report.heated : <span className="text-amber">{t.report.unheated}</span>}
                {t.report.battery(Math.round(report.batteryBefore), Math.round(report.batteryAfter))}
              </p>
            </section>

            <section aria-label={t.report.events}>
              <h3 className="hud-label mb-2">{t.report.events}</h3>
              {report.events.length ? <EventsLog events={report.events} /> : <p className="text-[12.5px] text-ink-4">{t.report.quiet}</p>}
            </section>
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-2 rounded-[14px] bg-fill-1 p-3 text-[11.5px] sm:grid-cols-6">
            <ReportReading label={t.environment.temperature} value={`${report.environment.dayTempC} °C`} />
            <ReportReading label={t.environment.pressure} value={`${report.environment.pressurePa} Pa`} />
            <ReportReading label={t.environment.wind} value={`${report.environment.windMs} m/s`} />
            <ReportReading label={t.environment.dust} value={`${Math.round(report.environment.dustIndex * 100)}%`} />
            <ReportReading label={t.environment.solar} value={`${report.environment.solarIrradiance} W/m²`} />
            <ReportReading label={t.environment.visibility} value={`${report.environment.visibilityKm} km`} />
          </dl>

          <div className="mt-6 grid gap-6 border-t border-line pt-5 md:grid-cols-2">
            <section aria-label={t.report.pillars}>
              <h3 className="hud-label mb-2.5">{t.report.pillars}</h3>
              <ul className="space-y-2">
                {pillarOrder.map((id) => {
                const a = Math.round(report.pillarsBefore[id] * 100);
                const b = Math.round(report.pillarsAfter[id] * 100);
                return (
                  <li key={id} className="grid grid-cols-[96px_1fr_70px] items-center gap-2 text-[12px]">
                      <span className="truncate text-ink-2">{t.pillars[id].name}</span>
                      <span className="relative h-1 rounded-full bg-track">
                        <span className="absolute inset-y-0 left-0 rounded-full bg-ink-4" style={{ width: `${a}%` }} />
                        <span className={`absolute inset-y-0 rounded-full ${b >= 100 ? 'bg-green' : 'bg-amber'}`} style={{ left: `${Math.min(a, b)}%`, width: `${Math.abs(b - a)}%` }} />
                      </span>
                      <span className={`text-right font-[600] ${b > a ? 'text-amber' : b < a ? 'text-red' : 'text-ink-3'}`}>
                        {b}%
                        {b !== a &&
                      <span className="font-normal">
                            {' '}
                            ({b > a ? '+' : ''}
                            {b - a})
                          </span>
                      }
                      </span>
                    </li>);

              })}
              </ul>
            </section>
            <section aria-label={t.report.trust}>
              <h3 className="hud-label mb-2.5">{t.report.trust}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {advisorOrder.map((id) => {
                const d = report.trustDelta[id];
                return (
                  <li key={id} className="flex items-center justify-between rounded-lg bg-fill-1 px-3 py-2 text-[12.5px]">
                      <span className="font-[600] text-ink">{advisors[id].code}</span>
                      <span className={`font-[650] ${d > 0 ? 'text-green' : d < 0 ? 'text-red' : 'text-ink-3'}`}>
                        {d > 0 ? '+' : ''}
                        {d}
                      </span>
                    </li>);

              })}
              </ul>
            </section>
          </div>

          <footer className="mt-6 flex flex-wrap items-center justify-end gap-2">
            {canUndo &&
          <button type="button" onClick={onUndo} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
                <RotateCcwIcon size={14} />
                {t.report.undo}
              </button>
          }
            <button
            type="button"
            onClick={onContinue}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110">
            
              {ended ? t.report.debrief : t.report.next(report.sol + 1)}
              <ArrowRightIcon size={14} strokeWidth={2} />
            </button>
          </footer>
        </div>
      }
    </Modal>);

}

function ReportReading({ label, value }: {label: string;value: string;}) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[9.5px] uppercase tracking-[0.07em] text-ink-4">{label}</dt>
      <dd className="mt-0.5 truncate font-[600] text-ink">{value}</dd>
    </div>);

}