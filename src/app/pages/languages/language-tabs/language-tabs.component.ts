import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyBindService} from '../../../services/key-bind.service';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-language-tabs',
  templateUrl: './language-tabs.component.html',
  styleUrls: ['./language-tabs.component.css']
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
  selectedIndex = 0;

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
