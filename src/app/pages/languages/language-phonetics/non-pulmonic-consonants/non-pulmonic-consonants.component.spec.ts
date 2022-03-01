import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPulmonicConsonantsComponent } from './non-pulmonic-consonants.component';

describe('NonPulmonicConsonantsComponent', () => {
  let component: NonPulmonicConsonantsComponent;
  let fixture: ComponentFixture<NonPulmonicConsonantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPulmonicConsonantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPulmonicConsonantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
