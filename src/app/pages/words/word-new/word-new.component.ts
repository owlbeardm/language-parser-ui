import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {WordOriginType} from '../../../api/models/word-origin-type';
import {Pos} from '../../../api/models/pos';
import {PosService} from '../../../api/services/pos.service';
import {WordsService} from '../../../api/services/words.service';
import {WordToAdd} from '../../../api/models/word-to-add';

@Component({
  selector: 'app-word-new',
  templateUrl: './word-new.component.html',
  styleUrls: ['./word-new.component.css']
})
export class WordNewComponent implements OnInit {
  language?: Language;
  languageTo?: Language;
  // languageFrom: Language = [];
  wordOriginType = WordOriginType;
  typeKeys = Object.keys(WordOriginType);
  type: WordOriginType | string = this.typeKeys[0];
  poses: Pos[] = [];
  comment?: string;
  pos: any;
  word: any;

  constructor(private posService: PosService, private wordService: WordsService) {
  }

  ngOnInit(): void {
    console.log(this.type);
    console.log(this.wordOriginType);
    console.log(this.typeKeys);
  }

  changeLanguage(param: { langId: number | undefined }): void {
    if (param.langId) {
      this.posService.getAllPosByLanguage({languageId: param.langId}).subscribe(poses => {
        this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
      });
    } else {
      this.poses = [];
    }
  }

  changeLanguageFrom(param: { languageFromId: number | undefined }): void {
  }

  typeChanged(param: { type: WordOriginType }): void {
    console.log(param.type);
  }

  reloadLanguageFrom(): void {

  }

  addNewWord(): void {
    const newWord: WordToAdd = {
      word: this.word,
      language: this.language,
      partOfSpeech: this.pos,
      forgotten: false,
      comment: this.comment,
      wordOriginType: WordOriginType.New
    };
    this.wordService.addWord({body: newWord}).subscribe(
      (word) => {
        this.clear();
      }
    );
  }


  private clear() {
    this.word = undefined;
    this.comment = undefined;
  }
}
