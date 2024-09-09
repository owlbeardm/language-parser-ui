import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {timer} from 'rxjs';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {LanguagesService} from '../../../../api/services/languages.service';
import {PhoneticBtnComponent} from "../../../../components/sound/phonetic-btn/phonetic-btn.component";
import {HorizontalDashComponent} from "../../../../components/spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'app-pulmonic-consonants',
  standalone: true,
  templateUrl: './pulmonic-consonants.component.html',
  styleUrls: ['./pulmonic-consonants.component.css'],
  imports: [PhoneticBtnComponent, HorizontalDashComponent]
})
export class PulmonicConsonantsComponent implements OnInit, OnChanges {

  @Input() languageSounds?: ListOfLanguagePhonemes;
  @Output() onClick = new EventEmitter<string>();

  constructor(private cdRef: ChangeDetectorRef, private languagesService: LanguagesService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('pulmonic consonants changes', changes);
  }

  clicked(sound: string): void {
    this.onClick.emit(sound);
  }

}
