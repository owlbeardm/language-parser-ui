/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguagePos } from '../../models/language-pos';

export interface GetPosByLanguage$Params {
  languageId: number;
}

export function getPosByLanguage(http: HttpClient, rootUrl: string, params: GetPosByLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguagePos>>> {
  const rb = new RequestBuilder(rootUrl, getPosByLanguage.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<LanguagePos>>;
    })
  );
}

getPosByLanguage.PATH = '/api/pos/languagepos/{languageId}';
