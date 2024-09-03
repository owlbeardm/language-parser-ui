import {Component, Input} from '@angular/core';
import {WordOriginType} from '../../../../api/models/word-origin-type';
import {Pos} from '../../../../api/models/pos';
import {WordsService} from '../../../../api/services/words.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WordNewDetailed} from "../word-new-detailed";
import {PosService} from "../../../../api/services/pos.service";
import {Language} from "../../../../api/models/language";
import { Word } from 'src/app/api/models';

@Component({
  selector: 'tbody[app-new]',
  standalone: true,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent extends WordNewDetailed {

  @Input() language!: Language;
  newWord = new FormGroup({
    word: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    pos: new FormControl({} as Pos, Validators.required)
  });

  constructor(private wordService: WordsService, protected posService: PosService) {
    super(posService);
  }

  get getLanguage(): Language {
    return this.language;
  }

  addNewWord(): void {
    const newWord: Word = {
      word: this.newWord.value.word ? this.newWord.value.word : '',
      comment: this.newWord.value.comment ? this.newWord.value.comment : '',
      language: this.language,
      partOfSpeech: this.newWord.value.pos ? this.newWord.value.pos : undefined,
      forgotten: false,
      sourceType:WordOriginType.New
    };
    this.wordService.addWord({body: newWord}).subscribe(
      (word) => {
        this.clear();
      }
    );
  }

  private clear(): void {
    this.newWord.get('word')?.reset();
    this.newWord.get('comment')?.reset();
  }

}
