import {Component, Input, OnInit} from '@angular/core';
import {WordWithTranslations} from '../../../../api/models/word-with-translations';
import {
  WordWrittenWithTranslationsComponent
} from "../../../../components/word-written-with-translations/word-written-with-translations.component";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-word-detail-list',
  standalone: true,
  templateUrl: './word-detail-list.component.html',
  styleUrls: ['./word-detail-list.component.css'],
  imports: [WordWrittenWithTranslationsComponent, NgFor]
})
export class WordDetailListComponent implements OnInit {

  @Input() wordsWithTranslations?: WordWithTranslations[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
