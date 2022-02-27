import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneticBtnComponent } from './phonetic-btn.component';

describe('PhoneticBtnComponent', () => {
  let component: PhoneticBtnComponent;
  let fixture: ComponentFixture<PhoneticBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneticBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneticBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
