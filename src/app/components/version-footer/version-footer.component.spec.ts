import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionFooterComponent } from './version-footer.component';

describe('VersionFooterComponent', () => {
  let component: VersionFooterComponent;
  let fixture: ComponentFixture<VersionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
