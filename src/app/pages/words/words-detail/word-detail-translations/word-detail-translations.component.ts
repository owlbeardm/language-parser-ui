import {Component, Input, OnInit} from '@angular/core';
import {Translation} from '../../../../api/models/translation';
import {TranslationType} from '../../../../api/models/translation-type';
import {TranslationWordComponent} from "../../../../components/translation-word/translation-word.component";
import {TranslationTypePipe} from "../../../../pipes/translation-type.pipe";

@Component({
  selector: 'app-word-detail-translations',
  standalone: true,
  templateUrl: './word-detail-translations.component.html',
  styleUrls: ['./word-detail-translations.component.css'],
  imports: [TranslationWordComponent, TranslationTypePipe]
})
export class WordDetailTranslationsComponent implements OnInit {

  @Input() translations!: Translation[];

  constructor() {
  }

  get getTranslationLangs(): string[] {
    const map = this.translations
      ?.map(tr => tr.wordTo?.language ? tr.wordTo?.language : tr.phraseTo?.language)
      .map(lang => !!lang ? lang.displayName : 'Unknown');
    const result = [...new Set(map)];
    return !!result ? result : [];
  }

  getWordTranslationsTypes(languageName: string): TranslationType[] {
    return this.getTranslationTypes(true, languageName);
  }

  getPhraseTranslationsTypes(languageName: string): TranslationType[] {
    return this.getTranslationTypes(false, languageName);
  }

  getTranslationTypes(isWord: boolean, languageName: string): TranslationType[] {
    const map = this.translations
      ?.filter(tr => isWord
        ? (tr.wordTo && tr.wordTo.language?.displayName === languageName)
        : (tr.phraseTo && tr.phraseTo.language?.displayName === languageName))
      .map(tr => tr.type)
      .map(t => !!t ? t : TranslationType.General);
    const result = [...new Set(map)];
    return !!result ? result : [];
  }

  getTranslationForWordAndType(translationType: TranslationType, isWord: boolean, languageName: string): Translation[] {
    const map = this.translations
      ?.filter(tr => (isWord
        ? (tr.wordTo && tr.wordTo.language?.displayName === languageName)
        : (tr.phraseTo && tr.phraseTo.language?.displayName === languageName)) && tr.type === translationType);
    return !!map ? map : [];
  }

  ngOnInit(): void {
  }
}
