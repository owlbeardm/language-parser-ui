import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePhoneticsComponent } from './language-phonetics.component';

describe('LanguagePhoneticsComponent', () => {
  let component: LanguagePhoneticsComponent;
  let fixture: ComponentFixture<LanguagePhoneticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePhoneticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePhoneticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
