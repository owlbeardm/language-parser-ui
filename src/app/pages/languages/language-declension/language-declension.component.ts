import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from "../../../components/abstract/abstract-has-language/abstract-has-language.component";
import {PosService} from "../../../api/services/pos.service";
import {Pos} from "../../../api/models/pos";
import {GrammaticalCategory} from "../../../api/models/grammatical-category";
import {CategoryService} from "../../../api/services/category.service";
import {Language} from "../../../api/models/language";
import {GrammaticalCategoryValue} from "../../../api/models/grammatical-category-value";
import {DeclensionService} from "../../../api/services/declension.service";
import {DeclensionConnection} from "../../../api/models/declension-connection";
import {DeclensionFull} from "../../../api/models/declension-full";

@Component({
  selector: 'app-language-declension',
  standalone: true,
  templateUrl: './language-declension.component.html',
  styleUrls: ['./language-declension.component.css']
})
export class LanguageDeclensionComponent extends AbstractHasLanguageComponent implements OnChanges {

  categories: GrammaticalCategory[] = [];
  pos: Pos[] = [];
  selectedPos?: Pos;
  categoriesWithPos: Set<number> = new Set<number>();
  connectedCategories: Map<number, DeclensionConnection> = new Map<number, DeclensionConnection>();
  languageValues: Map<number, GrammaticalCategoryValue[]> = new Map<number, GrammaticalCategoryValue[]>();
  matrix: DeclensionFull [] = [];
  selectedDeclension?: DeclensionFull;

  constructor(private categoryService: CategoryService,
              private posService: PosService,
              private declensionService: DeclensionService) {
    super();
  }

  get array() {
    return [...Array(this.arraySize).keys()];
  }

  get arraySize() {
    return Math.max(this.categories.length, this.pos.length, this.matrix.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage?.currentValue) {
      console.log("ngOnChanges", changes, changes.selectedLanguage?.currentValue.id);
      if (changes.selectedLanguage?.currentValue) {
        this.reloadValues(changes.selectedLanguage?.currentValue, this.categories);
        if (this.selectedPos) {
          this.reloadCategoriesConnections(this.selectedPos, changes.selectedLanguage?.currentValue);
        }
      }
    }
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(gc => {
      const categories = gc.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name));
      this.categories = categories;
      if (this.selectedLanguage) {
        this.reloadValues(this.selectedLanguage, categories);
      }
    });
    this.posService.getAllPos().subscribe(pos => this.pos = pos.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }

  changePos(pos: Pos) {
    this.selectedPos = pos;
    if (this.selectedLanguage) {
      this.reloadCategoriesConnections(pos, this.selectedLanguage);
    }
  }

  isCategoryConnected(grammaticalCategory: GrammaticalCategory) {
    if (!this.selectedPos) {
      return false;
    }
    return grammaticalCategory.id ? this.connectedCategories.has(grammaticalCategory.id) : false;
  }

  connectCategory(grammaticalCategory: GrammaticalCategory) {
    const gcid = grammaticalCategory.id;
    if (gcid) {
      const dc: DeclensionConnection = {
        grammaticalCategory: grammaticalCategory,
        language: this.selectedLanguage,
        pos: this.selectedPos
      };
      this.declensionService.saveDeclensionConnection({body: dc}).subscribe((id) => {
        dc.id = id;
        this.connectedCategories.set(gcid, dc);
        if (this.selectedLanguage?.id && this.selectedPos?.id)
          this.recalculateMatrix(this.selectedLanguage.id, this.selectedPos.id);
      });
    }
  }

  disconnectCategory(grammaticalCategory: GrammaticalCategory) {
    const gcid = grammaticalCategory.id;
    if (gcid) {
      if (this.connectedCategories.has(gcid)) {
        const dcId = this.connectedCategories.get(gcid)?.id;
        if (dcId) {
          this.declensionService.deleteDeclensionConnection({connectionId: dcId}).subscribe(() => {
            this.connectedCategories.delete(gcid);
            if (this.selectedLanguage?.id && this.selectedPos?.id)
              this.recalculateMatrix(this.selectedLanguage.id, this.selectedPos.id);
          });
        }
      }
    }
  }

  isCategoryWithPos(grammaticalCategory: GrammaticalCategory) {
    if (!this.selectedPos) {
      return false;
    }
    return grammaticalCategory.id ? this.categoriesWithPos.has(grammaticalCategory.id) : false;
  }

  declensionName(declension: DeclensionFull) {
    return declension.values?.map(v => v.name).join(' ');
  }

  deleteDeclension(declensionFull: DeclensionFull, i: number) {
    if (declensionFull.id)
      this.declensionService.deleteDeclension({declensionId: declensionFull.id}).subscribe(() => {
        this.matrix.splice(i, 1);
      });

  }

  addDeclension(declensionFull: DeclensionFull, i: number) {
    this.declensionService.saveDeclension({body: declensionFull}).subscribe((df) => this.matrix[i] = df);
  }

  private reloadCategoriesConnections(pos: Pos, lang: Language) {
    this.categoriesWithPos.clear();
    this.connectedCategories.clear();
    if (pos.id && lang?.id) {
      this.categoryService.getGrammaticalCategoryConnectionsForLangAndPos({
        posId: pos.id,
        languageId: lang.id
      }).subscribe((connections) => {
        connections.forEach((connection) => {
          if (connection?.grammaticalCategory?.id) {
            this.categoriesWithPos.add(connection.grammaticalCategory.id);
          }
        });
        this.reloadDeclenstionConnections(lang, pos);
        console.log(this.categoriesWithPos);
      });
    }
  }

  private reloadDeclenstionConnections(lang: Language, pos: Pos) {
    console.log("reloadDeclenstionConnections", lang, pos);
    this.connectedCategories.clear();
    if (lang.id && pos.id) {
      this.declensionService.getDeclensionConnectionWithLangAndPos({
        languageId: lang.id,
        posId: pos.id
      }).subscribe((decls) => {
        decls.forEach((dcl) => {
          if (dcl?.grammaticalCategory?.id) {
            this.connectedCategories.set(dcl.grammaticalCategory.id, dcl);
          }
        });
        if (lang.id && pos.id)
          this.recalculateMatrix(lang.id, pos.id);
      });
    }
  }

  private reloadValues(lang: Language, categories: GrammaticalCategory[]) {
    this.languageValues.clear();
    categories.forEach((category) => {
      console.log("reloadValues", category);
      this.reloadValuesForCategory(lang, category);
    });
  }

  private reloadValuesForCategory(lang: Language, category: GrammaticalCategory) {
    const catId = category.id;
    if (lang.id && catId) {
      this.categoryService.getCategoryValuesByCategoryAndLang({
        langId: lang.id,
        categoryId: catId
      }).subscribe((values) => {
        this.languageValues.set(catId, values);
        console.log(this.languageValues);
      })
    }
  }

  private recalculateMatrix(langId: number, posId: number) {
    this.declensionService.getDeclensionsByLangAndPos({languageId: langId, posId: posId}).subscribe(matrix => {
      this.matrix = matrix;
    })
  }
}
