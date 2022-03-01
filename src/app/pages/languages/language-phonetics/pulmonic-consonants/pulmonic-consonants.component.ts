import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {timer} from 'rxjs';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {LanguagesService} from '../../../../api/services/languages.service';

@Component({
  selector: 'app-pulmonic-consonants',
  templateUrl: './pulmonic-consonants.component.html',
  styleUrls: ['./pulmonic-consonants.component.css']
})
export class PulmonicConsonantsComponent implements OnInit, OnChanges {

  @Input() languageSounds?: ListOfLanguagePhonemes;

  constructor(private cdRef: ChangeDetectorRef, private languagesService: LanguagesService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('pulmonic consonants changes', changes);
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
        this.languagesService.saveLanguagePhoneme({body: sound, languageId: this.languageSounds.langId}).subscribe((data) => {
          this.languageSounds?.selectedMainPhonemes?.push(data);
        });
      }
    }
  }

}
