import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCategoryComponent } from './language-category.component';

describe('LanguageCategoryComponent', () => {
  let component: LanguageCategoryComponent;
  let fixture: ComponentFixture<LanguageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
