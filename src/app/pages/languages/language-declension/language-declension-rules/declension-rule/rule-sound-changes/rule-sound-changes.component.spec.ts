import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSoundChangesComponent } from './rule-sound-changes.component';

describe('RuleSoundChangesComponent', () => {
  let component: RuleSoundChangesComponent;
  let fixture: ComponentFixture<RuleSoundChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleSoundChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleSoundChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
