import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesService} from '../../../api/services/languages.service';
import {ListOfLanguagePhonemes} from '../../../api/models/list-of-language-phonemes';

@Component({
  selector: 'app-language-phonetics',
  templateUrl: './language-phonetics.component.html',
  styleUrls: ['./language-phonetics.component.css']
})
export class LanguagePhoneticsComponent implements OnInit, OnChanges {

  @Input() selectedLanguage?: Language;
  languageSounds?: ListOfLanguagePhonemes;

  constructor(private languagesService: LanguagesService) {

  }

  ngOnInit(): void {
    this.reloadLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage && changes.selectedLanguage.currentValue) {
      this.reloadLanguage();
    }
  }

  clicked(sound: string): void {
    console.log('clicked', sound);
    if (this.languageSounds && this.languageSounds.langId) {
      const find = this.languageSounds?.selectedMainPhonemes?.find(lp => lp.phoneme === sound);
      if (find && find.id) {
        this.languagesService.deleteLanguagePhoneme({phonemeId: find.id}).subscribe(() => {
          if (this.languageSounds) {
            this.languageSounds.selectedMainPhonemes = this.languageSounds?.selectedMainPhonemes?.filter(lp => lp.id !== find.id);
          }
        });
      } else {
        const findRest = this.languageSounds?.selectedRestPhonemes?.find(lp => lp.phoneme === sound);
        if (findRest && findRest.id) {
          this.languagesService.deleteLanguagePhoneme({phonemeId: findRest.id}).subscribe(() => {
            if (this.languageSounds) {
              this.languageSounds.selectedRestPhonemes = this.languageSounds?.selectedRestPhonemes?.filter(lp => lp.id !== findRest.id);
            }
          });
        } else {
          this.languagesService.saveLanguagePhoneme({body: sound, languageId: this.languageSounds.langId}).subscribe((data) => {
            this.languageSounds?.selectedMainPhonemes?.push(data);
          });
        }
      }
    }
  }

  private reloadLanguage(): void {
    this.languageSounds = undefined;
    if (this.selectedLanguage && this.selectedLanguage.id) {
      this.languagesService.getLanguagePhonemes({languageId: this.selectedLanguage?.id}).subscribe(data => {
        this.languageSounds = data;
      });
    }
  }

}
