import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DetailedWord} from '../../../api/models/detailed-word';
import {Language} from '../../../api/models/language';
import {WordWithWritten} from "../../../api/models/word-with-written";
import {WordsService} from "../../../api/services/words.service";
import {WordDetailDescendantsComponent} from './word-detail-descendants/word-detail-descendants.component';
import {WordDetailTranslationsComponent} from './word-detail-translations/word-detail-translations.component';
import {WordDetailListComponent} from './word-detail-list/word-detail-list.component';
import {WordGrammarComponent} from './word-grammar/word-grammar.component';
import {WrittenWordPipe} from "../../../pipes/written-word.pipe";

@Component({
  selector: 'app-words',
  standalone: true,
  templateUrl: './words-detail.component.html',
  styleUrls: ['./words-detail.component.css'],
  imports: [
    FormsModule,
    RouterLink,
    WordDetailDescendantsComponent,
    WordGrammarComponent,
    WordDetailTranslationsComponent,
    WordDetailListComponent,
    WrittenWordPipe
  ],
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
