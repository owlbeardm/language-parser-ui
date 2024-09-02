/* tslint:disable */
/* eslint-disable */
import { DescendantWords } from '../models/descendant-words';
import { Etymology } from '../models/etymology';
import { Translation } from '../models/translation';
import { WordWithTranslations } from '../models/word-with-translations';
import { WordWithWritten } from '../models/word-with-written';
export interface DetailedWord {
  derived?: Array<WordWithTranslations>;
  descendants?: DescendantWords;
  etymology?: Etymology;
  translations?: Array<Translation>;
  word?: WordWithWritten;
}
