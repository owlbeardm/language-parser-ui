import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TraceWordReq } from './models/trace-word-req';
import { WordDescriptionAPI } from './models/word';
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

  getWords(word: String, lang: String): Observable<WordDescriptionAPI[]> {
    const url = `http://api.lang.lo/api/words/${word}`;
    const langQ = lang?`?lang=${lang}`:"";
    return this.http.get<WordDescriptionAPI[]>(url+langQ, this.httpOptions);
  }
}
