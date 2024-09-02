/* tslint:disable */
/* eslint-disable */
import { LanguageConnection } from '../models/language-connection';
import { LanguageConnectionType } from '../models/language-connection-type';
import { Word } from '../models/word';
export interface WordWithEvolution {
  calculatedEvolution?: string;
  languageConnection?: LanguageConnection;
  word?: Word;
  wordEvolved?: Word;
  wordEvolvedType?: LanguageConnectionType;
}
