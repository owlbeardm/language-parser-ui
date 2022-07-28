import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetailTranslationsComponent } from './word-detail-translations.component';

describe('WordDetailTranslationsComponent', () => {
  let component: WordDetailTranslationsComponent;
  let fixture: ComponentFixture<WordDetailTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDetailTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetailTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
