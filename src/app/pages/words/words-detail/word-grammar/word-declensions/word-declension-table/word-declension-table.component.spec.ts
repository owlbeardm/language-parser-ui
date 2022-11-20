import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDeclensionTableComponent } from './word-declension-table.component';

describe('WordDeclensionTableComponent', () => {
  let component: WordDeclensionTableComponent;
  let fixture: ComponentFixture<WordDeclensionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDeclensionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordDeclensionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
