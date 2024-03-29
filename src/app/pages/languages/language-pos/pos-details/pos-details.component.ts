import {Component, Input} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {Pos} from '../../../../api/models/pos';
import {PosService} from '../../../../api/services/pos.service';

@Component({
  selector: 'app-pos-details',
  templateUrl: './pos-details.component.html',
  styleUrls: ['./pos-details.component.css']
})
export class PosDetailsComponent extends AbstractHasLanguageComponent {

  @Input() selectedPos?: Pos;
  editComment = false;
  canUpdate = false;

  constructor(private posService: PosService) {
    super();
  }

  saveChanges(): void {
    if (this.selectedPos) {
      this.posService.savePos({body: this.selectedPos}).subscribe(
        (id) => {
          this.canUpdate = false;
        }
      );
    }
  }

  clickEditComment(): void {
    this.editComment = true;
  }

  clickSaveComment(): void {
    this.editComment = false;
  }

}
