import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceResultComponent } from './trace-result.component';

describe('TraceResultComponent', () => {
  let component: TraceResultComponent;
  let fixture: ComponentFixture<TraceResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
