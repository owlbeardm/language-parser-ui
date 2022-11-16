/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DeclensionConnection } from '../models/declension-connection';


/**
 * Declension related operations
 */
@Injectable({
  providedIn: 'root',
})
export class DeclensionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveDeclensionConnection
   */
  static readonly SaveDeclensionConnectionPath = '/api/declension/connections';

  /**
   * Save declensions connected.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveDeclensionConnection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionConnection$Response(params: {
    context?: HttpContext
    body: DeclensionConnection
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.SaveDeclensionConnectionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Save declensions connected.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveDeclensionConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionConnection(params: {
    context?: HttpContext
    body: DeclensionConnection
  }
): Observable<number> {

    return this.saveDeclensionConnection$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation deleteDeclensionConnection
   */
  static readonly DeleteDeclensionConnectionPath = '/api/declension/connections/{connectionId}';

  /**
   * Delete declensions connected.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeclensionConnection()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionConnection$Response(params: {
    connectionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.DeleteDeclensionConnectionPath, 'delete');
    if (params) {
      rb.path('connectionId', params.connectionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete declensions connected.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeclensionConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionConnection(params: {
    connectionId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteDeclensionConnection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeclensionConnectionWithLangAndPos
   */
  static readonly GetDeclensionConnectionWithLangAndPosPath = '/api/declension/connections/{languageId}/{posId}';

  /**
   * Get declensions connected with lang and pos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeclensionConnectionWithLangAndPos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionConnectionWithLangAndPos$Response(params: {
    languageId: number;
    posId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DeclensionConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.GetDeclensionConnectionWithLangAndPosPath, 'get');
    if (params) {
      rb.path('languageId', params.languageId, {});
      rb.path('posId', params.posId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DeclensionConnection>>;
      })
    );
  }

  /**
   * Get declensions connected with lang and pos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeclensionConnectionWithLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionConnectionWithLangAndPos(params: {
    languageId: number;
    posId: number;
    context?: HttpContext
  }
): Observable<Array<DeclensionConnection>> {

    return this.getDeclensionConnectionWithLangAndPos$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeclensionConnection>>) => r.body as Array<DeclensionConnection>)
    );
  }

}
