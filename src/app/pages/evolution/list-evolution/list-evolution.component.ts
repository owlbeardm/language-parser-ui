import {Component, OnInit} from '@angular/core';
import {PageResultWord} from '../../../api/models/page-result-word';
import {Language} from '../../../api/models/language';
import {WordsService} from '../../../api/services/words.service';
import {LanguagesService} from '../../../api/services/languages.service';
import {PosService} from '../../../api/services/pos.service';
import {WordListFilter} from '../../../api/models/word-list-filter';
import {Word} from '../../../api/models/word';

@Component({
  selector: 'app-list-evolution',
  templateUrl: './list-evolution.component.html',
  styleUrls: ['./list-evolution.component.css']
})
export class ListEvolutionComponent implements OnInit {
  words: PageResultWord = {};
  languageFrom: Language | undefined;
  languageTo: Language | undefined;
  wordSearch: string | undefined;
  pageSize = 30;

  constructor(private wordService: WordsService, private languageService: LanguagesService, private posService: PosService) {
  }

  ngOnInit(): void {
  }

  load(filter: WordListFilter): void {
    this.wordService.getAllWords({filter}).subscribe(
      (words) => {
        if (words.data) {
          this.words = words;
        }
      }
    );
  }

  loadDefault(filter: WordListFilter | undefined): void {
    if (!filter) {
      filter = {};
    }
    filter = {
      page: filter.page ? filter.page : undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageId: filter.languageId ? filter.languageId : filter.languageId === null ? undefined : undefined,
      posId: filter.posId ? filter.posId : filter.posId === null ? undefined : undefined,
    };
    this.load(filter);
  }

  deleteWord(word: Word): void {
    if (word.id) {
      this.wordService.deleteWord({id: word.id}).subscribe(
        () => {
          this.words.data = this.words.data?.filter(w => w.id !== word.id);
        }
      );
    }
  }

  addNewWord(newWord: Word): void {
    this.wordService.addWord({body: newWord}).subscribe(
      (word) => {
        this.words.data?.push(word);
      }
    );
  }

  resetFilter(): void {
    this.languageFrom = undefined;
    this.languageTo = undefined;
    this.wordSearch = undefined;
    this.loadDefault({});
  }

  forget(word: Word): void {
    word.forgotten = !word.forgotten;
  }
}
