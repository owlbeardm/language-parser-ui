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
import { WordTraceResult } from '../models/word-trace-result';


/**
 * Languages evolution related operations
 */
@Injectable({
  providedIn: 'root',
})
export class LanguagesEvolutionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllLanguagesFrom
   */
  static readonly GetAllLanguagesFromPath = '/api/evolve/allfrom/{fromId}';

  /**
   * Get all languages to which path from the given language is possible.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLanguagesFrom()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguagesFrom$Response(params: {
    fromId: number;
  }): Observable<StrictHttpResponse<Array<Language>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllLanguagesFromPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
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
   * Get all languages to which path from the given language is possible.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllLanguagesFrom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguagesFrom(params: {
    fromId: number;
  }): Observable<Array<Language>> {

    return this.getAllLanguagesFrom$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Language>>) => r.body as Array<Language>)
    );
  }

  /**
   * Path part for operation getAllRoutes
   */
  static readonly GetAllRoutesPath = '/api/evolve/routes/{fromId}/{toId}';

  /**
   * Get all routes from language to other given language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRoutes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoutes$Response(params: {
    fromId: number;
    toId: number;
  }): Observable<StrictHttpResponse<Array<Array<Language>>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllRoutesPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
      rb.path('toId', params.toId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Array<Language>>>;
      })
    );
  }

  /**
   * Get all routes from language to other given language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoutes(params: {
    fromId: number;
    toId: number;
  }): Observable<Array<Array<Language>>> {

    return this.getAllRoutes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Array<Language>>>) => r.body as Array<Array<Language>>)
    );
  }

  /**
   * Path part for operation trace
   */
  static readonly TracePath = '/api/evolve/trace/{word}';

  /**
   * Trace word by list of languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trace()` instead.
   *
   * This method doesn't expect any request body.
   */
  trace$Response(params: {
    word: string;
    languages: Array<Language>;
  }): Observable<StrictHttpResponse<Array<WordTraceResult>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.TracePath, 'get');
    if (params) {
      rb.path('word', params.word, {});
      rb.query('languages', params.languages, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WordTraceResult>>;
      })
    );
  }

  /**
   * Trace word by list of languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trace(params: {
    word: string;
    languages: Array<Language>;
  }): Observable<Array<WordTraceResult>> {

    return this.trace$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WordTraceResult>>) => r.body as Array<WordTraceResult>)
    );
  }

}
