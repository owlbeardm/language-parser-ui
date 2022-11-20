import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleValuesComponent } from './rule-values.component';

describe('RuleValuesComponent', () => {
  let component: RuleValuesComponent;
  let fixture: ComponentFixture<RuleValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
