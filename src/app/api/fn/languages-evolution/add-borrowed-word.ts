/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WordToBorrow } from '../../models/word-to-borrow';
import { WordWithBorrowed } from '../../models/word-with-borrowed';

export interface AddBorrowedWord$Params {
      body: WordToBorrow
}

export function addBorrowedWord(http: HttpClient, rootUrl: string, params: AddBorrowedWord$Params, context?: HttpContext): Observable<StrictHttpResponse<WordWithBorrowed>> {
  const rb = new RequestBuilder(rootUrl, addBorrowedWord.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<WordWithBorrowed>;
    })
  );
}

addBorrowedWord.PATH = '/api/evolve/words/borrow';
