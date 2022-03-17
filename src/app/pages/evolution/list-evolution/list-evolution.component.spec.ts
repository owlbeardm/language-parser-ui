import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvolutionComponent } from './list-evolution.component';

describe('ListEvolutionComponent', () => {
  let component: ListEvolutionComponent;
  let fixture: ComponentFixture<ListEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEvolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
