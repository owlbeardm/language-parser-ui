import {Component, Input, OnInit} from '@angular/core';
import {WordWithWritten} from "../../../../api/models/word-with-written";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../api/models/grammatical-category-value";
import {GrammaticalValueWordConnection} from "../../../../api/models/grammatical-value-word-connection";
import {CategoryService} from "../../../../api/services/category.service";

@Component({
  selector: 'app-word-grammar',
  templateUrl: './word-grammar.component.html',
  styleUrls: ['./word-grammar.component.css']
})
export class WordGrammarComponent implements OnInit {

  @Input() word!: WordWithWritten;
  categoryValues = new Map<GrammaticalCategory, GrammaticalCategoryValue[]>();
  wordValues: GrammaticalValueWordConnection[] = [];
  isEditCategories: boolean = false;

  constructor(private categoryService: CategoryService) {
  }

  get categories() {
    return this.categoryValues.keys();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      categories.forEach((category) => {
        this.categoryValues.set(category, []);
        if (category.id)
          this.categoryService.getCategoryValuesByCategory({categoryId: category.id}).subscribe((values) => {
            this.categoryValues.set(category, values);
          });
      });
    });
    this.reloadWordValues();
  }

  save() {
    this.reloadWordValues();
    this.isEditCategories = false;
  }

  getWordCategoryValue(c: GrammaticalCategory): GrammaticalCategoryValue | undefined {
    const value = this.wordValues?.find((vw) => vw.value?.category?.id == c.id)?.value;
    return value == null?undefined:value;
  }

  private reloadWordValues() {
    if (this.word.id)
      this.categoryService.getGrammaticalValuesByWord({wordId: this.word.id}).subscribe((values) => {
        this.wordValues = values;
      });
  }
}
