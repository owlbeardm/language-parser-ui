/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface GetSoundChangesRawLinesByLangs$Params {
  soundChangePurpose: SoundChangePurpose;
  fromLangId: number;
  toLangId: number;
}

export function getSoundChangesRawLinesByLangs(http: HttpClient, rootUrl: string, params: GetSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getSoundChangesRawLinesByLangs.PATH, 'get');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('fromLangId', params.fromLangId, {});
    rb.path('toLangId', params.toLangId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

getSoundChangesRawLinesByLangs.PATH = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}/{toLangId}';
