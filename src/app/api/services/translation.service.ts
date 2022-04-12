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

import { PageResultWordWithTranslations } from '../models/page-result-word-with-translations';
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
  }): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {

    const rb = new RequestBuilder(this.rootUrl, TranslationService.GetAllWordsWithTranslationsFromLang1Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
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
   * To access the full response (for headers, for example), `getAllWordsWithTranslationsFromLang1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithTranslationsFromLang1(params: {
    filter: TranslationListFilter;
  }): Observable<PageResultWordWithTranslations> {

    return this.getAllWordsWithTranslationsFromLang1$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithTranslations>) => r.body as PageResultWordWithTranslations)
    );
  }

}
