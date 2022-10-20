import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEvolutionInputComponent } from './category-evolution-input.component';

describe('CategoryEvolutionInputComponent', () => {
  let component: CategoryEvolutionInputComponent;
  let fixture: ComponentFixture<CategoryEvolutionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEvolutionInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEvolutionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
