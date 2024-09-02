/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Language } from '../../models/language';
import { WordTraceResult } from '../../models/word-trace-result';

export interface Trace$Params {
  word: string;
      body: Array<Language>
}

export function trace(http: HttpClient, rootUrl: string, params: Trace$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WordTraceResult>>> {
  const rb = new RequestBuilder(rootUrl, trace.PATH, 'post');
  if (params) {
    rb.path('word', params.word, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WordTraceResult>>;
    })
  );
}

trace.PATH = '/api/evolve/trace/{word}';
