import {Component, Input, SimpleChanges} from '@angular/core';
import {AbstractSoundChanges} from "../../../../../../components/sound-changes/sound-chages-abstract.component.spec";
import {DeclensionRule} from "../../../../../../api/models/declension-rule";
import {LanguagesEvolutionService} from "../../../../../../api/services/languages-evolution.service";
import {SoundChangePurpose} from "../../../../../../api/models/sound-change-purpose";
import {SoundChange} from "../../../../../../api/models/sound-change";

@Component({
  selector: 'app-rule-sound-changes',
  templateUrl: './rule-sound-changes.component.html',
  styleUrls: ['./rule-sound-changes.component.css']
})
export class RuleSoundChangesComponent extends AbstractSoundChanges {

  @Input() rule!: DeclensionRule;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
    super(SoundChangePurpose.Declension);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage) {
      this.refresh();
    }
  }

  refresh(): void {
    if (this.rule && this.rule.id) {
      this.languagesEvolutionService.getSoundChangesByRule({
        ruleId: this.rule.id,
        soundChangePurpose: this.soundChangePurpose
      }).subscribe(
        (data: SoundChange[]) => {
          this.soundChanges = data;
        }
      );
    }
  }

  editSoundChanges(): void {
    if (this.rule && this.rule.id) {
      this.languagesEvolutionService.getSoundChangesRawLinesByRule({
        declensionId: this.rule.id,
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
    if (this.rule && this.rule.id) {
      this.languagesEvolutionService.saveSoundChangesRawLinesByRule({
        declensionId: this.rule.id,
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
