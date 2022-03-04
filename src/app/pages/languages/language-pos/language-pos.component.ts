import {Component} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {PosService} from '../../../api/services/pos.service';
import {Pos} from '../../../api/models/pos';

@Component({
  selector: 'app-language-pos',
  templateUrl: './language-pos.component.html',
  styleUrls: ['./language-pos.component.css']
})
export class LanguagePosComponent extends AbstractHasLanguageComponent {
  pos: Pos[] = [];
  selectedPos?: Pos;

  constructor(private posService: PosService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.posService.getAllPos().subscribe(pos => this.pos = pos.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }

}
