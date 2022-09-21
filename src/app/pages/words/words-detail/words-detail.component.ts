import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailedWord} from '../../../api/models/detailed-word';
import {Language} from '../../../api/models/language';
import {WordWithWritten} from "../../../api/models/word-with-written";
import {WordsService} from "../../../api/services/words.service";

@Component({
  selector: 'app-words',
  templateUrl: './words-detail.component.html',
  styleUrls: ['./words-detail.component.css']
})
export class WordsDetailComponent implements OnInit, OnDestroy {

  detailedWords = new Map<Language, DetailedWord[]>();
  languages: Language[] = [];
  isEditComment: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private wordsService: WordsService) {
  }

  get detailedWordsKeys(): Iterable<Language> {
    return this.languages;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data && data.wordDetails) {
        const wordDetails = data.wordDetails as DetailedWord[];
        console.log("WordsDetailComponent ngOnInit", wordDetails);
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

  ngOnDestroy(): void {
    console.log("WordsDetailComponent ngOnDestroy");
  }

  editComment(): void {
    this.isEditComment = !this.isEditComment;
  }

  saveComment(word: WordWithWritten | undefined): void {
    console.log(word);
    if (!word) return;
    this.wordsService.addWord({body: word}).subscribe((w) => {
      word.comment = w.comment;
      this.isEditComment = false;
    });
  }

  changeComment(comment: string, word: WordWithWritten): void {
    word.comment = comment;
  }
}
