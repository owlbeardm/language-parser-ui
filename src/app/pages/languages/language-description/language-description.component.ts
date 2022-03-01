import {Component} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {LanguagesService} from '../../../api/services/languages.service';

@Component({
  selector: 'app-language-description',
  templateUrl: './language-description.component.html',
  styleUrls: ['./language-description.component.css']
})
export class LanguageDescriptionComponent extends AbstractHasLanguageComponent {
  editComment = false;
  canUpdate = false;

  constructor(private languagesService: LanguagesService) {
    super();
  }

  saveChanges(): void {
    if (this.selectedLanguage) {
      this.languagesService.saveLanguage({body: this.selectedLanguage}).subscribe((langResponse) => {
        this.canUpdate = false;
      });
    }
  }

  clickEditComment(): void {
    this.editComment = true;
  }

  clickSaveComment(): void {
    this.editComment = false;
  }

  deleteLanguage(): void {
    console.log(this.selectedLanguage?.id)
    if (this.selectedLanguage?.id) {
      this.languagesService.deleteLanguage({languageId: this.selectedLanguage?.id}).subscribe(() => {
        alert('Language deleted');
      });
    }
  }
}
