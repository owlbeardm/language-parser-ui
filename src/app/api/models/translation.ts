/* tslint:disable */
/* eslint-disable */
import { Phrase } from './phrase';
import { TranslationType } from './translation-type';
import { Word } from './word';
import { WordWithWritten } from './word-with-written';
export interface Translation {
  id?: number;
  phraseTo?: Phrase;
  type?: TranslationType;
  version?: number;
  wordFrom?: Word;
  wordTo?: WordWithWritten;
}
