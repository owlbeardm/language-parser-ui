import { Component } from '@angular/core';
import { AbstractHasLanguageComponent } from 'src/app/components/abstract/abstract-has-language/abstract-has-language.component';
import { TabRoutesComponent } from '../../components/tab-routes/tab-routes.component';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  standalone: true,
  imports: [TabRoutesComponent]
})
export class WordsComponent extends AbstractHasLanguageComponent {

  tabs = [{
    name: 'Add New',
    route: 'new',
    enabled: true
  }, {
    name: 'List',
    route: 'list',
    enabled: true
  }, {
    name: 'Translations',
    route: 'translations',
    enabled: true
  }, {
    name: 'Details',
    route: 'word/:word',
    enabled: false
  }];

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
