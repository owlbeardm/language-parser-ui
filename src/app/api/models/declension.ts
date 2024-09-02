/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { Language } from '../models/language';
import { Pos } from '../models/pos';
export interface Declension {
  id?: number;
  language?: Language;
  pos?: Pos;
  values?: Array<GrammaticalCategoryValue>;
  version?: number;
}
