import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasuringDeviceComponent } from './update-measuring-device.component';

describe('UpdateMeasuringDeviceComponent', () => {
  let component: UpdateMeasuringDeviceComponent;
  let fixture: ComponentFixture<UpdateMeasuringDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMeasuringDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMeasuringDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
