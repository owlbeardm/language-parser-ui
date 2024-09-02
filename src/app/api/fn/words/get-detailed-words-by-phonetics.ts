/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DetailedWord } from '../../models/detailed-word';

export interface GetDetailedWordsByPhonetics$Params {
  word: string;
}

export function getDetailedWordsByPhonetics(http: HttpClient, rootUrl: string, params: GetDetailedWordsByPhonetics$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DetailedWord>>> {
  const rb = new RequestBuilder(rootUrl, getDetailedWordsByPhonetics.PATH, 'get');
  if (params) {
    rb.path('word', params.word, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DetailedWord>>;
    })
  );
}

getDetailedWordsByPhonetics.PATH = '/api/words/{word}';
