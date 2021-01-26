import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { LanguageName, PartOfSpeech } from '../api/models';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class LangService implements OnDestroy, OnInit {


  constructor(apiService: ApiService) {
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
