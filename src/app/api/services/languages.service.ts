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

import { Language } from '../models/language';
import { LanguagePhoneme } from '../models/language-phoneme';
import { ListOfLanguagePhonemes } from '../models/list-of-language-phonemes';
import { Pos } from '../models/pos';


/**
 * Language related operations
 */
@Injectable({
  providedIn: 'root',
})
export class LanguagesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveLanguage
   */
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
  saveLanguage$Response(params: {
    body: Language
  }): Observable<StrictHttpResponse<Language>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.SaveLanguagePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Language>;
      })
    );
  }

  /**
   * Save language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveLanguage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguage(params: {
    body: Language
  }): Observable<Language> {

    return this.saveLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<Language>) => r.body as Language)
    );
  }

  /**
   * Path part for operation getAllLanguages
   */
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
  getAllLanguages$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Language>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetAllLanguagesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Language>>;
      })
    );
  }

  /**
   * Get all languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllLanguages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguages(params?: {
  }): Observable<Array<Language>> {

    return this.getAllLanguages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Language>>) => r.body as Array<Language>)
    );
  }

  /**
   * Path part for operation getLanguagePhonemes
   */
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
  getLanguagePhonemes$Response(params: {
    languageId: number;
  }): Observable<StrictHttpResponse<ListOfLanguagePhonemes>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetLanguagePhonemesPath, 'get');
    if (params) {
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ListOfLanguagePhonemes>;
      })
    );
  }

  /**
   * Get language phonemes by id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLanguagePhonemes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguagePhonemes(params: {
    languageId: number;
  }): Observable<ListOfLanguagePhonemes> {

    return this.getLanguagePhonemes$Response(params).pipe(
      map((r: StrictHttpResponse<ListOfLanguagePhonemes>) => r.body as ListOfLanguagePhonemes)
    );
  }

  /**
   * Path part for operation saveLanguagePhoneme
   */
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
  saveLanguagePhoneme$Response(params: {
    languageId: number;
    body: string
  }): Observable<StrictHttpResponse<LanguagePhoneme>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.SaveLanguagePhonemePath, 'post');
    if (params) {
      rb.path('languageId', params.languageId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LanguagePhoneme>;
      })
    );
  }

  /**
   * Save language phoneme.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveLanguagePhoneme$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePhoneme(params: {
    languageId: number;
    body: string
  }): Observable<LanguagePhoneme> {

    return this.saveLanguagePhoneme$Response(params).pipe(
      map((r: StrictHttpResponse<LanguagePhoneme>) => r.body as LanguagePhoneme)
    );
  }

  /**
   * Path part for operation deleteLanguagePhoneme
   */
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
  deleteLanguagePhoneme$Response(params: {
    phonemeId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.DeleteLanguagePhonemePath, 'delete');
    if (params) {
      rb.path('phonemeId', params.phonemeId, {});
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
   * Delete language phoneme.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteLanguagePhoneme$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePhoneme(params: {
    phonemeId: number;
  }): Observable<void> {

    return this.deleteLanguagePhoneme$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllPartsOfSpeech
   */
  static readonly GetAllPartsOfSpeechPath = '/api/language/pos';

  /**
   * Get all parts of speech.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPartsOfSpeech()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPartsOfSpeech$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Pos>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetAllPartsOfSpeechPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Pos>>;
      })
    );
  }

  /**
   * Get all parts of speech.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPartsOfSpeech$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPartsOfSpeech(params?: {
  }): Observable<Array<Pos>> {

    return this.getAllPartsOfSpeech$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pos>>) => r.body as Array<Pos>)
    );
  }

  /**
   * Path part for operation getAllPartsOfSpeechByLanguage
   */
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
  getAllPartsOfSpeechByLanguage$Response(params: {
    languageId: number;
  }): Observable<StrictHttpResponse<Array<Pos>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetAllPartsOfSpeechByLanguagePath, 'get');
    if (params) {
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Pos>>;
      })
    );
  }

  /**
   * Get all parts of speech by language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPartsOfSpeechByLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPartsOfSpeechByLanguage(params: {
    languageId: number;
  }): Observable<Array<Pos>> {

    return this.getAllPartsOfSpeechByLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pos>>) => r.body as Array<Pos>)
    );
  }

}
