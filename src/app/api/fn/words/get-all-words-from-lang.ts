/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Word } from '../../models/word';

export interface GetAllWordsFromLang$Params {
  from: number;
}

export function getAllWordsFromLang(http: HttpClient, rootUrl: string, params: GetAllWordsFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Word>>> {
  const rb = new RequestBuilder(rootUrl, getAllWordsFromLang.PATH, 'get');
  if (params) {
    rb.path('from', params.from, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Word>>;
    })
  );
}

getAllWordsFromLang.PATH = '/api/words/all/{from}';
