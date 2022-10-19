import {Component} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../api/models/grammatical-category";
import {CategoryService} from "../../../api/services/category.service";
import {GrammaticalCategoryValue} from "../../../api/models/grammatical-category-value";
import {PosService} from "../../../api/services/pos.service";
import {Pos} from "../../../api/models/pos";

@Component({
  selector: 'app-language-category',
  templateUrl: './language-category.component.html',
  styleUrls: ['./language-category.component.css']
})
export class LanguageCategoryComponent extends AbstractHasLanguageComponent {

  categories: GrammaticalCategory[] = [];
  pos: Pos[] = [];
  values: GrammaticalCategoryValue[] = [];
  selectedCategory?: GrammaticalCategory;
  selectedValue?: GrammaticalCategoryValue;

  constructor(private categoryService: CategoryService, private posService: PosService) {
    super();
  }

  get array() {
    const numbers = [...Array(Math.max(this.categories.length, this.values.length, this.pos.length) + 2).keys()];
    return numbers;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.categoryService.getAllCategories().subscribe(gc => this.categories = gc.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
    this.posService.getAllPos().subscribe(pos => this.pos = pos);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.selectedCategory?.currentValue) {
  //     console.log(changes, changes.selectedCategory?.currentValue.id);
  //     if (changes.selectedCategory?.currentValue.id) {
  //       const id = changes.selectedCategory.currentValue.id;
  //       this.reloadCategoryValues(id);
  //     }
  //   }
  // }

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

  addNewCategoryValue() {
    if(!this.selectedCategory)
      return;
    const gcv: GrammaticalCategoryValue = {
      name: 'new value',
      category: this.selectedCategory
    };
    this.categoryService.saveGrammaticalCategoryValue({body:gcv}).subscribe((id) => {
      gcv.id = id;
      this.selectedValue = gcv;
      this.values.push(gcv);
    });
  }

  changeCategory(category: GrammaticalCategory) {
    this.selectedCategory = category;
    if (category.id)
      this.reloadCategoryValues(category.id);
  }

  changeValue(grammaticalCategoryValue: GrammaticalCategoryValue) {
    this.selectedValue = grammaticalCategoryValue;
  }

  private reloadCategoryValues(id: number) {
    console.log("reloadCategoryValues", id)
    this.categoryService.getCategoryValuesByCategory({categoryId: id}).subscribe(vs => this.values = vs.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }


}
