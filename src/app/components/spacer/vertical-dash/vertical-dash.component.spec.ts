import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalDashComponent } from './vertical-dash.component';

describe('VerticalDashComponent', () => {
  let component: VerticalDashComponent;
  let fixture: ComponentFixture<VerticalDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
