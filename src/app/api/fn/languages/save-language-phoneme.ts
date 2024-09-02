/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguagePhoneme } from '../../models/language-phoneme';

export interface SaveLanguagePhoneme$Params {
  languageId: number;
      body: string
}

export function saveLanguagePhoneme(http: HttpClient, rootUrl: string, params: SaveLanguagePhoneme$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguagePhoneme>> {
  const rb = new RequestBuilder(rootUrl, saveLanguagePhoneme.PATH, 'post');
  if (params) {
    rb.path('languageId', params.languageId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LanguagePhoneme>;
    })
  );
}

saveLanguagePhoneme.PATH = '/api/language/phoneme/{languageId}';
