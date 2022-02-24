import { Component, OnInit } from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../components/abstract/abstract-has-language/abstract-has-language.component';

@Component({
  selector: 'app-language-pos',
  templateUrl: './language-pos.component.html',
  styleUrls: ['./language-pos.component.css']
})
export class LanguagePosComponent extends AbstractHasLanguageComponent{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
