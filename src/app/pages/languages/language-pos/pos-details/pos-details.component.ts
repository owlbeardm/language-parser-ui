import {Component, Input} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {LanguagesService} from '../../../../api/services/languages.service';
import {Pos} from '../../../../api/models/pos';

@Component({
  selector: 'app-pos-details',
  templateUrl: './pos-details.component.html',
  styleUrls: ['./pos-details.component.css']
})
export class PosDetailsComponent extends AbstractHasLanguageComponent {

  @Input() selectedPos?: Pos;
  editComment = false;
  canUpdate = false;

  constructor(private languagesService: LanguagesService) {
    super();
  }

  saveChanges(): void {
    if (this.selectedPos) {
      // this.languagesService.saveLanguage({body: this.selectedLanguage}).subscribe((langResponse) => {
      //   this.canUpdate = false;
      // });
    }
  }

  clickEditComment(): void {
    this.editComment = true;
  }

  clickSaveComment(): void {
    this.editComment = false;
  }

}
