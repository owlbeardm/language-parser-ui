/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResultWordWithTranslations } from '../../models/page-result-word-with-translations';
import { TranslationListFilter } from '../../models/translation-list-filter';

export interface GetAllWordsWithTranslationsFromLang1$Params {
  filter: TranslationListFilter;
}

export function getAllWordsWithTranslationsFromLang1(http: HttpClient, rootUrl: string, params: GetAllWordsWithTranslationsFromLang1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithTranslations>> {
  const rb = new RequestBuilder(rootUrl, getAllWordsWithTranslationsFromLang1.PATH, 'get');
  if (params) {
    rb.query('filter', params.filter, {});
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

getAllWordsWithTranslationsFromLang1.PATH = '/api/translation/page';
