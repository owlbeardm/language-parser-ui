import {Component, Input, OnInit} from '@angular/core';
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
    route: 'description',
    enabled: true
  }, {
    name: 'Laws',
    route: 'laws',
    enabled: true
  }];
  removeBorder = true;
  @Input() selectedLanguage?: Language;
  selectedIndex: number = 0;

  constructor(private keybind: KeyBindService) {
  }

  ngOnInit(): void {
    this.correctIndex();
  }

  correctIndex(): void {
  }

  select(i: number): void {
    this.selectedIndex = i;
  }

}
