import {Component, OnInit} from '@angular/core';
import {WordsService} from '../../../api/services/words.service';
import {PageResultWord} from '../../../api/models/page-result-word';
import {Word} from '../../../api/models/word';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  words: PageResultWord = {};
  page = 0;
  size = 30;
  pageBttns: number[] = [];

  constructor(private wordService: WordsService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.wordService.getAllWords({filter: {page: this.page, size: this.size}}).subscribe(
      (words) => {
        if (words.data) {
          this.words = words;
          this.redrawPageBttns();
        }
      }
    );
  }

  changePage(newpagenmb: number | undefined): void {
    if (this.words?.totalPages && newpagenmb !== undefined) {
      const page = Math.min(Math.max(0, newpagenmb), this.words.totalPages - 1);
      if (page !== this.page) {
        this.page = page;
        this.load();
      }
    }
  }

  redrawPageBttns(): void {
    if (this.words.totalPages) {
      this.pageBttns = [];
      for (let i = 0; i < 3; i++) {
        this.pageBttns.push(i);
        this.pageBttns.push(this.words.totalPages - 1 - i);
        this.pageBttns.push(this.page + i);
        this.pageBttns.push(this.page - i);
      }
      this.pageBttns = this.pageBttns
        .filter((v, i, a) => a.indexOf(v) === i && v >= 0 && this.words.totalPages && v < this.words.totalPages)
        .sort((a, b) => a - b);
    }
  }

  deleteWord(word: Word): void {
    if (word.id) {
      this.wordService.deleteWord({id: word.id}).subscribe(
        () => {
          this.load();
        }
      );
    }
  }
}
