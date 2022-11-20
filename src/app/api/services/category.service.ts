/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GrammaticalCategory } from '../models/grammatical-category';
import { GrammaticalCategoryConnection } from '../models/grammatical-category-connection';
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { GrammaticalCategoryValueConnection } from '../models/grammatical-category-value-connection';
import { GrammaticalValueWordConnection } from '../models/grammatical-value-word-connection';


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
  }): Observable<StrictHttpResponse<Array<GrammaticalCategory>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetAllCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<GrammaticalCategory>> {

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
    body: GrammaticalCategory
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: GrammaticalCategory
  }): Observable<number> {

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
    body: GrammaticalCategoryConnection
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryConnectionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: GrammaticalCategoryConnection
  }): Observable<number> {

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.DeleteGrammaticalCategoryConnectionPath, 'delete');
    if (params) {
      rb.path('connectionId', params.connectionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
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
  }): Observable<void> {

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
    body: GrammaticalCategoryValue
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryValuePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: GrammaticalCategoryValue
  }): Observable<number> {

    return this.saveGrammaticalCategoryValue$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation replaceGrammaticalValuesByWord
   */
  static readonly ReplaceGrammaticalValuesByWordPath = '/api/category/valuebyword/replace';

  /**
   * Replace grammatical value word connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceGrammaticalValuesByWord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceGrammaticalValuesByWord$Response(params: {
    body: GrammaticalValueWordConnection
  }): Observable<StrictHttpResponse<GrammaticalValueWordConnection>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ReplaceGrammaticalValuesByWordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GrammaticalValueWordConnection>;
      })
    );
  }

  /**
   * Replace grammatical value word connections.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `replaceGrammaticalValuesByWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceGrammaticalValuesByWord(params: {
    body: GrammaticalValueWordConnection
  }): Observable<GrammaticalValueWordConnection> {

    return this.replaceGrammaticalValuesByWord$Response(params).pipe(
      map((r: StrictHttpResponse<GrammaticalValueWordConnection>) => r.body as GrammaticalValueWordConnection)
    );
  }

  /**
   * Path part for operation removeGrammaticalValuesByWord
   */
  static readonly RemoveGrammaticalValuesByWordPath = '/api/category/valuebyword/{wordId}/{categoryId}';

  /**
   * Remove grammatical value word connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeGrammaticalValuesByWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValuesByWord$Response(params: {
    wordId: number;
    categoryId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.RemoveGrammaticalValuesByWordPath, 'delete');
    if (params) {
      rb.path('wordId', params.wordId, {});
      rb.path('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove grammatical value word connections.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalValuesByWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValuesByWord(params: {
    wordId: number;
    categoryId: number;
  }): Observable<void> {

    return this.removeGrammaticalValuesByWord$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation saveGrammaticalCategoryValueConnection
   */
  static readonly SaveGrammaticalCategoryValueConnectionPath = '/api/category/valuelangconnection';

  /**
   * Replace grammatical values connection.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGrammaticalCategoryValueConnection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValueConnection$Response(params: {
    body: GrammaticalCategoryValueConnection
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.SaveGrammaticalCategoryValueConnectionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Replace grammatical values connection.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryValueConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValueConnection(params: {
    body: GrammaticalCategoryValueConnection
  }): Observable<number> {

    return this.saveGrammaticalCategoryValueConnection$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation removeGrammaticalCategoryValueConnection
   */
  static readonly RemoveGrammaticalCategoryValueConnectionPath = '/api/category/valuelangconnection/{gcvcId}';

  /**
   * Remove grammatical values connection.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeGrammaticalCategoryValueConnection()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalCategoryValueConnection$Response(params: {
    gcvcId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.RemoveGrammaticalCategoryValueConnectionPath, 'delete');
    if (params) {
      rb.path('gcvcId', params.gcvcId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove grammatical values connection.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalCategoryValueConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalCategoryValueConnection(params: {
    gcvcId: number;
  }): Observable<void> {

    return this.removeGrammaticalCategoryValueConnection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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
  }): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetCategoryValuesByCategoryPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<GrammaticalCategoryValue>> {

    return this.getCategoryValuesByCategory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValue>>) => r.body as Array<GrammaticalCategoryValue>)
    );
  }

  /**
   * Path part for operation getCategoryValuesByCategoryAndLang
   */
  static readonly GetCategoryValuesByCategoryAndLangPath = '/api/category/{categoryId}/{langId}/values';

  /**
   * Get grammatical categories values of category and lang.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoryValuesByCategoryAndLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategoryAndLang$Response(params: {
    categoryId: number;
    langId: number;
  }): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetCategoryValuesByCategoryAndLangPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
      rb.path('langId', params.langId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalCategoryValue>>;
      })
    );
  }

  /**
   * Get grammatical categories values of category and lang.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategoryValuesByCategoryAndLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategoryAndLang(params: {
    categoryId: number;
    langId: number;
  }): Observable<Array<GrammaticalCategoryValue>> {

    return this.getCategoryValuesByCategoryAndLang$Response(params).pipe(
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
  }): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetGrammaticalCategoryConnectionsForLangPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<GrammaticalCategoryConnection>> {

    return this.getGrammaticalCategoryConnectionsForLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryConnection>>) => r.body as Array<GrammaticalCategoryConnection>)
    );
  }

  /**
   * Path part for operation getGrammaticalValuesConnectionByLang
   */
  static readonly GetGrammaticalValuesConnectionByLangPath = '/api/category/{langId}/valuelangconnection';

  /**
   * Get grammatical values connection by lang.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGrammaticalValuesConnectionByLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesConnectionByLang$Response(params: {
    langId: number;
  }): Observable<StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetGrammaticalValuesConnectionByLangPath, 'get');
    if (params) {
      rb.path('langId', params.langId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>;
      })
    );
  }

  /**
   * Get grammatical values connection by lang.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValuesConnectionByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesConnectionByLang(params: {
    langId: number;
  }): Observable<Array<GrammaticalCategoryValueConnection>> {

    return this.getGrammaticalValuesConnectionByLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>) => r.body as Array<GrammaticalCategoryValueConnection>)
    );
  }

  /**
   * Path part for operation getGrammaticalCategoryConnectionsForLangAndPos
   */
  static readonly GetGrammaticalCategoryConnectionsForLangAndPosPath = '/api/category/{posId}/{languageId}/connectionspos';

  /**
   * Get grammatical category connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGrammaticalCategoryConnectionsForLangAndPos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLangAndPos$Response(params: {
    posId: number;
    languageId: number;
  }): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetGrammaticalCategoryConnectionsForLangAndPosPath, 'get');
    if (params) {
      rb.path('posId', params.posId, {});
      rb.path('languageId', params.languageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
   * To access the full response (for headers, for example), `getGrammaticalCategoryConnectionsForLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLangAndPos(params: {
    posId: number;
    languageId: number;
  }): Observable<Array<GrammaticalCategoryConnection>> {

    return this.getGrammaticalCategoryConnectionsForLangAndPos$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryConnection>>) => r.body as Array<GrammaticalCategoryConnection>)
    );
  }

  /**
   * Path part for operation getGrammaticalValuesByWord
   */
  static readonly GetGrammaticalValuesByWordPath = '/api/category/{wordId}/valuebyword';

  /**
   * Get grammatical value word connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGrammaticalValuesByWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesByWord$Response(params: {
    wordId: number;
  }): Observable<StrictHttpResponse<Array<GrammaticalValueWordConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.GetGrammaticalValuesByWordPath, 'get');
    if (params) {
      rb.path('wordId', params.wordId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrammaticalValueWordConnection>>;
      })
    );
  }

  /**
   * Get grammatical value word connections.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValuesByWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesByWord(params: {
    wordId: number;
  }): Observable<Array<GrammaticalValueWordConnection>> {

    return this.getGrammaticalValuesByWord$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalValueWordConnection>>) => r.body as Array<GrammaticalValueWordConnection>)
    );
  }

}
