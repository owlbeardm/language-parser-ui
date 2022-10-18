import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {CategoryService} from "../../../../api/services/category.service";
import {PosService} from "../../../../api/services/pos.service";
import {Pos} from "../../../../api/models/pos";
import {LanguagePos} from "../../../../api/models/language-pos";

@Component({
  selector: 'app-language-category-details',
  templateUrl: './language-category-details.component.html',
  styleUrls: ['./language-category-details.component.css']
})
export class LanguageCategoryDetailsComponent extends AbstractHasLanguageComponent implements OnChanges {

  @Input() selectedCategory?: GrammaticalCategory;
  pos: Pos[] = [];
  lp: LanguagePos[] = [];
  editComment = false;
  canUpdate = false;

  constructor(private categoryService: CategoryService, private posService: PosService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.posService.getAllPos().subscribe(pos => this.pos = pos.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
    if (this.selectedLanguage && this.selectedLanguage.id)
      this.reloadPos(this.selectedLanguage.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage?.currentValue) {
      console.log(changes, changes.selectedLanguage?.currentValue.id);
      if (changes.selectedLanguage?.currentValue.id) {
        const languageId = changes.selectedLanguage.currentValue.id;
        this.reloadPos(languageId);
      }
    }
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

  getLanguagePos(pos: Pos): LanguagePos | undefined {
    if (!this.selectedLanguage) {
      return undefined;
    } else {
      return this.lp.find(lp => lp?.languageId === this.selectedLanguage?.id && lp?.posId === pos.id);
    }
  }

  private reloadPos(languageId: number) {
    this.posService.getPosByLanguage({languageId: languageId}).subscribe(lp => this.lp = lp);
  }

}
