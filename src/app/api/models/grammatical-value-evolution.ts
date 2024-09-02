/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { Language } from '../models/language';
import { Pos } from '../models/pos';
export interface GrammaticalValueEvolution {
  id?: number;
  languageFrom?: Language;
  languageTo?: Language;
  pos?: Pos;
  valueFrom?: GrammaticalCategoryValue;
  valueTo?: GrammaticalCategoryValue;
  version?: number;
}
