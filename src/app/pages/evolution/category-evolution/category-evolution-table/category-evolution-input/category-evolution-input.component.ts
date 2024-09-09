import {Component, Input, OnInit} from '@angular/core';
import {Language} from "../../../../../api/models/language";
import {Pos} from "../../../../../api/models/pos";
import {GrammaticalCategoryValue} from "../../../../../api/models/grammatical-category-value";
import {GrammaticalValueEvolution} from '../../../../../api/models/grammatical-value-evolution';
import {LanguagesEvolutionService} from "../../../../../api/services/languages-evolution.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-category-evolution-input',
  standalone: true,
  templateUrl: './category-evolution-input.component.html',
  styleUrls: ['./category-evolution-input.component.css'],
imports: [FormsModule, NgIf]
})
export class CategoryEvolutionInputComponent implements OnInit {

  @Input() langFrom?: Language;
  @Input() langTo?: Language;
  @Input() pos?: Pos;
  @Input() valueFrom?: GrammaticalCategoryValue;
  @Input() valuesTo?: GrammaticalCategoryValue[];
  valueTo?: GrammaticalCategoryValue;
  connectionId?: number;
  valueToModel?: GrammaticalCategoryValue;
  edit: boolean = false;

  constructor(private languagesEvolutionService: LanguagesEvolutionService) {
  }

  ngOnInit(): void {
    this.reloadValueTo();
  }

  reloadValueTo(): void {
    if (this.langFrom?.id && this.langTo?.id && this.pos?.id && this.valueFrom?.id)
      this.languagesEvolutionService.getGrammaticalValueEvolution({
        langFromId: this.langFrom?.id,
        langToId: this.langTo?.id,
        posId: this.pos?.id,
        valueFromId: this.valueFrom?.id
      }).subscribe((value) => {
        this.valueTo = value?.valueTo;
        this.connectionId = value?.id;
      });
  }

  changeValueTo(param: { value: GrammaticalCategoryValue | undefined }) {

  }

  startEdit() {
    if (this.valueTo) {
      if (!this.valuesTo) {
        this.valuesTo = []
      }
      const v: GrammaticalCategoryValue | undefined = this.valuesTo.find((v) => v.name = this.valueTo?.name);
      if (!v) {
        this.valuesTo.push(this.valueTo);
        this.valueToModel = this.valueTo;
      } else {
        this.valueToModel = v;
      }
    } else {
      this.valueToModel = undefined;
    }
    this.edit = true;
  }

  save() {
    // const v: GrammaticalCategoryValue
    // this.languagesEvolutionService.save
    if (!this.valueToModel && this.connectionId) {
      this.languagesEvolutionService.removeGrammaticalValueEvolution({id: this.connectionId}).subscribe(() => {
        this.edit = false;
        this.reloadValueTo();
      })
    } else if (!this.valueToModel && !this.connectionId) {
      return;
    } else {
      const gve: GrammaticalValueEvolution = {
        valueTo: this.valueToModel,
        valueFrom: this.valueFrom,
        languageFrom: this.langFrom,
        languageTo: this.langTo,
        pos: this.pos
      }
      this.languagesEvolutionService.saveGrammaticalValueEvolution({body: gve}).subscribe((id) => {
        this.connectionId = id;
        this.edit = false;
        this.reloadValueTo();
      })
    }
  }
}
