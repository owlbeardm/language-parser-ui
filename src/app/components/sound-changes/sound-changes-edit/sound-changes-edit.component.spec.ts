import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundChangesEditComponent } from './sound-changes-edit.component';

describe('SoundChangesEditComponent', () => {
  let component: SoundChangesEditComponent;
  let fixture: ComponentFixture<SoundChangesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundChangesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundChangesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
