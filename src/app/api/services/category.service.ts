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

import { GrammaticalCategory } from '../models/grammatical-category';
import { GrammaticalCategoryConnection } from '../models/grammatical-category-connection';
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';


/**
 * Grammatical category related operations
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllCategories
   */
  static readonly GetAllCategoriesPath = '/api/category';

  /**
   * Get all grammatical categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<GrammaticalCategory>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetAllCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalCategory>>;
      })
    );
  }

  /**
   * Get all grammatical categories.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: {
    context?: HttpContext
  }
): Observable<Array<GrammaticalCategory>> {

    return this.getAllCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategory>>) => r.body as Array<GrammaticalCategory>)
    );
  }

  /**
   * Path part for operation saveGrammaticalCategory
   */
  static readonly SaveGrammaticalCategoryPath = '/api/category';

  /**
   * Save grammatical category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGrammaticalCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategory$Response(params: {
    context?: HttpContext
    body: GrammaticalCategory
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryPath, 'post');
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
   * Save grammatical category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategory(params: {
    context?: HttpContext
    body: GrammaticalCategory
  }
): Observable<number> {

    return this.saveGrammaticalCategory$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation saveGrammaticalCategoryConnection
   */
  static readonly SaveGrammaticalCategoryConnectionPath = '/api/category/connection';

  /**
   * Save grammatical category connection.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGrammaticalCategoryConnection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryConnection$Response(params: {
    context?: HttpContext
    body: GrammaticalCategoryConnection
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryConnectionPath, 'post');
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
   * Save grammatical category connection.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryConnection(params: {
    context?: HttpContext
    body: GrammaticalCategoryConnection
  }
): Observable<number> {

    return this.saveGrammaticalCategoryConnection$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation deleteGrammaticalCategoryConnection
   */
  static readonly DeleteGrammaticalCategoryConnectionPath = '/api/category/connection/{connectionId}';

  /**
   * Delete grammatical category connection.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGrammaticalCategoryConnection()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGrammaticalCategoryConnection$Response(params: {
    connectionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.DeleteGrammaticalCategoryConnectionPath, 'delete');
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
   * Delete grammatical category connection.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteGrammaticalCategoryConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGrammaticalCategoryConnection(params: {
    connectionId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteGrammaticalCategoryConnection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation saveGrammaticalCategoryValue
   */
  static readonly SaveGrammaticalCategoryValuePath = '/api/category/value';

  /**
   * Save grammatical category value.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGrammaticalCategoryValue()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValue$Response(params: {
    context?: HttpContext
    body: GrammaticalCategoryValue
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryValuePath, 'post');
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
   * Save grammatical category value.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryValue$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValue(params: {
    context?: HttpContext
    body: GrammaticalCategoryValue
  }
): Observable<number> {

    return this.saveGrammaticalCategoryValue$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation getCategoryValuesByCategory
   */
  static readonly GetCategoryValuesByCategoryPath = '/api/category/{categoryId}/values';

  /**
   * Get grammatical categories values of category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoryValuesByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategory$Response(params: {
    categoryId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetCategoryValuesByCategoryPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalCategoryValue>>;
      })
    );
  }

  /**
   * Get grammatical categories values of category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategoryValuesByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategory(params: {
    categoryId: number;
    context?: HttpContext
  }
): Observable<Array<GrammaticalCategoryValue>> {

    return this.getCategoryValuesByCategory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValue>>) => r.body as Array<GrammaticalCategoryValue>)
    );
  }

  /**
   * Path part for operation getGrammaticalCategoryConnectionsForLang
   */
  static readonly GetGrammaticalCategoryConnectionsForLangPath = '/api/category/{categoryId}/{languageId}/connections';

  /**
   * Get grammatical category connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGrammaticalCategoryConnectionsForLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLang$Response(params: {
    categoryId: number;
    languageId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetGrammaticalCategoryConnectionsForLangPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalCategoryConnection>>;
      })
    );
  }

  /**
   * Get grammatical category connections.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalCategoryConnectionsForLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLang(params: {
    categoryId: number;
    languageId: number;
    context?: HttpContext
  }
): Observable<Array<GrammaticalCategoryConnection>> {

    return this.getGrammaticalCategoryConnectionsForLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryConnection>>) => r.body as Array<GrammaticalCategoryConnection>)
    );
  }

}
