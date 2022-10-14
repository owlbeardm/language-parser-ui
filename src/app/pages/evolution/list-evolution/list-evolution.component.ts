import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {Word} from '../../../api/models/word';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {WordWithEvolutionsListFilter} from '../../../api/models/word-with-evolutions-list-filter';
import {PageResultWordWithEvolution} from '../../../api/models/page-result-word-with-evolution';
import {WordWithEvolution} from '../../../api/models/word-with-evolution';
import {WordToEvolve} from '../../../api/models';
import {WordsService} from '../../../api/services/words.service';

@Component({
  selector: 'app-list-evolution',
  templateUrl: './list-evolution.component.html',
  styleUrls: ['./list-evolution.component.css']
})
export class ListEvolutionComponent implements OnInit {
  words: PageResultWordWithEvolution = {};
  languageFrom: Language | undefined;
  languageTo: Language | undefined;
  wordSearch: string | undefined;
  pageSize = 250;
  withoutForgotten = true;
  onlyUnevolved = false;


  constructor(private languagesEvolutionService: LanguagesEvolutionService, private wordsService: WordsService) {
  }

  private static wordWEtoWTE(wordWithEvolution: WordWithEvolution): WordToEvolve {
    return {
      languageConnection: wordWithEvolution.languageConnection,
      word: wordWithEvolution.word
    };
  }

  ngOnInit(): void {
  }

  load(filter: WordWithEvolutionsListFilter): void {
    this.languagesEvolutionService.getAllWordsWithEvolutions({filter}).subscribe(
      (words) => {
        this.words = words;
      }
    );
  }

  loadDefault(filter: WordWithEvolutionsListFilter | undefined): void {
    if (!filter) {
      filter = {};
    }
    filter = {
      page: filter.page ? filter.page : undefined,
      size: filter.size ? filter.size : this.pageSize,
      word: filter.word ? filter.word : filter.word === '' ? undefined : this.wordSearch,
      languageFromId: filter.languageFromId ? filter.languageFromId : filter.languageFromId === null ? undefined : this.languageFrom?.id,
      languageToId: filter.languageToId ? filter.languageToId : filter.languageToId === null ? undefined : this.languageTo?.id,
      canBeForgotten: !this.withoutForgotten,
    };
    this.load(filter);
  }

  resetFilter(): void {
    this.languageFrom = undefined;
    this.languageTo = undefined;
    this.wordSearch = undefined;
    this.loadDefault({});
  }

  forget(word: Word | undefined): void {
    if (word) {
      word.forgotten = !word.forgotten;
      console.log("forget word", word.forgotten, word);
      this.wordsService.addWord({body: word}).subscribe((w) => {
        if (this.withoutForgotten) {
          this.loadDefault(undefined);
        } else {
          this.words.data?.forEach((wwe) => {
            const wrd = wwe.word;
            if (wrd && wrd.id === w.id) {
              wrd.forgotten = w.forgotten;
              wrd.id = w.id;
              wrd.word = w.word;
              wrd.language = w.language;
              wrd.partOfSpeech = w.partOfSpeech;
              wrd.version = w.version;
            }
          });
        }
      });
    }
  }

  evolveSingleWord(wordWithEvolution: WordWithEvolution): void {
    const body = ListEvolutionComponent.wordWEtoWTE(wordWithEvolution);
    this.languagesEvolutionService.addEvolvedWord({body}).subscribe((newWordWithEvolution) => {
      wordWithEvolution.word = newWordWithEvolution.word;
      wordWithEvolution.wordEvolved = newWordWithEvolution.wordEvolved;
      wordWithEvolution.calculatedEvolution = newWordWithEvolution.calculatedEvolution;
      wordWithEvolution.wordEvolvedType = newWordWithEvolution.wordEvolvedType;
      wordWithEvolution.languageConnection = newWordWithEvolution.languageConnection;
    });
  }

  filterWithoutForgotten(): void {
    this.withoutForgotten = !this.withoutForgotten;
    this.loadDefault(undefined);
  }

  filterOnlyUnevolved(): void {
    this.onlyUnevolved = !this.onlyUnevolved;
  }

  evolvePage(): void {
    if (this.words.data) {
      const body = this.words.data
        .filter((wwe) => !wwe.word?.forgotten && (!wwe.wordEvolved || wwe.wordEvolved.word !== wwe.calculatedEvolution))
        .map((wwe) => ListEvolutionComponent.wordWEtoWTE(wwe));
      console.log(body);
      this.languagesEvolutionService.addEvolvedWord1({body}).subscribe(() => {
        this.loadDefault(undefined);
      });
    }
  }
}
