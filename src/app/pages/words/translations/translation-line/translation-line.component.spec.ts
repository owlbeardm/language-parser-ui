import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationLineComponent } from './translation-line.component';

describe('TranslationLineComponent', () => {
  let component: TranslationLineComponent;
  let fixture: ComponentFixture<TranslationLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
