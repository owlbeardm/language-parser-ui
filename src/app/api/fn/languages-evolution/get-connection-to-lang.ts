/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguageConnection } from '../../models/language-connection';

export interface GetConnectionToLang$Params {
  toLangId: number;
}

export function getConnectionToLang(http: HttpClient, rootUrl: string, params: GetConnectionToLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguageConnection>>> {
  const rb = new RequestBuilder(rootUrl, getConnectionToLang.PATH, 'get');
  if (params) {
    rb.path('toLangId', params.toLangId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<LanguageConnection>>;
    })
  );
}

getConnectionToLang.PATH = '/api/evolve/connection/to/{toLangId}';
