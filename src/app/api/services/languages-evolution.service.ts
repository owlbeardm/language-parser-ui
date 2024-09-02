/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBorrowedWord } from '../fn/languages-evolution/add-borrowed-word';
import { AddBorrowedWord$Params } from '../fn/languages-evolution/add-borrowed-word';
import { addEvolvedWord } from '../fn/languages-evolution/add-evolved-word';
import { AddEvolvedWord$Params } from '../fn/languages-evolution/add-evolved-word';
import { addEvolvedWord1 } from '../fn/languages-evolution/add-evolved-word-1';
import { AddEvolvedWord1$Params } from '../fn/languages-evolution/add-evolved-word-1';
import { deleteConnectionByLangs } from '../fn/languages-evolution/delete-connection-by-langs';
import { DeleteConnectionByLangs$Params } from '../fn/languages-evolution/delete-connection-by-langs';
import { deleteSoundChange } from '../fn/languages-evolution/delete-sound-change';
import { DeleteSoundChange$Params } from '../fn/languages-evolution/delete-sound-change';
import { getAllLanguagesFrom } from '../fn/languages-evolution/get-all-languages-from';
import { GetAllLanguagesFrom$Params } from '../fn/languages-evolution/get-all-languages-from';
import { getAllRoutes } from '../fn/languages-evolution/get-all-routes';
import { GetAllRoutes$Params } from '../fn/languages-evolution/get-all-routes';
import { getAllWords1 } from '../fn/languages-evolution/get-all-words-1';
import { GetAllWords1$Params } from '../fn/languages-evolution/get-all-words-1';
import { getAllWordsWithEvolutions } from '../fn/languages-evolution/get-all-words-with-evolutions';
import { GetAllWordsWithEvolutions$Params } from '../fn/languages-evolution/get-all-words-with-evolutions';
import { getConnectionByLangs } from '../fn/languages-evolution/get-connection-by-langs';
import { GetConnectionByLangs$Params } from '../fn/languages-evolution/get-connection-by-langs';
import { getConnectionFromLang } from '../fn/languages-evolution/get-connection-from-lang';
import { GetConnectionFromLang$Params } from '../fn/languages-evolution/get-connection-from-lang';
import { getConnections } from '../fn/languages-evolution/get-connections';
import { GetConnections$Params } from '../fn/languages-evolution/get-connections';
import { getConnectionToLang } from '../fn/languages-evolution/get-connection-to-lang';
import { GetConnectionToLang$Params } from '../fn/languages-evolution/get-connection-to-lang';
import { getGrammaticalValueEvolution } from '../fn/languages-evolution/get-grammatical-value-evolution';
import { GetGrammaticalValueEvolution$Params } from '../fn/languages-evolution/get-grammatical-value-evolution';
import { getLanguageGraph } from '../fn/languages-evolution/get-language-graph';
import { GetLanguageGraph$Params } from '../fn/languages-evolution/get-language-graph';
import { getSoundChange } from '../fn/languages-evolution/get-sound-change';
import { GetSoundChange$Params } from '../fn/languages-evolution/get-sound-change';
import { getSoundChangeRaw } from '../fn/languages-evolution/get-sound-change-raw';
import { GetSoundChangeRaw$Params } from '../fn/languages-evolution/get-sound-change-raw';
import { getSoundChangesByLang } from '../fn/languages-evolution/get-sound-changes-by-lang';
import { GetSoundChangesByLang$Params } from '../fn/languages-evolution/get-sound-changes-by-lang';
import { getSoundChangesByLangs } from '../fn/languages-evolution/get-sound-changes-by-langs';
import { GetSoundChangesByLangs$Params } from '../fn/languages-evolution/get-sound-changes-by-langs';
import { getSoundChangesByRule } from '../fn/languages-evolution/get-sound-changes-by-rule';
import { GetSoundChangesByRule$Params } from '../fn/languages-evolution/get-sound-changes-by-rule';
import { getSoundChangesRawLinesByLang } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-lang';
import { GetSoundChangesRawLinesByLang$Params } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-lang';
import { getSoundChangesRawLinesByLangs } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-langs';
import { GetSoundChangesRawLinesByLangs$Params } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-langs';
import { getSoundChangesRawLinesByRule } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-rule';
import { GetSoundChangesRawLinesByRule$Params } from '../fn/languages-evolution/get-sound-changes-raw-lines-by-rule';
import { GrammaticalValueEvolution } from '../models/grammatical-value-evolution';
import { Language } from '../models/language';
import { LanguageConnection } from '../models/language-connection';
import { PageResultWordWithBorrowed } from '../models/page-result-word-with-borrowed';
import { PageResultWordWithEvolution } from '../models/page-result-word-with-evolution';
import { removeGrammaticalValueEvolution } from '../fn/languages-evolution/remove-grammatical-value-evolution';
import { RemoveGrammaticalValueEvolution$Params } from '../fn/languages-evolution/remove-grammatical-value-evolution';
import { saveGrammaticalValueEvolution } from '../fn/languages-evolution/save-grammatical-value-evolution';
import { SaveGrammaticalValueEvolution$Params } from '../fn/languages-evolution/save-grammatical-value-evolution';
import { saveSoundChangesRawLinesByLang } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-lang';
import { SaveSoundChangesRawLinesByLang$Params } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-lang';
import { saveSoundChangesRawLinesByLangs } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-langs';
import { SaveSoundChangesRawLinesByLangs$Params } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-langs';
import { saveSoundChangesRawLinesByRule } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-rule';
import { SaveSoundChangesRawLinesByRule$Params } from '../fn/languages-evolution/save-sound-changes-raw-lines-by-rule';
import { SoundChange } from '../models/sound-change';
import { trace } from '../fn/languages-evolution/trace';
import { Trace$Params } from '../fn/languages-evolution/trace';
import { updateConnectionByLangs } from '../fn/languages-evolution/update-connection-by-langs';
import { UpdateConnectionByLangs$Params } from '../fn/languages-evolution/update-connection-by-langs';
import { updateSoundChange } from '../fn/languages-evolution/update-sound-change';
import { UpdateSoundChange$Params } from '../fn/languages-evolution/update-sound-change';
import { WordTraceResult } from '../models/word-trace-result';
import { WordWithBorrowed } from '../models/word-with-borrowed';
import { WordWithEvolution } from '../models/word-with-evolution';


/**
 * Languages evolution related operations
 */
@Injectable({ providedIn: 'root' })
export class LanguagesEvolutionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllLanguagesFrom()` */
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
  getAllLanguagesFrom$Response(params: GetAllLanguagesFrom$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Language>>> {
    return getAllLanguagesFrom(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all languages to which path from the given language is possible.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLanguagesFrom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguagesFrom(params: GetAllLanguagesFrom$Params, context?: HttpContext): Observable<Array<Language>> {
    return this.getAllLanguagesFrom$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Language>>): Array<Language> => r.body)
    );
  }

  /** Path part for operation `getConnections()` */
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
  getConnections$Response(params?: GetConnections$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguageConnection>>> {
    return getConnections(this.http, this.rootUrl, params, context);
  }

  /**
   * Get connections.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getConnections$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnections(params?: GetConnections$Params, context?: HttpContext): Observable<Array<LanguageConnection>> {
    return this.getConnections$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>): Array<LanguageConnection> => r.body)
    );
  }

  /** Path part for operation `getConnectionFromLang()` */
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
  getConnectionFromLang$Response(params: GetConnectionFromLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguageConnection>>> {
    return getConnectionFromLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getConnectionFromLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionFromLang(params: GetConnectionFromLang$Params, context?: HttpContext): Observable<Array<LanguageConnection>> {
    return this.getConnectionFromLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>): Array<LanguageConnection> => r.body)
    );
  }

  /** Path part for operation `getConnectionToLang()` */
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
  getConnectionToLang$Response(params: GetConnectionToLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguageConnection>>> {
    return getConnectionToLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get connections from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getConnectionToLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionToLang(params: GetConnectionToLang$Params, context?: HttpContext): Observable<Array<LanguageConnection>> {
    return this.getConnectionToLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LanguageConnection>>): Array<LanguageConnection> => r.body)
    );
  }

  /** Path part for operation `getConnectionByLangs()` */
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
  getConnectionByLangs$Response(params: GetConnectionByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<LanguageConnection>> {
    return getConnectionByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Get connection between two languages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getConnectionByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConnectionByLangs(params: GetConnectionByLangs$Params, context?: HttpContext): Observable<LanguageConnection> {
    return this.getConnectionByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<LanguageConnection>): LanguageConnection => r.body)
    );
  }

  /** Path part for operation `updateConnectionByLangs()` */
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
  updateConnectionByLangs$Response(params: UpdateConnectionByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateConnectionByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Update connection between two languages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateConnectionByLangs$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateConnectionByLangs(params: UpdateConnectionByLangs$Params, context?: HttpContext): Observable<void> {
    return this.updateConnectionByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteConnectionByLangs()` */
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
  deleteConnectionByLangs$Response(params: DeleteConnectionByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteConnectionByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete connection between two languages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteConnectionByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteConnectionByLangs(params: DeleteConnectionByLangs$Params, context?: HttpContext): Observable<void> {
    return this.deleteConnectionByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `saveGrammaticalValueEvolution()` */
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
  saveGrammaticalValueEvolution$Response(params: SaveGrammaticalValueEvolution$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveGrammaticalValueEvolution(this.http, this.rootUrl, params, context);
  }

  /**
   * Save grammatical value evolution.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGrammaticalValueEvolution$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGrammaticalValueEvolution(params: SaveGrammaticalValueEvolution$Params, context?: HttpContext): Observable<number> {
    return this.saveGrammaticalValueEvolution$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `removeGrammaticalValueEvolution()` */
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
  removeGrammaticalValueEvolution$Response(params: RemoveGrammaticalValueEvolution$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeGrammaticalValueEvolution(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete grammatical value evolution.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeGrammaticalValueEvolution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeGrammaticalValueEvolution(params: RemoveGrammaticalValueEvolution$Params, context?: HttpContext): Observable<void> {
    return this.removeGrammaticalValueEvolution$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getGrammaticalValueEvolution()` */
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
  getGrammaticalValueEvolution$Response(params: GetGrammaticalValueEvolution$Params, context?: HttpContext): Observable<StrictHttpResponse<GrammaticalValueEvolution>> {
    return getGrammaticalValueEvolution(this.http, this.rootUrl, params, context);
  }

  /**
   * Get grammatical value evolution.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGrammaticalValueEvolution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGrammaticalValueEvolution(params: GetGrammaticalValueEvolution$Params, context?: HttpContext): Observable<GrammaticalValueEvolution> {
    return this.getGrammaticalValueEvolution$Response(params, context).pipe(
      map((r: StrictHttpResponse<GrammaticalValueEvolution>): GrammaticalValueEvolution => r.body)
    );
  }

  /** Path part for operation `getLanguageGraph()` */
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
  getLanguageGraph$Response(params?: GetLanguageGraph$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getLanguageGraph(this.http, this.rootUrl, params, context);
  }

  /**
   * Get language connection graph.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLanguageGraph$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLanguageGraph(params?: GetLanguageGraph$Params, context?: HttpContext): Observable<string> {
    return this.getLanguageGraph$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAllRoutes()` */
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
  getAllRoutes$Response(params: GetAllRoutes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<Language>>>> {
    return getAllRoutes(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all routes from language to other given language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoutes(params: GetAllRoutes$Params, context?: HttpContext): Observable<Array<Array<Language>>> {
    return this.getAllRoutes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Array<Language>>>): Array<Array<Language>> => r.body)
    );
  }

  /** Path part for operation `getSoundChangesByLang()` */
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
  getSoundChangesByLang$Response(params: GetSoundChangesByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SoundChange>>> {
    return getSoundChangesByLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLang(params: GetSoundChangesByLang$Params, context?: HttpContext): Observable<Array<SoundChange>> {
    return this.getSoundChangesByLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>): Array<SoundChange> => r.body)
    );
  }

  /** Path part for operation `getSoundChangesByLangs()` */
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
  getSoundChangesByLangs$Response(params: GetSoundChangesByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SoundChange>>> {
    return getSoundChangesByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByLangs(params: GetSoundChangesByLangs$Params, context?: HttpContext): Observable<Array<SoundChange>> {
    return this.getSoundChangesByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>): Array<SoundChange> => r.body)
    );
  }

  /** Path part for operation `getSoundChangesRawLinesByLang()` */
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
  getSoundChangesRawLinesByLang$Response(params: GetSoundChangesRawLinesByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getSoundChangesRawLinesByLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByLang$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLang(params: GetSoundChangesRawLinesByLang$Params, context?: HttpContext): Observable<string> {
    return this.getSoundChangesRawLinesByLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `saveSoundChangesRawLinesByLang()` */
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
  saveSoundChangesRawLinesByLang$Response(params: SaveSoundChangesRawLinesByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveSoundChangesRawLinesByLang(this.http, this.rootUrl, params, context);
  }

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByLang$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLang(params: SaveSoundChangesRawLinesByLang$Params, context?: HttpContext): Observable<void> {
    return this.saveSoundChangesRawLinesByLang$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getSoundChangesRawLinesByLangs()` */
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
  getSoundChangesRawLinesByLangs$Response(params: GetSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getSoundChangesRawLinesByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByLangs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByLangs(params: GetSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<string> {
    return this.getSoundChangesRawLinesByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `saveSoundChangesRawLinesByLangs()` */
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
  saveSoundChangesRawLinesByLangs$Response(params: SaveSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveSoundChangesRawLinesByLangs(this.http, this.rootUrl, params, context);
  }

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByLangs$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByLangs(params: SaveSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<void> {
    return this.saveSoundChangesRawLinesByLangs$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getSoundChangesRawLinesByRule()` */
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
  getSoundChangesRawLinesByRule$Response(params: GetSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getSoundChangesRawLinesByRule(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes in text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesRawLinesByRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesRawLinesByRule(params: GetSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<string> {
    return this.getSoundChangesRawLinesByRule$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `saveSoundChangesRawLinesByRule()` */
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
  saveSoundChangesRawLinesByRule$Response(params: SaveSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveSoundChangesRawLinesByRule(this.http, this.rootUrl, params, context);
  }

  /**
   * Save all sound changes from text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSoundChangesRawLinesByRule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSoundChangesRawLinesByRule(params: SaveSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<void> {
    return this.saveSoundChangesRawLinesByRule$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getSoundChangeRaw()` */
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
  getSoundChangeRaw$Response(params: GetSoundChangeRaw$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getSoundChangeRaw(this.http, this.rootUrl, params, context);
  }

  /**
   * Get sound change raw.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangeRaw$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangeRaw(params: GetSoundChangeRaw$Params, context?: HttpContext): Observable<string> {
    return this.getSoundChangeRaw$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `updateSoundChange()` */
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
  updateSoundChange$Response(params: UpdateSoundChange$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateSoundChange(this.http, this.rootUrl, params, context);
  }

  /**
   * Update sound change from text form.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateSoundChange$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSoundChange(params: UpdateSoundChange$Params, context?: HttpContext): Observable<void> {
    return this.updateSoundChange$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getSoundChangesByRule()` */
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
  getSoundChangesByRule$Response(params: GetSoundChangesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SoundChange>>> {
    return getSoundChangesByRule(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all sound changes.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChangesByRule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChangesByRule(params: GetSoundChangesByRule$Params, context?: HttpContext): Observable<Array<SoundChange>> {
    return this.getSoundChangesByRule$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SoundChange>>): Array<SoundChange> => r.body)
    );
  }

  /** Path part for operation `getSoundChange()` */
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
  getSoundChange$Response(params: GetSoundChange$Params, context?: HttpContext): Observable<StrictHttpResponse<SoundChange>> {
    return getSoundChange(this.http, this.rootUrl, params, context);
  }

  /**
   * Get sound change.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSoundChange$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSoundChange(params: GetSoundChange$Params, context?: HttpContext): Observable<SoundChange> {
    return this.getSoundChange$Response(params, context).pipe(
      map((r: StrictHttpResponse<SoundChange>): SoundChange => r.body)
    );
  }

  /** Path part for operation `deleteSoundChange()` */
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
  deleteSoundChange$Response(params: DeleteSoundChange$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteSoundChange(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete sound change.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSoundChange$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSoundChange(params: DeleteSoundChange$Params, context?: HttpContext): Observable<void> {
    return this.deleteSoundChange$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `trace()` */
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
  trace$Response(params: Trace$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WordTraceResult>>> {
    return trace(this.http, this.rootUrl, params, context);
  }

  /**
   * Trace word changes by list of languages.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `trace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trace(params: Trace$Params, context?: HttpContext): Observable<Array<WordTraceResult>> {
    return this.trace$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WordTraceResult>>): Array<WordTraceResult> => r.body)
    );
  }

  /** Path part for operation `getAllWordsWithEvolutions()` */
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
  getAllWordsWithEvolutions$Response(params: GetAllWordsWithEvolutions$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithEvolution>> {
    return getAllWordsWithEvolutions(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all words with evolutions.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWordsWithEvolutions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWordsWithEvolutions(params: GetAllWordsWithEvolutions$Params, context?: HttpContext): Observable<PageResultWordWithEvolution> {
    return this.getAllWordsWithEvolutions$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResultWordWithEvolution>): PageResultWordWithEvolution => r.body)
    );
  }

  /** Path part for operation `addBorrowedWord()` */
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
  addBorrowedWord$Response(params: AddBorrowedWord$Params, context?: HttpContext): Observable<StrictHttpResponse<WordWithBorrowed>> {
    return addBorrowedWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBorrowedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBorrowedWord(params: AddBorrowedWord$Params, context?: HttpContext): Observable<WordWithBorrowed> {
    return this.addBorrowedWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<WordWithBorrowed>): WordWithBorrowed => r.body)
    );
  }

  /** Path part for operation `getAllWords1()` */
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
  getAllWords1$Response(params: GetAllWords1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResultWordWithBorrowed>> {
    return getAllWords1(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all words.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWords1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWords1(params: GetAllWords1$Params, context?: HttpContext): Observable<PageResultWordWithBorrowed> {
    return this.getAllWords1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResultWordWithBorrowed>): PageResultWordWithBorrowed => r.body)
    );
  }

  /** Path part for operation `addEvolvedWord()` */
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
  addEvolvedWord$Response(params: AddEvolvedWord$Params, context?: HttpContext): Observable<StrictHttpResponse<WordWithEvolution>> {
    return addEvolvedWord(this.http, this.rootUrl, params, context);
  }

  /**
   * Evolve word.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEvolvedWord$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord(params: AddEvolvedWord$Params, context?: HttpContext): Observable<WordWithEvolution> {
    return this.addEvolvedWord$Response(params, context).pipe(
      map((r: StrictHttpResponse<WordWithEvolution>): WordWithEvolution => r.body)
    );
  }

  /** Path part for operation `addEvolvedWord1()` */
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
  addEvolvedWord1$Response(params: AddEvolvedWord1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WordWithEvolution>>> {
    return addEvolvedWord1(this.http, this.rootUrl, params, context);
  }

  /**
   * Evolve all words.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEvolvedWord1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEvolvedWord1(params: AddEvolvedWord1$Params, context?: HttpContext): Observable<Array<WordWithEvolution>> {
    return this.addEvolvedWord1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WordWithEvolution>>): Array<WordWithEvolution> => r.body)
    );
  }

}
