import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { UserModule } from './components/user/user.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { FooterModule } from './components/footer/footer.module';
import { MeasuringDevicesModule } from './components/devices/measuring-devices/measuring-devices.module';
import { DiscreteDevicesModule } from './components/devices/discrete-devices/discrete-devices.module';
import { AnalogOutputDevicesModule } from './components/devices/analog-output-devices/analog-output-devices.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,
    AnalogOutputDevicesModule,
    DiscreteDevicesModule,
    MeasuringDevicesModule,
    FooterModule,
    HomeModule,
    LoginModule,
    NavigationModule,
    UserModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
