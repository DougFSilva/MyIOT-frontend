import { TestBed } from '@angular/core/testing';

import { MeasuringDeviceResolver } from './measuring-device.resolver';

describe('MeasuringDeviceResolver', () => {
  let resolver: MeasuringDeviceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MeasuringDeviceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
