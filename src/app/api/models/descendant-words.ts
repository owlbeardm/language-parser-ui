/* tslint:disable */
/* eslint-disable */
import { WordWithTranslations } from '../models/word-with-translations';
export interface DescendantWords {
  descendants?: Array<DescendantWords>;
  word?: WordWithTranslations;
}
