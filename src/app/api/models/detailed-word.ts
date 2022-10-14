/* tslint:disable */
/* eslint-disable */
import { DescendantWords } from './descendant-words';
import { Etymology } from './etymology';
import { Translation } from './translation';
import { WordWithTranslations } from './word-with-translations';
import { WordWithWritten } from './word-with-written';
export interface DetailedWord {
  derived?: Array<WordWithTranslations>;
  descendants?: DescendantWords;
  etymology?: Etymology;
  translations?: Array<Translation>;
  word?: WordWithWritten;
}
