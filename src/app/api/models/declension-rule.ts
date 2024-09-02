/* tslint:disable */
/* eslint-disable */
import { Declension } from '../models/declension';
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
export interface DeclensionRule {
  declension?: Declension;
  enabled?: boolean;
  id?: number;
  name?: string;
  values?: Array<GrammaticalCategoryValue>;
  version?: number;
  wordPattern?: string;
}
