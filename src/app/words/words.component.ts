import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { WordDescriptionAPI } from '../models/word';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: WordDescriptionAPI[];
  word: String;
  langs: String[];
  selectedLanguage: String;
  loadingPage: Boolean;
  loadingWords: Boolean;

  constructor(private apiService: ApiService,
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
    const lang = String(this.route.snapshot.queryParamMap.get('lang'));
    this.apiService.getLanguages().subscribe((langs) => {
      this.langs = langs.map((lang) => lang.name);
      if (this.langs.includes(lang)) {
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
    this.apiService.getWord(this.word, this.selectedLanguage).subscribe((words) => {
      this.words = words;
      this.loadingWords = false;
    });
  }

}
