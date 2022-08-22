/* tslint:disable */
/* eslint-disable */
import { Word } from './word';
import { WordOriginSource } from './word-origin-source';
export interface WordWithBorrowed {
  calculatedEvolution?: string;
  word?: Word;
  wordEvolved?: WordOriginSource;
}
