/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategory } from './grammatical-category';
import { Language } from './language';
import { Pos } from './pos';
export interface DeclensionConnection {
  grammaticalCategory?: GrammaticalCategory;
  id?: number;
  language?: Language;
  pos?: Pos;
  version?: number;
}
