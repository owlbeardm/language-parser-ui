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

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {

    this.apiService = apiService;
    this.words = [];
    //TODO: get langs from api
    this.langs = ["Titan", "SlaveRunic", "ProtoHuman", "Queran", "NitholanEmpire", "OldNitholan", "Nitholan"];
    this.selectedLanguage = "";
    this.word = "";
  }

  ngOnInit(): void {
    this.word = String(this.route.snapshot.paramMap.get('word'));
    const lang = String(this.route.snapshot.queryParamMap.get('lang'));
    if (this.langs.includes(lang)) {
      this.selectedLanguage = lang;
    }
    this.refresh();
  }

  changeLang(): void {
    this.router.navigate([], {
      queryParams: this.selectedLanguage?{ lang: this.selectedLanguage }:{},
      relativeTo: this.route
    });
    this.refresh();
  }

  refresh(): void {
    this.apiService.getWords(this.word, this.selectedLanguage).subscribe((words) => {
      this.words = words;
    });
  }

}
