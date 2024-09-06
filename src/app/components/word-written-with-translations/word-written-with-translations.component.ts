import {Component, Input, OnInit} from '@angular/core';
import {WordWithTranslations} from '../../api/models/word-with-translations';
import {TranslationWordComponent} from "../translation-word/translation-word.component";
import {WrittenWordPipe} from "../../pipes/written-word.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-word-written-with-translations[wordWithTranslations]',
  standalone: true,
  templateUrl: './word-written-with-translations.component.html',
  styleUrls: ['./word-written-with-translations.component.css'],
  imports: [TranslationWordComponent, WrittenWordPipe, RouterLink]
})
export class WordWrittenWithTranslationsComponent implements OnInit {

  @Input() wordWithTranslations!: WordWithTranslations;

  constructor() { }

  ngOnInit(): void {
  }

}
