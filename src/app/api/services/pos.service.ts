/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLanguagePos } from '../fn/pos/delete-language-pos';
import { DeleteLanguagePos$Params } from '../fn/pos/delete-language-pos';
import { getAllPos } from '../fn/pos/get-all-pos';
import { GetAllPos$Params } from '../fn/pos/get-all-pos';
import { getAllPosByLanguage } from '../fn/pos/get-all-pos-by-language';
import { GetAllPosByLanguage$Params } from '../fn/pos/get-all-pos-by-language';
import { getPosByLanguage } from '../fn/pos/get-pos-by-language';
import { GetPosByLanguage$Params } from '../fn/pos/get-pos-by-language';
import { LanguagePos } from '../models/language-pos';
import { Pos } from '../models/pos';
import { saveLanguagePos } from '../fn/pos/save-language-pos';
import { SaveLanguagePos$Params } from '../fn/pos/save-language-pos';
import { savePos } from '../fn/pos/save-pos';
import { SavePos$Params } from '../fn/pos/save-pos';


/**
 * Parts of speech related operations
 */
@Injectable({ providedIn: 'root' })
export class PosService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllPos()` */
  static readonly GetAllPosPath = '/api/pos';

  /**
   * Get all parts of speech.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPos$Response(params?: GetAllPos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pos>>> {
    return getAllPos(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all parts of speech.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPos(params?: GetAllPos$Params, context?: HttpContext): Observable<Array<Pos>> {
    return this.getAllPos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Pos>>): Array<Pos> => r.body)
    );
  }

  /** Path part for operation `savePos()` */
  static readonly SavePosPath = '/api/pos';

  /**
   * Add new part of speech.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePos$Response(params: SavePos$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePos(this.http, this.rootUrl, params, context);
  }

  /**
   * Add new part of speech.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePos(params: SavePos$Params, context?: HttpContext): Observable<number> {
    return this.savePos$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllPosByLanguage()` */
  static readonly GetAllPosByLanguagePath = '/api/pos/language/{languageId}';

  /**
   * Get all parts of speech by language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPosByLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPosByLanguage$Response(params: GetAllPosByLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Pos>>> {
    return getAllPosByLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all parts of speech by language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPosByLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPosByLanguage(params: GetAllPosByLanguage$Params, context?: HttpContext): Observable<Array<Pos>> {
    return this.getAllPosByLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Pos>>): Array<Pos> => r.body)
    );
  }

  /** Path part for operation `saveLanguagePos()` */
  static readonly SaveLanguagePosPath = '/api/pos/languagepos';

  /**
   * Add pos to language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLanguagePos()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePos$Response(params: SaveLanguagePos$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveLanguagePos(this.http, this.rootUrl, params, context);
  }

  /**
   * Add pos to language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLanguagePos$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLanguagePos(params: SaveLanguagePos$Params, context?: HttpContext): Observable<number> {
    return this.saveLanguagePos$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteLanguagePos()` */
  static readonly DeleteLanguagePosPath = '/api/pos/languagepos/{id}';

  /**
   * Delete pos from language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLanguagePos()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePos$Response(params: DeleteLanguagePos$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLanguagePos(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete pos from language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLanguagePos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLanguagePos(params: DeleteLanguagePos$Params, context?: HttpContext): Observable<void> {
    return this.deleteLanguagePos$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getPosByLanguage()` */
  static readonly GetPosByLanguagePath = '/api/pos/languagepos/{languageId}';

  /**
   * Get pos by language.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosByLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosByLanguage$Response(params: GetPosByLanguage$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LanguagePos>>> {
    return getPosByLanguage(this.http, this.rootUrl, params, context);
  }

  /**
   * Get pos by language.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPosByLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosByLanguage(params: GetPosByLanguage$Params, context?: HttpContext): Observable<Array<LanguagePos>> {
    return this.getPosByLanguage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LanguagePos>>): Array<LanguagePos> => r.body)
    );
  }

}
