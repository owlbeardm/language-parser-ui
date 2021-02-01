import { Component, OnInit } from '@angular/core';
import { AbstractHasLanguage } from 'src/app/components/abstract/abstract-has-language/abstract-has-language';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent extends AbstractHasLanguage {

  tabs = [{
    name: "List",
    route: "list",
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
    console.log("WordsComponent", this.selectedLanguage);
  }

  changeLang() {
    super.changeLang(this.selectedLanguage);
  }
}