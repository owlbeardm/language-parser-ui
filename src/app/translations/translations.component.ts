import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Word, WordTranslation } from '../models/word';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit, AfterViewChecked {

  //   <input #myname>
  @ViewChild('col1') col1: any;
  @ViewChild('col2') col2: any;
  @ViewChild('dash') dash: any;
  @ViewChild('ddash') ddash: any;
  bcol1: String;
  bcol2: String;
  // element
  words: Word[];
  langs: String[];
  selectedLanguage: String;
  loadingPage: Boolean;
  loadingWords: Boolean;
  translations: Map<number, WordTranslation[]>;


  constructor(private cdRef: ChangeDetectorRef,
    private apiService: ApiService) {
    this.bcol1 = "";
    this.bcol2 = "";
    this.words = [];
    this.langs = [];
    this.selectedLanguage = "";
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
    this.apiService.getLanguages().subscribe((langs) => {
      this.langs = langs.map((lang) => lang.name);
      this.refreshAll();
      this.loadingPage = false;
    });
  }

  ngAfterViewChecked() {
    console.log("translations ngAfterViewInit ");
    this.resizeTable();
  }

  resizeTable() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const col1l = Math.floor((this.col1.nativeElement.offsetWidth - 2) / 8);
    this.bcol1 = d.substr(0, col1l);
    const col2l = Math.floor((this.col2.nativeElement.offsetWidth - 2) / 8);
    this.bcol2 = d.substr(0, col2l);
    console.log(this.col2.nativeElement.offsetWidth, col2l);
    this.cdRef.detectChanges();
  }

  changeLang(): void {
    this.refreshAll();
  }

  refreshAll() {
    this.loadingWords = true;
    this.apiService.getWordsByLang(this.selectedLanguage).subscribe((words) => {
      this.words = words;
      words.forEach((word)=>{
        this.apiService.getTranslationsByWordKey(word.id).subscribe((translations) => {
          this.translations.set(word.id, translations);
          this.cdRef.detectChanges();
        });
      });
      this.loadingWords = false;
      this.resizeTable();
    });
  }

}
