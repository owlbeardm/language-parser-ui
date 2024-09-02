/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface SetUserClaims$Params {
  uid: string;
      body: Array<'TEST_CLAIM' | 'ADMIN' | 'WRITE'>
}

export function setUserClaims(http: HttpClient, rootUrl: string, params: SetUserClaims$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, setUserClaims.PATH, 'post');
  if (params) {
    rb.path('uid', params.uid, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

setUserClaims.PATH = '/api/ping/user-claims/{uid}';
