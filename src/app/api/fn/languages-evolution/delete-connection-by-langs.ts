/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteConnectionByLangs$Params {
  fromLangId: number;
  toLangId: number;
}

export function deleteConnectionByLangs(http: HttpClient, rootUrl: string, params: DeleteConnectionByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteConnectionByLangs.PATH, 'delete');
  if (params) {
    rb.path('fromLangId', params.fromLangId, {});
    rb.path('toLangId', params.toLangId, {});
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

deleteConnectionByLangs.PATH = '/api/evolve/connection/{fromLangId}/{toLangId}';
