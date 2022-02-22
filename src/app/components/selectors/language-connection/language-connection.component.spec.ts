import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConnectionComponent } from './language-connection.component';

describe('LanguageConnectionComponent', () => {
  let component: LanguageConnectionComponent;
  let fixture: ComponentFixture<LanguageConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
