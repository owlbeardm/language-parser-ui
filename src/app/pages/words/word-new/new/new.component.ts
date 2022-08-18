import {Component, Input, OnInit} from '@angular/core';
import {WordToAdd} from '../../../../api/models/word-to-add';
import {WordOriginType} from '../../../../api/models/word-origin-type';
import {Pos} from '../../../../api/models/pos';
import {Language} from '../../../../api/models/language';
import {WordsService} from '../../../../api/services/words.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WordNewDetailed} from "../word-new-detailed";
import {PosService} from "../../../../api/services/pos.service";

@Component({
  selector: 'tbody[app-new]',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent extends WordNewDetailed implements OnInit {

  @Input() language!: Language;
  newWord = new FormGroup({
    word: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    pos: new FormControl({} as Pos, Validators.required)
  });

  constructor(private wordService: WordsService, protected posService: PosService) {
    super(posService);
  }

  ngOnInit(): void {
  }

  addNewWord(): void {
    const newWord: WordToAdd = {
      word: this.newWord.value.word?this.newWord.value.word:'',
      comment: this.newWord.value.comment?this.newWord.value.comment:'',
      language: this.language,
      partOfSpeech: this.newWord.value.pos?this.newWord.value.pos:undefined,
      forgotten: false,
      wordOriginType: WordOriginType.New
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
