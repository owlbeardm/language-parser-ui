/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SoundChangePurpose } from '../../models/sound-change-purpose';

export interface SaveSoundChangesRawLinesByLangs$Params {
  soundChangePurpose: SoundChangePurpose;
  fromLangId: number;
  toLangId: number;
      body: string
}

export function saveSoundChangesRawLinesByLangs(http: HttpClient, rootUrl: string, params: SaveSoundChangesRawLinesByLangs$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, saveSoundChangesRawLinesByLangs.PATH, 'post');
  if (params) {
    rb.path('soundChangePurpose', params.soundChangePurpose, {});
    rb.path('fromLangId', params.fromLangId, {});
    rb.path('toLangId', params.toLangId, {});
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

saveSoundChangesRawLinesByLangs.PATH = '/api/evolve/sc/raw/lang/{soundChangePurpose}/{fromLangId}/{toLangId}';
