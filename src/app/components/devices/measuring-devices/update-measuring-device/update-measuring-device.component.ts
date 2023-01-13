
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MeasuringDevice } from 'src/app/models/MeasuringDevice';
import { MeasuringDeviceService } from 'src/app/services/measuring-device.service';
import { ConfirmDialogComponent } from './../../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-measuring-device',
  templateUrl: './update-measuring-device.component.html',
  styleUrls: ['./update-measuring-device.component.css']
})
export class UpdateMeasuringDeviceComponent implements OnInit {

  device: MeasuringDevice = {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MeasuringDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findById(this.data.id);
  }

  findById(id: string): void {
    this.service.findById(id, 1).subscribe(response => {
      this.device = response
    }, (ex) => {
      this.toast.error(ex.error.error, "ERRO")
    })
  }

  update(): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.updateById(this.data.id, this.device).subscribe(response => {
          this.dialog.closeAll()
        }, (ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
    })
  }

  addKeyName(): void {
    this.device.keyNames.push(this.keyName)
    this.keyName = ""
  }

  removeKeyName(keyName: string){
    const index = this.device.keyNames.indexOf(keyName)
    this.device.keyNames.splice(index,1)
  }

  createValidFields(): boolean {
    return this.name.valid && this.location.valid && this.device.keyNames.length >= 1
  }

  addKeyNameValidFields(): boolean {
    return this.keyNames.valid
  }

}
