/* tslint:disable */
/* eslint-disable */
import { Etymology } from './etymology';
import { Translation } from './translation';
import { WordWithTranslations } from './word-with-translations';
import { WordWithWritten } from './word-with-written';
export interface DetailedWord {
  derived?: Array<WordWithTranslations>;
  descendants?: Array<WordWithTranslations>;
  etymology?: Etymology;
  translations?: Array<Translation>;
  word?: WordWithWritten;
}
