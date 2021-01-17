import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Language } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class LangService implements OnDestroy, OnInit {

  langs: Language[];
  pos: String[];

  constructor(apiService: ApiService) {
    this.langs = [];
    apiService.getLanguages().subscribe((langs) => this.langs = langs);
    this.pos = [];
    apiService.getPartsOfSpeech().subscribe((pos) => this.pos = pos);
  }

  ngOnInit(): void {
    console.log("LangService onInit")
  }

  ngOnDestroy(): void {
    console.log("LangService onDestroy")
  }

  shortPOS(pos: String) {
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
}
