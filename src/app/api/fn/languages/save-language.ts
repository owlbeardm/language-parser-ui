/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Language } from '../../models/language';

export interface SaveLanguage$Params {
      body: Language
}

export function saveLanguage(http: HttpClient, rootUrl: string, params: SaveLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Language>> {
  const rb = new RequestBuilder(rootUrl, saveLanguage.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Language>;
    })
  );
}

saveLanguage.PATH = '/api/language/';
