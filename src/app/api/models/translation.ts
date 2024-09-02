/* tslint:disable */
/* eslint-disable */
import { Phrase } from '../models/phrase';
import { TranslationType } from '../models/translation-type';
import { Word } from '../models/word';
import { WordWithWritten } from '../models/word-with-written';
export interface Translation {
  id?: number;
  phraseTo?: Phrase;
  type?: TranslationType;
  version?: number;
  wordFrom?: Word;
  wordTo?: WordWithWritten;
}
