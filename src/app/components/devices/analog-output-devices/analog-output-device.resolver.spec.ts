import { TestBed } from '@angular/core/testing';

import { AnalogOutputDeviceResolver } from './analog-output-device.resolver';

describe('AnalogOutputDeviceResolver', () => {
  let resolver: AnalogOutputDeviceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AnalogOutputDeviceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
