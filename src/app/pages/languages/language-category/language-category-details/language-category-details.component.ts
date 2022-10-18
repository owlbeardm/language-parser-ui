import {Component, Input, OnInit} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {CategoryService} from "../../../../api/services/category.service";

@Component({
  selector: 'app-language-category-details',
  templateUrl: './language-category-details.component.html',
  styleUrls: ['./language-category-details.component.css']
})
export class LanguageCategoryDetailsComponent extends AbstractHasLanguageComponent implements OnInit {

  @Input() selectedCategory?: GrammaticalCategory;
  editComment = false;
  canUpdate = false;

  constructor(private categoryService: CategoryService) {
    super();
  }

  saveChanges(): void {
    if (this.selectedCategory) {
      this.categoryService.saveGrammaticalCategory({body: this.selectedCategory}).subscribe(
        (id) => {
          this.canUpdate = false;
        }
      );
    }
  }

  clickEditComment(): void {
    this.editComment = true;
  }

  clickSaveComment(): void {
    this.editComment = false;
  }

}
