import {Component, Input, OnInit} from '@angular/core';
import {ListOfLanguagePhonemes} from '../../../../api/models/list-of-language-phonemes';

@Component({
  selector: 'app-vowels',
  templateUrl: './vowels.component.html',
  styleUrls: ['./vowels.component.css']
})
export class VowelsComponent implements OnInit {

  @Input() languageSounds?: ListOfLanguagePhonemes;

  constructor() { }

  ngOnInit(): void {
  }

  clicked(sound: string): void {
    alert(sound);
  }

}
