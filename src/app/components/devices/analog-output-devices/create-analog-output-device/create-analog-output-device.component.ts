import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { AnalogOutputDeviceService } from 'src/app/services/analog-output-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';


@Component({
  selector: 'app-create-analog-output-device',
  templateUrl: './create-analog-output-device.component.html',
  styleUrls: ['./create-analog-output-device.component.css']
})
export class CreateAnalogOutputDeviceComponent implements OnInit {

  form: AnalogOutputDevice = {
    id: "",
    userId: "",
    name: "",
    location: "",
    output: 0
  }

  name = new FormControl(null, Validators.minLength(3))
  location = new FormControl(null, Validators.minLength(3))
  constructor(
    private service: AnalogOutputDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.create(this.form).subscribe(response => {
          this.toast.success("Dispositivo criado com sucesso!", "SUCESSO")
          this.dialog.closeAll()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
      return
    })
  }

  validFields(): boolean {
    return this.name.valid && this.location.valid
  }
}
