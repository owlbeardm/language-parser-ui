import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesService} from '../../../api/services/languages.service';
import {Language} from '../../../api/models/language';
import {PosService} from '../../../api/services/pos.service';
import {Pos} from '../../../api/models/pos';
import {Word} from '../../../api/models/word';

@Component({
  selector: 'app-word-add-line',
  templateUrl: './word-add-line.component.html',
  styleUrls: ['./word-add-line.component.css']
})
export class WordAddLineComponent implements OnInit {
  languages: Language[] = [];
  poses: Pos[] = [];
  newWord = new FormGroup({
    sound: new FormControl('', Validators.required),
    language: new FormControl({} as Language, Validators.required),
    pos: new FormControl({} as Pos, Validators.required)
  });
  @Output() onNewWord = new EventEmitter<Word>();

  constructor(private formBuilder: FormBuilder, private languageService: LanguagesService, private posService: PosService) {
  }

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe(languages => {
      this.languages = languages.sort((a, b) => a.displayName.localeCompare(b.displayName));
      this.changeLanguage();
    });
  }

  addNewWord(): void {
    console.log(this.newWord.value);
    const newWord: Word = {
      word: this.newWord.value.sound?this.newWord.value.sound:undefined,
      language: this.newWord.value.language?this.newWord.value.language:undefined,
      partOfSpeech: this.newWord.value.pos?this.newWord.value.pos:undefined,
      forgotten: false
    };
    if (!newWord.language || !newWord.partOfSpeech || !newWord.word) {
      return;
    }
    this.onNewWord.emit(newWord);
    this.newWord.get('sound')?.reset();
  }

  changeLanguage(): void {
    this.newWord.get('pos')?.reset();
    if (!this.newWord?.value?.language?.id) {
      return;
    }
    this.posService.getAllPosByLanguage({languageId: this.newWord.value.language.id}).subscribe(poses => {
      this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
    });
  }
}
