import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  }

  changeLanguage(langId: number, newLang: Language): void {
    this.selectedLanguageChange.emit(this.selectedLanguage);
  }

}
