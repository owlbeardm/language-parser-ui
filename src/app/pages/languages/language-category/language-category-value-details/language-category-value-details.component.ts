import {Component, Input, OnInit} from '@angular/core';
import {GrammaticalCategoryValue} from "../../../../api/models/grammatical-category-value";
import {CategoryService} from "../../../../api/services/category.service";

@Component({
  selector: 'app-language-category-value-details',
  templateUrl: './language-category-value-details.component.html',
  styleUrls: ['./language-category-value-details.component.css']
})
export class LanguageCategoryValueDetailsComponent implements OnInit {

  @Input() selectedValue?: GrammaticalCategoryValue;
  canUpdate = false;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

  saveChanges() {
    if (this.selectedValue) {
      this.categoryService.saveGrammaticalCategoryValue({body: this.selectedValue}).subscribe(
        (id) => {
          this.canUpdate = false;
        }
      );
    }
  }
}
