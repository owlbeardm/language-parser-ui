/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { Language } from '../models/language';
export interface GrammaticalCategoryValueConnection {
  id?: number;
  language?: Language;
  value?: GrammaticalCategoryValue;
  version?: number;
}
