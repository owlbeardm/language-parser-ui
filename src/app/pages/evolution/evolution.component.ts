import {Component, OnInit} from '@angular/core';
//TODO: add new api
// import { LanguageName } from 'src/app/api/models';
// import { WordToEvolveJSON } from 'src/app/api/models/word-to-evolve-json';
// import { ApiService } from 'src/app/api/services';
import {RefreshAll} from '../../interface/refresh-all';

@Component({
  selector: 'app-evolution',
  standalone: true,
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit, RefreshAll {

  tabs = [{
    name: 'Connections',
    route: 'connections',
    enabled: true
  }, {
    name: 'Category evolution',
    route: 'category',
    enabled: true
  }, {
    name: 'List evolve',
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
