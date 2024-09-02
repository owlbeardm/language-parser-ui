/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResultWordWithEvolution } from '../../models/page-result-word-with-evolution';
import { WordWithEvolutionsListFilter } from '../../models/word-with-evolutions-list-filter';

export interface GetAllWordsWithEvolutions$Params {
  filter: WordWithEvolutionsListFilter;
}

export function getAllWordsWithEvolutions(http: HttpClient, rootUrl: string, params: GetAllWordsWithEvolutions$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithEvolution>> {
  const rb = new RequestBuilder(rootUrl, getAllWordsWithEvolutions.PATH, 'get');
  if (params) {
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResultWordWithEvolution>;
    })
  );
}

getAllWordsWithEvolutions.PATH = '/api/evolve/words';
