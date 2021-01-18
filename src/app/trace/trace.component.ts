import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { LanguageName, TraceWordReq } from '../api/models';
import { ApiService } from '../api/services';
import { TraceWordForm } from '../models/trace-word-req';
import { ErrorService } from '../services/error.service';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  wordText: String = "";
  langs: LanguageName[];
  words: String[];
  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private langService: LangService,
    private errorService: ErrorService) {
    this.words = [""];
    this.langs = [];
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
    const langs = traceData.langs.split(",").map((lang) => lang.trim().toUpperCase());
    if (!this.langService.isValidLanguageNameSequence(langs)) {
      this.errorService.addError({
        message: `Wrong language name in post trace word.`,
        details: `Lang names: ${langs
          .filter((lang) => !this.langService.isValidLanguageName(lang))
          .reduce((p, c, i) => `${p}${i > 0 ? ', ' : ''}${c}`)}.`
      });
      throw Error('Invalid LanguageName sequence');
    }
    this.langs = langs;
    this.wordText = traceData.wordText.trim();
    const req: TraceWordReq = { langs: this.langs, wordTrace: this.wordText.toString() };
    this.apiService.postApiLangsTraceWord(req).subscribe((words) => {
      this.words = words;
    })
  }
}
