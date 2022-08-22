/* tslint:disable */
/* eslint-disable */
import { Word } from './word';
export interface WordOriginSource {
  comment?: string;
  id?: number;
  sourceInitialVersion?: string;
  version?: number;
  word?: Word;
  wordSource?: Word;
}
