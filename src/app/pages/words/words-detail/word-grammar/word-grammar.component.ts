import {Component, Input, OnInit} from '@angular/core';
import {WordWithWritten} from "../../../../api/models/word-with-written";

@Component({
  selector: 'app-word-grammar',
  templateUrl: './word-grammar.component.html',
  styleUrls: ['./word-grammar.component.css']
})
export class WordGrammarComponent implements OnInit {

  @Input() word!: WordWithWritten;

  constructor() {
  }

  ngOnInit(): void {
  }

}
