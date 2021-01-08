import { TestBed } from '@angular/core/testing';

import { TraceGuard } from './trace.guard';

describe('TraceGuard', () => {
  let guard: TraceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TraceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
