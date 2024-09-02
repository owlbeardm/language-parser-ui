/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeclensionRule } from '../../models/declension-rule';

export interface SaveDeclensionRule$Params {
      body: DeclensionRule
}

export function saveDeclensionRule(http: HttpClient, rootUrl: string, params: SaveDeclensionRule$Params, context?: HttpContext): Observable<StrictHttpResponse<DeclensionRule>> {
  const rb = new RequestBuilder(rootUrl, saveDeclensionRule.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeclensionRule>;
    })
  );
}

saveDeclensionRule.PATH = '/api/declension/rule';
