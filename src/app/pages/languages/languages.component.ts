import { Component } from '@angular/core';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent extends AbstractHasLanguage {

  tabs = [{
    name: "Clusters",
    route: "clusters"
  }, {
    name: "Sound changes",
    route: "laws"
  }]

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