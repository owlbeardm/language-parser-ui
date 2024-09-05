import {Component, Input, OnInit} from '@angular/core';
import {WordWithTranslations} from '../../api/models/word-with-translations';

@Component({
  selector: 'app-word-written-with-translations[wordWithTranslations]',
  standalone: true,
  templateUrl: './word-written-with-translations.component.html',
  styleUrls: ['./word-written-with-translations.component.css']
})
export class WordWrittenWithTranslationsComponent implements OnInit {

  @Input() wordWithTranslations!: WordWithTranslations;

  constructor() { }

  ngOnInit(): void {
  }

}
