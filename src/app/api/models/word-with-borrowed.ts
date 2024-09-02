/* tslint:disable */
/* eslint-disable */
import { Word } from '../models/word';
import { WordOriginSource } from '../models/word-origin-source';
export interface WordWithBorrowed {
  calculatedEvolution?: string;
  word?: Word;
  wordEvolved?: WordOriginSource;
}
