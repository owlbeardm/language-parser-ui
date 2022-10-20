/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from './grammatical-category-value';
import { Language } from './language';
import { Pos } from './pos';
import { WordOriginType } from './word-origin-type';
export interface WordWithCategoryValues {
  comment?: string;
  forgotten?: boolean;
  grammaticalValues?: Array<GrammaticalCategoryValue>;
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
