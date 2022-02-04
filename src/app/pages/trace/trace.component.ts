import {Component, OnInit, ViewChild} from '@angular/core';
import {Language} from '../../api/models/language';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  @ViewChild('wordInput') wordInput: any;

  fullRoute: Language[] = [];
  wordText = '';
  word = '';
  wordsTraced: string[] = [];

  constructor() {
  }

  routeChanged(event: Language[]): void {
    this.fullRoute = event;
  }

  ngOnInit(): void {
  }
}
