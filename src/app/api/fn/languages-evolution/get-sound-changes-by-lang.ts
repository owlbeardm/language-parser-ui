/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChange } from '../../models/sound-change';
import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface GetSoundChangesByLang$Params {
  soundChangePurpose: SoundChangePurpose;
  fromLangId: number;
}

export function getSoundChangesByLang(http: HttpClient, rootUrl: string, params: GetSoundChangesByLang$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SoundChange>>> {
  const rb = new RequestBuilder(rootUrl, getSoundChangesByLang.PATH, 'get');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('fromLangId', params.fromLangId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SoundChange>>;
    })
  );
}

getSoundChangesByLang.PATH = '/api/evolve/sc/lang/{soundChangePurpose}/{fromLangId}';
