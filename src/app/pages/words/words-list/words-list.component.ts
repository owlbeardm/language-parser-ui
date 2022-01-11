import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//TODO: add new api
// import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';
import { LangService } from 'src/app/services/lang.service';
// import { PartOfSpeech, WordJSON, AddWordJSON } from 'src/app/api/models';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent extends AbstractHasLanguage {

  // pos: PartOfSpeech[];
  // words: Map<number, WordJSON> = new Map();
  wordsKeys: number[] = [];
  fromWords: number[] = [];
  newWordForm: FormGroup;
  route: ActivatedRoute
  loadingWords = false;
  creatingType?: 'New' | 'Derivated' | 'Combined' = 'New';

  constructor(private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    // private apiService: ApiService,
    langService: LangService,
    _route: ActivatedRoute,
    router: Router) {
    super(langService, _route, router)
    this.route = _route;
    // this.pos = [];
    this.newWordForm = this.formBuilder.group({
      lang: "",
      pos: "",
      wordText: this.route.snapshot.paramMap.get('newWordText'),
      makeForgotten: !this.route.snapshot.paramMap.get('newWordText'),
      creatingType: this.creatingType,
      originIds: this.fromWords
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.apiService.getApiWordsPos().subscribe((pos) => this.pos = pos);
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
    // super.changeLang(this.selectedLanguage);
  }

  changeCreatingType(): void {
    this.fromWords = [];
    this.creatingType = this.newWordForm.value.creatingType;
  }


  refreshAll() {
    this.loadingWords = true;
    // if (this.selectedLanguage)
      // this.apiService.getApiWordsLangLang(this.selectedLanguage).subscribe((words) => {
      //   this.words.clear();
      //   words.forEach((word) => { if (word.id) this.words.set(word.id, word) });
      //   this.refreshKeys();
      //   this.loadingWords = false;
      // });
  }

  refreshKeys() {
    // this.wordsKeys = Array.from(this.words.keys());
  }

  submit(newWordData: any) {
    // if (this.selectedLanguage) {
    //   // newWordData.lang = this.selectedLanguage;
    //   newWordData.originIds = this.fromWords;
    //   switch (this.creatingType) {
    //     case 'Combined':
    //       newWordData.originType = "Combined";
    //       break;
    //     case 'Derivated':
    //       newWordData.originType = "Derivated";
    //       break;
    //     default:
    //       delete newWordData.originType;
    //   }
    //   // this.apiService.postApiWords(newWordData).subscribe((added) => {
    //   //   console.log("new  word added ", added);
    //   //   if (added) {
    //   //     this.refreshAll();
    //   //   }
    //   // })
    // }
  }

  deleteWord(wordId: number) {
    console.log("Delete word", wordId);
    // this.apiService.deleteApiWordsWordId(wordId).subscribe(() => {
    //   console.log("deleted", wordId);
    //   // this.refreshAll();
    //   this.words.delete(wordId);
    //   this.refreshKeys();
    // });
  }

  forgetWord(wordId: number) {
    console.log("Delete word", wordId);
    // const word = this.words.get(wordId);
    // if (this.selectedLanguage && word)
    //   this.apiService.postApiWordsWordId({
    //     wordId: wordId,
    //     body: {
    //       // lang: this.selectedLanguage,
    //       makeForgotten: !word.forgotten,
    //       pos: word.partOfSpeech,
    //       wordText: word.word,
    //       originIds: []
    //     }
    //   }).subscribe(() => {
    //     console.log("updated", word);
    //     this.refreshAll();
    //   });
  }

}
