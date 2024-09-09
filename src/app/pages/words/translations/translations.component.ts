import {Component} from '@angular/core';
import {Language} from '../../../api/models/language';
import {PageResultWordWithTranslations} from '../../../api/models/page-result-word-with-translations';
import {LanguagesService} from '../../../api/services/languages.service';
import {TranslationService} from '../../../api/services/translation.service';
import {TranslationListFilter} from '../../../api/models/translation-list-filter';
import {ListPaginatorComponent} from "../../../components/list/list-paginator/list-paginator.component";
import {TranslationLineComponent} from "./translation-line/translation-line.component";
import {FormsModule} from "@angular/forms";
import {AllLanguagesComponent} from "../../../components/selectors/all-languages/all-languages.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-translations',
  standalone: true,
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css'],
  imports: [AllLanguagesComponent, ListPaginatorComponent, TranslationLineComponent, FormsModule, NgForOf]
})
export class TranslationsComponent {

  words: PageResultWordWithTranslations = {};
  languageFrom: Language | undefined;
  wordSearch: string | undefined;
  languageTo: Language | undefined;
  translationSearch: string | undefined;
  // languages: Language[] = [];
  // poses: Pos[] = [];
  pageSize = 20;

  constructor(private translationService: TranslationService, private languageService: LanguagesService) {
  }

  ngOnInit(): void {
  }

  load(filter: TranslationListFilter): void {
    this.translationService.getAllWordsWithTranslationsFromLang1({filter}).subscribe(
      (translations) => {
        if (translations.data) {
          this.words = translations;
        }
      }
    );
  }

  loadDefault(filter: TranslationListFilter | undefined): void {
    console.log('loadDefault', filter, this.languageFrom, this.languageTo, this.wordSearch, this.translationSearch);
    if (!filter) {
      filter = {};
    }
    filter = {
      page: filter.page ? filter.page : undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      translation: filter.translation ? filter.translation : filter.translation === '' ? undefined : this.translationSearch,
      languageFromId: filter.languageFromId ? filter.languageFromId : filter.languageFromId === null ? undefined : this.languageFrom?.id,
      languageToId: filter.languageToId ? filter.languageToId : filter.languageToId === null ? undefined : this.languageTo?.id,
    };
    this.load(filter);
  }

  resetFilter(): void {
    this.languageFrom = undefined;
    this.languageTo = undefined;
    this.wordSearch = undefined;
    this.translationSearch = undefined;
    this.loadDefault({});
  }

}
