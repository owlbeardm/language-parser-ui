/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteGrammaticalCategoryConnection } from '../fn/category/delete-grammatical-category-connection';
import { DeleteGrammaticalCategoryConnection$Params } from '../fn/category/delete-grammatical-category-connection';
import { getAllCategories } from '../fn/category/get-all-categories';
import { GetAllCategories$Params } from '../fn/category/get-all-categories';
import { getCategoryValuesByCategory } from '../fn/category/get-category-values-by-category';
import { GetCategoryValuesByCategory$Params } from '../fn/category/get-category-values-by-category';
import { getCategoryValuesByCategoryAndLang } from '../fn/category/get-category-values-by-category-and-lang';
import { GetCategoryValuesByCategoryAndLang$Params } from '../fn/category/get-category-values-by-category-and-lang';
import { getGrammaticalCategoryConnectionsForLang } from '../fn/category/get-grammatical-category-connections-for-lang';
import { GetGrammaticalCategoryConnectionsForLang$Params } from '../fn/category/get-grammatical-category-connections-for-lang';
import { getGrammaticalCategoryConnectionsForLangAndPos } from '../fn/category/get-grammatical-category-connections-for-lang-and-pos';
import { GetGrammaticalCategoryConnectionsForLangAndPos$Params } from '../fn/category/get-grammatical-category-connections-for-lang-and-pos';
import { getGrammaticalValuesByWord } from '../fn/category/get-grammatical-values-by-word';
import { GetGrammaticalValuesByWord$Params } from '../fn/category/get-grammatical-values-by-word';
import { getGrammaticalValuesConnectionByLang } from '../fn/category/get-grammatical-values-connection-by-lang';
import { GetGrammaticalValuesConnectionByLang$Params } from '../fn/category/get-grammatical-values-connection-by-lang';
import { GrammaticalCategory } from '../models/grammatical-category';
import { GrammaticalCategoryConnection } from '../models/grammatical-category-connection';
import { GrammaticalCategoryValue } from '../models/grammatical-category-value';
import { GrammaticalCategoryValueConnection } from '../models/grammatical-category-value-connection';
import { GrammaticalValueWordConnection } from '../models/grammatical-value-word-connection';
import { removeGrammaticalCategoryValueConnection } from '../fn/category/remove-grammatical-category-value-connection';
import { RemoveGrammaticalCategoryValueConnection$Params } from '../fn/category/remove-grammatical-category-value-connection';
import { removeGrammaticalValuesByWord } from '../fn/category/remove-grammatical-values-by-word';
import { RemoveGrammaticalValuesByWord$Params } from '../fn/category/remove-grammatical-values-by-word';
import { replaceGrammaticalValuesByWord } from '../fn/category/replace-grammatical-values-by-word';
import { ReplaceGrammaticalValuesByWord$Params } from '../fn/category/replace-grammatical-values-by-word';
import { saveGrammaticalCategory } from '../fn/category/save-grammatical-category';
import { SaveGrammaticalCategory$Params } from '../fn/category/save-grammatical-category';
import { saveGrammaticalCategoryConnection } from '../fn/category/save-grammatical-category-connection';
import { SaveGrammaticalCategoryConnection$Params } from '../fn/category/save-grammatical-category-connection';
import { saveGrammaticalCategoryValue } from '../fn/category/save-grammatical-category-value';
import { SaveGrammaticalCategoryValue$Params } from '../fn/category/save-grammatical-category-value';
import { saveGrammaticalCategoryValueConnection } from '../fn/category/save-grammatical-category-value-connection';
import { SaveGrammaticalCategoryValueConnection$Params } from '../fn/category/save-grammatical-category-value-connection';


/**
 * Grammatical category related operations
 */
@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllCategories()` */
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
  getAllCategories$Response(params?: GetAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategory>>> {
    return getAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all grammatical categories.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: GetAllCategories$Params, context?: HttpContext): Observable<Array<GrammaticalCategory>> {
    return this.getAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategory>>): Array<GrammaticalCategory> => r.body)
    );
  }

  /** Path part for operation `saveGrammaticalCategory()` */
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
  saveGrammaticalCategory$Response(params: SaveGrammaticalCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveGrammaticalCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * Save grammatical category.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategory(params: SaveGrammaticalCategory$Params, context?: HttpContext): Observable<number> {
    return this.saveGrammaticalCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `saveGrammaticalCategoryConnection()` */
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
  saveGrammaticalCategoryConnection$Response(params: SaveGrammaticalCategoryConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveGrammaticalCategoryConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Save grammatical category connection.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryConnection(params: SaveGrammaticalCategoryConnection$Params, context?: HttpContext): Observable<number> {
    return this.saveGrammaticalCategoryConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteGrammaticalCategoryConnection()` */
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
  deleteGrammaticalCategoryConnection$Response(params: DeleteGrammaticalCategoryConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteGrammaticalCategoryConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete grammatical category connection.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteGrammaticalCategoryConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGrammaticalCategoryConnection(params: DeleteGrammaticalCategoryConnection$Params, context?: HttpContext): Observable<void> {
    return this.deleteGrammaticalCategoryConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `saveGrammaticalCategoryValue()` */
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
  saveGrammaticalCategoryValue$Response(params: SaveGrammaticalCategoryValue$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveGrammaticalCategoryValue(this.http, this.rootUrl, params, context);
  }

  /**
   * Save grammatical category value.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryValue$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValue(params: SaveGrammaticalCategoryValue$Params, context?: HttpContext): Observable<number> {
    return this.saveGrammaticalCategoryValue$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `replaceGrammaticalValuesByWord()` */
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
  replaceGrammaticalValuesByWord$Response(params: ReplaceGrammaticalValuesByWord$Params, context?: HttpContext): Observable<StrictHttpResponse<GrammaticalValueWordConnection>> {
    return replaceGrammaticalValuesByWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Replace grammatical value word connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `replaceGrammaticalValuesByWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceGrammaticalValuesByWord(params: ReplaceGrammaticalValuesByWord$Params, context?: HttpContext): Observable<GrammaticalValueWordConnection> {
    return this.replaceGrammaticalValuesByWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<GrammaticalValueWordConnection>): GrammaticalValueWordConnection => r.body)
    );
  }

  /** Path part for operation `removeGrammaticalValuesByWord()` */
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
  removeGrammaticalValuesByWord$Response(params: RemoveGrammaticalValuesByWord$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeGrammaticalValuesByWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Remove grammatical value word connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalValuesByWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValuesByWord(params: RemoveGrammaticalValuesByWord$Params, context?: HttpContext): Observable<void> {
    return this.removeGrammaticalValuesByWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `saveGrammaticalCategoryValueConnection()` */
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
  saveGrammaticalCategoryValueConnection$Response(params: SaveGrammaticalCategoryValueConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveGrammaticalCategoryValueConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Replace grammatical values connection.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalCategoryValueConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalCategoryValueConnection(params: SaveGrammaticalCategoryValueConnection$Params, context?: HttpContext): Observable<number> {
    return this.saveGrammaticalCategoryValueConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `removeGrammaticalCategoryValueConnection()` */
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
  removeGrammaticalCategoryValueConnection$Response(params: RemoveGrammaticalCategoryValueConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeGrammaticalCategoryValueConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Remove grammatical values connection.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalCategoryValueConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalCategoryValueConnection(params: RemoveGrammaticalCategoryValueConnection$Params, context?: HttpContext): Observable<void> {
    return this.removeGrammaticalCategoryValueConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getCategoryValuesByCategory()` */
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
  getCategoryValuesByCategory$Response(params: GetCategoryValuesByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {
    return getCategoryValuesByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical categories values of category.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCategoryValuesByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategory(params: GetCategoryValuesByCategory$Params, context?: HttpContext): Observable<Array<GrammaticalCategoryValue>> {
    return this.getCategoryValuesByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValue>>): Array<GrammaticalCategoryValue> => r.body)
    );
  }

  /** Path part for operation `getCategoryValuesByCategoryAndLang()` */
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
  getCategoryValuesByCategoryAndLang$Response(params: GetCategoryValuesByCategoryAndLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryValue>>> {
    return getCategoryValuesByCategoryAndLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical categories values of category and lang.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCategoryValuesByCategoryAndLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryValuesByCategoryAndLang(params: GetCategoryValuesByCategoryAndLang$Params, context?: HttpContext): Observable<Array<GrammaticalCategoryValue>> {
    return this.getCategoryValuesByCategoryAndLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValue>>): Array<GrammaticalCategoryValue> => r.body)
    );
  }

  /** Path part for operation `getGrammaticalCategoryConnectionsForLang()` */
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
  getGrammaticalCategoryConnectionsForLang$Response(params: GetGrammaticalCategoryConnectionsForLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {
    return getGrammaticalCategoryConnectionsForLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical category connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalCategoryConnectionsForLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLang(params: GetGrammaticalCategoryConnectionsForLang$Params, context?: HttpContext): Observable<Array<GrammaticalCategoryConnection>> {
    return this.getGrammaticalCategoryConnectionsForLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryConnection>>): Array<GrammaticalCategoryConnection> => r.body)
    );
  }

  /** Path part for operation `getGrammaticalValuesConnectionByLang()` */
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
  getGrammaticalValuesConnectionByLang$Response(params: GetGrammaticalValuesConnectionByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>> {
    return getGrammaticalValuesConnectionByLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical values connection by lang.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValuesConnectionByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesConnectionByLang(params: GetGrammaticalValuesConnectionByLang$Params, context?: HttpContext): Observable<Array<GrammaticalCategoryValueConnection>> {
    return this.getGrammaticalValuesConnectionByLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryValueConnection>>): Array<GrammaticalCategoryValueConnection> => r.body)
    );
  }

  /** Path part for operation `getGrammaticalCategoryConnectionsForLangAndPos()` */
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
  getGrammaticalCategoryConnectionsForLangAndPos$Response(params: GetGrammaticalCategoryConnectionsForLangAndPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalCategoryConnection>>> {
    return getGrammaticalCategoryConnectionsForLangAndPos(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical category connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalCategoryConnectionsForLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalCategoryConnectionsForLangAndPos(params: GetGrammaticalCategoryConnectionsForLangAndPos$Params, context?: HttpContext): Observable<Array<GrammaticalCategoryConnection>> {
    return this.getGrammaticalCategoryConnectionsForLangAndPos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalCategoryConnection>>): Array<GrammaticalCategoryConnection> => r.body)
    );
  }

  /** Path part for operation `getGrammaticalValuesByWord()` */
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
  getGrammaticalValuesByWord$Response(params: GetGrammaticalValuesByWord$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GrammaticalValueWordConnection>>> {
    return getGrammaticalValuesByWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical value word connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValuesByWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValuesByWord(params: GetGrammaticalValuesByWord$Params, context?: HttpContext): Observable<Array<GrammaticalValueWordConnection>> {
    return this.getGrammaticalValuesByWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GrammaticalValueWordConnection>>): Array<GrammaticalValueWordConnection> => r.body)
    );
  }

}
