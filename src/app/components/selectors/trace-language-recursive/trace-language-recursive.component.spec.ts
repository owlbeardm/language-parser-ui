import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceLanguageRecursiveComponent } from './trace-language-recursive.component';

describe('TraceLanguageRecursiveComponent', () => {
  let component: TraceLanguageRecursiveComponent;
  let fixture: ComponentFixture<TraceLanguageRecursiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceLanguageRecursiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceLanguageRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
