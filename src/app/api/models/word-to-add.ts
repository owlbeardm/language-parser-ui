/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
import { WordOriginType } from './word-origin-type';
export interface WordToAdd {
  comment?: string;
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  version?: number;
  word?: string;
  wordOriginType?: WordOriginType;
}