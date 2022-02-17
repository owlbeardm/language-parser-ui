import {Component, OnInit} from '@angular/core';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';
import {Language} from '../../../api/models/language';

@Component({
  selector: 'app-language-connections',
  templateUrl: './language-connections.component.html',
  styleUrls: ['./language-connections.component.css']
})
export class LanguageConnectionsComponent implements OnInit {

  editMode = false;
  soundChangesRaw = '';
  languageFrom?: Language;
  languageTo?: Language;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
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
          this.editMode = true;
        }
      );
    }

  }

  languageChanged(): void {
    this.editMode = false;
  }
}
