/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
import { Translation } from './translation';
import { WordOriginType } from './word-origin-type';
export interface WordWithTranslations {
  comment?: string;
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  sourceType?: WordOriginType;
  translations?: Array<Translation>;
  version?: number;
  word?: string;
  writtenWord?: string;
}
