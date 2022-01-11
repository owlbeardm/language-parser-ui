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
  static readonly GetAllWordsPath = '/api/words/all/{from}/{text}';

  /**
   * Get all words from language by text.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWords()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords$Response(params: {
    from: string;
    text: string;
  }): Observable<StrictHttpResponse<Array<Word>>> {

    const rb = new RequestBuilder(this.rootUrl, WordsService.GetAllWordsPath, 'get');
    if (params) {
      rb.path('from', params.from, {});
      rb.path('text', params.text, {});
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
   * Get all words from language by text.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWords$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords(params: {
    from: string;
    text: string;
  }): Observable<Array<Word>> {

    return this.getAllWords$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Word>>) => r.body as Array<Word>)
    );
  }

}
