import {Component, Input, OnInit} from '@angular/core';
import {Translation} from '../../api/models/translation';
import {WrittenWordPipe} from "../../pipes/written-word.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-translation-word',
  standalone: true,
  templateUrl: './translation-word.component.html',
  styleUrls: ['./translation-word.component.css'],
  imports: [WrittenWordPipe, RouterLink]
})
export class TranslationWordComponent implements OnInit {

  @Input() translation!: Translation;

  constructor() {
  }

  ngOnInit(): void {
  }

}
