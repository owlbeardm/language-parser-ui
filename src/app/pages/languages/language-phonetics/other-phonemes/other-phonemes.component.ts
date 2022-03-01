import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-other-phonemes',
  templateUrl: './other-phonemes.component.html',
  styleUrls: ['./other-phonemes.component.css']
})
export class OtherPhonemesComponent implements OnInit {

  @Input() languageSounds?: ListOfLanguagePhonemes;
  @Output() onClick = new EventEmitter<string>();
  soundForm = this.formBuilder.group({
    newSound: ''
  });

  constructor(private formBuilder: FormBuilder) {
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
        .filter(sound => !sound.includes('̯'))
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
    }
    return [];
  }

  addNewSound(): void {
    const sound = this.soundForm.value.newSound;
    this.onClick.emit(sound);
    // const find = this.languageSounds?.selectedMainPhonemes?.find(value => value.phoneme === sound);
    // if (find) {
    //   this.languageSounds?.selectedRestPhonemes?.push(find);
    // }
    this.soundForm.reset();
  }
}
