import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesService} from '../../../api/services/languages.service';

@Component({
  selector: 'app-trace-language-recursive',
  templateUrl: './trace-language-recursive.component.html',
  styleUrls: ['./trace-language-recursive.component.css']
})
export class TraceLanguageRecursiveComponent implements OnInit {

  @Input() label: string | undefined;
  @Input() languageFrom?: Language;
  @Input() selectedLanguage?: Language;
  @Output() selectedLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();
  allLanguages: Language[] = [];

  constructor(private languagesService: LanguagesService) {
  }

  ngOnInit(): void {
    if (!!this.languageFrom) {
      this.languagesService.getAllLanguagesFrom({from: this.languageFrom}).subscribe(
        (languages: Language[]) => {
          this.allLanguages = languages;
        }
      );
    }
  }

  changeLanguage(): void {
    this.selectedLanguageChange.emit(this.selectedLanguage);
  }

}
