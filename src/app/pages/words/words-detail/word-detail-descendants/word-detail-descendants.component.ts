import { Component, OnInit, Input } from '@angular/core';
import {DescendantWords} from "../../../../api/models/descendant-words";
import {
  WordWrittenWithTranslationsComponent
} from "../../../../components/word-written-with-translations/word-written-with-translations.component";

@Component({
  selector: 'li[app-word-detail-descendants]',
  standalone: true,
  templateUrl: './word-detail-descendants.component.html',
  styleUrls: ['./word-detail-descendants.component.css'],
  imports: [WordWrittenWithTranslationsComponent]
})
export class WordDetailDescendantsComponent implements OnInit {

  @Input() descendant!: DescendantWords;

  constructor() { }

  ngOnInit(): void {
  }

}
