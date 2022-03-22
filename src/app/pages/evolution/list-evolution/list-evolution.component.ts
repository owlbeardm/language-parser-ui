import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesService} from '../../../api/services/languages.service';
import {PosService} from '../../../api/services/pos.service';
import {Word} from '../../../api/models/word';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {WordWithEvolutionsListFilter} from '../../../api/models/word-with-evolutions-list-filter';
import {PageResultWordWithEvolution} from '../../../api/models/page-result-word-with-evolution';
import {WordWithEvolution} from '../../../api/models/word-with-evolution';
import {WordToEvolve} from '../../../api/models';

@Component({
  selector: 'app-list-evolution',
  templateUrl: './list-evolution.component.html',
  styleUrls: ['./list-evolution.component.css']
})
export class ListEvolutionComponent implements OnInit {
  words: PageResultWordWithEvolution = {};
  languageFrom: Language | undefined;
  languageTo: Language | undefined;
  wordSearch: string | undefined;
  pageSize = 30;

  constructor(private languagesEvolutionService: LanguagesEvolutionService, private languageService: LanguagesService, private posService: PosService) {
  }

  ngOnInit(): void {
  }

  load(filter: WordWithEvolutionsListFilter): void {
    this.languagesEvolutionService.getAllWordsWithEvolutions({filter}).subscribe(
      (words) => {
        this.words = words;
      }
    );
  }

  loadDefault(filter: WordWithEvolutionsListFilter | undefined): void {
    if (!filter) {
      filter = {};
    }
    filter = {
      page: filter.page ? filter.page : undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageFromId: filter.languageFromId ? filter.languageFromId : filter.languageFromId === null ? undefined : this.languageFrom?.id,
      languageToId: filter.languageToId ? filter.languageToId : filter.languageToId === null ? undefined : this.languageTo?.id,
    };
    this.load(filter);
  }

  resetFilter(): void {
    this.languageFrom = undefined;
    this.languageTo = undefined;
    this.wordSearch = undefined;
    this.loadDefault({});
  }

  forget(word: Word | undefined): void {
    if (word) {
      word.forgotten = !word.forgotten;
    }
  }

  evolveSingleWord(wordWithEvolution: WordWithEvolution): void {
    const body: WordToEvolve = {
      languageConnection: wordWithEvolution.languageConnection,
      word: wordWithEvolution.word
    };
    this.languagesEvolutionService.addEvolvedWord({body}).subscribe((newWordWithEvolution) => {
      wordWithEvolution.word = newWordWithEvolution.word;
      wordWithEvolution.wordEvolved = newWordWithEvolution.wordEvolved;
      wordWithEvolution.calculatedEvolution = newWordWithEvolution.calculatedEvolution;
      wordWithEvolution.wordEvolvedType = newWordWithEvolution.wordEvolvedType;
      wordWithEvolution.languageConnection = newWordWithEvolution.languageConnection;
    });
  }
}
