/* tslint:disable */
/* eslint-disable */
import { Etymology } from './etymology';
import { WordWithWritten } from './word-with-written';
export interface DetailedWord {
  descendants?: Array<WordWithWritten>;
  dirived?: Array<WordWithWritten>;
  etymology?: Etymology;
  translations?: Array<string>;
  word?: WordWithWritten;
}
