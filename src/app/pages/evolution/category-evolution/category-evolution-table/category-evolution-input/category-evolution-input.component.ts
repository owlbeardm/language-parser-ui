import {Component, Input, OnInit} from '@angular/core';
import {Language} from "../../../../../api/models/language";
import {Pos} from "../../../../../api/models/pos";
import {GrammaticalCategoryValue} from "../../../../../api/models/grammatical-category-value";

@Component({
  selector: 'app-category-evolution-input',
  templateUrl: './category-evolution-input.component.html',
  styleUrls: ['./category-evolution-input.component.css']
})
export class CategoryEvolutionInputComponent implements OnInit {

  @Input() langFrom?: Language;
  @Input() langTo?: Language;
  @Input() pos?: Pos;
  @Input() valueFrom?: GrammaticalCategoryValue;
  @Input() valuesTo?: GrammaticalCategoryValue[];
  valueTo?: GrammaticalCategoryValue;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeValueTo(param: { value: GrammaticalCategoryValue | undefined }) {

  }
}
