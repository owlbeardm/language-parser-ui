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
   * Path part for operation getAllLanguagesFrom
   */
  static readonly GetAllLanguagesFromPath = '/api/language/allfrom/{fromId}';

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

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetAllLanguagesFromPath, 'get');
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
   * Path part for operation getAllPaths
   */
  static readonly GetAllPathsPath = '/api/language/paths/{fromId}/{toId}';

  /**
   * Get all paths from language to other given language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPaths()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPaths$Response(params: {
    fromId: number;
    toId: number;
  }): Observable<StrictHttpResponse<Array<Array<Language>>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesService.GetAllPathsPath, 'get');
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
   * Get all paths from language to other given language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPaths$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPaths(params: {
    fromId: number;
    toId: number;
  }): Observable<Array<Array<Language>>> {

    return this.getAllPaths$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Array<Language>>>) => r.body as Array<Array<Language>>)
    );
  }

}
