/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
import { Translation } from '../models/translation';
import { TranslationListFilter } from '../models/translation-list-filter';


/**
 * Translation related operations
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addTranslation
   */
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
  addTranslation$Response(params: {
    context?: HttpContext
    body: Translation
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TranslationService.AddTranslationPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Add translation.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTranslation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTranslation(params: {
    context?: HttpContext
    body: Translation
  }
): Observable<number> {

    return this.addTranslation$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation getAllWordsWithTranslationsFromLang1
   */
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
  getAllWordsWithTranslationsFromLang1$Response(params: {
    filter: TranslationListFilter;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {

    const rb = new RequestBuilder(this.rootUrl, TranslationService.GetAllWordsWithTranslationsFromLang1Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResultWordWithTranslations>;
      })
    );
  }

  /**
   * Get page of words with translations from language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang1(params: {
    filter: TranslationListFilter;
    context?: HttpContext
  }
): Observable<PageResultWordWithTranslations> {

    return this.getAllWordsWithTranslationsFromLang1$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithTranslations>) => r.body as PageResultWordWithTranslations)
    );
  }

  /**
   * Path part for operation getTranslationsForWord
   */
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
  getTranslationsForWord$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Translation>>> {

    const rb = new RequestBuilder(this.rootUrl, TranslationService.GetTranslationsForWordPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Translation>>;
      })
    );
  }

  /**
   * Get translations for word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTranslationsForWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTranslationsForWord(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Array<Translation>> {

    return this.getTranslationsForWord$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Translation>>) => r.body as Array<Translation>)
    );
  }

  /**
   * Path part for operation deleteTranslation
   */
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
  deleteTranslation$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TranslationService.DeleteTranslationPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete translation by id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTranslation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTranslation(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteTranslation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
