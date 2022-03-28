import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WordsService} from '../../../api/services/words.service';
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

  constructor(private wordService: WordsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const word = this.route.snapshot.paramMap.get('word');
    if (word) {
      this.wordService.getDetailedWordsByPhonetics({word}).subscribe(data => {
        console.log(data);
        const emptyLang: Language = {displayName: ''};
        this.languages = data.filter(dw => dw.word?.language).map(dw => dw.word?.language ? dw.word.language : emptyLang);
        data.forEach(dw => {
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
      });
    }
  }


}
