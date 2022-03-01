/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PageResultWord } from '../models/page-result-word';
import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
import { PaginationFilter } from '../models/pagination-filter';
import { Word } from '../models/word';


/**
 * Words related operations
 */
@Injectable({
  providedIn: 'root',
})
export class WordsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllWords
   */
  static readonly GetAllWordsPath = '/api/words/all';

  /**
   * Get all words.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWords()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords$Response(params: {
    filter: PaginationFilter;
  }): Observable<StrictHttpResponse<PageResultWord>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResultWord>;
      })
    );
  }

  /**
   * Get all words.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords(params: {
    filter: PaginationFilter;
  }): Observable<PageResultWord> {

    return this.getAllWords$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWord>) => r.body as PageResultWord)
    );
  }

  /**
   * Path part for operation getAllWordsFromLang
   */
  static readonly GetAllWordsFromLangPath = '/api/words/all/{from}';

  /**
   * Get all words from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWordsFromLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsFromLang$Response(params: {
    from: number;
  }): Observable<StrictHttpResponse<Array<Word>>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsFromLangPath, 'get');
    if (params) {
      rb.path('from', params.from, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Word>>;
      })
    );
  }

  /**
   * Get all words from language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWordsFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsFromLang(params: {
    from: number;
  }): Observable<Array<Word>> {

    return this.getAllWordsFromLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Word>>) => r.body as Array<Word>)
    );
  }

  /**
   * Path part for operation getAllWordsWithTranslationsFromLang
   */
  static readonly GetAllWordsWithTranslationsFromLangPath = '/api/words/page/{from}';

  /**
   * Get page of words with translations from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWordsWithTranslationsFromLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang$Response(params: {
    from: number;
  }): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsWithTranslationsFromLangPath, 'get');
    if (params) {
      rb.path('from', params.from, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang(params: {
    from: number;
  }): Observable<PageResultWordWithTranslations> {

    return this.getAllWordsWithTranslationsFromLang$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithTranslations>) => r.body as PageResultWordWithTranslations)
    );
  }

  /**
   * Path part for operation deleteWord
   */
  static readonly DeleteWordPath = '/api/words/{id}';

  /**
   * Delete word by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWord$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.DeleteWordPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete word by id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWord(params: {
    id: number;
  }): Observable<void> {

    return this.deleteWord$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation canDeleteWord
   */
  static readonly CanDeleteWordPath = '/api/words/{wordId}/candelete';

  /**
   * Can delete word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `canDeleteWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  canDeleteWord$Response(params: {
    wordId: number;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.CanDeleteWordPath, 'get');
    if (params) {
      rb.path('wordId', params.wordId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Can delete word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `canDeleteWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  canDeleteWord(params: {
    wordId: number;
  }): Observable<boolean> {

    return this.canDeleteWord$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
