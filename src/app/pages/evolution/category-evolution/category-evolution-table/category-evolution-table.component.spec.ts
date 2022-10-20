import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEvolutionTableComponent } from './category-evolution-table.component';

describe('CategoryEvolutionTableComponent', () => {
  let component: CategoryEvolutionTableComponent;
  let fixture: ComponentFixture<CategoryEvolutionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEvolutionTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEvolutionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
