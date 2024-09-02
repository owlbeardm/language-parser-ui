/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pos } from '../../models/pos';

export interface GetAllPartsOfSpeechByLanguage$Params {
  languageId: number;
}

export function getAllPartsOfSpeechByLanguage(http: HttpClient, rootUrl: string, params: GetAllPartsOfSpeechByLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pos>>> {
  const rb = new RequestBuilder(rootUrl, getAllPartsOfSpeechByLanguage.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Pos>>;
    })
  );
}

getAllPartsOfSpeechByLanguage.PATH = '/api/language/pos/{languageId}';
