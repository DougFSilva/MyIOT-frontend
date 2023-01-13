import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { UpdateDiscreteDeviceComponent } from './update-discrete-device/update-discrete-device.component';
import { CreateDiscreteDeviceComponent } from './create-discrete-device/create-discrete-device.component';
import { DiscreteDevicesComponent } from './discrete-devices.component';

@NgModule({
  declarations: [
    DiscreteDevicesComponent,
    CreateDiscreteDeviceComponent,
    UpdateDiscreteDeviceComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    ClipboardModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule
  ],
  exports: [
    DiscreteDevicesComponent,
    CreateDiscreteDeviceComponent,
    UpdateDiscreteDeviceComponent,
  ],
})
export class DiscreteDevicesModule {}
