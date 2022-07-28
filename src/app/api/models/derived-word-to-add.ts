/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
import { Word } from './word';
import { WordOriginType } from './word-origin-type';
export interface DerivedWordToAdd {
  comment?: string;
  derivedFrom?: Array<Word>;
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  sourceType?: WordOriginType;
  version?: number;
  word?: string;
  wordOriginType?: WordOriginType;
}
