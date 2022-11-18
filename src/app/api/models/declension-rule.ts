/* tslint:disable */
/* eslint-disable */
import { Declension } from './declension';
import { GrammaticalCategoryValue } from './grammatical-category-value';
export interface DeclensionRule {
  declension?: Declension;
  enabled?: boolean;
  id?: number;
  name?: string;
  values?: Array<GrammaticalCategoryValue>;
  version?: number;
  wordPattern?: string;
}
