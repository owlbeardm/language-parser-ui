import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundChangesTableComponent } from './sound-changes-table.component';

describe('SoundChangesTableComponent', () => {
  let component: SoundChangesTableComponent;
  let fixture: ComponentFixture<SoundChangesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundChangesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundChangesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
