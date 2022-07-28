import { TestBed } from '@angular/core/testing';

import { WorldDetailsResolver } from './world-details.resolver';

describe('WorldDetailsResolver', () => {
  let resolver: WorldDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WorldDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
