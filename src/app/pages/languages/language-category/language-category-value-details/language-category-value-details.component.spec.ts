import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCategoryValueDetailsComponent } from './language-category-value-details.component';

describe('LanguageCategoryValueDetailsComponent', () => {
  let component: LanguageCategoryValueDetailsComponent;
  let fixture: ComponentFixture<LanguageCategoryValueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCategoryValueDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCategoryValueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
