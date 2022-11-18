/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategoryValue } from './grammatical-category-value';
import { Language } from './language';
import { Pos } from './pos';
export interface DeclensionFull {
  deprecated?: boolean;
  exist?: boolean;
  id?: number;
  language?: Language;
  pos?: Pos;
  values?: Array<GrammaticalCategoryValue>;
  version?: number;
}
