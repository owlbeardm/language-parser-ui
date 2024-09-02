/* tslint:disable */
/* eslint-disable */
import { SortDirection } from '../models/sort-direction';
export interface WordListFilter {
  dir?: SortDirection;

  /**
   * The language to search for
   */
  languageId?: number;
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
