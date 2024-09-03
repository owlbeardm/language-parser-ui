import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {WordOriginType} from '../../../api/models/word-origin-type';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';

@Component({
  selector: 'app-word-new',
  standalone: true,
  templateUrl: './word-new.component.html',
  styleUrls: ['./word-new.component.css']
})
export class WordNewComponent implements OnInit {
  language?: Language;
  languageFrom: Language = {displayName: 'empty'};
  languagesFrom: Language[] = [];
  wordOriginType = WordOriginType;
  typeKeys = Object.keys(WordOriginType);
  type: WordOriginType | string = this.typeKeys[0];

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    console.log(this.type);
    console.log(this.wordOriginType);
    console.log(this.typeKeys);
  }

  changeLanguageTo(idFrom: number | undefined, type: WordOriginType | string): void {
    if (idFrom) {
      this.languagesEvolutionService.getConnectionToLang({toLangId: idFrom}).subscribe((connections) => {
        this.languagesFrom = connections
          .filter((connection) => (connection.connectionType === LanguageConnectionType.Evolving && type === 'Evolved')
            || (connection.connectionType === LanguageConnectionType.Borrowing && type === 'Borrowed'))
          .map((connection) => connection.langFrom).filter((l) => !!l).map((l) => {
            const lang: Language = {displayName: 'empty'};
            return !!l ? l : lang;
          });
      });
    }
  }

  changeLanguage(param: { langId: number | undefined }): void {
    if (param.langId) {
      this.changeLanguageTo(param.langId, this.type);
    }
  }

  typeChanged(param: { type: WordOriginType }): void {
    console.log(param.type);
    this.changeLanguageTo(this.language?.id, param.type);
  }

  langFromChanged(lang: Language): void {
    console.log(JSON.stringify(lang));
  }

  getstr(o: any): string {
    return JSON.stringify(o);
  }
}
