import { MeasuringDeviceResolver } from './components/devices/measuring-devices/measuring-device.resolver';
import { DiscreteDeviceResolver } from './components/devices/discrete-devices/discrete-device.resolver';
import { AnalogOutputDeviceResolver } from './components/devices/analog-output-devices/analog-output-device.resolver';
import { UserComponent } from './components/user/user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { CreateUserComponent } from 'src/app/components/user/create-user/create-user.component';
import { UpdateUserComponent } from 'src/app/components/user/update-user/update-user.component';
import { AnalogOutputDevicesComponent } from './components/devices/analog-output-devices/analog-output-devices.component';
import { AnalogOutputDeviceComponent } from './components/devices/analog-output-devices/analog-output-device/analog-output-device.component';
import { CreateAnalogOutputDeviceComponent } from './components/devices/analog-output-devices/create-analog-output-device/create-analog-output-device.component';
import { UpdateAnalogOutputDeviceComponent } from './components/devices/analog-output-devices/update-analog-output-device/update-analog-output-device.component';
import { DiscreteDevicesComponent } from './components/devices/discrete-devices/discrete-devices.component';
import { DiscreteDeviceComponent } from './components/devices/discrete-devices/discrete-device/discrete-device.component';
import { CreateDiscreteDeviceComponent } from './components/devices/discrete-devices/create-discrete-device/create-discrete-device.component';
import { UpdateDiscreteDeviceComponent } from './components/devices/discrete-devices/update-discrete-device/update-discrete-device.component';
import { MeasuringDevicesComponent } from './components/devices/measuring-devices/measuring-devices.component';
import { MeasuringDeviceComponent } from './components/devices/measuring-devices/measuring-device/measuring-device.component';
import { CreateMeasuringDeviceComponent } from './components/devices/measuring-devices/create-measuring-device/create-measuring-device.component';
import { UpdateMeasuringDeviceComponent } from './components/devices/measuring-devices/update-measuring-device/update-measuring-device.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user/create',
    component: CreateUserComponent,
  },
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user/update/:id',
        component: UpdateUserComponent,
      },
      {
        path: 'analog-output-device/all',
        component: AnalogOutputDevicesComponent,
        resolve: {devices : AnalogOutputDeviceResolver}
      },
      {
        path: 'analog-output-device:/id',
        component: AnalogOutputDeviceComponent,
      },
      {
        path: 'analog-output-device/create',
        component: CreateAnalogOutputDeviceComponent
      },
      {
        path: 'analog-output-device/update/:id',
        component: UpdateAnalogOutputDeviceComponent
      },
      {
        path: 'discrete-device/all',
        component: DiscreteDevicesComponent,
        resolve: {devices: DiscreteDeviceResolver}
      },
      {
        path: 'discrete-device/:id',
        component: DiscreteDeviceComponent,
      },
      {
        path: 'discrete-device/create',
        component: CreateDiscreteDeviceComponent,
      },
      {
        path: 'discrete-device/update/:id',
        component: UpdateDiscreteDeviceComponent,
      },
      {
        path: 'measuring-device/all',
        component: MeasuringDevicesComponent,
        resolve: {devices: MeasuringDeviceResolver}
      },
      {
        path: 'measuring-device/:id',
        component: MeasuringDeviceComponent
      },
      {
        path: 'measuring-device/create',
        component: CreateMeasuringDeviceComponent
      },
      {
        path: 'measuring-device/update/:id',
        component: UpdateMeasuringDeviceComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
