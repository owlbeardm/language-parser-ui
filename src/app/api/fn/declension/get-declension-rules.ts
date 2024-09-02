/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeclensionRule } from '../../models/declension-rule';

export interface GetDeclensionRules$Params {
  declensionId: number;
}

export function getDeclensionRules(http: HttpClient, rootUrl: string, params: GetDeclensionRules$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionRule>>> {
  const rb = new RequestBuilder(rootUrl, getDeclensionRules.PATH, 'get');
  if (params) {
    rb.path('declensionId', params.declensionId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DeclensionRule>>;
    })
  );
}

getDeclensionRules.PATH = '/api/declension/rules/{declensionId}';
