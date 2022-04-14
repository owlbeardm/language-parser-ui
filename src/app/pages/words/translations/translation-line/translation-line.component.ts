import {Component, Input, OnInit} from '@angular/core';
import {WordWithTranslations} from '../../../../api/models/word-with-translations';
import {TranslationType} from '../../../../api/models/translation-type';
import {Translation} from '../../../../api/models/translation';
import {Pos} from '../../../../api/models/pos';
import {PosService} from '../../../../api/services/pos.service';
import {Language} from '../../../../api/models/language';
import {PageResultWordWithWritten} from '../../../../api/models/page-result-word-with-written';
import {WordsService} from '../../../../api/services/words.service';
import {WordWithWritten} from '../../../../api/models/word-with-written';
import {TranslationService} from '../../../../api/services/translation.service';

@Component({
  selector: 'tbody[app-translation-line]',
  templateUrl: './translation-line.component.html',
  styleUrls: ['./translation-line.component.css']
})
export class TranslationLineComponent implements OnInit {

  poses: Pos[] = [];
  wordsForTranslation: PageResultWordWithWritten = {};
  @Input() word!: WordWithTranslations;
  @Input() languageToFilter?: Language;
  editMode = false;
  language: Language | undefined;
  pos: Pos | undefined;
  wordTranslation: string | undefined;
  addAsPhrase = false;


  constructor(private posService: PosService, private wordsService: WordsService, private translationService: TranslationService) {
  }

  ngOnInit(): void {
  }

  getTranslationTypes(isWord: boolean, languageName: string): TranslationType[] {
    const map = this.word
      .translations
      ?.filter(tr => isWord
        ? (tr.wordTo && tr.wordTo.language?.displayName === languageName)
        : (tr.phraseTo && tr.phraseTo.language?.displayName === languageName))
      .map(tr => tr.type)
      .map(t => !!t ? t : TranslationType.General);
    const result = [...new Set(map)];
    return !!result ? result : [];
  }

  getLanguageRowspans(languageName: string): number {
    return this.getTranslationTypes(true, languageName).length + this.getTranslationTypes(false, languageName).length;
  }

  getTranslationLangs(): string[] {
    const map = this.word
      .translations
      // ?.filter(tr => isWord ? !!tr.wordTo : !!tr.phraseTo)
      ?.map(tr => tr.wordTo?.language ? tr.wordTo?.language : tr.phraseTo?.language)
      .map(lang => !!lang ? lang.displayName : 'Unknown');
    const result = [...new Set(map)];
    return !!result ? result : [];
  }

  getTranslationForWordAndType(translationType: TranslationType, isWord: boolean, languageName: string): Translation[] {
    const map = this.word
      .translations
      ?.filter(tr => (isWord
        ? (tr.wordTo && tr.wordTo.language?.displayName === languageName)
        : (tr.phraseTo && tr.phraseTo.language?.displayName === languageName)) && tr.type === translationType);
    return !!map ? map : [];
  }

  changeLanguage(lang: Language): void {
    console.log(lang);
    this.pos = undefined;
    if (lang?.id) {
      this.posService.getAllPosByLanguage({languageId: lang?.id}).subscribe(poses => {
        this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
        if (this.word.partOfSpeech?.id) {
          poses.forEach((p) => {
            if (this.word.partOfSpeech?.id === p.id) {
              this.pos = p;
              this.changePos(p, lang);
            }
          });
        }
      });
    }
  }

  changePos(pos: Pos, language = this.language): void {
    console.log('changePos', pos, 'lang', language);
    if (language) {
      this.loadWordsTranslations(pos, language);
    }
  }

  startAddTranslation(): void {
    this.editMode = true;
    if (this.languageToFilter) {
      this.language = this.languageToFilter;
      console.log('start add translation', this.language);
    }
  }

  loadWordsTranslations(pos = this.pos, language = this.language, wordTranslation = this.wordTranslation): void {
    console.log('loadWordsTranslations', pos, 'lang', language, 'wordTranslation', wordTranslation);
    if (language && wordTranslation) {
      this.wordsService.getAllWords({
        filter: {
          word: wordTranslation,
          languageId: language?.id,
          posId: pos?.id,
        }
      }).subscribe(
        (words) => {
          this.wordsForTranslation = words;
        }
      );
    }
  }

  changedWordTranslation(word: string): void {
    this.loadWordsTranslations(this.pos, this.language, word);
  }

  addTranslationWord(word: WordWithWritten): void {
    const translation: Translation = {
      type: TranslationType.General,
      wordTo: word,
      wordFrom: this.word
    };
    this.addTranslation(translation);
  }

  addNewTranslation(): void {
    this.refreshEdit();
  }

  deleteTranslation(translation: Translation): void {
    if (translation.id) {
      this.translationService.deleteTranslation({id: translation.id}).subscribe(() => {
        this.word.translations = this.word.translations?.filter((tr) => tr.id !== translation.id);
        this.refreshEdit();
      });
    }
  }

  cancelTranslation(): void {
    this.refreshEdit();
  }

  private addTranslation(t: Translation): void {
    this.translationService.addTranslation({body: t}).subscribe(() => {
        if (this.word.id) {
          this.translationService.getTranslationsForWord({id: this.word.id}).subscribe((translations) => {
            this.word.translations = translations;
            this.refreshEdit();
          });
        } else {
          this.refreshEdit();
        }
      }
    );
  }

  private refreshEdit(): void {
    this.language = undefined;
    this.pos = undefined;
    this.wordTranslation = undefined;
    this.editMode = false;
    this.wordsForTranslation = {};
  }
}
