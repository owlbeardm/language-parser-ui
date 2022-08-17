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

import { Language } from '../models/language';
import { LanguageConnection } from '../models/language-connection';
import { LanguageConnectionTypeModel } from '../models/language-connection-type-model';
import { PageResultWordWithEvolution } from '../models/page-result-word-with-evolution';
import { SoundChange } from '../models/sound-change';
import { SoundChangePurpose } from '../models/sound-change-purpose';
import { WordToEvolve } from '../models/word-to-evolve';
import { WordTraceResult } from '../models/word-trace-result';
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
  }): Observable<StrictHttpResponse<Array<Language>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllLanguagesFromPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<Language>> {

    return this.getAllLanguagesFrom$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Language>>) => r.body as Array<Language>)
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
  }): Observable<StrictHttpResponse<Array<LanguageConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionFromLangPath, 'get');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<LanguageConnection>> {

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
  }): Observable<StrictHttpResponse<Array<LanguageConnection>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionToLangPath, 'get');
    if (params) {
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<LanguageConnection>> {

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
  }): Observable<StrictHttpResponse<LanguageConnection>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetConnectionByLangsPath, 'get');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<LanguageConnection> {

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
    body: LanguageConnectionTypeModel
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.UpdateConnectionByLangsPath, 'post');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
      rb.body(params.body, 'application/json');
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
    body: LanguageConnectionTypeModel
  }): Observable<void> {

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.DeleteConnectionByLangsPath, 'delete');
    if (params) {
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
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
  }): Observable<void> {

    return this.deleteConnectionByLangs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetLanguageGraphPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<string> {

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
  }): Observable<StrictHttpResponse<Array<Array<Language>>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllRoutesPath, 'get');
    if (params) {
      rb.path('fromId', params.fromId, {});
      rb.path('toId', params.toId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<Array<Language>>> {

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
  }): Observable<StrictHttpResponse<Array<SoundChange>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesByLangPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<SoundChange>> {

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
  }): Observable<StrictHttpResponse<Array<SoundChange>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesByLangsPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<Array<SoundChange>> {

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
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesRawLinesByLangPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
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
  }): Observable<string> {

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
    body: string
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveSoundChangesRawLinesByLangPath, 'post');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.body(params.body, 'application/json');
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
    body: string
  }): Observable<void> {

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
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangesRawLinesByLangsPath, 'get');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
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
  }): Observable<string> {

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
    body: string
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.SaveSoundChangesRawLinesByLangsPath, 'post');
    if (params) {
      rb.path('soundChangePurpose', params.soundChangePurpose, {});
      rb.path('fromLangId', params.fromLangId, {});
      rb.path('toLangId', params.toLangId, {});
      rb.body(params.body, 'application/json');
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
    body: string
  }): Observable<void> {

    return this.saveSoundChangesRawLinesByLangs$Response(params).pipe(
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
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangeRawPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
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
  }): Observable<string> {

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
    body: string
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.UpdateSoundChangePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
    body: string
  }): Observable<void> {

    return this.updateSoundChange$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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
  }): Observable<StrictHttpResponse<SoundChange>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetSoundChangePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<SoundChange> {

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.DeleteSoundChangePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
  }): Observable<void> {

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
    body: Array<Language>
  }): Observable<StrictHttpResponse<Array<WordTraceResult>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.TracePath, 'post');
    if (params) {
      rb.path('word', params.word, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: Array<Language>
  }): Observable<Array<WordTraceResult>> {

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
  }): Observable<StrictHttpResponse<PageResultWordWithEvolution>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.GetAllWordsWithEvolutionsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
  }): Observable<PageResultWordWithEvolution> {

    return this.getAllWordsWithEvolutions$Response(params).pipe(
      map((r: StrictHttpResponse<PageResultWordWithEvolution>) => r.body as PageResultWordWithEvolution)
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
    body: WordToEvolve
  }): Observable<StrictHttpResponse<WordWithEvolution>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.AddEvolvedWordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: WordToEvolve
  }): Observable<WordWithEvolution> {

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
    body: Array<WordToEvolve>
  }): Observable<StrictHttpResponse<Array<WordWithEvolution>>> {

    const rb = new RequestBuilder(this.rootUrl, LanguagesEvolutionService.AddEvolvedWord1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
    body: Array<WordToEvolve>
  }): Observable<Array<WordWithEvolution>> {

    return this.addEvolvedWord1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WordWithEvolution>>) => r.body as Array<WordWithEvolution>)
    );
  }

}
