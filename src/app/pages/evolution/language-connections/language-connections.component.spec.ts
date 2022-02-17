import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConnectionsComponent } from './language-connections.component';

describe('LanguageConnectionsComponent', () => {
  let component: LanguageConnectionsComponent;
  let fixture: ComponentFixture<LanguageConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
