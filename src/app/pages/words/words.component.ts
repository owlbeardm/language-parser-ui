import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LanguageName } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent extends AbstractHasLanguage {

  words: any;
  word: string;
  loadingWords: Boolean;

  constructor(private apiService: ApiService,
    _langService: LangService,
    private route: ActivatedRoute,
    _router: Router) {
    super(_langService, route, _router);
    this.apiService = apiService;
    this.words = [];
    this.word = "";
    this.loadingWords = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.word = String(this.route.snapshot.paramMap.get('word'));
  }

  changeLang(): void {
    super.changeLang(this.selectedLanguage);
  }

  refreshAll(): void {
    this.loadingWords = true;
    const param: ApiService.GetApiWordsWordParams = { word: this.word };
    if (this.selectedLanguage) {
      param["lang"] = this.selectedLanguage;
    }
    this.apiService.getApiWordsWord(param).subscribe((words) => {
      this.words = words;
      this.loadingWords = false;
    });
  }
}
