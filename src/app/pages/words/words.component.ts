import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LanguageName } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: any;
  word: string;
  selectedLanguage?: LanguageName;
  loadingWords: Boolean;

  constructor(private apiService: ApiService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router) {

    this.apiService = apiService;
    this.words = [];
    // this.langs = ["Titan", "SlaveRunic", "ProtoHuman", "Queran", "NitholanEmpire", "OldNitholan", "Nitholan"];
    this.word = "";
    this.loadingWords = true;
  }

  ngOnInit(): void {
    this.word = String(this.route.snapshot.paramMap.get('word'));
    const lang = this.route.snapshot.queryParamMap.get('lang');
    if (lang && this.langService.isValidLanguageName(lang)) {
      this.selectedLanguage = lang;
    } else {
      this.router.navigate([], {
        queryParams: {},
        relativeTo: this.route
      });
    }
    this.refresh();
  }

  changeLang(): void {
    this.router.navigate([], {
      queryParams: this.selectedLanguage ? { lang: this.selectedLanguage } : {},
      relativeTo: this.route
    });
    this.refresh();
  }

  refresh(): void {
    this.loadingWords = true;
    const param : ApiService.GetApiWordsWordParams = { word: this.word } ;
    if(this.selectedLanguage){
      param["lang"] = this.selectedLanguage;
    }
    this.apiService.getApiWordsWord(param).subscribe((words) => {
      this.words = words;
      this.loadingWords = false;
    });
  }
}
