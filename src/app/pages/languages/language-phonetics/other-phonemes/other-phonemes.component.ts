import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhoneticBtnComponent} from "../../../../components/sound/phonetic-btn/phonetic-btn.component";
import {NgFor, NgIf} from "@angular/common";
import {HorizontalDashComponent} from "../../../../components/spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'app-other-phonemes',
  standalone: true,
  templateUrl: './other-phonemes.component.html',
  styleUrls: ['./other-phonemes.component.css'],
  imports: [FormsModule, ReactiveFormsModule, PhoneticBtnComponent, NgFor, NgIf, HorizontalDashComponent]
})
export class OtherPhonemesComponent implements OnInit {

  @Input() languageSounds?: ListOfLanguagePhonemes;
  @Output() onClick = new EventEmitter<string>();
  soundForm = new FormGroup({
    newSound: new FormControl('', Validators.required),
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
    const sound = this.soundForm.value.newSound ? this.soundForm.value.newSound : undefined;
    this.onClick.emit(sound);
    // const find = this.languageSounds?.selectedMainPhonemes?.find(value => value.phoneme === sound);
    // if (find) {
    //   this.languageSounds?.selectedRestPhonemes?.push(find);
    // }
    this.soundForm.reset();
  }
}
