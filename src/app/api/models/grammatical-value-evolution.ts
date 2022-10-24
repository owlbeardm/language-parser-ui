/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from './grammatical-category-value';
import { Language } from './language';
import { Pos } from './pos';
export interface GrammaticalValueEvolution {
  id?: number;
  languageFrom?: Language;
  languageTo?: Language;
  pos?: Pos;
  valueFrom?: GrammaticalCategoryValue;
  valueTo?: GrammaticalCategoryValue;
  version?: number;
}
