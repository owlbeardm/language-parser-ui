import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPhonemesComponent } from './other-phonemes.component';

describe('OtherPhonemesComponent', () => {
  let component: OtherPhonemesComponent;
  let fixture: ComponentFixture<OtherPhonemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPhonemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPhonemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
