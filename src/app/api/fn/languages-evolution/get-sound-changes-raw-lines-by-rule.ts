/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface GetSoundChangesRawLinesByRule$Params {
  soundChangePurpose: SoundChangePurpose;
  declensionId: number;
}

export function getSoundChangesRawLinesByRule(http: HttpClient, rootUrl: string, params: GetSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getSoundChangesRawLinesByRule.PATH, 'get');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('declensionId', params.declensionId, {});
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

getSoundChangesRawLinesByRule.PATH = '/api/evolve/sc/raw/rule/{soundChangePurpose}/{declensionId}';
