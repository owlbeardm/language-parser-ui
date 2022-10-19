import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordGrammarCategoryComponent } from './word-grammar-category.component';

describe('WordGrammarCategoryComponent', () => {
  let component: WordGrammarCategoryComponent;
  let fixture: ComponentFixture<WordGrammarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordGrammarCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordGrammarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
