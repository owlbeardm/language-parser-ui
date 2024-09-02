/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { Pos } from '../models/pos';
import { Word } from '../models/word';
import { WordOriginType } from '../models/word-origin-type';
export interface DerivedWordToAdd {
  comment?: string;
  derivedFrom?: Array<Word>;
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  sourceType?: WordOriginType;
  version?: number;

  /**
   * The word sounds
   */
  word?: string;
  wordOriginType?: WordOriginType;
}
