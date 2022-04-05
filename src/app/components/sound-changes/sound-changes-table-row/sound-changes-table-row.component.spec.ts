import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundChangesTableRowComponent } from './sound-changes-table-row.component';

describe('SoundChangesTableRowComponent', () => {
  let component: SoundChangesTableRowComponent;
  let fixture: ComponentFixture<SoundChangesTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundChangesTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundChangesTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
