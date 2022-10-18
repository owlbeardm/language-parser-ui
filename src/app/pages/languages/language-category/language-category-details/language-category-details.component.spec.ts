import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCategoryDetailsComponent } from './language-category-details.component';

describe('LanguageCategoryDetailsComponent', () => {
  let component: LanguageCategoryDetailsComponent;
  let fixture: ComponentFixture<LanguageCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCategoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
