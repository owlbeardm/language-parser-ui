import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordWrittenWithTranslationsComponent } from './word-written-with-translations.component';

describe('WordWrittenWithTranslationsComponent', () => {
  let component: WordWrittenWithTranslationsComponent;
  let fixture: ComponentFixture<WordWrittenWithTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordWrittenWithTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordWrittenWithTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
