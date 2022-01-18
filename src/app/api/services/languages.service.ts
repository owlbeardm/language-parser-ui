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

}
