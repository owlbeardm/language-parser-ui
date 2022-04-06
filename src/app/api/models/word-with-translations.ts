/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
export interface WordWithTranslations {
  forgotten?: boolean;
  id?: number;
  language?: Language;
  partOfSpeech?: Pos;
  translations?: Array<string>;
  version?: number;
  word?: string;
  writtenWord?: string;
}
