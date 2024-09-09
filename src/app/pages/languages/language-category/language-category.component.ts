import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../api/models/grammatical-category";
import {CategoryService} from "../../../api/services/category.service";
import {GrammaticalCategoryValue} from "../../../api/models/grammatical-category-value";
import {PosService} from "../../../api/services/pos.service";
import {Pos} from "../../../api/models/pos";
import {GrammaticalCategoryValueConnection} from "../../../api/models/grammatical-category-value-connection";
import {
  LanguageCategoryValueDetailsComponent
} from "./language-category-value-details/language-category-value-details.component";
import {CommonModule} from "@angular/common";
import {LanguageCategoryDetailsComponent} from "./language-category-details/language-category-details.component";
import {HorizontalDashComponent} from "../../../components/spacer/horizontal-dash/horizontal-dash.component";
import {VerticalDashComponent} from "../../../components/spacer/vertical-dash/vertical-dash.component";

@Component({
  selector: 'app-language-category',
  standalone: true,
  templateUrl: './language-category.component.html',
  styleUrls: ['./language-category.component.css'],
  imports: [LanguageCategoryValueDetailsComponent, CommonModule, LanguageCategoryDetailsComponent, HorizontalDashComponent, VerticalDashComponent]
})
export class LanguageCategoryComponent extends AbstractHasLanguageComponent implements OnChanges {

  categories: GrammaticalCategory[] = [];
  pos: Pos[] = [];
  values: GrammaticalCategoryValue[] = [];
  valuesConnectios: GrammaticalCategoryValueConnection[] = [];
  selectedCategory?: GrammaticalCategory;
  selectedValue?: GrammaticalCategoryValue;

  constructor(private categoryService: CategoryService, private posService: PosService) {
    super();
  }

  get array() {
    return [...Array(Math.max(this.categories.length, this.values.length, this.pos.length) + 2).keys()];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.categoryService.getAllCategories().subscribe(gc => this.categories = gc.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
    this.posService.getAllPos().subscribe(pos => this.pos = pos);
    if (this.selectedLanguage?.id)
      this.reloadConnectedValues(this.selectedLanguage.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage?.currentValue) {
      console.log("ngOnChanges", changes, changes.selectedLanguage?.currentValue.id);
      if (changes.selectedLanguage?.currentValue.id) {
        const id = changes.selectedLanguage.currentValue.id;
        this.reloadConnectedValues(id);
      }
    }
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

  addNewCategoryValue() {
    if (!this.selectedCategory)
      return;
    const gcv: GrammaticalCategoryValue = {
      name: 'new value',
      category: this.selectedCategory
    };
    this.categoryService.saveGrammaticalCategoryValue({body: gcv}).subscribe((id) => {
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

  isValueConnected(value: GrammaticalCategoryValue | undefined): boolean {
    if (!value)
      return false;
    return !!this.valuesConnectios.find((vc) => vc.value?.id === value.id);
  }

  connectValue(grammaticalCategoryValue: GrammaticalCategoryValue) {
    const connection: GrammaticalCategoryValueConnection = {
      value: grammaticalCategoryValue,
      language: this.selectedLanguage
    }
    this.categoryService.saveGrammaticalCategoryValueConnection({body: connection}).subscribe((id) => {
      connection.id = id;
      this.valuesConnectios.push(connection);
    })
  }

  disconnectValue(value: GrammaticalCategoryValue) {
    const connection = this.valuesConnectios.find((vc) => vc.value?.id === value.id);
    if (connection?.id) {
      this.categoryService.removeGrammaticalCategoryValueConnection({gcvcId: connection.id}).subscribe(() => {
        this.valuesConnectios = this.valuesConnectios.filter((vc) => vc.value?.id !== value.id);
      });
    }
  }

  private reloadCategoryValues(id: number) {
    console.log("reloadCategoryValues", id)
    this.categoryService.getCategoryValuesByCategory({categoryId: id}).subscribe(vs => this.values = vs.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }

  private reloadConnectedValues(id: number) {
    this.categoryService.getGrammaticalValuesConnectionByLang({langId: id}).subscribe((connections) => {
      this.valuesConnectios = connections;
    });

  }
}
