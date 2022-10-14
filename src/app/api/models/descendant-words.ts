/* tslint:disable */
/* eslint-disable */
import { WordWithTranslations } from './word-with-translations';
export interface DescendantWords {
  descendants?: Array<DescendantWords>;
  word?: WordWithTranslations;
}
