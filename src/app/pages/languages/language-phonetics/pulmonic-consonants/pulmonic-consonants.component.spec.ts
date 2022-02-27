import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulmonicConsonantsComponent } from './pulmonic-consonants.component';

describe('PulmonicConsonantsComponent', () => {
  let component: PulmonicConsonantsComponent;
  let fixture: ComponentFixture<PulmonicConsonantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulmonicConsonantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PulmonicConsonantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
