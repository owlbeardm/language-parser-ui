import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetailDescendantsComponent } from './word-detail-descendants.component';

describe('WordDetailDescendantsComponent', () => {
  let component: WordDetailDescendantsComponent;
  let fixture: ComponentFixture<WordDetailDescendantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDetailDescendantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordDetailDescendantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
