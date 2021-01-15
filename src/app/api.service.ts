import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TraceWordReq } from './models/trace-word-req';
import { WordDescriptionAPI, Language, Word, WordTranslation } from './models/word';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) {
    this.http = http;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  traceWords(req: TraceWordReq): Observable<String[]> {
    const url = "http://api.lang.lo/api/langs/traceWord";
    return this.http.post<String[]>(url, req, this.httpOptions);
  }

  getWord(word: String, lang: String): Observable<WordDescriptionAPI[]> {
    const url = `http://api.lang.lo/api/words/${word}`;
    const langQ = lang ? `?lang=${lang}` : "";
    return this.http.get<WordDescriptionAPI[]>(url + langQ, this.httpOptions);
  }

  getWordsByLang(lang: String): Observable<Word[]> {
    const url = `http://api.lang.lo/api/words/lang/${lang}`;
    return this.http.get<Word[]>(url, this.httpOptions);
  }

  getTranslationsByWordKey(key: number): Observable<WordTranslation[]> {
    const url = `http://api.lang.lo/api/translation/bywordkey/${key}`;
    return this.http.get<WordTranslation[]>(url, this.httpOptions);
  }

  getLanguages(): Observable<Language[]> {
    const url = `http://api.lang.lo/api/langs`;
    return this.http.get<Language[]>(url, this.httpOptions);
  }
}
