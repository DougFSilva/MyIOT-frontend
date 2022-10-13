import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteDeviceComponent } from './discrete-device.component';

describe('DiscreteDeviceComponent', () => {
  let component: DiscreteDeviceComponent;
  let fixture: ComponentFixture<DiscreteDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscreteDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
