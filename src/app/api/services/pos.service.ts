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

import { LanguagePos } from '../models/language-pos';
import { Pos } from '../models/pos';


/**
 * Parts of speech related operations
 */
@Injectable({
  providedIn: 'root',
})
export class PosService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllPos
   */
  static readonly GetAllPosPath = '/api/pos';

  /**
   * Get all parts of speech.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPos$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Pos>>> {

    const rb = new RequestBuilder(this.rootUrl, PosService.GetAllPosPath, 'get');
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
   * To access the full response (for headers, for example), `getAllPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPos(params?: {
  }): Observable<Array<Pos>> {

    return this.getAllPos$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pos>>) => r.body as Array<Pos>)
    );
  }

  /**
   * Path part for operation savePos
   */
  static readonly SavePosPath = '/api/pos';

  /**
   * Add new part of speech.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePos$Response(params: {
    body: Pos
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, PosService.SavePosPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Add new part of speech.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `savePos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePos(params: {
    body: Pos
  }): Observable<number> {

    return this.savePos$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation saveLanguagePos
   */
  static readonly SaveLanguagePosPath = '/api/pos/languagepos';

  /**
   * Add pos to language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLanguagePos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePos$Response(params: {
    body: LanguagePos
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, PosService.SaveLanguagePosPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Add pos to language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveLanguagePos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePos(params: {
    body: LanguagePos
  }): Observable<number> {

    return this.saveLanguagePos$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation deleteLanguagePos
   */
  static readonly DeleteLanguagePosPath = '/api/pos/languagepos/{id}';

  /**
   * Delete pos from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLanguagePos()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePos$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PosService.DeleteLanguagePosPath, 'delete');
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
   * Delete pos from language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteLanguagePos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePos(params: {
    id: number;
  }): Observable<void> {

    return this.deleteLanguagePos$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPosByLanguage
   */
  static readonly GetPosByLanguagePath = '/api/pos/languagepos/{languageId}';

  /**
   * Get pos by language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosByLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosByLanguage$Response(params: {
    languageId: number;
  }): Observable<StrictHttpResponse<Array<LanguagePos>>> {

    const rb = new RequestBuilder(this.rootUrl, PosService.GetPosByLanguagePath, 'get');
    if (params) {
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LanguagePos>>;
      })
    );
  }

  /**
   * Get pos by language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPosByLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosByLanguage(params: {
    languageId: number;
  }): Observable<Array<LanguagePos>> {

    return this.getPosByLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LanguagePos>>) => r.body as Array<LanguagePos>)
    );
  }

}
