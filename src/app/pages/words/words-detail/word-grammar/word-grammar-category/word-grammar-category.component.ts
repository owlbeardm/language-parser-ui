import {Component, Input, OnInit} from '@angular/core';
import {GrammaticalCategory} from "../../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../../api/models/grammatical-category-value";
import {CategoryService} from "../../../../../api/services/category.service";
import {GrammaticalValueWordConnection, Word} from "../../../../../api/models";

@Component({
  selector: 'app-word-grammar-category',
  standalone: true,
  templateUrl: './word-grammar-category.component.html',
  styleUrls: ['./word-grammar-category.component.css']
})
export class WordGrammarCategoryComponent implements OnInit {
  @Input() category!: GrammaticalCategory;
  @Input() categoryValues: GrammaticalCategoryValue[] | undefined;
  @Input() value: GrammaticalCategoryValue | undefined;
  @Input() connected!: boolean;
  @Input() word!: Word;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit value", this.value);
    this.value = this.categoryValues?.find((cv)=>cv.id==this.value?.id);
  }

  valueChanged(param: { value: GrammaticalCategoryValue | undefined }) {
    console.log("Value changed", param);
    if (!param.value) {
      if (this.word.id && this.category.id)
        this.categoryService.removeGrammaticalValuesByWord({
          wordId: this.word.id,
          categoryId: this.category.id
        }).subscribe(() => console.log("Removed value"))
      return;
    }
    const gvwc: GrammaticalValueWordConnection = {
      value: param.value,
      word: this.word
    }
    this.categoryService.replaceGrammaticalValuesByWord({body: gvwc}).subscribe(() => console.log("Saved value"));
  }
}
