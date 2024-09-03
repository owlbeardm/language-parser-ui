import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {CategoryService} from "../../../../api/services/category.service";
import {PosService} from "../../../../api/services/pos.service";
import {Pos} from "../../../../api/models/pos";
import {LanguagePos} from "../../../../api/models/language-pos";
import {GrammaticalCategoryConnection} from "../../../../api/models/grammatical-category-connection";

@Component({
  selector: 'app-language-category-details',
  standalone: true,
  templateUrl: './language-category-details.component.html',
  styleUrls: ['./language-category-details.component.css']
})
export class LanguageCategoryDetailsComponent extends AbstractHasLanguageComponent implements OnChanges {

  @Input() selectedCategory?: GrammaticalCategory;
  gcc: GrammaticalCategoryConnection[] = [];
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
    this.reloadConnections(this.selectedCategory?.id, this.selectedLanguage?.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage?.currentValue) {
      console.log(changes, changes.selectedLanguage?.currentValue.id);
      if (changes.selectedLanguage?.currentValue.id) {
        const languageId = changes.selectedLanguage.currentValue.id;
        this.reloadPos(languageId);

      }
      this.reloadConnections(this.selectedCategory?.id, changes.selectedLanguage.currentValue.id);
    }
    if (changes.selectedCategory?.currentValue) {
      console.log(changes, changes.selectedCategory?.currentValue.id);
      this.reloadConnections(changes.selectedCategory.currentValue.id, this.selectedLanguage?.id);
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

  isConnected(posId: number | undefined): boolean {
    if (!posId)
      return false;
    return !!this.gcc.find(gcc => gcc.pos?.id === posId);
  }

  connect(p: Pos) {
    const connection : GrammaticalCategoryConnection = {
      grammaticalCategory: this.selectedCategory,
      language: this.selectedLanguage,
      pos: p
    };
    this.categoryService.saveGrammaticalCategoryConnection({body:connection}).subscribe((id)=>{
      connection.id = id;
      this.gcc.push(connection);
    })

  }

  removeConnection(p: Pos) {
    const conenction = this.gcc.find(gcc => gcc.pos?.id === p.id);
    if(conenction?.id){
      this.categoryService.deleteGrammaticalCategoryConnection({connectionId:conenction.id}).subscribe(()=>{
        this.gcc = this.gcc.filter(gcc => gcc.pos?.id !== p.id);
      });
    }
  }

  private reloadPos(languageId: number) {
    this.posService.getPosByLanguage({languageId: languageId}).subscribe(lp => this.lp = lp);
  }

  private reloadConnections(categoryId: number | undefined, languageId: number | undefined) {
    if (categoryId && languageId)
      this.categoryService.getGrammaticalCategoryConnectionsForLang({
        categoryId: categoryId,
        languageId: languageId
      }).subscribe((gcc) => {
        this.gcc = gcc;
      });
  }
}
