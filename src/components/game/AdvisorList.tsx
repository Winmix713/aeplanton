import React from 'react';
import type { AdvisorId, GameState, Proposal } from '../../types/game';
import type { Conflict } from '../../utils/game/proposals';
import { AdvisorCard } from '../advisors/AdvisorCard';

interface AdvisorListProps {
  ids: AdvisorId[];
  game: GameState;
  accepted: string[];
  onAccept: (p: Proposal) => void;
  locked: boolean;
  conflicts: Conflict[];
  compact?: boolean;
  className?: string;
  itemClassName?: string;
}

/** A stack (or swipe row) of advisor cards for the given advisors. */
export function AdvisorList({ ids, game, accepted, onAccept, locked, conflicts, compact = false, className = '', itemClassName = '' }: AdvisorListProps) {
  return (
    <div className={className}>
      {ids.map((id, i) => {
        const conflict = conflicts.find((c) => c.a === id);
        return (
          <div key={`${game.sol}-${id}`} className={itemClassName}>
            <AdvisorCard
              id={id}
              index={i}
              state={game.advisors[id]}
              proposals={game.proposals.filter((p) => p.advisor === id)}
              accepted={accepted}
              onAccept={onAccept}
              locked={locked}
              conflict={conflict?.text}
              compact={compact}
              secretKnown={game.colony.secrets.includes(id)} />
            
          </div>);

      })}
    </div>);

}