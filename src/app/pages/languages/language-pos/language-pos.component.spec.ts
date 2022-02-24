import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePosComponent } from './language-pos.component';

describe('LanguagePosComponent', () => {
  let component: LanguagePosComponent;
  let fixture: ComponentFixture<LanguagePosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
