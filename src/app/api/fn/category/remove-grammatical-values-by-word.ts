/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RemoveGrammaticalValuesByWord$Params {
  wordId: number;
  categoryId: number;
}

export function removeGrammaticalValuesByWord(http: HttpClient, rootUrl: string, params: RemoveGrammaticalValuesByWord$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, removeGrammaticalValuesByWord.PATH, 'delete');
  if (params) {
    rb.path('wordId', params.wordId, {});
    rb.path('categoryId', params.categoryId, {});
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

removeGrammaticalValuesByWord.PATH = '/api/category/valuebyword/{wordId}/{categoryId}';
