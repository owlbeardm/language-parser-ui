/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguageConnection } from '../../models/language-connection';

export interface GetConnectionFromLang$Params {
  fromLangId: number;
}

export function getConnectionFromLang(http: HttpClient, rootUrl: string, params: GetConnectionFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguageConnection>>> {
  const rb = new RequestBuilder(rootUrl, getConnectionFromLang.PATH, 'get');
  if (params) {
    rb.path('fromLangId', params.fromLangId, {});
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

getConnectionFromLang.PATH = '/api/evolve/connection/from/{fromLangId}';
