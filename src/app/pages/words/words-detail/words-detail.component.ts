import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//TODO: add new api
// import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-words',
  templateUrl: './words-detail.component.html',
  styleUrls: ['./words-detail.component.css']
})
export class WordsDetailComponent extends AbstractHasLanguage {

  words: any;
  word: string;
  loadingWords: Boolean;

  constructor(
    // private apiService: ApiService,
    _langService: LangService,
    private route: ActivatedRoute,
    _router: Router) {
    super(_langService, route, _router);
    // this.apiService = apiService;
    this.words = [];
    this.word = "";
    this.loadingWords = true;
  }

  ngOnInit(): void {
    this.word = String(this.route.snapshot.paramMap.get('word'));
    super.ngOnInit();
  }

  changeLang(): void {
    // super.changeLang(this.selectedLanguage);
  }

  refreshAll(): void {
    this.loadingWords = true;
    // const param: ApiService.GetApiWordsWordParams = { word: this.word };
    // if (this.selectedLanguage) {
    //   param["lang"] = this.selectedLanguage;
    // }
    // this.apiService.getApiWordsWord(param).subscribe((words:any) => {
    //   this.words = words;
    //   this.loadingWords = false;
    // });
  }
}
