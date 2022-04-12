/* tslint:disable */
/* eslint-disable */
import { Phrase } from './phrase';
import { TranslationType } from './translation-type';
import { WordWithWritten } from './word-with-written';
export interface Translation {
  phraseTo?: Phrase;
  type?: TranslationType;
  wordTo?: WordWithWritten;
}
