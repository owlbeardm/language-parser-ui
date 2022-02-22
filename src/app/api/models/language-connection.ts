/* tslint:disable */
/* eslint-disable */
import { Language } from './language';
import { LanguageConnectionType } from './language-connection-type';
export interface LanguageConnection {
  connectionType?: LanguageConnectionType;
  id: number;
  langFrom?: Language;
  langTo?: Language;
  version: number;
}
