/* tslint:disable */
/* eslint-disable */
import { SortDirection } from '../models/sort-direction';
export interface WordWithEvolutionsListFilter {

  /**
   * The word from to search for
   */
  canBeForgotten?: boolean;
  dir?: SortDirection;

  /**
   * The language from to search for
   */
  languageFromId?: number;

  /**
   * The language to to search for
   */
  languageToId?: number;
  page?: number;
  size?: number;
  sort?: string;

  /**
   * The word from to search for
   */
  word?: string;
}
