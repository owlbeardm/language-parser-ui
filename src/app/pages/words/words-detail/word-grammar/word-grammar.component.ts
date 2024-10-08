import {Component, Input, OnInit} from '@angular/core';
import {WordWithWritten} from "../../../../api/models/word-with-written";
import {GrammaticalCategory} from "../../../../api/models/grammatical-category";
import {GrammaticalCategoryValue} from "../../../../api/models/grammatical-category-value";
import {GrammaticalValueWordConnection} from "../../../../api/models/grammatical-value-word-connection";
import {CategoryService} from "../../../../api/services/category.service";
import {WordDeclensionsComponent} from "./word-declensions/word-declensions.component";
import {WordGrammarCategoryComponent} from "./word-grammar-category/word-grammar-category.component";
import {CommonModule} from "@angular/common";
import {WrittenWordPipe} from "../../../../pipes/written-word.pipe";

@Component({
  selector: 'app-word-grammar[word]',
  standalone: true,
  templateUrl: './word-grammar.component.html',
  styleUrls: ['./word-grammar.component.css'],
  imports: [CommonModule, WordDeclensionsComponent, WordGrammarCategoryComponent, WrittenWordPipe]
})
export class WordGrammarComponent implements OnInit {

  @Input() word!: WordWithWritten;
  categoryValues = new Map<GrammaticalCategory, GrammaticalCategoryValue[]>();
  categoryConnections = new Map<number, boolean>();
  wordValues: GrammaticalValueWordConnection[] = [];
  isEditCategories: boolean = false;

  constructor(private categoryService: CategoryService) {
  }

  get categories() {
    return [...this.categoryValues.keys()].sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name));
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      categories.forEach((category) => {
        this.categoryValues.set(category, []);
        if (category.id && this.word.language?.id)
          this.categoryService.getCategoryValuesByCategoryAndLang({
            categoryId: category.id,
            langId: this.word.language.id
          }).subscribe((values) => {
            this.categoryValues.set(category, values);
          });
        if (this.word.language?.id && category.id)
          this.categoryService.getGrammaticalCategoryConnectionsForLang({
            categoryId: category.id,
            languageId: this.word.language.id
          }).subscribe((gcc) => {
            if (category.id)
              this.categoryConnections.set(category.id, !!gcc.find((gccv) => gccv?.pos?.id === this.word.partOfSpeech?.id));
          });

      });
    });

    this.reloadWordValues();
  }

  save() {
    this.reloadWordValues();
    this.isEditCategories = false;
  }

  getWordCategoryValue(c: GrammaticalCategory): GrammaticalCategoryValue | undefined {
    const value = this.wordValues?.find((vw) => vw.value?.category?.id == c.id)?.value;
    return value == null ? undefined : value;
  }

  isValueConnected(wv: GrammaticalValueWordConnection | undefined): boolean {
    return this.isCategoryConnected(wv?.value?.category);
  }

  isCategoryConnected(c: GrammaticalCategory | undefined): boolean {
    return !!c?.id && !!this.categoryConnections.get(c.id);
  }

  private reloadWordValues() {
    if (this.word.id)
      this.categoryService.getGrammaticalValuesByWord({wordId: this.word.id}).subscribe((values) => {
        this.wordValues = values;
      });
  }
}
