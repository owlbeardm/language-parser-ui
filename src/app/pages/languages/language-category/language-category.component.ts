import { Component, OnInit } from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../api/models/grammatical-category";
import {CategoryService} from "../../../api/services/category.service";
import {Pos} from "../../../api/models/pos";

@Component({
  selector: 'app-language-category',
  templateUrl: './language-category.component.html',
  styleUrls: ['./language-category.component.css']
})
export class LanguageCategoryComponent extends AbstractHasLanguageComponent implements OnInit {

  categories: GrammaticalCategory[] = [];
  selectedCategory?: GrammaticalCategory;

  constructor(private categoryService: CategoryService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.categoryService.getAllCategories().subscribe(gc => this.categories = gc.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }

  connectCategoryToLanguage(category: GrammaticalCategory) {

  }

  getLanguageCategory(category: GrammaticalCategory) {

  }

  addNewCategory() {
    const gc: GrammaticalCategory = {
      name: 'new category',
    };
    this.categoryService.saveGrammaticalCategory({body: gc}).subscribe((id) => {
      gc.id = id;
      this.selectedCategory = gc;
      this.categories.push(gc);
    });

  }
}
