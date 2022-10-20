import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import { NgChartsModule }  from  'ng2-charts' ;
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnalogOutputDevicesComponent } from './components/devices/analog-output-devices/analog-output-devices.component';
import { DiscreteDevicesComponent } from './components/devices/discrete-devices/discrete-devices.component';
import { MeasuringDevicesComponent } from './components/devices/measuring-devices/measuring-devices.component';
import { UpdateMeasuringDeviceComponent } from './components/devices/measuring-devices/update-measuring-device/update-measuring-device.component';
import { DiscreteDeviceComponent } from './components/devices/discrete-devices/discrete-device/discrete-device.component';
import { MeasuringDeviceComponent } from './components/devices/measuring-devices/measuring-device/measuring-device.component';
import { AnalogOutputDeviceComponent } from './components/devices/analog-output-devices/analog-output-device/analog-output-device.component';
import { CreateAnalogOutputDeviceComponent } from './components/devices/analog-output-devices/create-analog-output-device/create-analog-output-device.component';
import { UpdateAnalogOutputDeviceComponent } from './components/devices/analog-output-devices/update-analog-output-device/update-analog-output-device.component';
import { CreateMeasuringDeviceComponent } from './components/devices/measuring-devices/create-measuring-device/create-measuring-device.component';
import { CreateDiscreteDeviceComponent } from './components/devices/discrete-devices/create-discrete-device/create-discrete-device.component';
import { UpdateDiscreteDeviceComponent } from './components/devices/discrete-devices/update-discrete-device/update-discrete-device.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { UserComponent } from './components/user/user.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnalogOutputDevicesComponent,
    AnalogOutputDeviceComponent,
    CreateAnalogOutputDeviceComponent,
    UpdateAnalogOutputDeviceComponent,
    DiscreteDevicesComponent,
    DiscreteDeviceComponent,
    CreateDiscreteDeviceComponent,
    UpdateDiscreteDeviceComponent,
    MeasuringDevicesComponent,
    MeasuringDeviceComponent,
    CreateMeasuringDeviceComponent,
    UpdateMeasuringDeviceComponent,
    NavigationComponent,
    CreateUserComponent,
    UpdateUserComponent,
    FooterComponent,
    UserComponent,
    ConfirmDialogComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatDialogModule,
    MatSliderModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthInterceptorProvider, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
