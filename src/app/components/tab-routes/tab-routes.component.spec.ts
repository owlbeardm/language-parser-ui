import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRoutesComponent } from './tab-routes.component';

describe('TabRoutesComponent', () => {
  let component: TabRoutesComponent;
  let fixture: ComponentFixture<TabRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
