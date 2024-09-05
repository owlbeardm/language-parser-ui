import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {PhoneticBtnComponent} from "../../../../components/sound/phonetic-btn/phonetic-btn.component";

@Component({
  selector: 'app-vowels',
  standalone: true,
  templateUrl: './vowels.component.html',
  styleUrls: ['./vowels.component.css'],
  imports: [PhoneticBtnComponent]
})
export class VowelsComponent implements OnInit {

  @Input() languageSounds?: ListOfLanguagePhonemes;
  @Output() onClick = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clicked(sound: string): void {
    this.onClick.emit(sound);
  }

  getRestPhonemes(): string[] {
    if (this.languageSounds && this.languageSounds.restUsedPhonemes) {
      const result = this.languageSounds.restUsedPhonemes.concat([]);
      this.languageSounds.selectedRestPhonemes?.forEach(value => {
        if (value.phoneme) {
          result.push(value.phoneme);
        }
      });
      return result
        .sort()
        .filter(sound => sound.trim() !== '')
        .filter(sound => sound.includes('̯'))
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
    }
    return [];
  }
}
