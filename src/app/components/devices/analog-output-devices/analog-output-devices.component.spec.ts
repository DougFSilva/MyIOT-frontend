import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputDevicesComponent } from './analog-output-devices.component';

describe('AnalogOutputDevicesComponent', () => {
  let component: AnalogOutputDevicesComponent;
  let fixture: ComponentFixture<AnalogOutputDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogOutputDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogOutputDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
