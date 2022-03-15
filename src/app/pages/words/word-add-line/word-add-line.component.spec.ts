import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordAddLineComponent } from './word-add-line.component';

describe('WordAddLineComponent', () => {
  let component: WordAddLineComponent;
  let fixture: ComponentFixture<WordAddLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordAddLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordAddLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
