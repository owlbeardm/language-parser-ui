/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalCategoryConnection } from '../../models/grammatical-category-connection';

export interface GetGrammaticalCategoryConnectionsForLang$Params {
  categoryId: number;
  languageId: number;
}

export function getGrammaticalCategoryConnectionsForLang(http: HttpClient, rootUrl: string, params: GetGrammaticalCategoryConnectionsForLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {
  const rb = new RequestBuilder(rootUrl, getGrammaticalCategoryConnectionsForLang.PATH, 'get');
  if (params) {
    rb.path('categoryId', params.categoryId, {});
    rb.path('languageId', params.languageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GrammaticalCategoryConnection>>;
    })
  );
}

getGrammaticalCategoryConnectionsForLang.PATH = '/api/category/{categoryId}/{languageId}/connections';
