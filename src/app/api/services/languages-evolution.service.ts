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

import { GrammaticalValueEvolution } from '../models/grammatical-value-evolution';
import { Language } from '../models/language';
import { LanguageConnection } from '../models/language-connection';
import { LanguageConnectionTypeModel } from '../models/language-connection-type-model';
import { PageResultWordWithBorrowed } from '../models/page-result-word-with-borrowed';
import { PageResultWordWithEvolution } from '../models/page-result-word-with-evolution';
import { SoundChange } from '../models/sound-change';
import { SoundChangePurpose } from '../models/sound-change-purpose';
import { WordBorrowedListFilter } from '../models/word-borrowed-list-filter';
import { WordToBorrow } from '../models/word-to-borrow';
import { WordToEvolve } from '../models/word-to-evolve';
import { WordTraceResult } from '../models/word-trace-result';
import { WordWithBorrowed } from '../models/word-with-borrowed';
import { WordWithEvolution } from '../models/word-with-evolution';
import { WordWithEvolutionsListFilter } from '../models/word-with-evolutions-list-filter';


/**
 * Languages evolution related operations
 */
@Injectable({
  providedIn: 'root',
})
export class LanguagesEvolutionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllLanguagesFrom
   */
  static readonly GetAllLanguagesFromPath = '/api/evolve/allfrom/{fromId}';

  /**
   * Get all languages to which path from the given language is possible.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLanguagesFrom()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguagesFrom$Response(params: {
    fromId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Language>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllLanguagesFromPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Language>>;
      })
    );
  }

  /**
   * Get all languages to which path from the given language is possible.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllLanguagesFrom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguagesFrom(params: {
    fromId: number;
    context?: HttpContext
  }
): Observable<Array<Language>> {

    return this.getAllLanguagesFrom$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Language>>) => r.body as Array<Language>)
    );
  }

  /**
   * Path part for operation getConnections
   */
  static readonly GetConnectionsPath = '/api/evolve/connection/all';

  /**
   * Get connections.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnections()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnections$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LanguageConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LanguageConnection>>;
      })
    );
  }

  /**
   * Get connections.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnections$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnections(params?: {
    context?: HttpContext
  }
): Observable<Array<LanguageConnection>> {

    return this.getConnections$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>) => r.body as Array<LanguageConnection>)
    );
  }

  /**
   * Path part for operation getConnectionFromLang
   */
  static readonly GetConnectionFromLangPath = '/api/evolve/connection/from/{fromLangId}';

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectionFromLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionFromLang$Response(params: {
    fromLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LanguageConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionFromLangPath, 'get');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LanguageConnection>>;
      })
    );
  }

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectionFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionFromLang(params: {
    fromLangId: number;
    context?: HttpContext
  }
): Observable<Array<LanguageConnection>> {

    return this.getConnectionFromLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>) => r.body as Array<LanguageConnection>)
    );
  }

  /**
   * Path part for operation getConnectionToLang
   */
  static readonly GetConnectionToLangPath = '/api/evolve/connection/to/{toLangId}';

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectionToLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionToLang$Response(params: {
    toLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LanguageConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionToLangPath, 'get');
    if (params) {
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LanguageConnection>>;
      })
    );
  }

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectionToLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionToLang(params: {
    toLangId: number;
    context?: HttpContext
  }
): Observable<Array<LanguageConnection>> {

    return this.getConnectionToLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>) => r.body as Array<LanguageConnection>)
    );
  }

  /**
   * Path part for operation getConnectionByLangs
   */
  static readonly GetConnectionByLangsPath = '/api/evolve/connection/{fromLangId}/{toLangId}';

  /**
   * Get connection between two languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConnectionByLangs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionByLangs$Response(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<LanguageConnection>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionByLangsPath, 'get');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LanguageConnection>;
      })
    );
  }

  /**
   * Get connection between two languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConnectionByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionByLangs(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<LanguageConnection> {

    return this.getConnectionByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<LanguageConnection>) => r.body as LanguageConnection)
    );
  }

  /**
   * Path part for operation updateConnectionByLangs
   */
  static readonly UpdateConnectionByLangsPath = '/api/evolve/connection/{fromLangId}/{toLangId}';

  /**
   * Update connection between two languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateConnectionByLangs()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateConnectionByLangs$Response(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
    body: LanguageConnectionTypeModel
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.UpdateConnectionByLangsPath, 'post');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
      rb.body(params.body, 'application/json');
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
   * Update connection between two languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateConnectionByLangs$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateConnectionByLangs(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
    body: LanguageConnectionTypeModel
  }
): Observable<void> {

    return this.updateConnectionByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteConnectionByLangs
   */
  static readonly DeleteConnectionByLangsPath = '/api/evolve/connection/{fromLangId}/{toLangId}';

  /**
   * Delete connection between two languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteConnectionByLangs()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectionByLangs$Response(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.DeleteConnectionByLangsPath, 'delete');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
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
   * Delete connection between two languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteConnectionByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectionByLangs(params: {
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteConnectionByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation saveGrammaticalValueEvolution
   */
  static readonly SaveGrammaticalValueEvolutionPath = '/api/evolve/grammaticalvalue';

  /**
   * Save grammatical value evolution.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGrammaticalValueEvolution()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalValueEvolution$Response(params: {
    context?: HttpContext
    body: GrammaticalValueEvolution
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveGrammaticalValueEvolutionPath, 'post');
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
   * Save grammatical value evolution.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalValueEvolution$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalValueEvolution(params: {
    context?: HttpContext
    body: GrammaticalValueEvolution
  }
): Observable<number> {

    return this.saveGrammaticalValueEvolution$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation removeGrammaticalValueEvolution
   */
  static readonly RemoveGrammaticalValueEvolutionPath = '/api/evolve/grammaticalvalue/{id}';

  /**
   * Delete grammatical value evolution.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeGrammaticalValueEvolution()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValueEvolution$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.RemoveGrammaticalValueEvolutionPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete grammatical value evolution.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalValueEvolution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValueEvolution(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.removeGrammaticalValueEvolution$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getGrammaticalValueEvolution
   */
  static readonly GetGrammaticalValueEvolutionPath = '/api/evolve/grammaticalvalue/{langFromId}/{langToId}/{posId}/{valueFromId}';

  /**
   * Get grammatical value evolution.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGrammaticalValueEvolution()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValueEvolution$Response(params: {
    langFromId: number;
    langToId: number;
    posId: number;
    valueFromId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<GrammaticalValueEvolution>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetGrammaticalValueEvolutionPath, 'get');
    if (params) {
      rb.path('langFromId', params.langFromId, {});
      rb.path('langToId', params.langToId, {});
      rb.path('posId', params.posId, {});
      rb.path('valueFromId', params.valueFromId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GrammaticalValueEvolution>;
      })
    );
  }

  /**
   * Get grammatical value evolution.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValueEvolution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValueEvolution(params: {
    langFromId: number;
    langToId: number;
    posId: number;
    valueFromId: number;
    context?: HttpContext
  }
): Observable<GrammaticalValueEvolution> {

    return this.getGrammaticalValueEvolution$Response(params).pipe(
      map((r: StrictHttpResponse<GrammaticalValueEvolution>) => r.body as GrammaticalValueEvolution)
    );
  }

  /**
   * Path part for operation getLanguageGraph
   */
  static readonly GetLanguageGraphPath = '/api/evolve/graph';

  /**
   * Get language connection graph.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLanguageGraph()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguageGraph$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetLanguageGraphPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get language connection graph.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLanguageGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguageGraph(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.getLanguageGraph$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getAllRoutes
   */
  static readonly GetAllRoutesPath = '/api/evolve/routes/{fromId}/{toId}';

  /**
   * Get all routes from language to other given language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRoutes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoutes$Response(params: {
    fromId: number;
    toId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Array<Language>>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllRoutesPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
      rb.path('toId', params.toId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Array<Language>>>;
      })
    );
  }

  /**
   * Get all routes from language to other given language.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoutes(params: {
    fromId: number;
    toId: number;
    context?: HttpContext
  }
): Observable<Array<Array<Language>>> {

    return this.getAllRoutes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Array<Language>>>) => r.body as Array<Array<Language>>)
    );
  }

  /**
   * Path part for operation getSoundChangesByLang
   */
  static readonly GetSoundChangesByLangPath = '/api/evolve/sc/lang/{soundChangePurpose}/{fromLangId}';

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesByLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLang$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SoundChange>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesByLangPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SoundChange>>;
      })
    );
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLang(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
  }
): Observable<Array<SoundChange>> {

    return this.getSoundChangesByLang$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>) => r.body as Array<SoundChange>)
    );
  }

  /**
   * Path part for operation getSoundChangesByLangs
   */
  static readonly GetSoundChangesByLangsPath = '/api/evolve/sc/lang/{soundChangePurpose}/{fromLangId}/{toLangId}';

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesByLangs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLangs$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SoundChange>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesByLangsPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SoundChange>>;
      })
    );
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLangs(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<Array<SoundChange>> {

    return this.getSoundChangesByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>) => r.body as Array<SoundChange>)
    );
  }

  /**
   * Path part for operation getSoundChangesRawLinesByLang
   */
  static readonly GetSoundChangesRawLinesByLangPath = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}';

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesRawLinesByLang()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLang$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesRawLinesByLangPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLang(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.getSoundChangesRawLinesByLang$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation saveSoundChangesRawLinesByLang
   */
  static readonly SaveSoundChangesRawLinesByLangPath = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}';

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSoundChangesRawLinesByLang()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLang$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
    body: string
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveSoundChangesRawLinesByLangPath, 'post');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.body(params.body, 'application/json');
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
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByLang$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLang(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    context?: HttpContext
    body: string
  }
): Observable<void> {

    return this.saveSoundChangesRawLinesByLang$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoundChangesRawLinesByLangs
   */
  static readonly GetSoundChangesRawLinesByLangsPath = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}/{toLangId}';

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesRawLinesByLangs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLangs$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesRawLinesByLangsPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLangs(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.getSoundChangesRawLinesByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation saveSoundChangesRawLinesByLangs
   */
  static readonly SaveSoundChangesRawLinesByLangsPath = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}/{toLangId}';

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSoundChangesRawLinesByLangs()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLangs$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
    body: string
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveSoundChangesRawLinesByLangsPath, 'post');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
      rb.body(params.body, 'application/json');
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
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByLangs$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLangs(params: {
    soundChangePurpose: SoundChangePurpose;
    fromLangId: number;
    toLangId: number;
    context?: HttpContext
    body: string
  }
): Observable<void> {

    return this.saveSoundChangesRawLinesByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoundChangesRawLinesByRule
   */
  static readonly GetSoundChangesRawLinesByRulePath = '/api/evolve/sc/raw/rule/{soundChangePurpose}/{declensionId}';

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesRawLinesByRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByRule$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    declensionId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesRawLinesByRulePath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('declensionId', params.declensionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByRule(params: {
    soundChangePurpose: SoundChangePurpose;
    declensionId: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.getSoundChangesRawLinesByRule$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation saveSoundChangesRawLinesByRule
   */
  static readonly SaveSoundChangesRawLinesByRulePath = '/api/evolve/sc/raw/rule/{soundChangePurpose}/{declensionId}';

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSoundChangesRawLinesByRule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByRule$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    declensionId: number;
    context?: HttpContext
    body: string
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveSoundChangesRawLinesByRulePath, 'post');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('declensionId', params.declensionId, {});
      rb.body(params.body, 'application/json');
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
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByRule(params: {
    soundChangePurpose: SoundChangePurpose;
    declensionId: number;
    context?: HttpContext
    body: string
  }
): Observable<void> {

    return this.saveSoundChangesRawLinesByRule$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoundChangeRaw
   */
  static readonly GetSoundChangeRawPath = '/api/evolve/sc/raw/{id}';

  /**
   * Get sound change raw.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangeRaw()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangeRaw$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangeRawPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get sound change raw.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangeRaw$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangeRaw(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.getSoundChangeRaw$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation updateSoundChange
   */
  static readonly UpdateSoundChangePath = '/api/evolve/sc/raw/{id}';

  /**
   * Update sound change from text form.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSoundChange()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoundChange$Response(params: {
    id: number;
    context?: HttpContext
    body: string
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.UpdateSoundChangePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * Update sound change from text form.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSoundChange$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoundChange(params: {
    id: number;
    context?: HttpContext
    body: string
  }
): Observable<void> {

    return this.updateSoundChange$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSoundChangesByRule
   */
  static readonly GetSoundChangesByRulePath = '/api/evolve/sc/rule/{soundChangePurpose}/{ruleId}';

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChangesByRule()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByRule$Response(params: {
    soundChangePurpose: SoundChangePurpose;
    ruleId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SoundChange>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesByRulePath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('ruleId', params.ruleId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SoundChange>>;
      })
    );
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByRule(params: {
    soundChangePurpose: SoundChangePurpose;
    ruleId: number;
    context?: HttpContext
  }
): Observable<Array<SoundChange>> {

    return this.getSoundChangesByRule$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>) => r.body as Array<SoundChange>)
    );
  }

  /**
   * Path part for operation getSoundChange
   */
  static readonly GetSoundChangePath = '/api/evolve/sc/{id}';

  /**
   * Get sound change.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSoundChange()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChange$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SoundChange>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SoundChange>;
      })
    );
  }

  /**
   * Get sound change.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSoundChange$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChange(params: {
    id: number;
    context?: HttpContext
  }
): Observable<SoundChange> {

    return this.getSoundChange$Response(params).pipe(
      map((r: StrictHttpResponse<SoundChange>) => r.body as SoundChange)
    );
  }

  /**
   * Path part for operation deleteSoundChange
   */
  static readonly DeleteSoundChangePath = '/api/evolve/sc/{id}';

  /**
   * Delete sound change.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSoundChange()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoundChange$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.DeleteSoundChangePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete sound change.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSoundChange$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoundChange(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSoundChange$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation trace
   */
  static readonly TracePath = '/api/evolve/trace/{word}';

  /**
   * Trace word changes by list of languages.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trace$Response(params: {
    word: string;
    context?: HttpContext
    body: Array<Language>
  }
): Observable<StrictHttpResponse<Array<WordTraceResult>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.TracePath, 'post');
    if (params) {
      rb.path('word', params.word, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WordTraceResult>>;
      })
    );
  }

  /**
   * Trace word changes by list of languages.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trace(params: {
    word: string;
    context?: HttpContext
    body: Array<Language>
  }
): Observable<Array<WordTraceResult>> {

    return this.trace$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WordTraceResult>>) => r.body as Array<WordTraceResult>)
    );
  }

  /**
   * Path part for operation getAllWordsWithEvolutions
   */
  static readonly GetAllWordsWithEvolutionsPath = '/api/evolve/words';

  /**
   * Get all words with evolutions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWordsWithEvolutions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithEvolutions$Response(params: {
    filter: WordWithEvolutionsListFilter;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResultWordWithEvolution>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllWordsWithEvolutionsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResultWordWithEvolution>;
      })
    );
  }

  /**
   * Get all words with evolutions.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWordsWithEvolutions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithEvolutions(params: {
    filter: WordWithEvolutionsListFilter;
    context?: HttpContext
  }
): Observable<PageResultWordWithEvolution> {

    return this.getAllWordsWithEvolutions$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithEvolution>) => r.body as PageResultWordWithEvolution)
    );
  }

  /**
   * Path part for operation addBorrowedWord
   */
  static readonly AddBorrowedWordPath = '/api/evolve/words/borrow';

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBorrowedWord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBorrowedWord$Response(params: {
    context?: HttpContext
    body: WordToBorrow
  }
): Observable<StrictHttpResponse<WordWithBorrowed>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.AddBorrowedWordPath, 'post');
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
        return r as StrictHttpResponse<WordWithBorrowed>;
      })
    );
  }

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addBorrowedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBorrowedWord(params: {
    context?: HttpContext
    body: WordToBorrow
  }
): Observable<WordWithBorrowed> {

    return this.addBorrowedWord$Response(params).pipe(
      map((r: StrictHttpResponse<WordWithBorrowed>) => r.body as WordWithBorrowed)
    );
  }

  /**
   * Path part for operation getAllWords1
   */
  static readonly GetAllWords1Path = '/api/evolve/words/borrowed';

  /**
   * Get all words.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWords1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords1$Response(params: {
    filter: WordBorrowedListFilter;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageResultWordWithBorrowed>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllWords1Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageResultWordWithBorrowed>;
      })
    );
  }

  /**
   * Get all words.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWords1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords1(params: {
    filter: WordBorrowedListFilter;
    context?: HttpContext
  }
): Observable<PageResultWordWithBorrowed> {

    return this.getAllWords1$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithBorrowed>) => r.body as PageResultWordWithBorrowed)
    );
  }

  /**
   * Path part for operation addEvolvedWord
   */
  static readonly AddEvolvedWordPath = '/api/evolve/words/evolve';

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEvolvedWord()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord$Response(params: {
    context?: HttpContext
    body: WordToEvolve
  }
): Observable<StrictHttpResponse<WordWithEvolution>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.AddEvolvedWordPath, 'post');
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
        return r as StrictHttpResponse<WordWithEvolution>;
      })
    );
  }

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addEvolvedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord(params: {
    context?: HttpContext
    body: WordToEvolve
  }
): Observable<WordWithEvolution> {

    return this.addEvolvedWord$Response(params).pipe(
      map((r: StrictHttpResponse<WordWithEvolution>) => r.body as WordWithEvolution)
    );
  }

  /**
   * Path part for operation addEvolvedWord1
   */
  static readonly AddEvolvedWord1Path = '/api/evolve/words/evolve/all';

  /**
   * Evolve all words.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEvolvedWord1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord1$Response(params: {
    context?: HttpContext
    body: Array<WordToEvolve>
  }
): Observable<StrictHttpResponse<Array<WordWithEvolution>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.AddEvolvedWord1Path, 'post');
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
        return r as StrictHttpResponse<Array<WordWithEvolution>>;
      })
    );
  }

  /**
   * Evolve all words.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addEvolvedWord1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord1(params: {
    context?: HttpContext
    body: Array<WordToEvolve>
  }
): Observable<Array<WordWithEvolution>> {

    return this.addEvolvedWord1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WordWithEvolution>>) => r.body as Array<WordWithEvolution>)
    );
  }

}
