/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Language } from '../../models/language';

export interface GetAllRoutes$Params {
  fromId: number;
  toId: number;
}

export function getAllRoutes(http: HttpClient, rootUrl: string, params: GetAllRoutes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<Language>>>> {
  const rb = new RequestBuilder(rootUrl, getAllRoutes.PATH, 'get');
  if (params) {
    rb.path('fromId', params.fromId, {});
    rb.path('toId', params.toId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Array<Language>>>;
    })
  );
}

getAllRoutes.PATH = '/api/evolve/routes/{fromId}/{toId}';
