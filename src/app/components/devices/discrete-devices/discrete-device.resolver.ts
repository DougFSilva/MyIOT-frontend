import { DiscreteDevice } from './../../../models/DiscreteDevice';
import { DiscreteDeviceService } from 'src/app/services/discrete-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscreteDeviceResolver implements Resolve<Observable<DiscreteDevice[]>> {
  constructor(private service: DiscreteDeviceService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiscreteDevice[]> {
    return this.service.findAllByUser();
  }
}
