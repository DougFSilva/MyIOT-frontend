import { TestBed } from '@angular/core/testing';

import { DiscreteDeviceResolver } from './discrete-device.resolver';

describe('DiscreteDeviceResolver', () => {
  let resolver: DiscreteDeviceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiscreteDeviceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
