/* tslint:disable */
import { LanguageName } from './language-name';
import { WordOriginType } from './word-origin-type';
import { PartOfSpeech } from './part-of-speech';
export interface AddWordJSON {
  lang: LanguageName;
  makeForgotten: boolean;
  originIds: Array<number>;
  originType?: WordOriginType;
  pos: PartOfSpeech;
  wordText: string;
}
