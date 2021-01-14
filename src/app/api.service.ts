import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TraceWordReq } from './models/trace-word-req';
import { Word } from './models/word';
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

  getWords(word: String, lang: String): Observable<Word[]> {
    const url = `http://api.lang.lo/api/words/traceWord${word}` + lang?`?lang=${lang}`:"";
    return this.http.get<Word[]>(url, this.httpOptions);
  }
}
