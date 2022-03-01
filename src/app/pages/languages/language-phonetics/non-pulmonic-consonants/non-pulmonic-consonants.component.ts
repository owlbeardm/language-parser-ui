import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';
import {LanguagesService} from '../../../../api/services/languages.service';

@Component({
  selector: 'app-non-pulmonic-consonants',
  templateUrl: './non-pulmonic-consonants.component.html',
  styleUrls: ['./non-pulmonic-consonants.component.css']
})
export class NonPulmonicConsonantsComponent implements OnInit, OnChanges {

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
