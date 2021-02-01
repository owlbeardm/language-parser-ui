import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageName, PartOfSpeech } from '../api/models';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class LangService implements OnDestroy, OnInit {

  private _selectedLanguage = new BehaviorSubject<LanguageName | undefined>(undefined);
  private dataStore: { selectedLanguage: LanguageName | undefined } = { selectedLanguage: undefined };
  readonly selectedLanguage = this._selectedLanguage.asObservable();


  constructor(apiService: ApiService) {
  }

  changeSelectedLanguage(selectedLanguage?: LanguageName) {
    this.dataStore.selectedLanguage = selectedLanguage;
    this._selectedLanguage.next(Object.assign({}, this.dataStore).selectedLanguage);
  }

  ngOnInit(): void {
    console.log("LangService onInit")
  }

  ngOnDestroy(): void {
    console.log("LangService onDestroy")
  }

  shortPOS(pos: String | PartOfSpeech) {
    console.log(pos);
    if (pos == "Adjective") return "adj.";
    if (pos == "Adverb") return "adv.";
    if (pos == "Conjunction") return "cnj.";
    if (pos == "Determiner") return "det.";
    if (pos == "Noun") return "n.";
    if (pos == "Numeral") return "num.";
    if (pos == "Preposition") return "prep.";
    if (pos == "Pronoun") return "pn.";
    if (pos == "Verb") return "v.";
    if (pos == "Prefix") return "prefix";
    if (pos == "Suffix") return "suffix";
    return pos;
  }

  isValidLanguageName(value: string): value is LanguageName {
    if (value as LanguageName) {
      return true;
    } else {
      return false;
    }
  }

  isValidLanguageNameSequence(values: string[]): values is Array<LanguageName> {
    return values.every(this.isValidLanguageName);
  }
}
