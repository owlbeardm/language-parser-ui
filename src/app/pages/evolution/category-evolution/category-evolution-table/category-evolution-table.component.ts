import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Language} from "../../../../api/models/language";
import {PosService} from "../../../../api/services/pos.service";
import {Pos} from "../../../../api/models/pos";
import {CategoryService} from "../../../../api/services/category.service";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../api/models/grammatical-category-value";

@Component({
  selector: 'app-category-evolution-table',
  standalone: true,
  templateUrl: './category-evolution-table.component.html',
  styleUrls: ['./category-evolution-table.component.css']
})
export class CategoryEvolutionTableComponent implements OnInit, OnChanges {

  @Input() langFrom?: Language;
  @Input() langTo?: Language;
  poses: Pos[] = [];
  categoriesFrom = new Map<number, GrammaticalCategory[]>();
  categoriesTo = new Map<number, GrammaticalCategory[]>();
  valuesFrom = new Map<number, GrammaticalCategoryValue[]>();
  valuesTo = new Map<number, GrammaticalCategoryValue[]>();

  constructor(private posService: PosService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    if (this.langFrom?.id && this.langTo?.id)
      this.reload(this.langFrom.id, this.langTo.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.langFrom?.currentValue || changes.langTo?.currentValue) {
      console.log("ngOnChanges", changes);
      let langFromId: number;
      let langToId: number;
      if (changes.langFrom?.currentValue.id) {
        langFromId = changes.langFrom.currentValue.id;
      } else {
        langFromId = this.langFrom?.id ? this.langFrom?.id : 0;
      }
      if (changes.langTo?.currentValue.id) {
        langToId = changes.langTo.currentValue.id;
      } else {
        langToId = this.langTo?.id ? this.langTo?.id : 0;
      }
      if (langFromId && langToId) {
        this.reload(langFromId, langToId);
      }
    }
  }

  reload(langFromId: number, langToId: number) {
    this.posService.getAllPosByLanguage({languageId: langFromId}).subscribe((ps) => {
      this.poses = ps.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
      this.poses.forEach((pos) => this.reloadCategory(pos, langFromId, langToId));
    });
    this.categoryService.getAllCategories().subscribe((cats) => {
      this.valuesFrom.clear();
      this.valuesTo.clear();
      cats.forEach((cat) => {
        const catId = cat.id;
        if (catId) {
          this.categoryService.getCategoryValuesByCategoryAndLang({
            categoryId: catId,
            langId: langFromId
          }).subscribe(gcv => this.valuesFrom.set(catId, gcv));
          this.categoryService.getCategoryValuesByCategoryAndLang({
            categoryId: catId,
            langId: langToId
          }).subscribe(gcv => this.valuesTo.set(catId, gcv));
        }
      });
    })
  }

  reloadCategory(pos: Pos, langFromId: number, langToId: number) {
    this.categoriesFrom.clear();
    this.categoriesTo.clear();
    if (pos.id) {
      this.categoryService.getGrammaticalCategoryConnectionsForLangAndPos({
        posId: pos.id,
        languageId: langFromId
      }).subscribe((connections) => {
        if (pos.id)
          this.categoriesFrom.set(pos.id, connections.map((c) => c.grammaticalCategory ? c.grammaticalCategory : {}))
      });
      this.categoryService.getGrammaticalCategoryConnectionsForLangAndPos({
        posId: pos.id,
        languageId: langToId
      }).subscribe((connections) => {
        if (pos.id)
          this.categoriesTo.set(pos.id, connections.map((c) => c.grammaticalCategory ? c.grammaticalCategory : {}))
      });
    }
  }

  getCategoriesFrom(pos: Pos) {
    if (pos.id)
      return this.categoriesFrom.get(pos.id);
    return [];
  }

  getValuesFrom(category: GrammaticalCategory) {
    if (category.id)
      return this.valuesFrom.get(category.id);
    return [];
  }

  getValuesTo(category: GrammaticalCategory) {
    if (category.id)
      return this.valuesTo.get(category.id);
    return [];
  }

  getCategoryTo(pos: Pos, category: GrammaticalCategory) {
    if (pos.id && category.id)
      return this.categoriesTo.get(pos.id)?.find(c => c.id === category.id);
    return undefined;
  }
}
