import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalogOutputDeviceService } from 'src/app/services/analog-output-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-analog-output-device',
  templateUrl: './update-analog-output-device.component.html',
  styleUrls: ['./update-analog-output-device.component.css']
})
export class UpdateAnalogOutputDeviceComponent implements OnInit {
  device: AnalogOutputDevice = {
    id: "",
    userId: "",
    location: "",
    name: "",
    output: 0
  }
  location = new FormControl(null, Validators.minLength(3));
  name = new FormControl(null, Validators.minLength(3))

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AnalogOutputDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.findById(this.data.id);
  }

  findById(id: string ): void{
    this.service.findById(id).subscribe(response => {
      this.device = response
    }, (ex) => {
      this.toast.error(ex.error.error, "ERROR")
    })
  }

  update(): void{
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.service.updateById(this.device.id, this.device).subscribe(response => {
          this.toast.success("Dispositivo atualizado com sucesso!", "SUCESSO")
          this.dialog.closeAll()
        })
      }
      return
    })
  }

  validFields(): boolean {
    return this.location.valid && this.name.valid
  }

}
