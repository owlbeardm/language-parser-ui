import {Component, OnInit, ViewChild} from '@angular/core';
import {Language} from '../../api/models/language';
import {TraceResultComponent} from "./trace-result/trace-result.component";
import {
  TraceLanguageRecursiveComponent
} from "../../components/selectors/trace-language-recursive/trace-language-recursive.component";
import {NgFor, NgIf} from "@angular/common";
import {HorizontalDashComponent} from "../../components/spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'app-trace',
  standalone: true,
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css'],
  imports: [TraceResultComponent, TraceLanguageRecursiveComponent, NgFor, NgIf, HorizontalDashComponent]
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
