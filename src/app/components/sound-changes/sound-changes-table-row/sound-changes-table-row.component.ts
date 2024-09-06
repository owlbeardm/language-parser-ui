import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SoundChange} from '../../../api/models/sound-change';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'tr[app-sound-changes-table-row]',
  standalone: true,
  templateUrl: './sound-changes-table-row.component.html',
  styleUrls: ['./sound-changes-table-row.component.css'],
  imports: [FormsModule]
})
export class SoundChangesTableRowComponent implements OnInit {

  @Input() soundChange!: SoundChange;
  @Output() soundChangeDeleted = new EventEmitter<SoundChange>();
  editMode = false;
  soundChangeRaw?: string;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
  }

  editSoundChange(): void {
    console.log(this.soundChange);
    if (this.soundChange.id) {
      this.languagesEvolutionService.getSoundChangeRaw({id: this.soundChange.id}).subscribe(
        (soundChangeRaw: string) => {
          this.soundChangeRaw = soundChangeRaw;
          this.editMode = true;
        }
      );
    }
  }

  deleteSoundChanges(): void {
    console.log(this.soundChange);
    if (this.soundChange.id) {
      this.languagesEvolutionService.deleteSoundChange({id: this.soundChange.id}).subscribe(
        () => {
          console.log('deleted');
          this.soundChangeDeleted.emit(this.soundChange);
        }
      );
    }
  }

  saveSoundChange(): void {
    if (this.soundChange.id && this.soundChangeRaw) {
      const scId = this.soundChange.id;
      this.languagesEvolutionService.updateSoundChange({id: scId, body: this.soundChangeRaw}).subscribe(
        () => {
          console.log('saved');
          this.languagesEvolutionService.getSoundChange({id: scId}).subscribe(
            (soundChange: SoundChange) => {
              this.soundChange = soundChange;
              this.editMode = false;
            }
          );
        }
      );
    }
  }

  cancelSoundChanges(): void {
    this.editMode = false;
  }
}
