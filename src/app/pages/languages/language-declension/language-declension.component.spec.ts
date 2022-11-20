import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDeclensionComponent } from './language-declension.component';

describe('LanguageDeclensionComponent', () => {
  let component: LanguageDeclensionComponent;
  let fixture: ComponentFixture<LanguageDeclensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageDeclensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDeclensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
