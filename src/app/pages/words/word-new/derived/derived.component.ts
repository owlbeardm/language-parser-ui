import {Component, Input, SimpleChanges} from '@angular/core';
import {Pos} from '../../../../api/models/pos';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WordListFilter} from '../../../../api/models/word-list-filter';
import {WordsService} from '../../../../api/services/words.service';
import {PageResultWordWithWritten} from '../../../../api/models/page-result-word-with-written';
import {PosService} from '../../../../api/services/pos.service';
import {WordWithWritten} from '../../../../api/models/word-with-written';
import {DerivedWordToAdd} from '../../../../api/models/derived-word-to-add';
import {WordOriginType} from '../../../../api/models/word-origin-type';
import {WordNewDetailed} from "../word-new-detailed";
import {Language} from "../../../../api/models/language";

@Component({
  selector: 'tbody[app-derived]',
  templateUrl: './derived.component.html',
  styleUrls: ['./derived.component.css']
})
export class DerivedComponent extends WordNewDetailed {

  @Input() language!: Language;
  pageSize = 10;
  wordSearch?: string;
  listPosSelector?: Pos;
  wordsList: PageResultWordWithWritten = {};
  selectedWords: WordWithWritten[] = [];
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

  ngOnInit(): void {
    super.ngOnInit();
    this.reloadWordList(this.language.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.language && changes.language.currentValue) {
      console.log('DerivedComponent', changes, changes.language.currentValue);
      this.reloadWordList(changes.language.currentValue.id);
      this.selectedWords = [];
    }
  }

  reloadWordList(id: number | undefined): void {
    if (id) {
      this.loadDefault({languageId: id});
    } else {
      this.wordsList = {};
    }
  }

  loadDefault(filter: WordListFilter | undefined): void {
    console.log('loadDefault', filter, this.listPosSelector, this.language, this.wordSearch);
    if (!filter) {
      filter = {};
    }
    filter = {
      page: undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageId: filter.languageId ? filter.languageId : filter.languageId === null ? undefined : this.language?.id,
      posId: filter.posId ? filter.posId : filter.posId === null ? undefined : this.listPosSelector?.id,
    };
    this.load(filter);
  }

  load(filter: WordListFilter): void {
    this.wordService.getAllWords({filter}).subscribe(
      (words) => {
        if (words.data) {
          this.wordsList = words;
        }
      }
    );
  }

  selectWord(w: WordWithWritten): void {
    if (this.indexOfSelectedWord(w) < 0) {
      this.selectedWords.push(w);
    }
  }

  removeWord(w: WordWithWritten): void {
    const index = this.indexOfSelectedWord(w);
    if (index >= 0) {
      this.selectedWords.splice(index, 1);
    }
  }

  indexOfSelectedWord(w: WordWithWritten): number {
    return this.selectedWords.findIndex((element, index, array) => {
      return w.id === element.id;
    });
  }

  addDerivedWord(): void {
    const derivedWord: DerivedWordToAdd = {
      word: this.newWord.value.word ? this.newWord.value.word : undefined,
      comment: this.newWord.value.comment ? this.newWord.value.comment : undefined,
      language: this.language,
      partOfSpeech: this.newWord.value.pos ? this.newWord.value.pos : undefined,
      forgotten: false,
      wordOriginType: WordOriginType.Derived,
      derivedFrom: this.selectedWords
    };
    this.wordService.addDerivedWord({body: derivedWord}).subscribe(
      (word) => {
        this.clear();
      }
    );
  }

  private clear(): void {
    this.newWord.get('word')?.reset();
    this.newWord.get('comment')?.reset();
    this.wordSearch = undefined;
    this.listPosSelector = undefined;
    this.selectedWords = [];
    this.reloadWordList(this.language.id);
  }
}
