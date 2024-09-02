/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WordToEvolve } from '../../models/word-to-evolve';
import { WordWithEvolution } from '../../models/word-with-evolution';

export interface AddEvolvedWord1$Params {
      body: Array<WordToEvolve>
}

export function addEvolvedWord1(http: HttpClient, rootUrl: string, params: AddEvolvedWord1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WordWithEvolution>>> {
  const rb = new RequestBuilder(rootUrl, addEvolvedWord1.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WordWithEvolution>>;
    })
  );
}

addEvolvedWord1.PATH = '/api/evolve/words/evolve/all';
