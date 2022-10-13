import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscreteDeviceComponent } from './create-discrete-device.component';

describe('CreateDiscreteDeviceComponent', () => {
  let component: CreateDiscreteDeviceComponent;
  let fixture: ComponentFixture<CreateDiscreteDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiscreteDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiscreteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
