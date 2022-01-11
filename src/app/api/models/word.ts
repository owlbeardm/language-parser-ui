/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
export interface Word {
  forgotten?: boolean;
  id: number;
  language?: Language;
  version: number;
  word?: string;
}
