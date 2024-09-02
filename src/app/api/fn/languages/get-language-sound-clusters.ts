/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LanguageSoundClusters } from '../../models/language-sound-clusters';

export interface GetLanguageSoundClusters$Params {
  languageId: number;
}

export function getLanguageSoundClusters(http: HttpClient, rootUrl: string, params: GetLanguageSoundClusters$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguageSoundClusters>> {
  const rb = new RequestBuilder(rootUrl, getLanguageSoundClusters.PATH, 'get');
  if (params) {
    rb.path('languageId', params.languageId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LanguageSoundClusters>;
    })
  );
}

getLanguageSoundClusters.PATH = '/api/language/clusters/{languageId}';
