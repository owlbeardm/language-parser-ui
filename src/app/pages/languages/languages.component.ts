import {Component, OnInit} from '@angular/core';
import {RefreshAll} from '../../interface/refresh-all';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, RefreshAll {

  tabs = [{
    name: 'List',
    route: 'list',
    enabled: true
  }];

  ngOnInit(): void {
  }

  refreshAll(): void {
  }

  changeLang(): void {
  }
}
