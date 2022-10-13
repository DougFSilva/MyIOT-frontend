import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteDevicesComponent } from './discrete-devices.component';

describe('DiscreteDevicesComponent', () => {
  let component: DiscreteDevicesComponent;
  let fixture: ComponentFixture<DiscreteDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscreteDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
