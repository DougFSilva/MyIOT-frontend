import { DiscreteDeviceService } from 'src/app/services/discrete-device.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscreteDevice } from 'src/app/models/DiscreteDevice';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-discrete-device',
  templateUrl: './update-discrete-device.component.html',
  styleUrls: ['./update-discrete-device.component.css']
})
export class UpdateDiscreteDeviceComponent implements OnInit {
  device: DiscreteDevice = {
    id: "",
    userId: "",
    location: "",
    name: "",
    status: false
  }
  location = new FormControl(null, Validators.minLength(3));
  name = new FormControl(null, Validators.minLength(3))

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DiscreteDeviceService,
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
      this.toast.error(ex.error.error, "ERRO")
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
