/* tslint:disable */
export interface TranslationAPI {
  fromWordId: number;
  toLangId: number;
  toWordId?: number;
  translationAltTranslation?: string;
  translationComment?: string;
}
