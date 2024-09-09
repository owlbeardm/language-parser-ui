import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SoundChange} from '../../../api/models/sound-change';
import {SoundChangesTableRowComponent} from "../sound-changes-table-row/sound-changes-table-row.component";
import {NgForOf, NgIf} from "@angular/common";
import {HorizontalDashComponent} from "../../spacer/horizontal-dash/horizontal-dash.component";

@Component({
  selector: 'app-sound-changes-table',
  standalone: true,
  templateUrl: './sound-changes-table.component.html',
  styleUrls: ['./sound-changes-table.component.css'],
  imports: [SoundChangesTableRowComponent, NgIf, HorizontalDashComponent, NgForOf]
})
export class SoundChangesTableComponent implements OnInit {

  @Input() soundChanges!: SoundChange[];
  @Output() soundChangesChanges = new EventEmitter<SoundChange>();

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteSoundChange(soundChange: SoundChange): void {
    console.log('deleteSoundChange', soundChange);
    this.soundChanges = this.soundChanges.filter(s => s.id !== soundChange.id);
    this.soundChangesChanges.emit(soundChange);
  }

}
