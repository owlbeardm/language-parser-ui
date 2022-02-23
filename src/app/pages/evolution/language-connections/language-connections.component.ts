import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {Language} from '../../../api/models/language';
import {SoundChange} from '../../../api/models/sound-change';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';
import {LanguageConnection} from '../../../api/models/language-connection';

@Component({
  selector: 'app-language-connections',
  templateUrl: './language-connections.component.html',
  styleUrls: ['./language-connections.component.css']
})
export class LanguageConnectionsComponent implements OnInit, OnChanges {

  editMode = false;
  soundChangesRaw = '';
  soundChanges: SoundChange[] = [];
  languageFrom?: Language;
  languageTo?: Language;
  connectionType?: LanguageConnectionType;


  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', changes.languageFrom);
    // this.refresh();
  }

  editSoundChanges(): void {
    console.log('hello', this.languageFrom?.displayName);
    if (this.languageFrom && this.languageTo) {
      this.languagesEvolutionService.getSoundChangesRawLinesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id
      }).subscribe(
        (data: string) => {
          this.soundChangesRaw = data;
          console.log('editSoundChanges soundChangesRaw', this.soundChangesRaw);
          this.editMode = true;
        }
      );
    }
  }

  saveSoundChanges(): void {
    if (this.languageFrom && this.languageTo) {
      this.languagesEvolutionService.saveSoundChangesRawLinesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id,
        body: this.soundChangesRaw
      }).subscribe(
        () => {
          this.editMode = false;
          this.refresh();
        }
      );
    }
  }

  refresh(): void {
    this.connectionType = undefined;
    if (this.languageFrom && this.languageTo) {
      this.languagesEvolutionService.getSoundChangesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id
      }).subscribe(
        (data: SoundChange[]) => {
          this.soundChanges = data;
          this.refreshConnectionType();
        }
      );
    }
  }

  languageChanged(): void {
    this.editMode = false;
    this.refresh();
  }

  soundChangesRawChange(): void {
  }

  languageFromChanged($event: Language): void {
    this.languageFrom = $event;
    this.languageChanged();
  }

  languageToChanged($event: Language): void {
    this.languageTo = $event;
    this.languageChanged();
  }

  cancelSoundChanges(): void {
    this.editMode = false;
  }

  languagesConnectionTypeChanged(event?: LanguageConnectionType): void {
    console.log('languagesConnectionTypeChanged', event);
    this.connectionType = event;
    if (this.languageFrom && this.languageTo) {
      if (this.connectionType) {
        this.languagesEvolutionService.updateConnectionByLangs({
          fromLangId: this.languageFrom.id,
          toLangId: this.languageTo.id,
          body: {
            languageConnectionType: this.connectionType
          }
        }).subscribe(
          () => {
            this.refresh();
          }
        );
      } else {
        this.languagesEvolutionService.deleteConnectionByLangs({
          fromLangId: this.languageFrom.id,
          toLangId: this.languageTo.id
        }).subscribe(
          () => {
            this.refresh();
          }
        );
      }
    }
  }

  private refreshConnectionType(): void {
    this.connectionType = undefined;
    if (this.languageFrom && this.languageTo) {
      this.languagesEvolutionService.getConnectionByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id
      }).subscribe(
        (data: LanguageConnection) => {
          this.connectionType = data.connectionType;
        }
      );
    }
  }

  soundChangesChanges(newSoundChanges: SoundChange[]): void {
    console.log('soundChangesChanges', newSoundChanges);
    this.soundChanges = newSoundChanges;
  }
}
