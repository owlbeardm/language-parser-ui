import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {Language} from '../../../api/models/language';
import {SoundChange} from '../../../api/models/sound-change';

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
    if (this.languageFrom && this.languageTo) {
      this.languagesEvolutionService.getSoundChangesByLangs({
        fromLangId: this.languageFrom.id,
        toLangId: this.languageTo.id
      }).subscribe(
        (data: SoundChange[]) => {
          this.soundChanges = data;
        }
      );
    }
  }

  languageChanged(): void {
    this.editMode = false;
    this.refresh();
  }
}
