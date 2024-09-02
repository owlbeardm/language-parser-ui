/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ListOfLanguagePhonemes } from '../../models/list-of-language-phonemes';

export interface GetLanguagePhonemes$Params {
  languageId: number;
}

export function getLanguagePhonemes(http: HttpClient, rootUrl: string, params: GetLanguagePhonemes$Params, context?: HttpContext): Observable<StrictHttpResponse<ListOfLanguagePhonemes>> {
  const rb = new RequestBuilder(rootUrl, getLanguagePhonemes.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ListOfLanguagePhonemes>;
    })
  );
}

getLanguagePhonemes.PATH = '/api/language/phoneme/{languageId}';
