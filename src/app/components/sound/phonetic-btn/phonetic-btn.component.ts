import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IpaService} from '../../../services/ipa.service';
import {ListOfLanguagePhonemes} from '../../../api/models/list-of-language-phonemes';

@Component({
  selector: 'app-phonetic-btn',
  templateUrl: './phonetic-btn.component.html',
  styleUrls: ['./phonetic-btn.component.css']
})
export class PhoneticBtnComponent implements OnInit {

  @Input() phonetic!: string;
  @Input() vowel = false;
  @Input() consonant = false;
  @Input() languageSounds?: ListOfLanguagePhonemes;
  @Output() onClick = new EventEmitter<string>();
  constonantVariants: string[];

  constructor(private ipaService: IpaService) {
    this.constonantVariants = ipaService.getConsonantVariants();
  }

  ngOnInit(): void {
  }

  getClass(sound: string): string {
    if (this.languageSounds?.selectedMainPhonemes?.filter(lp => lp.phoneme === sound).length
      || this.languageSounds?.selectedRestPhonemes?.filter(lp => lp.phoneme === sound).length) {
      if (this.languageSounds?.usedMainPhonemes?.includes(sound) || this.languageSounds?.restUsedPhonemes?.includes(sound)) {
        return 'text-green-dull';
      } else {
        return 'text-yellow-dull';
      }
    } else {
      if (this.languageSounds?.usedMainPhonemes?.includes(sound) || this.languageSounds?.restUsedPhonemes?.includes(sound)) {
        return 'text-red-dull';
      } else {
        return 'text-grey-dull';
      }
    }
  }

  includesVariant(sound: string): boolean {
    return !!(this.languageSounds?.usedMainPhonemes?.includes(sound)
      || this.languageSounds?.restUsedPhonemes?.includes(sound)
      || this.languageSounds?.selectedMainPhonemes?.filter(lp => lp.phoneme === sound).length
      || this.languageSounds?.selectedRestPhonemes?.filter(lp => lp.phoneme === sound).length);
  }
}
