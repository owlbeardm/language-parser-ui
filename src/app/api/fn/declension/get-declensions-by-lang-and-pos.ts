/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeclensionFull } from '../../models/declension-full';

export interface GetDeclensionsByLangAndPos$Params {
  languageId: number;
  posId: number;
}

export function getDeclensionsByLangAndPos(http: HttpClient, rootUrl: string, params: GetDeclensionsByLangAndPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionFull>>> {
  const rb = new RequestBuilder(rootUrl, getDeclensionsByLangAndPos.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
    rb.path('posId', params.posId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DeclensionFull>>;
    })
  );
}

getDeclensionsByLangAndPos.PATH = '/api/declension/declensions/{languageId}/{posId}';
