import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTabsComponent } from './language-tabs.component';

describe('LanguageTabsComponent', () => {
  let component: LanguageTabsComponent;
  let fixture: ComponentFixture<LanguageTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
