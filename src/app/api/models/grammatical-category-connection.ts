/* tslint:disable */
/* eslint-disable */
import { GrammaticalCategory } from '../models/grammatical-category';
import { Language } from '../models/language';
import { Pos } from '../models/pos';
export interface GrammaticalCategoryConnection {
  grammaticalCategory?: GrammaticalCategory;
  id?: number;
  language?: Language;
  pos?: Pos;
  version?: number;
}
