import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { NgChartsModule }  from  'ng2-charts' ;
import { ToastrModule } from 'ngx-toastr';

import { UpdateMeasuringDeviceComponent } from './update-measuring-device/update-measuring-device.component';
import { CreateMeasuringDeviceComponent } from './create-measuring-device/create-measuring-device.component';
import { MeasuringDevicesComponent } from './measuring-devices.component';

@NgModule({
  declarations: [
    MeasuringDevicesComponent,
    CreateMeasuringDeviceComponent,
    UpdateMeasuringDeviceComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    ClipboardModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut:1500,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    MeasuringDevicesComponent,
    CreateMeasuringDeviceComponent,
    UpdateMeasuringDeviceComponent,
  ],
  providers: [MatDatepickerModule]
})
export class MeasuringDevicesModule {}
