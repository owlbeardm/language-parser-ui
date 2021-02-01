import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsDetailComponent } from './words-detail.component';

describe('WordsDetailComponent', () => {
  let component: WordsDetailComponent;
  let fixture: ComponentFixture<WordsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
