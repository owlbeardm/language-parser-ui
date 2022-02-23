import {Component, OnInit} from '@angular/core';
import {RefreshAll} from '../../interface/refresh-all';
import {LanguagesService} from '../../api/services/languages.service';
import {Language} from '../../api/models/language';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, RefreshAll {

  tabs = [{
    name: 'Description',
    route: 'clusters',
    enabled: true
  }, {
    name: 'Laws',
    route: 'laws',
    enabled: true
  }];
  allLanguages: Language[] = [];
  selectedLanguage: Language;

  constructor(private languagesService: LanguagesService) {
    this.selectedLanguage = {id: -1, displayName: '', version: -1};
  }

  ngOnInit(): void {
    this.refreshLanguages();
  }

  refreshAll(): void {
  }

  changeLang(): void {
  }

  selectLanguage(lang: Language): void {
    this.selectedLanguage = lang;
  }

  addNewLanguage(): void {
    this.selectedLanguage = {id: -1, displayName: 'New Language', version: -1};
    this.allLanguages.push(this.selectedLanguage);
    this.allLanguages = this.allLanguages.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  private refreshLanguages(): void {
    this.selectedLanguage = {id: -1, displayName: '', version: -1};
    this.languagesService.getAllLanguages().subscribe(
      data => {
        this.allLanguages = data.sort((a, b) => a.displayName.localeCompare(b.displayName));
      });
  }
}
