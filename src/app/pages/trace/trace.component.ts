import {Component, OnInit, ViewChild} from '@angular/core';
import {Language} from '../../api/models/language';
import {TraceResultComponent} from "./trace-result/trace-result.component";
import {
  TraceLanguageRecursiveComponent
} from "../../components/selectors/trace-language-recursive/trace-language-recursive.component";

@Component({
  selector: 'app-trace',
  standalone: true,
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css'],
  imports: [TraceResultComponent, TraceLanguageRecursiveComponent]
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
