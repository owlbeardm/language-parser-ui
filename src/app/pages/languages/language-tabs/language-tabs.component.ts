import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd} from '@angular/router';
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
    name: 'Parts of Speech',
    enabled: false,
    shortName: 'POS'
  }, {
    name: 'Laws',
    enabled: false
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
