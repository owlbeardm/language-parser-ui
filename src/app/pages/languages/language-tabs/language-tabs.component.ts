import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyBindService} from '../../../services/key-bind.service';
import {Language} from '../../../api/models/language';
import {LanguageDeclensionComponent} from "../language-declension/language-declension.component";
import {LanguageCategoryComponent} from "../language-category/language-category.component";
import {LanguagePosComponent} from "../language-pos/language-pos.component";
import {ClustersComponent} from "../clusters/clusters.component";
import {LanguageWritingComponent} from "../language-writing/language-writing.component";
import {LanguagePhoneticsComponent} from "../language-phonetics/language-phonetics.component";
import {LanguageDescriptionComponent} from "../language-description/language-description.component";
import {CommonModule} from "@angular/common";
import {HorizontalDashComponent} from "../../../components/spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'app-language-tabs',
  standalone: true,
  templateUrl: './language-tabs.component.html',
  styleUrls: ['./language-tabs.component.css'],
  imports: [
    CommonModule,
    LanguageDeclensionComponent,
    LanguageCategoryComponent,
    LanguagePosComponent,
    ClustersComponent,
    LanguageWritingComponent,
    LanguagePhoneticsComponent,
    LanguageDescriptionComponent,
    HorizontalDashComponent
  ]
})
export class LanguageTabsComponent implements OnInit {


  tabs = [{
    name: 'Description',
    enabled: true,
    shortName: 'Descr.'
  }, {
    name: 'Phonetics',
    enabled: true,
    shortName: '[pʰ]'
  }, {
    name: 'Orthography',
    enabled: true,
    shortName: 'Aa...'
  }, {
    name: 'Phonotactics',
    enabled: true,
    shortName: 'CV(C)'
  }, {
    name: 'Word Classes',
    enabled: true,
    shortName: 'pos'
  }, {
    name: 'Grammatical Categories',
    enabled: true,
    shortName: 'm/n/f'
  }, {
    name: 'Declensions',
    enabled: true,
    shortName: '-us/ūs'
  }];
  removeBorder = true;
  @Input() selectedLanguage?: Language;
  @Output() onDeleteLanguage = new EventEmitter<number>();
  selectedIndex = 6;

  constructor(private keybind: KeyBindService) {
  }

  ngOnInit(): void {
    this.correctIndex();
    this.tabs[2].enabled = !!this.selectedLanguage;
  }

  correctIndex(): void {
  }

  select(i: number): void {
    this.selectedIndex = i;
  }
}
