/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { Pos } from '../models/pos';
import { WordOriginType } from '../models/word-origin-type';
export interface Word {
  comment?: string;
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
}
