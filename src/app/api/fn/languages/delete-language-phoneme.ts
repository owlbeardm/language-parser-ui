/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteLanguagePhoneme$Params {
  phonemeId: number;
}

export function deleteLanguagePhoneme(http: HttpClient, rootUrl: string, params: DeleteLanguagePhoneme$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteLanguagePhoneme.PATH, 'delete');
  if (params) {
    rb.path('phonemeId', params.phonemeId, {});
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

deleteLanguagePhoneme.PATH = '/api/language/phoneme/{phonemeId}';
