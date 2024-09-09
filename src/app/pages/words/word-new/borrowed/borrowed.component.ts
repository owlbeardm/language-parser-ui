import {Component, Input, SimpleChanges} from '@angular/core';
import {Pos} from "../../../../api/models/pos";
import {Language} from "../../../../api/models/language";
import {WordBorrowedListFilter} from "../../../../api/models/word-borrowed-list-filter";
import {WordWithBorrowed} from "../../../../api/models/word-with-borrowed";
import {PosService} from "../../../../api/services/pos.service";
import {WordNewDetailed} from "../word-new-detailed";
import {LanguagesEvolutionService} from "../../../../api/services/languages-evolution.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {HorizontalDashComponent} from "../../../../components/spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'tbody[app-borroved]',
  standalone: true,
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, HorizontalDashComponent]
})
export class BorrowedComponent extends WordNewDetailed {

  @Input() language!: Language;
  pageSize = 30;
  wordSearch?: string;
  listPosSelector?: Pos;
  wordsBorrowed: WordWithBorrowed[] = [];
  @Input() languageFrom!: Language;

  constructor(private languagesEvolutionService: LanguagesEvolutionService, protected posService: PosService) {
    super(posService);
  }

  get getLanguage(): Language {
    return this.language;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.reloadWordList(this.languageFrom.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.languageFrom && changes.languageFrom.currentValue) {
      console.log('DerivedComponent', changes, changes.languageFrom.currentValue);
      this.reloadWordList(changes.languageFrom.currentValue.id);
      this.wordsBorrowed = [];
    }
  }

  reloadWordList(id: number | undefined): void {
    if (id) {
      this.loadDefault({languageId: id});
    } else {
    }
  }

  loadDefault(filter: WordBorrowedListFilter | undefined): void {
    console.log('loadDefault', filter, this.listPosSelector, this.language, this.wordSearch);
    if (!filter) {
      filter = {};
    }
    filter = {
      page: undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageId: filter.languageId ? filter.languageId : filter.languageId === null ? undefined : this.languageFrom?.id,
      languageToId: this.language.id,
      posId: filter.posId ? filter.posId : filter.posId === null ? undefined : this.listPosSelector?.id,
    };
    this.load(filter);
  }

  load(filter: WordBorrowedListFilter): void {
    this.languagesEvolutionService.getAllWords1({filter}).subscribe(
      (words) => {
        if (words.data) {
          this.wordsBorrowed = words.data;
        }
      }
    );
  }

  evolveSingleWord(w: WordWithBorrowed) {
    console.log("EVOLVE WORD", w);
    this.languagesEvolutionService.addBorrowedWord({
      body: {
        language: this.language,
        word: w.word
      }
    }).subscribe((answer) => {
      w.word = answer.word;
      w.wordEvolved = answer.wordEvolved;
      w.calculatedEvolution = answer.calculatedEvolution;
    })
  }
}
