import {Component, Input, OnInit} from '@angular/core';
import {Word} from '../../../../../api/models/word';
import {DeclensionService} from '../../../../../api/services/declension.service';
import {DeclinedWord} from '../../../../../api/models/declined-word';
import {GrammaticalCategoryValue} from '../../../../../api/models/grammatical-category-value';
import {WordDeclensionTableComponent} from "./word-declension-table/word-declension-table.component";

@Component({
  selector: 'app-word-declensions[word]',
  standalone: true,
  templateUrl: './word-declensions.component.html',
  styleUrls: ['./word-declensions.component.css'],
  imports: [WordDeclensionTableComponent]
})
export class WordDeclensionsComponent implements OnInit {

  @Input() word!: Word;
  declinedWord?: DeclinedWord;
  valuesMap: Map<number, GrammaticalCategoryValue[]> = new Map<number, GrammaticalCategoryValue[]>();
  valuesArray: GrammaticalCategoryValue[][] = [];
  restValues: GrammaticalCategoryValue[][] = [];

  constructor(private declensionService: DeclensionService) {
  }

  get columnSize(): number {
    if (!this.valuesArray.length) {
      return 0;
    }
    if (this.valuesArray.length === 1) {
      return 1;
    }
    return this.valuesArray[this.valuesArray.length - 2].length;
  }

  get arrayCircle(): number[] {
    const maxSize = this.valuesArray.map((values) => values.length).reduce((prev, cur) => Math.max(prev, cur), 0);
    return [...Array(maxSize).keys()];
  }

  get arrayOfValues(): number[] {
    return [...Array(this.valuesArray.length).keys()];
  }

  get array(): number[] {
    return [...Array(this.columnSize).keys()];
  }

  ngOnInit(): void {
    if (this.word.id) {
      this.declensionService.getDeclineWord({wordId: this.word.id}).subscribe(declined => {
        this.declinedWord = declined;
        this.declinedWord?.declensionList?.forEach((wd) => {
          wd.declension?.values?.forEach(value => {
            const cid = value.category?.id;
            if (cid) {
              if (!this.valuesMap.has(cid)) {
                this.valuesMap.set(cid, []);
              }
              if (!this.valuesMap.get(cid)?.filter(v => v.id === value.id).length) {
                this.valuesMap.get(cid)?.push(value);
              }
            }
          });
        });
        this.valuesArray = Array.from(this.valuesMap.values()).sort((a, b) => a.length - b.length);
        this.calculateRestValues();
        console.log(this.valuesArray);
      });
    }
  }

  private calculateRestValues(): void {
    this.restValues = [];
    this.restValues.push([]);
    for (let i = 0; i < this.valuesArray.length - 2; i++) {
      const newA: GrammaticalCategoryValue[][] = [];
      this.restValues.forEach((array) => {
        this.valuesArray[i].forEach((value) => {
          newA.push([...array, value]);
        });
      });
      this.restValues = newA;
    }
    console.log('rest values', this.restValues);
  }
}
