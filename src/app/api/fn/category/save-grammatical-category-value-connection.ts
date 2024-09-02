/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalCategoryValueConnection } from '../../models/grammatical-category-value-connection';

export interface SaveGrammaticalCategoryValueConnection$Params {
      body: GrammaticalCategoryValueConnection
}

export function saveGrammaticalCategoryValueConnection(http: HttpClient, rootUrl: string, params: SaveGrammaticalCategoryValueConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, saveGrammaticalCategoryValueConnection.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

saveGrammaticalCategoryValueConnection.PATH = '/api/category/valuelangconnection';
