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

import { DerivedWordToAdd } from '../models/derived-word-to-add';
import { DetailedWord } from '../models/detailed-word';
import { PageResultWordWithCategoryValues } from '../models/page-result-word-with-category-values';
import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
import { Word } from '../models/word';
import { WordListFilter } from '../models/word-list-filter';


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
   * Path part for operation addWord
   */
  static readonly AddWordPath = '/api/words/add';

  /**
   * Add new word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addWord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWord$Response(params: {
    context?: HttpContext
    body: Word
  }
): Observable<StrictHttpResponse<Word>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.AddWordPath, 'post');
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
        return r as StrictHttpResponse<Word>;
      })
    );
  }

  /**
   * Add new word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWord(params: {
    context?: HttpContext
    body: Word
  }
): Observable<Word> {

    return this.addWord$Response(params).pipe(
      map((r: StrictHttpResponse<Word>) => r.body as Word)
    );
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
    filter: WordListFilter;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResultWordWithCategoryValues>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsPath, 'get');
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
        return r as StrictHttpResponse<PageResultWordWithCategoryValues>;
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
    filter: WordListFilter;
    context?: HttpContext
  }
): Observable<PageResultWordWithCategoryValues> {

    return this.getAllWords$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithCategoryValues>) => r.body as PageResultWordWithCategoryValues)
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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Word>>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsFromLangPath, 'get');
    if (params) {
      rb.path('from', params.from, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
    context?: HttpContext
  }
): Observable<Array<Word>> {

    return this.getAllWordsFromLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Word>>) => r.body as Array<Word>)
    );
  }

  /**
   * Path part for operation cleanIpaWords
   */
  static readonly CleanIpaWordsPath = '/api/words/clean';

  /**
   * Clean IPA in words.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cleanIpaWords()` instead.
   *
   * This method doesn't expect any request body.
   */
  cleanIpaWords$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.CleanIpaWordsPath, 'post');
    if (params) {
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
   * Clean IPA in words.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cleanIpaWords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cleanIpaWords(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.cleanIpaWords$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addDerivedWord
   */
  static readonly AddDerivedWordPath = '/api/words/derive';

  /**
   * Add derived word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDerivedWord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDerivedWord$Response(params: {
    context?: HttpContext
    body: DerivedWordToAdd
  }
): Observable<StrictHttpResponse<Word>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.AddDerivedWordPath, 'post');
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
        return r as StrictHttpResponse<Word>;
      })
    );
  }

  /**
   * Add derived word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDerivedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDerivedWord(params: {
    context?: HttpContext
    body: DerivedWordToAdd
  }
): Observable<Word> {

    return this.addDerivedWord$Response(params).pipe(
      map((r: StrictHttpResponse<Word>) => r.body as Word)
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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsWithTranslationsFromLangPath, 'get');
    if (params) {
      rb.path('from', params.from, {});
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
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang(params: {
    from: number;
    context?: HttpContext
  }
): Observable<PageResultWordWithTranslations> {

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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.DeleteWordPath, 'delete');
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
    context?: HttpContext
  }
): Observable<void> {

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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.CanDeleteWordPath, 'get');
    if (params) {
      rb.path('wordId', params.wordId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
    context?: HttpContext
  }
): Observable<boolean> {

    return this.canDeleteWord$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getDetailedWordsByPhonetics
   */
  static readonly GetDetailedWordsByPhoneticsPath = '/api/words/{word}';

  /**
   * Get detailed words by phonetics.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailedWordsByPhonetics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedWordsByPhonetics$Response(params: {
    word: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DetailedWord>>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetDetailedWordsByPhoneticsPath, 'get');
    if (params) {
      rb.path('word', params.word, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DetailedWord>>;
      })
    );
  }

  /**
   * Get detailed words by phonetics.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetailedWordsByPhonetics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedWordsByPhonetics(params: {
    word: string;
    context?: HttpContext
  }
): Observable<Array<DetailedWord>> {

    return this.getDetailedWordsByPhonetics$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DetailedWord>>) => r.body as Array<DetailedWord>)
    );
  }

}
