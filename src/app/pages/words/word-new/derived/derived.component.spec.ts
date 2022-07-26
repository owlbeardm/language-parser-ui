import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivedComponent } from './derived.component';

describe('DerivedComponent', () => {
  let component: DerivedComponent;
  let fixture: ComponentFixture<DerivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
