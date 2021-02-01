import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageName, TranslationAPI, WordJSON } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { LangService } from 'src/app/services/lang.service';

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
    private apiService: ApiService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router) {
    this.words = [];
    this.loadingWords = true;
    this.translations = new Map();
  }

  ngOnInit(): void {
    console.log("translations ngOnInit ");
    const lang = this.route.snapshot.queryParamMap.get('lang');
    if (lang && this.langService.isValidLanguageName(lang)) {
      this.selectedLanguage = lang;
    } else {
      this.router.navigate([], {
        queryParams: {},
        relativeTo: this.route
      });
    }
    this.refreshAll();
  }

  changeLang(): void {
    this.router.navigate([], {
      queryParams: this.selectedLanguage ? { lang: this.selectedLanguage } : {},
      relativeTo: this.route
    });
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
