/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { Pos } from './pos';
export interface Word {
  forgotten?: boolean;
  id: number;
  language?: Language;
  partOfSpeech?: Pos;
  version: number;
  word?: string;
}