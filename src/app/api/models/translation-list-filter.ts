/* tslint:disable */
/* eslint-disable */
import { SortDirection } from '../models/sort-direction';
export interface TranslationListFilter {
  dir?: SortDirection;

  /**
   * The word language to search for
   */
  languageFromId?: number;

  /**
   * The translation language to search for
   */
  languageToId?: number;
  page?: number;
  size?: number;
  sort?: string;

  /**
   * The translation to search for
   */
  translation?: string;

  /**
   * The word to search for
   */
  word?: string;
}
