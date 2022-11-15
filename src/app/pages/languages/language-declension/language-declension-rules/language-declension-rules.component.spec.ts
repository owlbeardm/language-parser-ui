import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDeclensionRulesComponent } from './language-declension-rules.component';

describe('LanguageDeclensionRulesComponent', () => {
  let component: LanguageDeclensionRulesComponent;
  let fixture: ComponentFixture<LanguageDeclensionRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageDeclensionRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDeclensionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
