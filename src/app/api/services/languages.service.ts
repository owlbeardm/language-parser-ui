/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { canDeleteLanguage } from '../fn/languages/can-delete-language';
import { CanDeleteLanguage$Params } from '../fn/languages/can-delete-language';
import { deleteLanguage } from '../fn/languages/delete-language';
import { DeleteLanguage$Params } from '../fn/languages/delete-language';
import { deleteLanguagePhoneme } from '../fn/languages/delete-language-phoneme';
import { DeleteLanguagePhoneme$Params } from '../fn/languages/delete-language-phoneme';
import { getAllLanguages } from '../fn/languages/get-all-languages';
import { GetAllLanguages$Params } from '../fn/languages/get-all-languages';
import { getAllPartsOfSpeechByLanguage } from '../fn/languages/get-all-parts-of-speech-by-language';
import { GetAllPartsOfSpeechByLanguage$Params } from '../fn/languages/get-all-parts-of-speech-by-language';
import { getLanguagePhonemes } from '../fn/languages/get-language-phonemes';
import { GetLanguagePhonemes$Params } from '../fn/languages/get-language-phonemes';
import { getLanguageSoundClusters } from '../fn/languages/get-language-sound-clusters';
import { GetLanguageSoundClusters$Params } from '../fn/languages/get-language-sound-clusters';
import { Language } from '../models/language';
import { LanguagePhoneme } from '../models/language-phoneme';
import { LanguageSoundClusters } from '../models/language-sound-clusters';
import { ListOfLanguagePhonemes } from '../models/list-of-language-phonemes';
import { Pos } from '../models/pos';
import { saveLanguage } from '../fn/languages/save-language';
import { SaveLanguage$Params } from '../fn/languages/save-language';
import { saveLanguagePhoneme } from '../fn/languages/save-language-phoneme';
import { SaveLanguagePhoneme$Params } from '../fn/languages/save-language-phoneme';


/**
 * Language related operations
 */
@Injectable({ providedIn: 'root' })
export class LanguagesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveLanguage()` */
  static readonly SaveLanguagePath = '/api/language/';

  /**
   * Save language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLanguage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguage$Response(params: SaveLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Language>> {
    return saveLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Save language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguage(params: SaveLanguage$Params, context?: HttpContext): Observable<Language> {
    return this.saveLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Language>): Language => r.body)
    );
  }

  /** Path part for operation `getAllLanguages()` */
  static readonly GetAllLanguagesPath = '/api/language/all';

  /**
   * Get all languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLanguages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguages$Response(params?: GetAllLanguages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Language>>> {
    return getAllLanguages(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all languages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLanguages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguages(params?: GetAllLanguages$Params, context?: HttpContext): Observable<Array<Language>> {
    return this.getAllLanguages$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Language>>): Array<Language> => r.body)
    );
  }

  /** Path part for operation `getLanguageSoundClusters()` */
  static readonly GetLanguageSoundClustersPath = '/api/language/clusters/{languageId}';

  /**
   * Get language clusters by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLanguageSoundClusters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguageSoundClusters$Response(params: GetLanguageSoundClusters$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguageSoundClusters>> {
    return getLanguageSoundClusters(this.http, this.rootUrl, params, context);
  }

  /**
   * Get language clusters by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLanguageSoundClusters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguageSoundClusters(params: GetLanguageSoundClusters$Params, context?: HttpContext): Observable<LanguageSoundClusters> {
    return this.getLanguageSoundClusters$Response(params, context).pipe(
      map((r: StrictHttpResponse<LanguageSoundClusters>): LanguageSoundClusters => r.body)
    );
  }

  /** Path part for operation `getLanguagePhonemes()` */
  static readonly GetLanguagePhonemesPath = '/api/language/phoneme/{languageId}';

  /**
   * Get language phonemes by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLanguagePhonemes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguagePhonemes$Response(params: GetLanguagePhonemes$Params, context?: HttpContext): Observable<StrictHttpResponse<ListOfLanguagePhonemes>> {
    return getLanguagePhonemes(this.http, this.rootUrl, params, context);
  }

  /**
   * Get language phonemes by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLanguagePhonemes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguagePhonemes(params: GetLanguagePhonemes$Params, context?: HttpContext): Observable<ListOfLanguagePhonemes> {
    return this.getLanguagePhonemes$Response(params, context).pipe(
      map((r: StrictHttpResponse<ListOfLanguagePhonemes>): ListOfLanguagePhonemes => r.body)
    );
  }

  /** Path part for operation `saveLanguagePhoneme()` */
  static readonly SaveLanguagePhonemePath = '/api/language/phoneme/{languageId}';

  /**
   * Save language phoneme.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLanguagePhoneme()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePhoneme$Response(params: SaveLanguagePhoneme$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguagePhoneme>> {
    return saveLanguagePhoneme(this.http, this.rootUrl, params, context);
  }

  /**
   * Save language phoneme.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLanguagePhoneme$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePhoneme(params: SaveLanguagePhoneme$Params, context?: HttpContext): Observable<LanguagePhoneme> {
    return this.saveLanguagePhoneme$Response(params, context).pipe(
      map((r: StrictHttpResponse<LanguagePhoneme>): LanguagePhoneme => r.body)
    );
  }

  /** Path part for operation `deleteLanguagePhoneme()` */
  static readonly DeleteLanguagePhonemePath = '/api/language/phoneme/{phonemeId}';

  /**
   * Delete language phoneme.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLanguagePhoneme()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePhoneme$Response(params: DeleteLanguagePhoneme$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLanguagePhoneme(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete language phoneme.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLanguagePhoneme$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePhoneme(params: DeleteLanguagePhoneme$Params, context?: HttpContext): Observable<void> {
    return this.deleteLanguagePhoneme$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllPartsOfSpeechByLanguage()` */
  static readonly GetAllPartsOfSpeechByLanguagePath = '/api/language/pos/{languageId}';

  /**
   * Get all parts of speech by language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPartsOfSpeechByLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPartsOfSpeechByLanguage$Response(params: GetAllPartsOfSpeechByLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pos>>> {
    return getAllPartsOfSpeechByLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all parts of speech by language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPartsOfSpeechByLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPartsOfSpeechByLanguage(params: GetAllPartsOfSpeechByLanguage$Params, context?: HttpContext): Observable<Array<Pos>> {
    return this.getAllPartsOfSpeechByLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Pos>>): Array<Pos> => r.body)
    );
  }

  /** Path part for operation `deleteLanguage()` */
  static readonly DeleteLanguagePath = '/api/language/{languageId}';

  /**
   * Delete language by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguage$Response(params: DeleteLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete language by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguage(params: DeleteLanguage$Params, context?: HttpContext): Observable<void> {
    return this.deleteLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `canDeleteLanguage()` */
  static readonly CanDeleteLanguagePath = '/api/language/{languageId}/candelete';

  /**
   * Can delete language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `canDeleteLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  canDeleteLanguage$Response(params: CanDeleteLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return canDeleteLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Can delete language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `canDeleteLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  canDeleteLanguage(params: CanDeleteLanguage$Params, context?: HttpContext): Observable<boolean> {
    return this.canDeleteLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
