import {Component, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';
import {Pos} from '../../../api/models/pos';
import {PosService} from '../../../api/services/pos.service';

@Component({
  selector: 'app-word-new',
  templateUrl: './word-new.component.html',
  styleUrls: ['./word-new.component.css']
})
export class WordNewComponent implements OnInit {
  language?: Language;
  languageTo?: Language;
  languageConnectionType = LanguageConnectionType;
  typeKeys = Object.keys(LanguageConnectionType);
  type: LanguageConnectionType | string = this.typeKeys[0];
  poses: Pos[] = [];

  constructor(private posService: PosService) {
  }

  ngOnInit(): void {
    console.log(this.type);
    console.log(this.languageConnectionType);
    console.log(this.typeKeys);
  }

  changeLanguage(param: { langId: number | undefined }): void {
    if (param.langId) {
      this.posService.getAllPosByLanguage({languageId: param.langId}).subscribe(poses => {
        this.poses = poses.sort((a, b) => a.name ? a.name.localeCompare(b.name ? b.name : '') : -1);
      });
    } else {
      this.poses = [];
    }
  }

  changeLanguageFrom(param: { languageFromId: number | undefined }): void {
  }

  typeChanged(param: { type: LanguageConnectionType }): void {
    console.log(param.type);
  }


}
