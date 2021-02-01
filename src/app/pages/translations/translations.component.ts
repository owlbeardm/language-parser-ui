import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageName, TranslationAPI, WordJSON } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent extends AbstractHasLanguage {

  words: WordJSON[];
  loadingWords: Boolean;
  translations: Map<number | undefined, [TranslationAPI, LanguageName, WordJSON][]>;

  constructor(private cdRef: ChangeDetectorRef,
    private apiService: ApiService,
    langService: LangService,
    route: ActivatedRoute,
    router: Router) {
    super(langService, route, router)
    this.words = [];
    this.loadingWords = true;
    this.translations = new Map();
  }

  ngOnInit(): void {
    super.ngOnInit();
    console.log("translations ngOnInit ");
  }

  changeLang(): void {
    super.changeLang(this.selectedLanguage);
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
