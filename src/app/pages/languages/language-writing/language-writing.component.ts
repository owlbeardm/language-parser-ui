import {Component, Input, SimpleChanges} from '@angular/core';
import {Language} from '../../../api/models/language';
import {AbstractSoundChanges} from '../../../components/sound-changes/sound-chages-abstract.component.spec';
import {SoundChangePurpose} from '../../../api/models/sound-change-purpose';
import {SoundChange} from '../../../api/models/sound-change';
import {LanguagesEvolutionService} from '../../../api/services/languages-evolution.service';

@Component({
  selector: 'app-language-writing',
  templateUrl: './language-writing.component.html',
  styleUrls: ['./language-writing.component.css']
})
export class LanguageWritingComponent extends AbstractSoundChanges {

  @Input() selectedLanguage?: Language;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
    super(SoundChangePurpose.WritingSystem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage) {
      this.refresh();
    }
  }

  refresh(): void {
    if (this.selectedLanguage && this.selectedLanguage.id) {
      this.languagesEvolutionService.getSoundChangesByLang({
        fromLangId: this.selectedLanguage.id,
        soundChangePurpose: this.soundChangePurpose
      }).subscribe(
        (data: SoundChange[]) => {
          this.soundChanges = data;
        }
      );
    }
  }

  editSoundChanges(): void {
    if (this.selectedLanguage && this.selectedLanguage.id ) {
      this.languagesEvolutionService.getSoundChangesRawLinesByLang({
        fromLangId: this.selectedLanguage.id,
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
    if (this.selectedLanguage && this.selectedLanguage.id) {
      this.languagesEvolutionService.saveSoundChangesRawLinesByLang({
        fromLangId: this.selectedLanguage.id,
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

}
