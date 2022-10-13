import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnalogOutputDeviceComponent } from './create-analog-output-device.component';

describe('CreateAnalogOutputDeviceComponent', () => {
  let component: CreateAnalogOutputDeviceComponent;
  let fixture: ComponentFixture<CreateAnalogOutputDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnalogOutputDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnalogOutputDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
