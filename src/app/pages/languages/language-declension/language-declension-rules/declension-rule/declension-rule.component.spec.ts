import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclensionRuleComponent } from './declension-rule.component';

describe('DeclensionRuleComponent', () => {
  let component: DeclensionRuleComponent;
  let fixture: ComponentFixture<DeclensionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclensionRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclensionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
