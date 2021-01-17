import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TraceWordReq, TraceWordForm } from '../models/trace-word-req';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  wordText: String = "";
  langs: String[];
  words: String[];
  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService:ApiService) {
    this.words = [""];
    this.langs = [""];
    this.apiService = apiService;
    this.checkoutForm = this.formBuilder.group({
      wordText: '',
      langs: ''
    });
  }

  ngOnInit(): void {

  }

  submit(traceData: TraceWordForm) {
    // this.checkoutForm.reset();
    console.log(traceData);
    this.langs = traceData.langs.split(",").map((lang: String) => { return new String(lang.trim()) });
    this.wordText = traceData.wordText.trim();
    // window.alert(`${this.wordText} in ${this.langs} langs`);
    const req: TraceWordReq = { langs: this.langs, wordTrace: this.wordText };
    this.apiService.traceWords(req).subscribe((words) => {
      this.words = words;
    })
  }
}
