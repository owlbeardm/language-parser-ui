import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordGrammarComponent } from './word-grammar.component';

describe('WordGrammarComponent', () => {
  let component: WordGrammarComponent;
  let fixture: ComponentFixture<WordGrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordGrammarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
