import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordNewComponent } from './word-new.component';

describe('WordNewComponent', () => {
  let component: WordNewComponent;
  let fixture: ComponentFixture<WordNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
