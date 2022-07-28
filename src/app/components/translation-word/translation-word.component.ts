import {Component, Input, OnInit} from '@angular/core';
import {Translation} from '../../api/models/translation';

@Component({
  selector: 'app-translation-word',
  templateUrl: './translation-word.component.html',
  styleUrls: ['./translation-word.component.css']
})
export class TranslationWordComponent implements OnInit {

  @Input() translation!: Translation;

  constructor() {
  }

  ngOnInit(): void {
  }

}
