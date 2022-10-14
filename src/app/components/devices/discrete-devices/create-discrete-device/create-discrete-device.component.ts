import { DiscreteDeviceService } from 'src/app/services/discrete-device.service';
import { DiscreteDevice } from './../../../../models/DiscreteDevice';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-discrete-device',
  templateUrl: './create-discrete-device.component.html',
  styleUrls: ['./create-discrete-device.component.css']
})
export class CreateDiscreteDeviceComponent implements OnInit {

  form: DiscreteDevice = {
    id: "",
    userId: "",
    name: "",
    location: "",
    status: false
  }

  name = new FormControl(null, Validators.minLength(3))
  location = new FormControl(null, Validators.minLength(3))
  constructor(
    private service: DiscreteDeviceService,
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
