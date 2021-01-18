/* tslint:disable */
import { PartOfSpeech } from './part-of-speech';
export interface WordJSON {
  forgotten: boolean;
  id?: number;
  partOfSpeech: PartOfSpeech;
  word: string;
}
