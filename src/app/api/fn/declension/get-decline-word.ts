/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeclinedWord } from '../../models/declined-word';

export interface GetDeclineWord$Params {
  wordId: number;
}

export function getDeclineWord(http: HttpClient, rootUrl: string, params: GetDeclineWord$Params, context?: HttpContext): Observable<StrictHttpResponse<DeclinedWord>> {
  const rb = new RequestBuilder(rootUrl, getDeclineWord.PATH, 'get');
  if (params) {
    rb.path('wordId', params.wordId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeclinedWord>;
    })
  );
}

getDeclineWord.PATH = '/api/declension/word/{wordId}';
