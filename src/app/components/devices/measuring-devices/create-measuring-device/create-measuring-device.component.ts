
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MeasuringDevice } from 'src/app/models/MeasuringDevice';
import { MeasuringDeviceService } from 'src/app/services/measuring-device.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-measuring-device',
  templateUrl: './create-measuring-device.component.html',
  styleUrls: ['./create-measuring-device.component.css']
})
export class CreateMeasuringDeviceComponent implements OnInit {

  form: MeasuringDevice = {
    id: "",
    userId: "",
    name: "",
    location: "",
    keyNames:[],
    values:[]
  }
  keyName: string = "";
  name = new FormControl(null, Validators.minLength(3))
  location = new FormControl(null, Validators.minLength(3))
  keyNames = new FormControl(null, Validators.minLength(3))

  constructor(
    private service: MeasuringDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  create(): void {

    console.log(this.form.keyNames.toString)
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

  addKeyName(): void {
    this.form.keyNames.push(this.keyName)
    this.keyName = ""
  }

  removeKeyName(keyName: string){
    const index = this.form.keyNames.indexOf(keyName)
    this.form.keyNames.splice(index,1)
  }

  createValidFields(): boolean {
    return this.name.valid && this.location.valid && this.form.keyNames.length >= 1
  }

  addKeyNameValidFields(): boolean {
    return this.keyNames.valid
  }

}
