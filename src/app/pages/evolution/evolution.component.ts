import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageName } from 'src/app/api/models';
import { WordToEvolveJSON } from 'src/app/api/models/word-to-evolve-json';
import { ApiService } from 'src/app/api/services';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent extends AbstractHasLanguage {

  langsTo: LanguageName[] = [];
  wordsToEvolve: WordToEvolveJSON[] = [];
  wordsToReEvolve: WordToEvolveJSON[] = [];
  evolvedWords: WordToEvolveJSON[] = [];
  selectedLanguageTo?: LanguageName;

  constructor(private apiService: ApiService,
    langService: LangService,
    route: ActivatedRoute,
    router: Router) {
    super(langService, route, router)
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  refreshAll() {
    if (this.selectedLanguage)
      this.apiService
        .getApiLangsEvolvefromLang(this.selectedLanguage)
        .subscribe((langs) => {
          this.langsTo = langs;
          this.selectedLanguageTo = langs.length ? langs[0] : undefined;
          this.updateLangTo();
        });
  }

  changeLang(): void {
    super.changeLang(this.selectedLanguage);
  }

  updateLangTo(): void {
    if (this.selectedLanguage && this.selectedLanguageTo) {
      this.apiService
        .getApiLangsWordstoevolveFromTo({ from: this.selectedLanguage, to: this.selectedLanguageTo })
        .subscribe((words) => this.wordsToEvolve = words.sort((w1, w2) => w1 > w2 ? -1 : 1));
    } else {
      this.wordsToEvolve = [];
    }
  }

  forgetWord(wordToEvolve: WordToEvolveJSON) {
    console.log("Delete word", wordToEvolve);
    const word = wordToEvolve.wordToEvolve;
    if (this.selectedLanguage && word.id)
      this.apiService.postApiWordsWordId({
        wordId: word.id,
        body: {
          lang: this.selectedLanguage,
          makeForgotten: !word.forgotten,
          pos: word.partOfSpeech,
          wordText: word.word,
          originIds: []
        }
      }).subscribe(() => {
        console.log("updated", word);
        this.updateLangTo();
      });
  }

}
