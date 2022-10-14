import { AnalogOutputDeviceService } from 'src/app/services/analog-output-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalogOutputDeviceResolver implements Resolve<Observable<AnalogOutputDevice[]>>
{
  constructor(private service: AnalogOutputDeviceService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.service.findAllByUser()
  }
}
