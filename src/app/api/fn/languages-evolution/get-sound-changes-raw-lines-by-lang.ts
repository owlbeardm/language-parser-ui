/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface GetSoundChangesRawLinesByLang$Params {
  soundChangePurpose: SoundChangePurpose;
  fromLangId: number;
}

export function getSoundChangesRawLinesByLang(http: HttpClient, rootUrl: string, params: GetSoundChangesRawLinesByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getSoundChangesRawLinesByLang.PATH, 'get');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('fromLangId', params.fromLangId, {});
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

getSoundChangesRawLinesByLang.PATH = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}';
