import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Language} from '../../../api/models/language';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {LangService} from '../../../services/lang.service';
import {ErrorService} from '../../../services/error.service';
import {KeyBindService} from '../../../services/key-bind.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trace-result',
  standalone: true,
  templateUrl: './trace-result.component.html',
  styleUrls: ['./trace-result.component.css']
})
export class TraceResultComponent implements OnInit, OnChanges {

  @ViewChild('wordSelector') wordSelector: any;
  @Input() fullRoute: Language[] = [];
  word = '';
  wordsTraced: string[] = [];
  wordSelected = 0;

  constructor(
    private languagesEvolutionService: LanguagesEvolutionService,
    private langService: LangService,
    private errorService: ErrorService,
    private keybind: KeyBindService,
    private router: Router) {
    const binding$ = this.keybind.match(['T'], ['altKey']).subscribe(() => {
      this.wordSelector?.nativeElement.focus();
    });
  }

  routeChanged(): void {
    this.changeWord(this.word);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fullRoute) {
      this.routeChanged();
    }
  }

  changeWord(event: string): void {
    console.log('changeWord', event);
    this.word = event;
    if (!this.word.trim().length || this.fullRoute.length < 2) {
      return;
    }
    this.languagesEvolutionService.trace({word: this.word.trim(), body: this.fullRoute}).subscribe((data) => {
      this.wordsTraced = [];
      data.forEach((wordTraced) => {
        this.wordsTraced.push(wordTraced?.word ? wordTraced?.word : '');
      });
      this.wordSelected = this.wordsTraced.length > 0 ? this.wordsTraced.length - 1 : 0;
    });
  }

  selectWord(event: number): void {
    console.log('selectWord', event);
    this.wordSelected = event;
  }

  ngOnInit(): void {
  }

}
