import {ChangeDetectorRef, Component} from '@angular/core';
import {Language} from '../../../api/models/language';
import {PageResultWordWithTranslations} from '../../../api/models/page-result-word-with-translations';
import {LanguagesService} from '../../../api/services/languages.service';
import {TranslationService} from '../../../api/services/translation.service';
import {TranslationListFilter} from '../../../api/models/translation-list-filter';
import {WordWithTranslations} from '../../../api/models/word-with-translations';
import {TranslationType} from '../../../api/models/translation-type';
import {Translation} from '../../../api/models/translation';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
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

  getTranslationTypes(word: WordWithTranslations, isWord: boolean): TranslationType[] {
    const map = word
      .translations
      ?.filter(tr => isWord ? !!tr.wordTo : !!tr.phraseTo)
      .map(tr => tr.type)
      .map(t => !!t ? t : TranslationType.General);
    const result = [...new Set(map)];
    return !!result ? result : [];
  }

  getTranslationForWordAndType(word: WordWithTranslations, translationType: TranslationType, isWord: boolean): Translation[] {
    const map = word
      .translations
      ?.filter(tr => (isWord ? !!tr.wordTo : !!tr.phraseTo) && tr.type === translationType);
    return !!map ? map : [];
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
