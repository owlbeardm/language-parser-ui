/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Word } from '../../models/word';

export interface AddWord$Params {
      body: Word
}

export function addWord(http: HttpClient, rootUrl: string, params: AddWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Word>> {
  const rb = new RequestBuilder(rootUrl, addWord.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Word>;
    })
  );
}

addWord.PATH = '/api/words/add';
