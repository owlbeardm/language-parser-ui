/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChange } from '../../models/sound-change';
import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface GetSoundChangesByRule$Params {
  soundChangePurpose: SoundChangePurpose;
  ruleId: number;
}

export function getSoundChangesByRule(http: HttpClient, rootUrl: string, params: GetSoundChangesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SoundChange>>> {
  const rb = new RequestBuilder(rootUrl, getSoundChangesByRule.PATH, 'get');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('ruleId', params.ruleId, {});
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

getSoundChangesByRule.PATH = '/api/evolve/sc/rule/{soundChangePurpose}/{ruleId}';
