import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputDeviceComponent } from './analog-output-device.component';

describe('AnalogOutputDeviceComponent', () => {
  let component: AnalogOutputDeviceComponent;
  let fixture: ComponentFixture<AnalogOutputDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogOutputDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogOutputDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
