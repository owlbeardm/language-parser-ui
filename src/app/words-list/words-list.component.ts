import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LangService } from '../service/lang.service';
import { Language, AddWordJSON, Word } from '../models/word';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit, AfterViewChecked {

  //   <input #myname>
  @ViewChild('col1') col1: any;
  @ViewChild('col2') col2: any;
  @ViewChild('col3') col3: any;
  @ViewChild('col4') col4: any;
  bcol1: String = "";
  bcol2: String = "";
  bcol3: String = "";
  bcol4: String = "";
  // element
  pos: String[];
  langs: Language[];
  words: Word[] = [];
  newWordForm: FormGroup;
  loadingPage: Boolean;
  loadingWords = false;
  selectedLanguage: String;

  constructor(private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.langs = [];
    this.pos = [];
    this.loadingPage = true;
    this.selectedLanguage = "";
    this.newWordForm = this.formBuilder.group({
      lang: "",
      pos: "",
      wordText: "",
      forgotten: true
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeTable();
  }

  ngAfterViewChecked() {
    this.resizeTable();
  }

  resizeTable() {
    const d = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    const col1l = Math.floor((this.col1.nativeElement.offsetWidth - 2) / 8);
    const bcol1 = this.bcol1;
    this.bcol1 = d.substr(0, col1l);
    const col2l = Math.floor((this.col2.nativeElement.offsetWidth - 2) / 8);
    const bcol2 = this.bcol2;
    this.bcol2 = d.substr(0, col2l);
    const col3l = Math.floor((this.col3.nativeElement.offsetWidth - 2) / 8);
    const bcol3 = this.bcol3;
    this.bcol3 = d.substr(0, col3l);
    const col4l = Math.floor((this.col4.nativeElement.offsetWidth - 2) / 8);
    const bcol4 = this.bcol4;
    this.bcol4 = d.substr(0, col4l);
    if (bcol1 != this.bcol1 || bcol2 != this.bcol2) {
      console.log("refresh")
      this.cdRef.detectChanges();
    }
  }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe((langs) => {
      this.langs = langs;
      this.loadingPage = false;
    });
    this.apiService.getPartsOfSpeech().subscribe((pos) => this.pos = pos);
  }

  changeLang(): void {
    this.refreshAll();
  }


  refreshAll() {
    this.loadingWords = true;
    this.apiService.getWordsByLang(this.selectedLanguage).subscribe((words) => {
      this.words = words;
      // words.forEach((word) => this.refreshWord(word));
      this.loadingWords = false;
      this.resizeTable();
    });
  }

  submit(newWordData: AddWordJSON) {
    // this.checkoutForm.reset();
    console.log("this.selectedLanguage ", this.selectedLanguage);
    newWordData.lang = this.selectedLanguage;
    console.log(newWordData);
    this.apiService.addNewWord(newWordData).subscribe((added) => {
      console.log("new  word added ", added);
      if(added){
        this.refreshAll();
      }
    })
  }

}
