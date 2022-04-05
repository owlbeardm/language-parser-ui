import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageWritingComponent } from './language-writing.component';

describe('LanguageWritingComponent', () => {
  let component: LanguageWritingComponent;
  let fixture: ComponentFixture<LanguageWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageWritingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
