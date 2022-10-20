/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from './grammatical-category-value';
import { Language } from './language';
export interface GrammaticalCategoryValueConnection {
  id?: number;
  language?: Language;
  value?: GrammaticalCategoryValue;
  version?: number;
}
