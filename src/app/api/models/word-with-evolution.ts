/* tslint:disable */
/* eslint-disable */
import { LanguageConnection } from './language-connection';
import { LanguageConnectionType } from './language-connection-type';
import { Word } from './word';
export interface WordWithEvolution {
  calculatedEvolution?: string;
  languageConnection?: LanguageConnection;
  word?: Word;
  wordEvolved?: Word;
  wordEvolvedType?: LanguageConnectionType;
}
