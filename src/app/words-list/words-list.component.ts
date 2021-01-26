import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddWordJSON, LanguageName, PartOfSpeech, WordJSON } from '../api/models';
import { ApiService } from '../api/services';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  pos: PartOfSpeech[];
  words: WordJSON[] = [];
  newWordForm: FormGroup;
  loadingWords = false;
  selectedLanguage?: LanguageName;

  constructor(private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.pos = [];
    this.newWordForm = this.formBuilder.group({
      lang: "",
      pos: "",
      wordText: "",
      makeForgotten: true
    });
    this.refreshAll()
  }

  ngOnInit(): void {
    this.apiService.getApiWordsPos().subscribe((pos) => this.pos = pos);
  }

  changeLang(): void {
    this.refreshAll();
  }


  refreshAll() {
    this.loadingWords = true;
    if (this.selectedLanguage)
      this.apiService.getApiWordsLangLang(this.selectedLanguage).subscribe((words) => {
        this.words = words;
        this.loadingWords = false;
      });
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

  deleteWord(word: WordJSON) {
    console.log("Delete word", word);
    if (word.id)
      this.apiService.deleteApiWordsWordId(word.id).subscribe(() => {
        console.log("deleted", word);
        this.refreshAll();
      });
  }

  forgetWord(word: WordJSON) {
    console.log("Delete word", word);
    if (word.id && this.selectedLanguage)
      this.apiService.postApiWordsWordId({
        wordId: word.id,
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
