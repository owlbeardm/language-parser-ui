import {Component, OnInit} from '@angular/core';
import {WordsService} from '../../../api/services/words.service';
import {PageResultWordWithWritten} from '../../../api/models/page-result-word-with-written';
import {Word} from '../../../api/models/word';
import {WordListFilter} from '../../../api/models/word-list-filter';
import {Language} from '../../../api/models/language';
import {Pos} from '../../../api/models/pos';
import {LanguagesService} from '../../../api/services/languages.service';
import {PosService} from '../../../api/services/pos.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  words: PageResultWordWithWritten = {};
  language: Language | undefined;
  pos: Pos | undefined;
  wordSearch: string | undefined;
  languages: Language[] = [];
  poses: Pos[] = [];
  pageSize = 30;

  constructor(private wordService: WordsService, private languageService: LanguagesService, private posService: PosService) {
  }

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe(languages => {
      this.languages = languages.sort((a, b) => a.displayName ? a.displayName.localeCompare(b.displayName ? b.displayName : '') : -1);
    });
    this.posService.getAllPos().subscribe(poses => {
      this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
    });
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
    console.log('loadDefault', filter, this.pos, this.language, this.wordSearch);
    if (!filter) {
      filter = {};
    }
    filter = {
      page: filter.page ? filter.page : undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageId: filter.languageId ? filter.languageId : filter.languageId === null ? undefined : this.language?.id,
      posId: filter.posId ? filter.posId : filter.posId === null ? undefined : this.pos?.id,
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
    this.language = undefined;
    this.pos = undefined;
    this.wordSearch = undefined;
    this.loadDefault({});
  }
}
