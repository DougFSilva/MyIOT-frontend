import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnalogOutputDeviceComponent } from './update-analog-output-device.component';

describe('UpdateAnalogOutputDeviceComponent', () => {
  let component: UpdateAnalogOutputDeviceComponent;
  let fixture: ComponentFixture<UpdateAnalogOutputDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnalogOutputDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnalogOutputDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
