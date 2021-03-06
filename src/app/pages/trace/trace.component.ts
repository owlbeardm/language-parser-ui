import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LanguageName, TraceWordReq } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { TraceWordForm } from 'src/app/models/trace-word-req';
import { ErrorService } from 'src/app/services/error.service';
import { KeyBindService } from 'src/app/services/key-bind.service';
import { LangService } from 'src/app/services/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  @ViewChild('wordInput') wordInput: any;

  wordText: String = "";
  langs: LanguageName[];
  words: WordLang[];
  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private langService: LangService,
    private errorService: ErrorService,
    private keybind: KeyBindService,
    private router: Router) {
    this.words = [];
    this.langs = [];
    this.apiService = apiService;
    this.checkoutForm = this.formBuilder.group({
      wordText: '',
      langs: ''
    });
    const binding$ = this.keybind.match(["T"], ['altKey']).subscribe(() => {
      this.wordInput ?.nativeElement.focus();
    });
  }

  ngOnInit(): void {

  }

  submit(traceData: TraceWordForm) {
    // this.checkoutForm.reset();
    console.log(traceData);
    // return;
    const langs = traceData.langs.split(",").map((lang) => lang.trim());
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
      this.words = words.map((wrd, i) => { return { lang: langs[i], word: wrd } });
    })
  }

  titanToQueran() {
    this.setLangs("Titan,SlaveRunic,ProtoHuman,Queran")
  }

  titanToNitholan() {
    this.setLangs("Titan,SlaveRunic,ProtoHuman,Queran,NitholanEmpire,OldNitholan,Nitholan")
  }

  queranToNitholan() {
    this.setLangs("Queran,NitholanEmpire,OldNitholan,Nitholan")
  }

  setLangs(langs: String) {
    this.checkoutForm.setValue({
      wordText: this.checkoutForm.getRawValue().wordText,
      langs: langs
    });
    this.wordInput ?.nativeElement.focus();
  }

  addWord(wl: WordLang) {
    if (this.langService.isValidLanguageName(wl.lang)) {
      this.langService.changeSelectedLanguage(wl.lang);
      this.router.navigate(['/words/list', { newWordText: wl.word }]);
    }
  }
}

interface WordLang {
  word: string;
  lang: string;
}
