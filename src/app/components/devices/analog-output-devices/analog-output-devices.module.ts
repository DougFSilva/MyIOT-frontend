import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import  {  ClipboardModule  }  from  'ngx-clipboard' ;
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';

import { AnalogOutputDevicesComponent } from './analog-output-devices.component';
import { CreateAnalogOutputDeviceComponent } from './create-analog-output-device/create-analog-output-device.component';
import { UpdateAnalogOutputDeviceComponent } from './update-analog-output-device/update-analog-output-device.component';


@NgModule({
  declarations: [
    AnalogOutputDevicesComponent,
    CreateAnalogOutputDeviceComponent,
    UpdateAnalogOutputDeviceComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    ClipboardModule,
    MatTooltipModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    BrowserAnimationsModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    AnalogOutputDevicesComponent,
    CreateAnalogOutputDeviceComponent,
    UpdateAnalogOutputDeviceComponent,
  ],
})
export class AnalogOutputDevicesModule {}
