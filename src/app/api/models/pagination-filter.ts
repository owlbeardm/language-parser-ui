/* tslint:disable */
/* eslint-disable */
import { SortDirection } from './sort-direction';
export interface PaginationFilter {
  dir?: SortDirection;
  page?: number;
  size?: number;
  sort?: string;
}
