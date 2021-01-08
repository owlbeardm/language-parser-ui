import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TraceWordReq, TraceWordForm } from './trace-word-req';
import { catchError, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  checkoutForm;
  wordText: String = "";
  langs: String[];
  words: String[];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,) {
    this.words = [""];
    this.langs = [""];
    this.http = http;
    this.checkoutForm = this.formBuilder.group({
      wordText: '',
      langs: ''
    });
  }

  ngOnInit(): void {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET heroes from the server */
  getHeroes(req: TraceWordReq): Observable<String[]> {
    const url = "http://localhost:8000/api/langs/traceWord";
    return this.http.post<String[]>(url, req, this.httpOptions);
  }

  submit(traceData: TraceWordForm) {
    // this.checkoutForm.reset();
    console.log(traceData);
    this.langs = traceData.langs.split(",").map((lang: String) => { return new String(lang.trim()) });
    this.wordText = traceData.wordText.trim();
    window.alert(`${this.wordText} in ${this.langs} langs`);
    const req: TraceWordReq = { langs: this.langs, wordText: this.wordText };
    this.getHeroes(req).subscribe((words) => {
      this.words = words;
    })

  }
}
