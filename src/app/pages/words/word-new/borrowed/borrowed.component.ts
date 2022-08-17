import {Component, OnInit, Input} from '@angular/core';
import {Pos} from "../../../../api/models/pos";
import {PageResultWordWithWritten} from "../../../../api/models/page-result-word-with-written";
import {WordWithWritten} from "../../../../api/models/word-with-written";
import {Language} from "../../../../api/models/language";

@Component({
  selector: 'tbody[app-borroved]',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {

  pageSize = 10;
  wordSearch?: string;
  listPosSelector?: Pos;
  wordsList: PageResultWordWithWritten = {};
  selectedWords: WordWithWritten[] = [];
  @Input() poses!: Pos[];
  @Input() language!: Language;
  @Input() languageFrom!: Language;

  constructor() {
  }

  ngOnInit(): void {
  }

}
