import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SoundChange} from '../../api/models/sound-change';
import {SoundChangePurpose} from '../../api/models/sound-change-purpose';


@Component({template: ''})
export abstract class AbstractSoundChanges implements OnInit, OnChanges {

  editMode = false;
  soundChangesRaw = '';
  soundChanges: SoundChange[] = [];
  soundChangePurpose: SoundChangePurpose;

  constructor(soundChangePurpose: SoundChangePurpose) {
    this.soundChangePurpose = soundChangePurpose;
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

  soundChangesChanges(newSoundChanges: SoundChange[]): void {
    this.soundChanges = newSoundChanges;
  }

  soundChangesRawChange(): void {
  }

  cancelSoundChanges(): void {
    this.editMode = false;
  }

  abstract ngOnChanges(changes: SimpleChanges): void;

  abstract refresh(): void;
}
