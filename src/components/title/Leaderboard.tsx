import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficulties } from '../../data/difficulty';
import { regions } from '../../data/regions';
import type { DifficultyId, RegionId } from '../../types/game';
import { loadLeaderboard } from '../../utils/storage';
import { MedalBadge } from '../endgame/MedalBadge';

type Filter<T> = T | 'all';

export function Leaderboard({ onBack }: {onBack: () => void;}) {
  const { t } = useI18n();
  const all = useMemo(loadLeaderboard, []);
  const [diff, setDiff] = useState<Filter<DifficultyId>>('all');
  const [reg, setReg] = useState<Filter<RegionId>>('all');
  const rows = all.filter((e) => (diff === 'all' || e.difficulty === diff) && (reg === 'all' || e.region === reg));
  const seg = (on: boolean) =>
  `h-8 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] transition-colors duration-150 ${on ? 'bg-fill-3 text-ink shadow-[inset_0_0_0_1px_var(--line-2)]' : 'text-ink-3 hover:text-ink'}`;

  return (
    <section aria-labelledby="lb-title" className="glass glass-strong w-full max-w-[760px] rounded-[24px] p-5 md:p-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} aria-label={t.common.back} className="grid h-9 w-9 place-items-center rounded-full text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          <ArrowLeftIcon size={16} />
        </button>
        <div>
          <h1 id="lb-title" className="text-[20px] font-[650] text-ink">
            {t.leaderboard.title}
          </h1>
          <p className="text-[12px] text-ink-4">{t.leaderboard.subtitle}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="scroll-quiet flex gap-1 overflow-x-auto rounded-full bg-fill-1 p-1" role="group" aria-label={t.leaderboard.diffAria}>
          <button type="button" className={seg(diff === 'all')} onClick={() => setDiff('all')}>
            {t.leaderboard.all}
          </button>
          {difficulties.map((d) =>
          <button key={d.id} type="button" className={seg(diff === d.id)} onClick={() => setDiff(d.id)}>
              {t.difficulty[d.id].name}
            </button>
          )}
        </div>
        <div className="scroll-quiet flex gap-1 overflow-x-auto rounded-full bg-fill-1 p-1" role="group" aria-label={t.leaderboard.regionAria}>
          <button type="button" className={seg(reg === 'all')} onClick={() => setReg('all')}>
            {t.leaderboard.all}
          </button>
          {regions.map((r) =>
          <button key={r.id} type="button" className={seg(reg === r.id)} onClick={() => setReg(r.id)}>
              {t.regions[r.id].name}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-line">
              {t.leaderboard.headers.map((h) =>
              <th key={h} scope="col" className="hud-label py-2 pr-3 font-[550]">
                  {h}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) =>
            <tr key={e.id} className="border-b border-line last:border-0">
                <td className="py-2.5 pr-3 text-ink-4">{i + 1}</td>
                <td className="py-2.5 pr-3 text-[14px] font-[650] text-ink">{e.score}</td>
                <td className="py-2.5 pr-3">
                  <MedalBadge medal={e.medal} />
                </td>
                <td className={`py-2.5 pr-3 font-[600] ${e.result === 'victory' ? 'text-green' : 'text-red'}`}>{e.result === 'victory' ? t.leaderboard.certified : t.leaderboard.lost}</td>
                <td className="py-2.5 pr-3 text-ink-2">
                  {t.difficulty[e.difficulty].name}
                  {e.permadeath && <span className="ml-1 text-[10.5px] text-amber">{t.leaderboard.pd}</span>}
                </td>
                <td className="py-2.5 pr-3 text-ink-2">{t.regions[e.region].name}</td>
                <td className="py-2.5 pr-3 text-ink-3">{e.sol}</td>
              </tr>
            )}
          </tbody>
        </table>
        {!rows.length && <p className="py-8 text-center text-[12.5px] text-ink-4">{t.leaderboard.empty}</p>}
      </div>
    </section>);

}