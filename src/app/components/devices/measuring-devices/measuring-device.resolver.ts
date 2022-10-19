import { MeasuringDeviceService } from './../../../services/measuring-device.service';
import { MeasuringDevice } from './../../../models/MeasuringDevice';
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
export class MeasuringDeviceResolver implements Resolve<Observable<MeasuringDevice[]>> {
  constructor(
    private service: MeasuringDeviceService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MeasuringDevice[]> {
    return this.service.findAllByUser(100)
  }
}
