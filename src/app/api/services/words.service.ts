/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addDerivedWord } from '../fn/words/add-derived-word';
import { AddDerivedWord$Params } from '../fn/words/add-derived-word';
import { addWord } from '../fn/words/add-word';
import { AddWord$Params } from '../fn/words/add-word';
import { canDeleteWord } from '../fn/words/can-delete-word';
import { CanDeleteWord$Params } from '../fn/words/can-delete-word';
import { cleanIpaWords } from '../fn/words/clean-ipa-words';
import { CleanIpaWords$Params } from '../fn/words/clean-ipa-words';
import { deleteWord } from '../fn/words/delete-word';
import { DeleteWord$Params } from '../fn/words/delete-word';
import { DetailedWord } from '../models/detailed-word';
import { getAllWords } from '../fn/words/get-all-words';
import { GetAllWords$Params } from '../fn/words/get-all-words';
import { getAllWordsFromLang } from '../fn/words/get-all-words-from-lang';
import { GetAllWordsFromLang$Params } from '../fn/words/get-all-words-from-lang';
import { getAllWordsWithTranslationsFromLang } from '../fn/words/get-all-words-with-translations-from-lang';
import { GetAllWordsWithTranslationsFromLang$Params } from '../fn/words/get-all-words-with-translations-from-lang';
import { getDetailedWordsByPhonetics } from '../fn/words/get-detailed-words-by-phonetics';
import { GetDetailedWordsByPhonetics$Params } from '../fn/words/get-detailed-words-by-phonetics';
import { PageResultWordWithCategoryValues } from '../models/page-result-word-with-category-values';
import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
import { Word } from '../models/word';


/**
 * Words related operations
 */
@Injectable({ providedIn: 'root' })
export class WordsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addWord()` */
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
  addWord$Response(params: AddWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Word>> {
    return addWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Add new word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWord(params: AddWord$Params, context?: HttpContext): Observable<Word> {
    return this.addWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<Word>): Word => r.body)
    );
  }

  /** Path part for operation `getAllWords()` */
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
  getAllWords$Response(params: GetAllWords$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithCategoryValues>> {
    return getAllWords(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all words.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords(params: GetAllWords$Params, context?: HttpContext): Observable<PageResultWordWithCategoryValues> {
    return this.getAllWords$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResultWordWithCategoryValues>): PageResultWordWithCategoryValues => r.body)
    );
  }

  /** Path part for operation `getAllWordsFromLang()` */
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
  getAllWordsFromLang$Response(params: GetAllWordsFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Word>>> {
    return getAllWordsFromLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all words from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWordsFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsFromLang(params: GetAllWordsFromLang$Params, context?: HttpContext): Observable<Array<Word>> {
    return this.getAllWordsFromLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Word>>): Array<Word> => r.body)
    );
  }

  /** Path part for operation `cleanIpaWords()` */
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
  cleanIpaWords$Response(params?: CleanIpaWords$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return cleanIpaWords(this.http, this.rootUrl, params, context);
  }

  /**
   * Clean IPA in words.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cleanIpaWords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cleanIpaWords(params?: CleanIpaWords$Params, context?: HttpContext): Observable<void> {
    return this.cleanIpaWords$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addDerivedWord()` */
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
  addDerivedWord$Response(params: AddDerivedWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Word>> {
    return addDerivedWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Add derived word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addDerivedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDerivedWord(params: AddDerivedWord$Params, context?: HttpContext): Observable<Word> {
    return this.addDerivedWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<Word>): Word => r.body)
    );
  }

  /** Path part for operation `getAllWordsWithTranslationsFromLang()` */
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
  getAllWordsWithTranslationsFromLang$Response(params: GetAllWordsWithTranslationsFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {
    return getAllWordsWithTranslationsFromLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get page of words with translations from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang(params: GetAllWordsWithTranslationsFromLang$Params, context?: HttpContext): Observable<PageResultWordWithTranslations> {
    return this.getAllWordsWithTranslationsFromLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResultWordWithTranslations>): PageResultWordWithTranslations => r.body)
    );
  }

  /** Path part for operation `deleteWord()` */
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
  deleteWord$Response(params: DeleteWord$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete word by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWord(params: DeleteWord$Params, context?: HttpContext): Observable<void> {
    return this.deleteWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `canDeleteWord()` */
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
  canDeleteWord$Response(params: CanDeleteWord$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return canDeleteWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Can delete word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `canDeleteWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  canDeleteWord(params: CanDeleteWord$Params, context?: HttpContext): Observable<boolean> {
    return this.canDeleteWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getDetailedWordsByPhonetics()` */
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
  getDetailedWordsByPhonetics$Response(params: GetDetailedWordsByPhonetics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DetailedWord>>> {
    return getDetailedWordsByPhonetics(this.http, this.rootUrl, params, context);
  }

  /**
   * Get detailed words by phonetics.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDetailedWordsByPhonetics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailedWordsByPhonetics(params: GetDetailedWordsByPhonetics$Params, context?: HttpContext): Observable<Array<DetailedWord>> {
    return this.getDetailedWordsByPhonetics$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DetailedWord>>): Array<DetailedWord> => r.body)
    );
  }

}
