/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalCategoryValueConnection } from '../../models/grammatical-category-value-connection';

export interface GetGrammaticalValuesConnectionByLang$Params {
  langId: number;
}

export function getGrammaticalValuesConnectionByLang(http: HttpClient, rootUrl: string, params: GetGrammaticalValuesConnectionByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>> {
  const rb = new RequestBuilder(rootUrl, getGrammaticalValuesConnectionByLang.PATH, 'get');
  if (params) {
    rb.path('langId', params.langId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>;
    })
  );
}

getGrammaticalValuesConnectionByLang.PATH = '/api/category/{langId}/valuelangconnection';
