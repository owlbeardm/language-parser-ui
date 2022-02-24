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
    route: 'description',
    enabled: true
  }, {
    name: 'Laws',
    route: 'laws',
    enabled: true
  }];
  allLanguages: Language[] = [];
  selectedLanguage: Language;

  constructor(private languagesService: LanguagesService) {
    this.selectedLanguage = {displayName: ''};
    this.selectLanguage({displayName: ''});
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
    const newLanguage: Language = {displayName: 'New Language'};
    this.languagesService.saveLanguage({body: newLanguage}).subscribe(
      (data) => {
        this.allLanguages.push(data);
        this.allLanguages = this.allLanguages.sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.selectLanguage(data);
      }
    );
  }

  private refreshLanguages(): void {
    this.selectLanguage({displayName: ''});
    this.languagesService.getAllLanguages().subscribe(
      data => {
        this.allLanguages = data.sort((a, b) => a.displayName.localeCompare(b.displayName));
      });
  }
}
