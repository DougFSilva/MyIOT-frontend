import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscreteDeviceComponent } from './update-discrete-device.component';

describe('UpdateDiscreteDeviceComponent', () => {
  let component: UpdateDiscreteDeviceComponent;
  let fixture: ComponentFixture<UpdateDiscreteDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiscreteDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDiscreteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
