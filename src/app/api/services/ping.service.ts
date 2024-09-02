/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ping } from '../fn/ping/ping';
import { Ping$Params } from '../fn/ping/ping';
import { setUserClaims } from '../fn/ping/set-user-claims';
import { SetUserClaims$Params } from '../fn/ping/set-user-claims';
import { version } from '../fn/ping/version';
import { Version$Params } from '../fn/ping/version';


/**
 * Ping service
 */
@Injectable({ providedIn: 'root' })
export class PingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `ping()` */
  static readonly PingPath = '/api/ping';

  /**
   * Ping.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ping()` instead.
   *
   * This method doesn't expect any request body.
   */
  ping$Response(params?: Ping$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return ping(this.http, this.rootUrl, params, context);
  }

  /**
   * Ping.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ping$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ping(params?: Ping$Params, context?: HttpContext): Observable<string> {
    return this.ping$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setUserClaims()` */
  static readonly SetUserClaimsPath = '/api/ping/user-claims/{uid}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setUserClaims()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setUserClaims$Response(params: SetUserClaims$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return setUserClaims(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setUserClaims$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setUserClaims(params: SetUserClaims$Params, context?: HttpContext): Observable<void> {
    return this.setUserClaims$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `version()` */
  static readonly VersionPath = '/api/ping/version';

  /**
   * Version.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `version()` instead.
   *
   * This method doesn't expect any request body.
   */
  version$Response(params?: Version$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return version(this.http, this.rootUrl, params, context);
  }

  /**
   * Version.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `version$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  version(params?: Version$Params, context?: HttpContext): Observable<string> {
    return this.version$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
