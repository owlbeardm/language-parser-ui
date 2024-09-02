/* tslint:disable */
/* eslint-disable */
import { Word } from '../models/word';
export interface WordOriginSource {
  comment?: string;
  id?: number;
  sourceInitialVersion?: string;
  version?: number;
  word?: Word;
  wordSource?: Word;
}
