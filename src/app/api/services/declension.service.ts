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
import { DeclensionFull } from '../models/declension-full';
import { DeclensionRule } from '../models/declension-rule';
import { DeclinedWord } from '../models/declined-word';


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

  /**
   * Path part for operation saveDeclension
   */
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
  saveDeclension$Response(params: {
    context?: HttpContext
    body: DeclensionFull
  }
): Observable<StrictHttpResponse<DeclensionFull>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.SaveDeclensionPath, 'post');
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
        return r as StrictHttpResponse<DeclensionFull>;
      })
    );
  }

  /**
   * Save declension.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveDeclension$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclension(params: {
    context?: HttpContext
    body: DeclensionFull
  }
): Observable<DeclensionFull> {

    return this.saveDeclension$Response(params).pipe(
      map((r: StrictHttpResponse<DeclensionFull>) => r.body as DeclensionFull)
    );
  }

  /**
   * Path part for operation deleteDeclension
   */
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
  deleteDeclension$Response(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.DeleteDeclensionPath, 'delete');
    if (params) {
      rb.path('declensionId', params.declensionId, {});
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
   * Delete declension.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclension(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteDeclension$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeclensionsByLangAndPos
   */
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
  getDeclensionsByLangAndPos$Response(params: {
    languageId: number;
    posId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DeclensionFull>>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.GetDeclensionsByLangAndPosPath, 'get');
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
        return r as StrictHttpResponse<Array<DeclensionFull>>;
      })
    );
  }

  /**
   * Get declensions by lang and pos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeclensionsByLangAndPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionsByLangAndPos(params: {
    languageId: number;
    posId: number;
    context?: HttpContext
  }
): Observable<Array<DeclensionFull>> {

    return this.getDeclensionsByLangAndPos$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeclensionFull>>) => r.body as Array<DeclensionFull>)
    );
  }

  /**
   * Path part for operation isMainDelcension
   */
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
  isMainDelcension$Response(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.IsMainDelcensionPath, 'get');
    if (params) {
      rb.path('declensionId', params.declensionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Is main declension.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `isMainDelcension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isMainDelcension(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.isMainDelcension$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation removeFromMainDeclension
   */
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
  removeFromMainDeclension$Response(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.RemoveFromMainDeclensionPath, 'post');
    if (params) {
      rb.path('declensionId', params.declensionId, {});
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
   * Remove from main declension.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeFromMainDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeFromMainDeclension(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.removeFromMainDeclension$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation saveDeclensionRule
   */
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
  saveDeclensionRule$Response(params: {
    context?: HttpContext
    body: DeclensionRule
  }
): Observable<StrictHttpResponse<DeclensionRule>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.SaveDeclensionRulePath, 'post');
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
        return r as StrictHttpResponse<DeclensionRule>;
      })
    );
  }

  /**
   * Save declension rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveDeclensionRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveDeclensionRule(params: {
    context?: HttpContext
    body: DeclensionRule
  }
): Observable<DeclensionRule> {

    return this.saveDeclensionRule$Response(params).pipe(
      map((r: StrictHttpResponse<DeclensionRule>) => r.body as DeclensionRule)
    );
  }

  /**
   * Path part for operation deleteDeclensionRule
   */
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
  deleteDeclensionRule$Response(params: {
    declensionRuleId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.DeleteDeclensionRulePath, 'delete');
    if (params) {
      rb.path('declensionRuleId', params.declensionRuleId, {});
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
   * Delete declension rule.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDeclensionRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDeclensionRule(params: {
    declensionRuleId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteDeclensionRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeclensionRules
   */
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
  getDeclensionRules$Response(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DeclensionRule>>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.GetDeclensionRulesPath, 'get');
    if (params) {
      rb.path('declensionId', params.declensionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DeclensionRule>>;
      })
    );
  }

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeclensionRules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclensionRules(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<Array<DeclensionRule>> {

    return this.getDeclensionRules$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeclensionRule>>) => r.body as Array<DeclensionRule>)
    );
  }

  /**
   * Path part for operation setAsMainDeclension
   */
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
  setAsMainDeclension$Response(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.SetAsMainDeclensionPath, 'post');
    if (params) {
      rb.path('declensionId', params.declensionId, {});
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
   * Set as main declension.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setAsMainDeclension$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setAsMainDeclension(params: {
    declensionId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.setAsMainDeclension$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeclineWord
   */
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
  getDeclineWord$Response(params: {
    wordId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DeclinedWord>> {

    const rb = new RequestBuilder(this.rootUrl, DeclensionService.GetDeclineWordPath, 'get');
    if (params) {
      rb.path('wordId', params.wordId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DeclinedWord>;
      })
    );
  }

  /**
   * Get declension rules.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeclineWord$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeclineWord(params: {
    wordId: number;
    context?: HttpContext
  }
): Observable<DeclinedWord> {

    return this.getDeclineWord$Response(params).pipe(
      map((r: StrictHttpResponse<DeclinedWord>) => r.body as DeclinedWord)
    );
  }

}
