/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResultWordWithTranslations } from '../../models/page-result-word-with-translations';

export interface GetAllWordsWithTranslationsFromLang$Params {
  from: number;
}

export function getAllWordsWithTranslationsFromLang(http: HttpClient, rootUrl: string, params: GetAllWordsWithTranslationsFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {
  const rb = new RequestBuilder(rootUrl, getAllWordsWithTranslationsFromLang.PATH, 'get');
  if (params) {
    rb.path('from', params.from, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResultWordWithTranslations>;
    })
  );
}

getAllWordsWithTranslationsFromLang.PATH = '/api/words/page/{from}';
