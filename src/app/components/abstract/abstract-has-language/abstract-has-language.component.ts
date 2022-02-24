import {Component, Input, OnInit} from '@angular/core';
import {Language} from '../../../api/models/language';


@Component({template: ''})
export class AbstractHasLanguageComponent implements OnInit {

  @Input() selectedLanguage?: Language;

  constructor() {
  }

  ngOnInit(): void {
  }
}
