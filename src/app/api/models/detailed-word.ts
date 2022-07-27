/* tslint:disable */
/* eslint-disable */
import { Etymology } from './etymology';
import { Translation } from './translation';
import { WordWithWritten } from './word-with-written';
export interface DetailedWord {
  descendants?: Array<WordWithWritten>;
  dirived?: Array<WordWithWritten>;
  etymology?: Etymology;
  translations?: Array<Translation>;
  word?: WordWithWritten;
}
