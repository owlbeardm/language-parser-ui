/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTranslation } from '../fn/translation/add-translation';
import { AddTranslation$Params } from '../fn/translation/add-translation';
import { deleteTranslation } from '../fn/translation/delete-translation';
import { DeleteTranslation$Params } from '../fn/translation/delete-translation';
import { getAllWordsWithTranslationsFromLang1 } from '../fn/translation/get-all-words-with-translations-from-lang-1';
import { GetAllWordsWithTranslationsFromLang1$Params } from '../fn/translation/get-all-words-with-translations-from-lang-1';
import { getTranslationsForWord } from '../fn/translation/get-translations-for-word';
import { GetTranslationsForWord$Params } from '../fn/translation/get-translations-for-word';
import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
import { Translation } from '../models/translation';


/**
 * Translation related operations
 */
@Injectable({ providedIn: 'root' })
export class TranslationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addTranslation()` */
  static readonly AddTranslationPath = '/api/translation/';

  /**
   * Add translation.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTranslation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTranslation$Response(params: AddTranslation$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addTranslation(this.http, this.rootUrl, params, context);
  }

  /**
   * Add translation.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTranslation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTranslation(params: AddTranslation$Params, context?: HttpContext): Observable<number> {
    return this.addTranslation$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllWordsWithTranslationsFromLang1()` */
  static readonly GetAllWordsWithTranslationsFromLang1Path = '/api/translation/page';

  /**
   * Get page of words with translations from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWordsWithTranslationsFromLang1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang1$Response(params: GetAllWordsWithTranslationsFromLang1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {
    return getAllWordsWithTranslationsFromLang1(this.http, this.rootUrl, params, context);
  }

  /**
   * Get page of words with translations from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang1(params: GetAllWordsWithTranslationsFromLang1$Params, context?: HttpContext): Observable<PageResultWordWithTranslations> {
    return this.getAllWordsWithTranslationsFromLang1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResultWordWithTranslations>): PageResultWordWithTranslations => r.body)
    );
  }

  /** Path part for operation `getTranslationsForWord()` */
  static readonly GetTranslationsForWordPath = '/api/translation/tranlationsfor/{id}';

  /**
   * Get translations for word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTranslationsForWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTranslationsForWord$Response(params: GetTranslationsForWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Translation>>> {
    return getTranslationsForWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Get translations for word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTranslationsForWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTranslationsForWord(params: GetTranslationsForWord$Params, context?: HttpContext): Observable<Array<Translation>> {
    return this.getTranslationsForWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Translation>>): Array<Translation> => r.body)
    );
  }

  /** Path part for operation `deleteTranslation()` */
  static readonly DeleteTranslationPath = '/api/translation/{id}';

  /**
   * Delete translation by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTranslation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTranslation$Response(params: DeleteTranslation$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTranslation(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete translation by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTranslation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTranslation(params: DeleteTranslation$Params, context?: HttpContext): Observable<void> {
    return this.deleteTranslation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
