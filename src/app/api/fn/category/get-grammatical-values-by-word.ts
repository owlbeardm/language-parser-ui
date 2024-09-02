/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalValueWordConnection } from '../../models/grammatical-value-word-connection';

export interface GetGrammaticalValuesByWord$Params {
  wordId: number;
}

export function getGrammaticalValuesByWord(http: HttpClient, rootUrl: string, params: GetGrammaticalValuesByWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalValueWordConnection>>> {
  const rb = new RequestBuilder(rootUrl, getGrammaticalValuesByWord.PATH, 'get');
  if (params) {
    rb.path('wordId', params.wordId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GrammaticalValueWordConnection>>;
    })
  );
}

getGrammaticalValuesByWord.PATH = '/api/category/{wordId}/valuebyword';
