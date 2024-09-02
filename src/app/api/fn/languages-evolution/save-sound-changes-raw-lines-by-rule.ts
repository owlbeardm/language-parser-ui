/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface SaveSoundChangesRawLinesByRule$Params {
  soundChangePurpose: SoundChangePurpose;
  declensionId: number;
      body: string
}

export function saveSoundChangesRawLinesByRule(http: HttpClient, rootUrl: string, params: SaveSoundChangesRawLinesByRule$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, saveSoundChangesRawLinesByRule.PATH, 'post');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('declensionId', params.declensionId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

saveSoundChangesRawLinesByRule.PATH = '/api/evolve/sc/raw/rule/{soundChangePurpose}/{declensionId}';
