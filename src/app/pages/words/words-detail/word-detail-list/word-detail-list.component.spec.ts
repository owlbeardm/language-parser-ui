import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetailListComponent } from './word-detail-list.component';

describe('WordDetailListComponent', () => {
  let component: WordDetailListComponent;
  let fixture: ComponentFixture<WordDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
