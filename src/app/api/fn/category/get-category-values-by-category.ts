/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrammaticalCategoryValue } from '../../models/grammatical-category-value';

export interface GetCategoryValuesByCategory$Params {
  categoryId: number;
}

export function getCategoryValuesByCategory(http: HttpClient, rootUrl: string, params: GetCategoryValuesByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {
  const rb = new RequestBuilder(rootUrl, getCategoryValuesByCategory.PATH, 'get');
  if (params) {
    rb.path('categoryId', params.categoryId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GrammaticalCategoryValue>>;
    })
  );
}

getCategoryValuesByCategory.PATH = '/api/category/{categoryId}/values';
