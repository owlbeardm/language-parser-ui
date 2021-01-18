import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LanguageName } from '../api/models';
import { ApiService } from '../api/services';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: any;
  word: string;
  langs: LanguageName[];
  selectedLanguage: String;
  loadingPage: Boolean;
  loadingWords: Boolean;

  constructor(private apiService: ApiService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router) {

    this.apiService = apiService;
    this.words = [];
    // this.langs = ["Titan", "SlaveRunic", "ProtoHuman", "Queran", "NitholanEmpire", "OldNitholan", "Nitholan"];
    this.langs = [];
    this.selectedLanguage = "";
    this.word = "";
    this.loadingPage = true;
    this.loadingWords = true;
  }

  ngOnInit(): void {
    this.word = String(this.route.snapshot.paramMap.get('word'));
    const lang = this.route.snapshot.queryParamMap.get('lang');
    this.apiService.getApiLangs().subscribe((langs) => {
      this.langs = langs;
      if (lang && this.langService.isValidLanguageName(lang) && this.langs.includes(lang)) {
        this.selectedLanguage = lang;
      } else {
        this.router.navigate([], {
          queryParams: {},
          relativeTo: this.route
        });
      }
      this.refresh();
      this.loadingPage = false;
    });

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
    this.apiService.getApiWordsWord({ word: this.word/*, lang: this.selectedLanguage.toString()*/ }).subscribe((words) => {
      this.words = words;
      this.loadingWords = false;
    });
  }

}
