import {Component, Input, SimpleChanges} from '@angular/core';
import {AbstractSoundChanges} from "../../../../../../components/sound-changes/sound-chages-abstract.component.spec";
import {DeclensionRule} from "../../../../../../api/models/declension-rule";
import {LanguagesEvolutionService} from "../../../../../../api/services/languages-evolution.service";
import {SoundChangePurpose} from "../../../../../../api/models/sound-change-purpose";
import {SoundChange} from "../../../../../../api/models/sound-change";
import {
  SoundChangesEditComponent
} from "../../../../../../components/sound-changes/sound-changes-edit/sound-changes-edit.component";
import {
  SoundChangesTableComponent
} from "../../../../../../components/sound-changes/sound-changes-table/sound-changes-table.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-rule-sound-changes',
  standalone: true,
  templateUrl: './rule-sound-changes.component.html',
  styleUrls: ['./rule-sound-changes.component.css'],
  imports: [SoundChangesEditComponent, SoundChangesTableComponent, NgIf]
})
export class RuleSoundChangesComponent extends AbstractSoundChanges {

  @Input() rule!: DeclensionRule;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
    super(SoundChangePurpose.Declension);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage || changes.rule) {
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
