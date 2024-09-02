/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { DeclensionConnection } from '../models/declension-connection';
import { DeclensionFull } from '../models/declension-full';
import { DeclensionRule } from '../models/declension-rule';
import { DeclinedWord } from '../models/declined-word';
import { deleteDeclension } from '../fn/declension/delete-declension';
import { DeleteDeclension$Params } from '../fn/declension/delete-declension';
import { deleteDeclensionConnection } from '../fn/declension/delete-declension-connection';
import { DeleteDeclensionConnection$Params } from '../fn/declension/delete-declension-connection';
import { deleteDeclensionRule } from '../fn/declension/delete-declension-rule';
import { DeleteDeclensionRule$Params } from '../fn/declension/delete-declension-rule';
import { getDeclensionConnectionWithLangAndPos } from '../fn/declension/get-declension-connection-with-lang-and-pos';
import { GetDeclensionConnectionWithLangAndPos$Params } from '../fn/declension/get-declension-connection-with-lang-and-pos';
import { getDeclensionRules } from '../fn/declension/get-declension-rules';
import { GetDeclensionRules$Params } from '../fn/declension/get-declension-rules';
import { getDeclensionsByLangAndPos } from '../fn/declension/get-declensions-by-lang-and-pos';
import { GetDeclensionsByLangAndPos$Params } from '../fn/declension/get-declensions-by-lang-and-pos';
import { getDeclineWord } from '../fn/declension/get-decline-word';
import { GetDeclineWord$Params } from '../fn/declension/get-decline-word';
import { isMainDelcension } from '../fn/declension/is-main-delcension';
import { IsMainDelcension$Params } from '../fn/declension/is-main-delcension';
import { removeFromMainDeclension } from '../fn/declension/remove-from-main-declension';
import { RemoveFromMainDeclension$Params } from '../fn/declension/remove-from-main-declension';
import { saveDeclension } from '../fn/declension/save-declension';
import { SaveDeclension$Params } from '../fn/declension/save-declension';
import { saveDeclensionConnection } from '../fn/declension/save-declension-connection';
import { SaveDeclensionConnection$Params } from '../fn/declension/save-declension-connection';
import { saveDeclensionRule } from '../fn/declension/save-declension-rule';
import { SaveDeclensionRule$Params } from '../fn/declension/save-declension-rule';
import { setAsMainDeclension } from '../fn/declension/set-as-main-declension';
import { SetAsMainDeclension$Params } from '../fn/declension/set-as-main-declension';


/**
 * Declension related operations
 */
@Injectable({ providedIn: 'root' })
export class DeclensionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveDeclensionConnection()` */
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
  saveDeclensionConnection$Response(params: SaveDeclensionConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveDeclensionConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Save declensions connected.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveDeclensionConnection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionConnection(params: SaveDeclensionConnection$Params, context?: HttpContext): Observable<number> {
    return this.saveDeclensionConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteDeclensionConnection()` */
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
  deleteDeclensionConnection$Response(params: DeleteDeclensionConnection$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDeclensionConnection(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete declensions connected.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDeclensionConnection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionConnection(params: DeleteDeclensionConnection$Params, context?: HttpContext): Observable<void> {
    return this.deleteDeclensionConnection$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDeclensionConnectionWithLangAndPos()` */
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
  getDeclensionConnectionWithLangAndPos$Response(params: GetDeclensionConnectionWithLangAndPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionConnection>>> {
    return getDeclensionConnectionWithLangAndPos(this.http, this.rootUrl, params, context);
  }

  /**
   * Get declensions connected with lang and pos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDeclensionConnectionWithLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionConnectionWithLangAndPos(params: GetDeclensionConnectionWithLangAndPos$Params, context?: HttpContext): Observable<Array<DeclensionConnection>> {
    return this.getDeclensionConnectionWithLangAndPos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DeclensionConnection>>): Array<DeclensionConnection> => r.body)
    );
  }

  /** Path part for operation `saveDeclension()` */
  static readonly SaveDeclensionPath = '/api/declension/declension';

  /**
   * Save declension.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveDeclension()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclension$Response(params: SaveDeclension$Params, context?: HttpContext): Observable<StrictHttpResponse<DeclensionFull>> {
    return saveDeclension(this.http, this.rootUrl, params, context);
  }

  /**
   * Save declension.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveDeclension$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclension(params: SaveDeclension$Params, context?: HttpContext): Observable<DeclensionFull> {
    return this.saveDeclension$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeclensionFull>): DeclensionFull => r.body)
    );
  }

  /** Path part for operation `deleteDeclension()` */
  static readonly DeleteDeclensionPath = '/api/declension/declension/{declensionId}';

  /**
   * Delete declension.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeclension()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclension$Response(params: DeleteDeclension$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDeclension(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete declension.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclension(params: DeleteDeclension$Params, context?: HttpContext): Observable<void> {
    return this.deleteDeclension$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDeclensionsByLangAndPos()` */
  static readonly GetDeclensionsByLangAndPosPath = '/api/declension/declensions/{languageId}/{posId}';

  /**
   * Get declensions by lang and pos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeclensionsByLangAndPos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionsByLangAndPos$Response(params: GetDeclensionsByLangAndPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionFull>>> {
    return getDeclensionsByLangAndPos(this.http, this.rootUrl, params, context);
  }

  /**
   * Get declensions by lang and pos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDeclensionsByLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionsByLangAndPos(params: GetDeclensionsByLangAndPos$Params, context?: HttpContext): Observable<Array<DeclensionFull>> {
    return this.getDeclensionsByLangAndPos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DeclensionFull>>): Array<DeclensionFull> => r.body)
    );
  }

  /** Path part for operation `isMainDelcension()` */
  static readonly IsMainDelcensionPath = '/api/declension/ismain/{declensionId}';

  /**
   * Is main declension.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isMainDelcension()` instead.
   *
   * This method doesn't expect any request body.
   */
  isMainDelcension$Response(params: IsMainDelcension$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return isMainDelcension(this.http, this.rootUrl, params, context);
  }

  /**
   * Is main declension.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isMainDelcension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isMainDelcension(params: IsMainDelcension$Params, context?: HttpContext): Observable<boolean> {
    return this.isMainDelcension$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `removeFromMainDeclension()` */
  static readonly RemoveFromMainDeclensionPath = '/api/declension/removemain/{declensionId}';

  /**
   * Remove from main declension.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeFromMainDeclension()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeFromMainDeclension$Response(params: RemoveFromMainDeclension$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeFromMainDeclension(this.http, this.rootUrl, params, context);
  }

  /**
   * Remove from main declension.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeFromMainDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeFromMainDeclension(params: RemoveFromMainDeclension$Params, context?: HttpContext): Observable<void> {
    return this.removeFromMainDeclension$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `saveDeclensionRule()` */
  static readonly SaveDeclensionRulePath = '/api/declension/rule';

  /**
   * Save declension rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveDeclensionRule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionRule$Response(params: SaveDeclensionRule$Params, context?: HttpContext): Observable<StrictHttpResponse<DeclensionRule>> {
    return saveDeclensionRule(this.http, this.rootUrl, params, context);
  }

  /**
   * Save declension rule.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveDeclensionRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionRule(params: SaveDeclensionRule$Params, context?: HttpContext): Observable<DeclensionRule> {
    return this.saveDeclensionRule$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeclensionRule>): DeclensionRule => r.body)
    );
  }

  /** Path part for operation `deleteDeclensionRule()` */
  static readonly DeleteDeclensionRulePath = '/api/declension/rule/{declensionRuleId}';

  /**
   * Delete declension rule.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDeclensionRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionRule$Response(params: DeleteDeclensionRule$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDeclensionRule(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete declension rule.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDeclensionRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionRule(params: DeleteDeclensionRule$Params, context?: HttpContext): Observable<void> {
    return this.deleteDeclensionRule$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDeclensionRules()` */
  static readonly GetDeclensionRulesPath = '/api/declension/rules/{declensionId}';

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeclensionRules()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionRules$Response(params: GetDeclensionRules$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DeclensionRule>>> {
    return getDeclensionRules(this.http, this.rootUrl, params, context);
  }

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDeclensionRules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionRules(params: GetDeclensionRules$Params, context?: HttpContext): Observable<Array<DeclensionRule>> {
    return this.getDeclensionRules$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DeclensionRule>>): Array<DeclensionRule> => r.body)
    );
  }

  /** Path part for operation `setAsMainDeclension()` */
  static readonly SetAsMainDeclensionPath = '/api/declension/setmain/{declensionId}';

  /**
   * Set as main declension.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setAsMainDeclension()` instead.
   *
   * This method doesn't expect any request body.
   */
  setAsMainDeclension$Response(params: SetAsMainDeclension$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setAsMainDeclension(this.http, this.rootUrl, params, context);
  }

  /**
   * Set as main declension.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setAsMainDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setAsMainDeclension(params: SetAsMainDeclension$Params, context?: HttpContext): Observable<void> {
    return this.setAsMainDeclension$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDeclineWord()` */
  static readonly GetDeclineWordPath = '/api/declension/word/{wordId}';

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeclineWord()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclineWord$Response(params: GetDeclineWord$Params, context?: HttpContext): Observable<StrictHttpResponse<DeclinedWord>> {
    return getDeclineWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDeclineWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclineWord(params: GetDeclineWord$Params, context?: HttpContext): Observable<DeclinedWord> {
    return this.getDeclineWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeclinedWord>): DeclinedWord => r.body)
    );
  }

}
