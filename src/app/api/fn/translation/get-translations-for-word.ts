/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Translation } from '../../models/translation';

export interface GetTranslationsForWord$Params {
  id: number;
}

export function getTranslationsForWord(http: HttpClient, rootUrl: string, params: GetTranslationsForWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Translation>>> {
  const rb = new RequestBuilder(rootUrl, getTranslationsForWord.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Translation>>;
    })
  );
}

getTranslationsForWord.PATH = '/api/translation/tranlationsfor/{id}';
