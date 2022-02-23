import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SoundChange} from '../../../../api/models/sound-change';

@Component({
  selector: 'app-sound-changes-table',
  templateUrl: './sound-changes-table.component.html',
  styleUrls: ['./sound-changes-table.component.css']
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
