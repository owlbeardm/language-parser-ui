/* tslint:disable */
/* eslint-disable */
import { LanguagePhoneme } from './language-phoneme';
export interface ListOfLanguagePhonemes {
  langId?: number;
  restUsedPhonemes?: Array<string>;
  selectedMainPhonemes?: Array<LanguagePhoneme>;
  selectedRestPhonemes?: Array<LanguagePhoneme>;
  usedMainPhonemes?: Array<string>;
}
