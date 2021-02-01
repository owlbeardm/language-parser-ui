import { Component } from '@angular/core';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent extends AbstractHasLanguage {

  ngOnInit(): void {
    super.ngOnInit();
  }

  refreshAll() {
    console.log("LanguagesComponent", this.selectedLanguage);
  }

  changeLang() {
    super.changeLang(this.selectedLanguage);
  }
}