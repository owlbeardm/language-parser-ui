import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { LanguageName, TranslationAPI, WordJSON } from '../api/models';
import { ApiService } from '../api/services';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit, AfterViewChecked {

  //   <input #myname>
  @ViewChild('col1') col1: any;
  @ViewChild('col2') col2: any;
  bcol1: String;
  bcol2: String;
  // element
  words: WordJSON[];
  langs: Array<LanguageName>;
  selectedLanguage?: LanguageName;
  loadingPage: Boolean;
  loadingWords: Boolean;
  translations: Map<number | undefined, [TranslationAPI, LanguageName, WordJSON][]>;


  constructor(private cdRef: ChangeDetectorRef,
    private apiService: ApiService) {
    this.bcol1 = "";
    this.bcol2 = "";
    this.words = [];
    this.langs = [];
    this.loadingPage = true;
    this.loadingWords = true;
    this.translations = new Map();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeTable();
  }

  ngOnInit(): void {
    console.log("translations ngOnInit ");
    this.apiService.getApiLangs().subscribe((langs) => {
      console.log(typeof langs);
      this.langs = langs;
      this.refreshAll();
      this.loadingPage = false;
    });
  }

  ngAfterViewChecked() {
    this.resizeTable();
  }

  resizeTable() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const col1l = Math.floor((this.col1?.nativeElement.offsetWidth - 2) / 8);
    const bcol1 = this.bcol1;
    this.bcol1 = d.substr(0, col1l);
    const col2l = Math.floor((this.col2?.nativeElement.offsetWidth - 2) / 8);
    const bcol2 = this.bcol2;
    this.bcol2 = d.substr(0, col2l);
    if (bcol1 != this.bcol1 || bcol2 != this.bcol2) {
      this.cdRef.detectChanges();
    }
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
        this.resizeTable();
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
