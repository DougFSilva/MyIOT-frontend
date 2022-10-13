import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringDevicesComponent } from './measuring-devices.component';

describe('MeasuringDevicesComponent', () => {
  let component: MeasuringDevicesComponent;
  let fixture: ComponentFixture<MeasuringDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuringDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
