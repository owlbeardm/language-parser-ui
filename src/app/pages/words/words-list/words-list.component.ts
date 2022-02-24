import {Component, OnInit} from '@angular/core';
import {WordsService} from '../../../api/services/words.service';
import {Word} from '../../../api/models/word';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {

  words: Word[] = [];
  page = 0;

  constructor(private wordService: WordsService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.wordService.getAllWords({filter: {page: this.page, size: 7}}).subscribe(
      (words) => {
        if (words.data) {
          this.words = words.data;
        }
      }
    );
  }
}
