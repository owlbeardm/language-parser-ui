/* tslint:disable */
import { LanguageName } from './language-name';
import { AddWordJSON } from './add-word-json';
export interface AddWordTranslationJSON {
  altTranslation?: string;
  comment?: string;
  isAltTranslation: boolean;
  langTo: LanguageName;
  translation?: AddWordJSON;
  wordFromId: number;
}
