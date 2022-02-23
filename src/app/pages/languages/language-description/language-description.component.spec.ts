import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDescriptionComponent } from './language-description.component';

describe('LanguageDescriptionComponent', () => {
  let component: LanguageDescriptionComponent;
  let fixture: ComponentFixture<LanguageDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
