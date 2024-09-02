/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Language } from '../../models/language';

export interface GetAllLanguagesFrom$Params {
  fromId: number;
}

export function getAllLanguagesFrom(http: HttpClient, rootUrl: string, params: GetAllLanguagesFrom$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Language>>> {
  const rb = new RequestBuilder(rootUrl, getAllLanguagesFrom.PATH, 'get');
  if (params) {
    rb.path('fromId', params.fromId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Language>>;
    })
  );
}

getAllLanguagesFrom.PATH = '/api/evolve/allfrom/{fromId}';
