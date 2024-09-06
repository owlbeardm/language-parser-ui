import {Component, SimpleChanges} from '@angular/core';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {Language} from '../../../api/models/language';
import {SoundChange} from '../../../api/models/sound-change';
import {LanguageConnectionType} from '../../../api/models/language-connection-type';
import {LanguageConnection} from '../../../api/models/language-connection';
import {AbstractSoundChanges} from '../../../components/sound-changes/sound-chages-abstract.component.spec';
import {SoundChangePurpose} from '../../../api/models/sound-change-purpose';
import {
  SoundChangesEditComponent
} from "../../../components/sound-changes/sound-changes-edit/sound-changes-edit.component";
import {
  SoundChangesTableComponent
} from "../../../components/sound-changes/sound-changes-table/sound-changes-table.component";
import {
  LanguageConnectionComponent
} from "../../../components/selectors/language-connection/language-connection.component";
import {AllLanguagesComponent} from "../../../components/selectors/all-languages/all-languages.component";

@Component({
  selector: 'app-language-connections',
  standalone: true,
  templateUrl: './language-connections.component.html',
  styleUrls: ['./language-connections.component.css'],
  imports: [SoundChangesEditComponent, SoundChangesTableComponent, LanguageConnectionComponent, AllLanguagesComponent]
})
export class LanguageConnectionsComponent extends AbstractSoundChanges {

  languageFrom?: Language;
  languageTo?: Language;
  connectionType?: LanguageConnectionType;


  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
    super(SoundChangePurpose.SoundChange);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  editSoundChanges(): void {
    console.log('hello', this.languageFrom?.displayName);
    if (this.languageFrom && this.languageTo && this.languageFrom.id && this.languageTo.id) {
      this.languagesEvolutionService.getSoundChangesRawLinesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id,
        soundChangePurpose: this.soundChangePurpose
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
    if (this.languageFrom && this.languageTo && this.languageFrom.id && this.languageTo.id) {
      this.languagesEvolutionService.saveSoundChangesRawLinesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id,
        body: this.soundChangesRaw,
        soundChangePurpose: this.soundChangePurpose
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
    if (this.languageFrom && this.languageTo && this.languageFrom.id && this.languageTo.id) {
      this.languagesEvolutionService.getSoundChangesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id,
        soundChangePurpose: this.soundChangePurpose
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

  languageFromChanged($event: Language): void {
    this.languageFrom = $event;
    this.languageChanged();
  }

  languageToChanged($event: Language): void {
    this.languageTo = $event;
    this.languageChanged();
  }

  languagesConnectionTypeChanged(event?: LanguageConnectionType): void {
    console.log('languagesConnectionTypeChanged', event);
    this.connectionType = event;
    if (this.languageFrom && this.languageTo && this.languageFrom.id && this.languageTo.id) {
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
    if (this.languageFrom && this.languageTo && this.languageFrom.id && this.languageTo.id) {
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
}
