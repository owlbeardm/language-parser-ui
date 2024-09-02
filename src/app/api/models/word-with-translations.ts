/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { Pos } from '../models/pos';
import { Translation } from '../models/translation';
import { WordOriginType } from '../models/word-origin-type';
export interface WordWithTranslations {
  comment?: string;
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  sourceType?: WordOriginType;
  translations?: Array<Translation>;
  version?: number;

  /**
   * The word sounds
   */
  word?: string;
  writtenWord?: string;
}
