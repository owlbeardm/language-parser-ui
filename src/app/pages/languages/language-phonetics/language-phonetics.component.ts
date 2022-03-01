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

  private reloadLanguage(): void {
    this.languageSounds = undefined;
    if (this.selectedLanguage && this.selectedLanguage.id) {
      this.languagesService.getLanguagePhonemes({languageId: this.selectedLanguage?.id}).subscribe(data => {
        this.languageSounds = data;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage && changes.selectedLanguage.currentValue) {
      this.reloadLanguage();
    }
  }

  // getClass(sound: string): string {
  //   console.log('languageSounds: ' + this.languageSounds);
  //   if (this.languageSounds) {
  //     if (this.languageSounds.includes(sound)) {
  //       return 'text-green-dull';
  //     }
  //   }
  //   // text-grey-dull
  //   // text-red-dull
  //   // text-yellow-dull
  //   // text-green-dull
  //   return 'text-red-dull';
  // }

}
