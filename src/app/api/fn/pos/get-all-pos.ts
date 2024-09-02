/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pos } from '../../models/pos';

export interface GetAllPos$Params {
}

export function getAllPos(http: HttpClient, rootUrl: string, params?: GetAllPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pos>>> {
  const rb = new RequestBuilder(rootUrl, getAllPos.PATH, 'get');
  if (params) {
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

getAllPos.PATH = '/api/pos';
