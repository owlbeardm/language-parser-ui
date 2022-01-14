import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesService} from '../../../api/services/languages.service';

@Component({
  selector: 'app-trace-language-recursive',
  templateUrl: './trace-language-recursive.component.html',
  styleUrls: ['./trace-language-recursive.component.css']
})
export class TraceLanguageRecursiveComponent implements OnInit {

  languages: Language[] = [];
  availableLanguagesTo: Language[][] = [];
  @Output() routeChanged: EventEmitter<Language[]> = new EventEmitter<Language[]>();


  constructor(private languagesService: LanguagesService) {
  }

  ngOnInit(): void {
    this.availableLanguagesTo = [];
    this.languagesService.getAllLanguages().subscribe(languages => {
      this.availableLanguagesTo.push(languages);
    });
  }

  changeLanguage(langId: number, newLang: Language): void {
    console.log('changeLanguage', langId, newLang, this.availableLanguagesTo);
    this.availableLanguagesTo.splice(langId + 1, this.availableLanguagesTo.length - langId - 1);
    this.languages.splice(langId + 1, this.availableLanguagesTo.length - langId - 1);
    console.log('changeLanguage', langId, newLang, this.availableLanguagesTo);
    this.languagesService.getAllLanguagesFrom({fromId: newLang.id}).subscribe(languages => {
      this.availableLanguagesTo[langId + 1] = languages;
    });
  }

}
