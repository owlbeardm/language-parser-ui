import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractHasLanguageComponent} from '../../../components/abstract/abstract-has-language/abstract-has-language.component';
import {PosService} from '../../../api/services/pos.service';
import {Pos} from '../../../api/models/pos';
import {LanguagePos} from '../../../api/models/language-pos';

@Component({
  selector: 'app-language-pos',
  templateUrl: './language-pos.component.html',
  styleUrls: ['./language-pos.component.css']
})
export class LanguagePosComponent extends AbstractHasLanguageComponent implements OnChanges {
  pos: Pos[] = [];
  lp: LanguagePos[] = [];
  selectedPos?: Pos;

  constructor(private posService: PosService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.posService.getAllPos().subscribe(pos => this.pos = pos.sort((a, b) => !a.name ? -1 : a.name.localeCompare(!b.name ? '' : b.name)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedLanguage.currentValue) {
      console.log(changes, changes.selectedLanguage.currentValue.id);
      if (changes.selectedLanguage.currentValue.id) {
        this.posService.getPosByLanguage({languageId: changes.selectedLanguage.currentValue.id}).subscribe(lp => this.lp = lp);
      }
    }
  }

  addNewPOS(): void {
    const pos: Pos = {
      name: 'new part of speech',
    };
    this.posService.savePos({body: pos}).subscribe((id) => {
      pos.id = id;
      this.selectedPos = pos;
      this.pos.push(pos);
    });
  }

  getLanguagePosSymbol(pos: Pos): boolean {
    if (!this.selectedLanguage) {
      return false;
    } else {
      return this.lp.filter(lp => lp.languageId === this.selectedLanguage?.id && lp.posId === pos.id).length > 0;
    }
  }

  connectPosToLanguage(p: Pos): void {
    console.log('connectPosToLanguage', p);
    if (this.getLanguagePosSymbol(p)) {
      if (this.selectedLanguage?.id) {
        const connectionToDelete = this.lp.find(lp => lp.languageId === this.selectedLanguage?.id && lp.posId === p.id);
        if (connectionToDelete && connectionToDelete.id) {
          this.posService.deleteLanguagePos({id: connectionToDelete.id}).subscribe(() => {
            this.lp = this.lp.filter(lp => lp.id !== connectionToDelete.id);
          });
        }
      }
    } else {
      if (this.selectedLanguage?.id) {
        const lp: LanguagePos = {
          languageId: this.selectedLanguage?.id,
          posId: p.id,
        };
        this.posService.saveLanguagePos({body: lp}).subscribe((id) => {
          lp.id = id;
          this.lp.push(lp);
        });
      }
    }
  }
}
