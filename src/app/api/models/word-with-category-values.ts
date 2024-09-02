/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { Language } from '../models/language';
import { Pos } from '../models/pos';
import { WordOriginType } from '../models/word-origin-type';
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
