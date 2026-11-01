import type { en } from '../data/i18n/en';

export type Lang = 'en' | 'hu';
export type Dict = typeof en;
export type MsgKey = keyof Dict['msg'];
export type MsgParams = Record<string, string | number>;

/** Language-neutral game text: a message key plus parameters, rendered at display time. */
export interface Msg {
  k: MsgKey;
  p?: MsgParams;
}