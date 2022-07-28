import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailedWord} from '../../../api/models/detailed-word';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-words',
  templateUrl: './words-detail.component.html',
  styleUrls: ['./words-detail.component.css']
})
export class WordsDetailComponent implements OnInit {

  detailedWords = new Map<Language, DetailedWord[]>();
  languages: Language[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  get detailedWordsKeys(): Iterable<Language> {
    return this.languages;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data && data.wordDetails) {
        const wordDetails = data.wordDetails as DetailedWord[];
        console.log(wordDetails);
        const emptyLang: Language = {displayName: ''};
        this.languages = wordDetails.filter(dw => dw.word?.language).map(dw => dw.word?.language ? dw.word.language : emptyLang);
        wordDetails.forEach(dw => {
            if (dw.word?.language) {
              const array = this.detailedWords.get(dw.word.language);
              if (!array) {
                this.detailedWords.set(dw.word.language, [dw]);
              } else {
                array.push(dw);
              }
            }
          }
        );
      }
    });
  }

}
