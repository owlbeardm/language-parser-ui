import { Component, OnInit } from '@angular/core';
import { AbstractHasLanguageComponent } from 'src/app/components/abstract/abstract-has-language/abstract-has-language.component';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent extends AbstractHasLanguageComponent {

  tabs = [{
    name: "List",
    route: "list",
    enabled: true
  }, {
    name: "Translations",
    route: "translations",
    enabled: true
  }, {
    name: "Details",
    route: ":word",
    enabled: false
  }]

  ngOnInit(): void {
    super.ngOnInit();
  }

  refreshAll() {
    // console.log("WordsComponent", this.selectedLanguage);
  }

  changeLang() {
    // super.changeLang(this.selectedLanguage);
  }
}
