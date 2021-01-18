/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LanguageName } from '../models/language-name';
import { TraceWordReq } from '../models/trace-word-req';
import { WordJSON } from '../models/word-json';
import { AddWordJSON } from '../models/add-word-json';
import { PartOfSpeech } from '../models/part-of-speech';
import { TranslationAPI } from '../models/translation-api';
import { AddWordTranslationJSON } from '../models/add-word-translation-json';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly getApiHelloPath = '/api/hello';
  static readonly getApiLangsPath = '/api/langs';
  static readonly postApiLangsTraceWordPath = '/api/langs/traceWord';
  static readonly getApiWordsLangLangPath = '/api/words/lang/{lang}';
  static readonly postApiWordsPath = '/api/words';
  static readonly getApiWordsPosPath = '/api/words/pos';
  static readonly getApiWordsWordPath = '/api/words/{word}';
  static readonly postApiWordsExistsPath = '/api/words/exists';
  static readonly getApiTranslationBywordkeyWordIdPath = '/api/translation/bywordkey/{wordId}';
  static readonly postApiTranslationPath = '/api/translation';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiHelloResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/hello`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }  getApiHello(): __Observable<string> {
    return this.getApiHelloResponse().pipe(
      __map(_r => _r.body as string)
    );
  }
  getApiLangsResponse(): __Observable<__StrictHttpResponse<Array<LanguageName>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/langs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<LanguageName>>;
      })
    );
  }  getApiLangs(): __Observable<Array<LanguageName>> {
    return this.getApiLangsResponse().pipe(
      __map(_r => _r.body as Array<LanguageName>)
    );
  }

  /**
   * @param body undefined
   */
  postApiLangsTraceWordResponse(body: TraceWordReq): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/langs/traceWord`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<string>>;
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiLangsTraceWord(body: TraceWordReq): __Observable<Array<string>> {
    return this.postApiLangsTraceWordResponse(body).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param lang undefined
   */
  getApiWordsLangLangResponse(lang: 'Aboleth' | 'Alko' | 'ClassicalArcane' | 'Dragon' | 'Dwarven' | 'Edhellen' | 'English' | 'Halfling' | 'Infernal' | 'Khuzdûl' | 'Kobold' | 'LizardFolk' | 'Necril' | 'Nerlendic' | 'Nitholan' | 'NitholanEmpire' | 'OldDragon' | 'OldNerlendic' | 'OldNitholan' | 'OldRunic' | 'Orkish' | 'PrimalMagic' | 'ProtoCreation' | 'ProtoDragon' | 'ProtoDwarven' | 'ProtoElven' | 'ProtoHuman' | 'ProtoMaterial' | 'ProtoMonster' | 'ProtoOrk' | 'ProtoTengu' | 'Queran' | 'SlaveRunic' | 'Sylvan' | 'Titan'): __Observable<__StrictHttpResponse<Array<WordJSON>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/words/lang/${encodeURIComponent(lang)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<WordJSON>>;
      })
    );
  }
  /**
   * @param lang undefined
   */
  getApiWordsLangLang(lang: 'Aboleth' | 'Alko' | 'ClassicalArcane' | 'Dragon' | 'Dwarven' | 'Edhellen' | 'English' | 'Halfling' | 'Infernal' | 'Khuzdûl' | 'Kobold' | 'LizardFolk' | 'Necril' | 'Nerlendic' | 'Nitholan' | 'NitholanEmpire' | 'OldDragon' | 'OldNerlendic' | 'OldNitholan' | 'OldRunic' | 'Orkish' | 'PrimalMagic' | 'ProtoCreation' | 'ProtoDragon' | 'ProtoDwarven' | 'ProtoElven' | 'ProtoHuman' | 'ProtoMaterial' | 'ProtoMonster' | 'ProtoOrk' | 'ProtoTengu' | 'Queran' | 'SlaveRunic' | 'Sylvan' | 'Titan'): __Observable<Array<WordJSON>> {
    return this.getApiWordsLangLangResponse(lang).pipe(
      __map(_r => _r.body as Array<WordJSON>)
    );
  }

  /**
   * @param body undefined
   */
  postApiWordsResponse(body: AddWordJSON): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/words`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiWords(body: AddWordJSON): __Observable<boolean> {
    return this.postApiWordsResponse(body).pipe(
      __map(_r => _r.body as boolean)
    );
  }
  getApiWordsPosResponse(): __Observable<__StrictHttpResponse<Array<PartOfSpeech>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/words/pos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PartOfSpeech>>;
      })
    );
  }  getApiWordsPos(): __Observable<Array<PartOfSpeech>> {
    return this.getApiWordsPosResponse().pipe(
      __map(_r => _r.body as Array<PartOfSpeech>)
    );
  }

  /**
   * @param params The `ApiService.GetApiWordsWordParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `lang`:
   */
  getApiWordsWordResponse(params: ApiService.GetApiWordsWordParams): __Observable<__StrictHttpResponse<Array<[WordJSON, Array<LanguageName>, Array<[TranslationAPI, LanguageName, WordJSON]>, Array<[[WordJSON, LanguageName], Array<[TranslationAPI, LanguageName, WordJSON]>]>]>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.lang != null) __params = __params.set('lang', params.lang.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/words/${encodeURIComponent(params.word)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<[WordJSON, Array<LanguageName>, Array<[TranslationAPI, LanguageName, WordJSON]>, Array<[[WordJSON, LanguageName], Array<[TranslationAPI, LanguageName, WordJSON]>]>]>>;
      })
    );
  }
  /**
   * @param params The `ApiService.GetApiWordsWordParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `lang`:
   */
  getApiWordsWord(params: ApiService.GetApiWordsWordParams): __Observable<Array<[WordJSON, Array<LanguageName>, Array<[TranslationAPI, LanguageName, WordJSON]>, Array<[[WordJSON, LanguageName], Array<[TranslationAPI, LanguageName, WordJSON]>]>]>> {
    return this.getApiWordsWordResponse(params).pipe(
      __map(_r => _r.body as Array<[WordJSON, Array<LanguageName>, Array<[TranslationAPI, LanguageName, WordJSON]>, Array<[[WordJSON, LanguageName], Array<[TranslationAPI, LanguageName, WordJSON]>]>]>)
    );
  }

  /**
   * @param body undefined
   */
  postApiWordsExistsResponse(body: AddWordJSON): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/words/exists`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiWordsExists(body: AddWordJSON): __Observable<boolean> {
    return this.postApiWordsExistsResponse(body).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * @param wordId undefined
   */
  getApiTranslationBywordkeyWordIdResponse(wordId: number): __Observable<__StrictHttpResponse<Array<[TranslationAPI, LanguageName, WordJSON]>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/translation/bywordkey/${encodeURIComponent(wordId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<[TranslationAPI, LanguageName, WordJSON]>>;
      })
    );
  }
  /**
   * @param wordId undefined
   */
  getApiTranslationBywordkeyWordId(wordId: number): __Observable<Array<[TranslationAPI, LanguageName, WordJSON]>> {
    return this.getApiTranslationBywordkeyWordIdResponse(wordId).pipe(
      __map(_r => _r.body as Array<[TranslationAPI, LanguageName, WordJSON]>)
    );
  }

  /**
   * @param body undefined
   */
  postApiTranslationResponse(body: AddWordTranslationJSON): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/translation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiTranslation(body: AddWordTranslationJSON): __Observable<boolean> {
    return this.postApiTranslationResponse(body).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module ApiService {

  /**
   * Parameters for getApiWordsWord
   */
  export interface GetApiWordsWordParams {
    word: string;
    lang?: 'Aboleth' | 'Alko' | 'ClassicalArcane' | 'Dragon' | 'Dwarven' | 'Edhellen' | 'English' | 'Halfling' | 'Infernal' | 'Khuzdûl' | 'Kobold' | 'LizardFolk' | 'Necril' | 'Nerlendic' | 'Nitholan' | 'NitholanEmpire' | 'OldDragon' | 'OldNerlendic' | 'OldNitholan' | 'OldRunic' | 'Orkish' | 'PrimalMagic' | 'ProtoCreation' | 'ProtoDragon' | 'ProtoDwarven' | 'ProtoElven' | 'ProtoHuman' | 'ProtoMaterial' | 'ProtoMonster' | 'ProtoOrk' | 'ProtoTengu' | 'Queran' | 'SlaveRunic' | 'Sylvan' | 'Titan';
  }
}

export { ApiService }
