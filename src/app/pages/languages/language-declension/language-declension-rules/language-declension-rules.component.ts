import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeclensionFull} from "../../../../api/models/declension-full";
import {DeclensionService} from "../../../../api/services/declension.service";
import {DeclensionRule} from "../../../../api/models/declension-rule";
import {CommonModule} from "@angular/common";
import {DeclensionRuleComponent} from "./declension-rule/declension-rule.component";
import {HorizontalDashComponent} from "../../../../components/spacer/horizontal-dash/horizontal-dash.component";
import {VerticalDashComponent} from "../../../../components/spacer/vertical-dash/vertical-dash.component";

@Component({
  selector: 'app-language-declension-rules',
  standalone: true,
  templateUrl: './language-declension-rules.component.html',
  styleUrls: ['./language-declension-rules.component.css'],
  imports: [CommonModule, DeclensionRuleComponent, HorizontalDashComponent, VerticalDashComponent]
})
export class LanguageDeclensionRulesComponent implements OnInit, OnChanges {

  @Input() declension!: DeclensionFull;
  rules: DeclensionRule[] = [];
  ruleSelected?: DeclensionRule;
  isMainDeclension: boolean = false;

  constructor(private declensionService: DeclensionService) {
  }

  get name() {
    return this.declension.values?.map(v => v.name).join(' ');
  }

  reloadIsMainDeclension() {
    if (this.declension?.id)
      this.declensionService.isMainDelcension({declensionId: this.declension.id}).subscribe((isMain) => this.isMainDeclension = isMain);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.declension?.currentValue) {
      console.log("ngOnChanges", changes, changes.declension?.currentValue.id);
      this.ruleSelected = undefined;
      this.reloadIsMainDeclension();
      if (changes.declension?.currentValue.id) {
        this.reloadRules(changes.declension?.currentValue.id);
      }
    }
  }

  ngOnInit(): void {
    if (this.declension?.id) {
      this.reloadRules(this.declension?.id);
    }
    this.reloadIsMainDeclension();
  }

  addNewRule() {
    const newrule: DeclensionRule = {
      name: 'New Rule',
      declension: this.declension,
      enabled: true
    }
    this.declensionService.saveDeclensionRule({body: newrule}).subscribe((rule) => {
      this.rules.push(rule);
      this.ruleSelected = rule;
    })
  }

  save() {
    if (this.ruleSelected) {
      this.declensionService.saveDeclensionRule({body: this.ruleSelected}).subscribe((rule) => {
        this.rules = this.rules.filter((r) => r.id !== rule.id);
        this.rules.push(rule);
        this.ruleSelected = rule;
      })
    }
  }

  changeIsMainDeclension() {
    if (this.declension?.id) {
      if (this.isMainDeclension) {
        this.declensionService.removeFromMainDeclension({declensionId: this.declension.id}).subscribe(() => {
          this.reloadIsMainDeclension()
        });
      } else {
        this.declensionService.setAsMainDeclension({declensionId: this.declension.id}).subscribe(() => {
          this.reloadIsMainDeclension()
        });
      }
    }
  }

  private reloadRules(id: number) {
    this.declensionService.getDeclensionRules({declensionId: id}).subscribe(rules => this.rules = rules);
  }
}
