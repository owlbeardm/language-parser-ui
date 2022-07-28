import {Component, Input, OnInit} from '@angular/core';
import {WordWithTranslations} from '../../../../api/models/word-with-translations';

@Component({
  selector: 'app-word-detail-list',
  templateUrl: './word-detail-list.component.html',
  styleUrls: ['./word-detail-list.component.css']
})
export class WordDetailListComponent implements OnInit {

  @Input() wordsWithTranslations?: WordWithTranslations[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
