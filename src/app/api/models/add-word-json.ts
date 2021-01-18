/* tslint:disable */
import { LanguageName } from './language-name';
import { PartOfSpeech } from './part-of-speech';
export interface AddWordJSON {
  lang: LanguageName;
  makeForgotten: boolean;
  pos: PartOfSpeech;
  wordText: string;
}
