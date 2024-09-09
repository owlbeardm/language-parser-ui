import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DeclensionRule} from "../../../../../api/models/declension-rule";
import {GrammaticalCategory} from "../../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../../api/models/grammatical-category-value";
import {CategoryService} from "../../../../../api/services/category.service";
import {RuleSoundChangesComponent} from "./rule-sound-changes/rule-sound-changes.component";
import {RuleValuesComponent} from "./rule-values/rule-values.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-declension-rule',
  standalone: true,
  templateUrl: './declension-rule.component.html',
  styleUrls: ['./declension-rule.component.css'],
  imports: [RuleSoundChangesComponent, RuleValuesComponent, FormsModule, CommonModule]
})
export class DeclensionRuleComponent implements OnInit, OnChanges {

  @Input() declensionRule!: DeclensionRule;
  @Output() onSave = new EventEmitter<void>();
  categoryValues = new Map<GrammaticalCategory, GrammaticalCategoryValue[]>();
  categoryConnections = new Map<number, boolean>();
  changed: boolean = false;
  isEditCategories: boolean = false;

  constructor(private categoryService: CategoryService) {
  }

  get categories() {
    return [...this.categoryValues.keys()].sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name));
  }

  ngOnInit(): void {
    this.reloadValues(this.declensionRule);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.declensionRule?.currentValue) {
      console.log("ngOnChanges", changes, changes.declension?.currentValue.id);
      this.reloadValues(changes.declensionRule?.currentValue);
    }
  }

  change($event: any) {
    this.changed = true;
  }

  changeEnabled() {
    this.declensionRule.enabled = !this.declensionRule.enabled;
    this.changed = true;
  }

  save() {
    this.onSave.emit();
    this.changed = false;
  }

  getRuleCategoryValue(c: GrammaticalCategory): GrammaticalCategoryValue | undefined {
    const value = this.declensionRule.values?.find((v) => v?.category?.id == c.id);
    return value == null ? undefined : value;
  }

  isCategoryConnected(c: GrammaticalCategory | undefined): boolean {
    return !!c?.id && !!this.categoryConnections.get(c.id);
  }

  private reloadValues(rule: DeclensionRule) {
    this.categoryValues.clear();
    this.categoryService.getAllCategories().subscribe((categories) => {
      categories.forEach((category) => {
        if (this.declensionRule.declension?.values) {
          const values = this.declensionRule.declension?.values;
          if (values?.filter(value => value.category?.id === category.id).length > 0)
            return;
        }
        this.categoryValues.set(category, []);
        if (category.id && this.declensionRule.declension?.language?.id)
          this.categoryService.getCategoryValuesByCategoryAndLang({
            categoryId: category.id,
            langId: this.declensionRule.declension.language.id
          }).subscribe((values) => {
            this.categoryValues.set(category, values);
          });
        if (this.declensionRule.declension?.language?.id && category.id)
          this.categoryService.getGrammaticalCategoryConnectionsForLang({
            categoryId: category.id,
            languageId: this.declensionRule.declension.language.id
          }).subscribe((gcc) => {
            if (category.id)
              this.categoryConnections.set(category.id, !!gcc.find((gccv) => gccv?.pos?.id === this.declensionRule.declension?.pos?.id));
          });
      });
    });
  }
}
