import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalDashComponent } from './horizontal-dash.component';

describe('HorizontalDashComponent', () => {
  let component: HorizontalDashComponent;
  let fixture: ComponentFixture<HorizontalDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
