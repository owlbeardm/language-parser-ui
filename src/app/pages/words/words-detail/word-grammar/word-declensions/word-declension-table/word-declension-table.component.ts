import {Component, Input, OnInit} from '@angular/core';
import {DeclinedWord} from '../../../../../../api/models/declined-word';
import {GrammaticalCategoryValue} from '../../../../../../api/models/grammatical-category-value';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'tbody[app-word-declension-table]',
  standalone: true,
  templateUrl: './word-declension-table.component.html',
  styleUrls: ['./word-declension-table.component.css'],
  imports: [NgIf, NgFor]
})
export class WordDeclensionTableComponent implements OnInit {
  @Input() columnSize!: number;
  @Input() declinedWord?: DeclinedWord;
  @Input() horisontalValues?: GrammaticalCategoryValue[];
  @Input() verticalValues!: GrammaticalCategoryValue[];
  @Input() wordSearchValues!: GrammaticalCategoryValue[];

  constructor() {
  }

  get array(): number[] {
    return [...Array(this.columnSize).keys()];
  }

  ngOnInit(): void {
  }

  findWordsForValues(values: GrammaticalCategoryValue[]): string[] {
    let wordList = this.declinedWord?.declensionList;
    for (const value of values.concat(this.wordSearchValues)) {
      wordList = wordList?.filter((word) => !!word.declension?.values?.filter(v => v.id === value.id).length);
    }
    const result = wordList?.map((w) => w.wordDeclensions).reduce((prev, curr) => {
      if (prev) {
        if (curr) {
          return prev.concat(curr);
        }
        return prev;
      }
      if (curr) {
        return curr;
      }
      return [];
    }, []);
    if (result) {
      return result;
    }
    return [];
  }

}
