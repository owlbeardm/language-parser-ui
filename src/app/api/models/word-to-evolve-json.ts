/* tslint:disable */
import { WordJSON } from './word-json';
export interface WordToEvolveJSON {
  evolvedText: string;
  evolvedWords?: Array<WordJSON>;
  wordToEvolve: WordJSON;
}
