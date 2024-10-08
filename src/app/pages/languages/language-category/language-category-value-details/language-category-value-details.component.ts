import {Component, Input, OnInit} from '@angular/core';
import {GrammaticalCategoryValue} from "../../../../api/models/grammatical-category-value";
import {CategoryService} from "../../../../api/services/category.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-language-category-value-details',
  standalone: true,
  templateUrl: './language-category-value-details.component.html',
  styleUrls: ['./language-category-value-details.component.css'],
  imports: [FormsModule, NgIf]
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
