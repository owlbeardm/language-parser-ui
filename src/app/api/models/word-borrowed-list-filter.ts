/* tslint:disable */
/* eslint-disable */
import { SortDirection } from './sort-direction';
export interface WordBorrowedListFilter {
  dir?: SortDirection;

  /**
   * The language to search for
   */
  languageId?: number;

  /**
   * The language from to search for
   */
  languageToId?: number;
  page?: number;

  /**
   * The parts of speech to search for
   */
  posId?: number;
  size?: number;
  sort?: string;

  /**
   * The word to search for
   */
  word?: string;
}
