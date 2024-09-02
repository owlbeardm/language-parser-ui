/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeclensionConnection } from '../../models/declension-connection';

export interface GetDeclensionConnectionWithLangAndPos$Params {
  languageId: number;
  posId: number;
}

export function getDeclensionConnectionWithLangAndPos(http: HttpClient, rootUrl: string, params: GetDeclensionConnectionWithLangAndPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionConnection>>> {
  const rb = new RequestBuilder(rootUrl, getDeclensionConnectionWithLangAndPos.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
    rb.path('posId', params.posId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DeclensionConnection>>;
    })
  );
}

getDeclensionConnectionWithLangAndPos.PATH = '/api/declension/connections/{languageId}/{posId}';
