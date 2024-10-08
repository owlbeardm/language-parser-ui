import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesService} from '../../../api/services/languages.service';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-trace-language-recursive',
  standalone: true,
  templateUrl: './trace-language-recursive.component.html',
  styleUrls: ['./trace-language-recursive.component.css'],
  imports: [FormsModule, NgFor, NgIf]
})
export class TraceLanguageRecursiveComponent implements OnInit {

  languages: Language[] = [];
  languagesRoutes: Language[][][] = [];
  availableLanguagesTo: Language[][] = [];
  @Output() routeChanged: EventEmitter<Language[]> = new EventEmitter<Language[]>();


  constructor(private languagesService: LanguagesService, private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    this.availableLanguagesTo = [];
    this.languagesService.getAllLanguages().subscribe(languages => {
      this.availableLanguagesTo.push(languages.sort((a, b) => a.displayName.localeCompare(b.displayName)));
    });
  }

  changeLanguage(langId: number, newLang: Language): void {
    console.log('changeLanguage', langId, newLang, this.availableLanguagesTo);
    this.availableLanguagesTo.splice(langId + 1, this.availableLanguagesTo.length - langId - 1);
    this.languages.splice(langId + 1, this.availableLanguagesTo.length - langId - 1);
    this.languagesRoutes.splice(langId + 1, this.availableLanguagesTo.length - langId - 1);
    console.log('changeLanguage', langId, newLang, this.availableLanguagesTo);
    if (newLang.id) {
      this.languagesEvolutionService.getAllLanguagesFrom({fromId: newLang.id}).subscribe(languages => {
        this.availableLanguagesTo[langId + 1] = languages;
      });
    }
    const langprevid = this.languages[langId - 1].id;
    if (langId > 0 && newLang.id && langprevid) {
      this.languagesEvolutionService.getAllRoutes({fromId: langprevid, toId: newLang.id}).subscribe(languages => {
        console.log('changeLanguage', languages);
        this.languagesRoutes[langId] = languages;
        const fullRoute = this.languagesRoutes.reduce((acc, curr, idx) =>
          idx > langId ? acc : acc.concat(curr[0].slice(1)), [this.languages[0]]);
        this.routeChanged.emit(fullRoute);
      });
    }
  }

}
