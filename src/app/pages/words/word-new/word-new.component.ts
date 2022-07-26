import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {WordOriginType} from '../../../api/models/word-origin-type';
import {Pos} from '../../../api/models/pos';
import {PosService} from '../../../api/services/pos.service';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';

@Component({
  selector: 'app-word-new',
  templateUrl: './word-new.component.html',
  styleUrls: ['./word-new.component.css']
})
export class WordNewComponent implements OnInit {
  language?: Language;
  languageTo?: Language;
  languagesTo: Language[] = [];
  wordOriginType = WordOriginType;
  typeKeys = Object.keys(WordOriginType);
  type: WordOriginType | string = this.typeKeys[0];
  poses: Pos[] = [];

  constructor(private posService: PosService, private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    console.log(this.type);
    console.log(this.wordOriginType);
    console.log(this.typeKeys);
  }

  changeLanguageTo(idFrom: number | undefined, type: WordOriginType | string): void {
    if (idFrom) {
      this.languagesEvolutionService.getConnectionFromLang({fromLangId: idFrom}).subscribe((connections) => {
        this.languagesTo = connections
          .filter((connection) => (connection.connectionType === LanguageConnectionType.Evolving && type === 'Evolved')
            || (connection.connectionType === LanguageConnectionType.Borrowing && type === 'Borrowed'))
          .map((connection) => connection.langTo).filter((l) => !!l).map((l) => {
            const lang: Language = {displayName: 'empty'};
            return !!l ? l : lang;
          });
      });
    }
  }

  changeLanguage(param: { langId: number | undefined }): void {
    if (param.langId) {
      this.changeLanguageTo(param.langId, this.type);
      this.posService.getAllPosByLanguage({languageId: param.langId}).subscribe(poses => {
        this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
      });
    } else {
      this.poses = [];
    }
  }

  typeChanged(param: { type: WordOriginType }): void {
    console.log(param.type);
    this.changeLanguageTo(this.language?.id, param.type);
  }

  langToChanged(param: { lang: Language }): void {
    console.log(param.lang);
  }
}
