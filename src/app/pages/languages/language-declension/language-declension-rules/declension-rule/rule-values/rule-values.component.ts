import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GrammaticalCategory} from "../../../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../../../api/models/grammatical-category-value";
import {CategoryService} from "../../../../../../api/services/category.service";
import {DeclensionRule} from "../../../../../../api/models/declension-rule";

@Component({
  selector: 'app-rule-values',
  templateUrl: './rule-values.component.html',
  styleUrls: ['./rule-values.component.css']
})
export class RuleValuesComponent implements OnInit {
  @Input() category!: GrammaticalCategory;
  @Input() categoryValues: GrammaticalCategoryValue[] | undefined;
  @Input() value: GrammaticalCategoryValue | undefined;
  @Input() connected!: boolean;
  @Input() rule!: DeclensionRule;
  @Output() changed = new EventEmitter<void>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit value", this.value);
    this.value = this.categoryValues?.find((cv) => cv.id == this.value?.id);
  }

  valueChanged(param: { value: GrammaticalCategoryValue | undefined }) {
    console.log("Value changed", param);
    if (param.value && param.value.category?.id) {
      this.rule.values = this.rule.values?.filter(v => v.category?.id !== param.value?.category?.id);
      this.rule.values?.push(param.value);
    }
    this.changed.emit();
  }
}
