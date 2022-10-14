/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
import { WordOriginType } from './word-origin-type';
export interface WordWithWritten {
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
  writtenWord?: string;
}
