import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { LanguageName, TranslationAPI, WordJSON } from '../api/models';
import { ApiService } from '../api/services';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

  words: WordJSON[];
  selectedLanguage?: LanguageName;
  loadingWords: Boolean;
  translations: Map<number | undefined, [TranslationAPI, LanguageName, WordJSON][]>;


  constructor(private cdRef: ChangeDetectorRef,
    private apiService: ApiService) {
    this.words = [];
    this.loadingWords = true;
    this.translations = new Map();
  }

  ngOnInit(): void {
    console.log("translations ngOnInit ");
  }

  changeLang(): void {
    this.refreshAll();
  }

  refreshAll() {
    this.loadingWords = true;
    if (this.selectedLanguage)
      this.apiService.getApiWordsLangLang(this.selectedLanguage).subscribe((words) => {
        this.words = words;
        words.forEach((word) => this.refreshWord(word));
        this.loadingWords = false;
      });
  }

  refreshWord(word: WordJSON) {
    if (word.id) {
      this.translations.delete(word.id);
      this.apiService.getApiTranslationBywordkeyWordId(word.id).subscribe((translations) => {
        if (word.id)
          this.translations.set(word.id, translations);
        this.cdRef.detectChanges();
      });
    }
  }

}
