import type { Msg, MsgKey, MsgParams } from '../types/i18n';

/** Builds language-neutral game text; rendered later with the active dictionary. */
export function m(k: MsgKey, p?: MsgParams): Msg {
  return p ? { k, p } : { k };
}