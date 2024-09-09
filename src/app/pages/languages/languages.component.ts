import {Component, OnInit} from '@angular/core';
import {RefreshAll} from '../../interface/refresh-all';
import {LanguagesService} from '../../api/services/languages.service';
import {Language} from '../../api/models/language';
import {CommonModule} from "@angular/common";
import {LanguageTabsComponent} from "./language-tabs/language-tabs.component";
import {HorizontalDashComponent} from "../../components/spacer/horizontal-dash/horizontal-dash.component";
import {VerticalDashComponent} from "../../components/spacer/vertical-dash/vertical-dash.component";

@Component({
  selector: 'app-languages',
  standalone: true,
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
  imports: [CommonModule, LanguageTabsComponent, HorizontalDashComponent, VerticalDashComponent]
})
export class LanguagesComponent implements OnInit, RefreshAll {


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

  deleteLanguage(id: number): void {
    this.languagesService.deleteLanguage({languageId: id}).subscribe(() => {
      this.refreshLanguages();
    });
  }

  private refreshLanguages(): void {
    this.selectLanguage({displayName: ''});
    this.languagesService.getAllLanguages().subscribe(
      data => {
        this.allLanguages = data.sort((a, b) => a.displayName.localeCompare(b.displayName));
      });
  }
}
