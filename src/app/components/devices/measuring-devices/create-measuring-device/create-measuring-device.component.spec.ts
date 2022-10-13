import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeasuringDeviceComponent } from './create-measuring-device.component';

describe('CreateMeasuringDeviceComponent', () => {
  let component: CreateMeasuringDeviceComponent;
  let fixture: ComponentFixture<CreateMeasuringDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeasuringDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMeasuringDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
