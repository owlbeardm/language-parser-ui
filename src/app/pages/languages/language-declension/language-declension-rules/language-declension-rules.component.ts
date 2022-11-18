import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeclensionFull} from "../../../../api/models/declension-full";
import {DeclensionService} from "../../../../api/services/declension.service";
import {DeclensionRule} from "../../../../api/models/declension-rule";

@Component({
  selector: 'app-language-declension-rules',
  templateUrl: './language-declension-rules.component.html',
  styleUrls: ['./language-declension-rules.component.css']
})
export class LanguageDeclensionRulesComponent implements OnInit, OnChanges {

  @Input() declension!: DeclensionFull;
  rules: DeclensionRule[] = [];
  ruleSelected?: DeclensionRule;

  constructor(private declensionService: DeclensionService) {
  }

  get name() {
    return this.declension.values?.map(v => v.name).join(' ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.declension?.currentValue) {
      console.log("ngOnChanges", changes, changes.declension?.currentValue.id);
      if (changes.declension?.currentValue.id) {
        this.reloadRules(changes.declension?.currentValue.id);
      }
    }
  }

  ngOnInit(): void {
    if (this.declension?.id) {
      this.reloadRules(this.declension?.id);
    }
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

  private reloadRules(id: number) {
    this.declensionService.getDeclensionRules({declensionId: id}).subscribe(rules => this.rules = rules);
  }
}
