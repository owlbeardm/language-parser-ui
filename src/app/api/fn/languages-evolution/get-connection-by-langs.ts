/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguageConnection } from '../../models/language-connection';

export interface GetConnectionByLangs$Params {
  fromLangId: number;
  toLangId: number;
}

export function getConnectionByLangs(http: HttpClient, rootUrl: string, params: GetConnectionByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguageConnection>> {
  const rb = new RequestBuilder(rootUrl, getConnectionByLangs.PATH, 'get');
  if (params) {
    rb.path('fromLangId', params.fromLangId, {});
    rb.path('toLangId', params.toLangId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LanguageConnection>;
    })
  );
}

getConnectionByLangs.PATH = '/api/evolve/connection/{fromLangId}/{toLangId}';
