import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import {Pos} from "../../../../api/models/pos";
import {PageResultWordWithWritten} from "../../../../api/models/page-result-word-with-written";
import {WordWithWritten} from "../../../../api/models/word-with-written";
import {Language} from "../../../../api/models/language";
import {WordsService} from "../../../../api/services/words.service";
import {PosService} from "../../../../api/services/pos.service";
import {WordListFilter} from "../../../../api/models/word-list-filter";
import {WordNewDetailed} from "../word-new-detailed";

@Component({
  selector: 'tbody[app-borroved]',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent extends WordNewDetailed implements OnInit {

  pageSize = 10;
  wordSearch?: string;
  listPosSelector?: Pos;
  wordsList: PageResultWordWithWritten = {};
  selectedWords: WordWithWritten[] = [];
  @Input() language!: Language;
  @Input() languageFrom!: Language;

  constructor(private wordService: WordsService, protected posService: PosService) {
    super(posService);
  }

  ngOnInit(): void {
    this.reloadWordList(this.language.id);
    console.log("Pos for", JSON.stringify(this.languageFrom))
    this.loadPos(this.languageFrom.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.languageFrom && changes.languageFrom.currentValue) {
      console.log('DerivedComponent', changes, changes.languageFrom.currentValue);
      this.reloadWordList(changes.languageFrom.currentValue.id);
      this.loadPos(changes.languageFrom.currentValue.id);
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

}
