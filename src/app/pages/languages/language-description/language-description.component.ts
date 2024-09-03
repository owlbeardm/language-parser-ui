import {Component, EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {LanguagesService} from '../../../api/services/languages.service';

@Component({
  selector: 'app-language-description',
  standalone: true,
  templateUrl: './language-description.component.html',
  styleUrls: ['./language-description.component.css']
})
export class LanguageDescriptionComponent extends AbstractHasLanguageComponent implements OnChanges {
  editComment = false;
  canUpdate = false;
  canDelete = false;
  @Output() onDeleteLanguage = new EventEmitter<number>();

  constructor(private languagesService: LanguagesService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage.currentValue) {
      console.log(changes, changes.selectedLanguage.currentValue.id, this.selectedLanguage?.id);
      this.refresh();
    }
  }

  saveChanges(): void {
    if (this.selectedLanguage) {
      this.languagesService.saveLanguage({body: this.selectedLanguage}).subscribe((langResponse) => {
        this.canUpdate = false;
        this.editComment = false;
      });
    }
  }

  deleteLanguage(): void {
    if (this.selectedLanguage?.id) {
      this.onDeleteLanguage.emit(this.selectedLanguage.id);
    }
  }

  private refresh(): void {
    this.canUpdate = false;
    this.editComment = false;
    this.canDelete = false;
    if (this.selectedLanguage?.id) {
      this.languagesService.canDeleteLanguage({languageId: this.selectedLanguage?.id}).subscribe((canDelete) => {
        this.canDelete = canDelete;
      });
    }
  }
}
