/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalValueEvolution } from '../../models/grammatical-value-evolution';

export interface GetGrammaticalValueEvolution$Params {
  langFromId: number;
  langToId: number;
  posId: number;
  valueFromId: number;
}

export function getGrammaticalValueEvolution(http: HttpClient, rootUrl: string, params: GetGrammaticalValueEvolution$Params, context?: HttpContext): Observable<StrictHttpResponse<GrammaticalValueEvolution>> {
  const rb = new RequestBuilder(rootUrl, getGrammaticalValueEvolution.PATH, 'get');
  if (params) {
    rb.path('langFromId', params.langFromId, {});
    rb.path('langToId', params.langToId, {});
    rb.path('posId', params.posId, {});
    rb.path('valueFromId', params.valueFromId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GrammaticalValueEvolution>;
    })
  );
}

getGrammaticalValueEvolution.PATH = '/api/evolve/grammaticalvalue/{langFromId}/{langToId}/{posId}/{valueFromId}';
