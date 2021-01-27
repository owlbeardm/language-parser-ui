import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddWordJSON, LanguageName, PartOfSpeech, WordJSON } from '../api/models';
import { ApiService } from '../api/services';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  pos: PartOfSpeech[];
  words: Map<number, WordJSON> = new Map();
  wordsKeys: number[] = [];
  fromWords: number[] = [];
  newWordForm: FormGroup;
  loadingWords = false;
  creatingType?: 'New' | 'Derivated' | 'Combined' = 'New';
  selectedLanguage?: LanguageName;

  constructor(private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router) {
    this.pos = [];
    this.newWordForm = this.formBuilder.group({
      lang: "",
      pos: "",
      wordText: "",
      makeForgotten: true,
      creatingType: this.creatingType
    });
    this.refreshAll()
  }

  ngOnInit(): void {
    this.apiService.getApiWordsPos().subscribe((pos) => this.pos = pos);
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

  addFromWord(wordId: number) {
    // if (this.creatingType == 'Derivated')
    //   this.fromWords = [];
    this.fromWords.push(wordId)
  }

  removeFromWord(wordId: number) {
    const i = this.fromWords.indexOf(wordId);
    console.log(this.fromWords, i);
    if (i > -1) {
      this.fromWords.splice(i, 1);
    }
  }

  changeLang(): void {
    this.router.navigate([], {
      queryParams: this.selectedLanguage ? { lang: this.selectedLanguage } : {},
      relativeTo: this.route
    });
    this.refreshAll();
  }

  changeCreatingType(): void {
    this.fromWords = [];
    this.creatingType = this.newWordForm.value.creatingType;
  }


  refreshAll() {
    this.loadingWords = true;
    if (this.selectedLanguage)
      this.apiService.getApiWordsLangLang(this.selectedLanguage).subscribe((words) => {
        this.words.clear();
        words.forEach((word) => { if (word.id) this.words.set(word.id, word) });
        this.refreshKeys();
        this.loadingWords = false;
      });
  }

  refreshKeys() {
    this.wordsKeys = Array.from(this.words.keys());
  }

  submit(newWordData: AddWordJSON) {
    // this.checkoutForm.reset();
    console.log("this.selectedLanguage ", this.selectedLanguage);
    if (this.selectedLanguage) {
      newWordData.lang = this.selectedLanguage;
      console.log(newWordData);
      this.apiService.postApiWords(newWordData).subscribe((added) => {
        console.log("new  word added ", added);
        if (added) {
          this.refreshAll();
        }
      })
    }
  }

  deleteWord(wordId: number) {
    console.log("Delete word", wordId);
    this.apiService.deleteApiWordsWordId(wordId).subscribe(() => {
      console.log("deleted", wordId);
      // this.refreshAll();
      this.words.delete(wordId);
      this.refreshKeys();
    });
  }

  forgetWord(wordId: number) {
    console.log("Delete word", wordId);
    const word = this.words.get(wordId);
    if (this.selectedLanguage && word)
      this.apiService.postApiWordsWordId({
        wordId: wordId,
        body: {
          lang: this.selectedLanguage,
          makeForgotten: !word.forgotten,
          pos: word.partOfSpeech,
          wordText: word.word
        }
      }).subscribe(() => {
        console.log("updated", word);
        this.refreshAll();
      });
  }

}
