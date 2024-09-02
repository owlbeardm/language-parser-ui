/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { LanguageConnectionType } from '../models/language-connection-type';
export interface LanguageConnection {
  connectionType?: LanguageConnectionType;
  id?: number;
  langFrom?: Language;
  langTo?: Language;
  version?: number;
}
