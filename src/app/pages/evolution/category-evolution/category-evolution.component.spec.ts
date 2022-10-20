import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEvolutionComponent } from './category-evolution.component';

describe('CategoryEvolutionComponent', () => {
  let component: CategoryEvolutionComponent;
  let fixture: ComponentFixture<CategoryEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
