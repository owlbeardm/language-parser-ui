import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDeclensionsComponent } from './word-declensions.component';

describe('WordDeclensionsComponent', () => {
  let component: WordDeclensionsComponent;
  let fixture: ComponentFixture<WordDeclensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDeclensionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordDeclensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
