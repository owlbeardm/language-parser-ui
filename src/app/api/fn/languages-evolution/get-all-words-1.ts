/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResultWordWithBorrowed } from '../../models/page-result-word-with-borrowed';
import { WordBorrowedListFilter } from '../../models/word-borrowed-list-filter';

export interface GetAllWords1$Params {
  filter: WordBorrowedListFilter;
}

export function getAllWords1(http: HttpClient, rootUrl: string, params: GetAllWords1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithBorrowed>> {
  const rb = new RequestBuilder(rootUrl, getAllWords1.PATH, 'get');
  if (params) {
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResultWordWithBorrowed>;
    })
  );
}

getAllWords1.PATH = '/api/evolve/words/borrowed';
