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

}
