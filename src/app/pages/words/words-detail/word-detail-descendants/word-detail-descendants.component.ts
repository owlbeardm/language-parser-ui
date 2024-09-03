import { Component, OnInit, Input } from '@angular/core';
import {DescendantWords} from "../../../../api/models/descendant-words";

@Component({
  selector: 'li[app-word-detail-descendants]',
  standalone: true,
  templateUrl: './word-detail-descendants.component.html',
  styleUrls: ['./word-detail-descendants.component.css']
})
export class WordDetailDescendantsComponent implements OnInit {

  @Input() descendant!: DescendantWords;

  constructor() { }

  ngOnInit(): void {
  }

}
