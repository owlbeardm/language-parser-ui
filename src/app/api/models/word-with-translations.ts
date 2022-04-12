/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
import { Translation } from './translation';
export interface WordWithTranslations {
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  translations?: Array<Translation>;
  version?: number;
  word?: string;
  writtenWord?: string;
}
