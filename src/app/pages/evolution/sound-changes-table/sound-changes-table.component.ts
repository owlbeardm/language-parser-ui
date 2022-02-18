import {Component, Input, OnInit} from '@angular/core';
import {SoundChange} from '../../../api/models/sound-change';

@Component({
  selector: 'app-sound-changes-table',
  templateUrl: './sound-changes-table.component.html',
  styleUrls: ['./sound-changes-table.component.css']
})
export class SoundChangesTableComponent implements OnInit {

  @Input() soundChanges!: SoundChange[];

  constructor() { }

  ngOnInit(): void {
  }

}
