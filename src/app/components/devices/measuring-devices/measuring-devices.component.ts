import { MeasuredValue } from './../../../models/Measuredvalue';
import { UpdateMeasuringDeviceComponent } from './update-measuring-device/update-measuring-device.component';
import { CreateMeasuringDeviceComponent } from './create-measuring-device/create-measuring-device.component';
import { MeasuringDeviceService } from './../../../services/measuring-device.service';
import { MeasuringDevice } from './../../../models/MeasuringDevice';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-measuring-devices',
  templateUrl: './measuring-devices.component.html',
  styleUrls: ['./measuring-devices.component.css']
})
export class MeasuringDevicesComponent implements OnInit {

  devices: MeasuringDevice[] = [];
  measuredValue: MeasuredValue = {
   id: "",
   deviceId: "",
   timestamp: "",
   values: []
  }
  public stompClient;
  constructor(
    private service: MeasuringDeviceService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.devices = this.route.snapshot.data["devices"]
    this.webSocketConnect()
  }

  ngOnDestroy() : void {
    this.webSocketDisconnect()
  }

  webSocketConnect(): void {
    if(this.stompClient){
      this.toast.info("Já conectado!", "INFO")
      return
    }
     const socket = new SockJS(`${API_CONFIG.baseUrl}/myiot-websocket/?token=` + localStorage.getItem("token"));
     this.stompClient = Stomp.over(socket);
     const that = this;
     this.stompClient.connect({}, function (frame) {
       that.stompClient.subscribe('/user/queue/message/measuring-device', function (message) {
         that.measuredValue = JSON.parse(message.body);
         const index = that.devices.map(device => device.id).indexOf(that.measuredValue.deviceId)
         that.devices[index].values.push(that.measuredValue)
       });
     });
   }

   webSocketDisconnect(): void {
     if (this.stompClient != null) {
       this.stompClient.disconnect();
     }
   }

   findDevices(): void {
     this.service.findAllByUser().subscribe(
       (response) => {
         this.devices = response;

       },
       (ex) => {
         this.toast.error(ex.error.error, 'ERRO');
       }
     );
   }

   dataUpdate(): void {
    this.service.findAllByUser().subscribe(response => {
      this.devices = response;
      this.devices.forEach(device => {
        console.log(device.values)
       })
      this.toast.success("Dados atualizados!", "SUCESSO")
    })
   }

   create(): void {
     let dialog = this.dialog.open(CreateMeasuringDeviceComponent);
     dialog.afterClosed().subscribe( response => {
       this.findDevices()
     })
   }

   deleteAll(): void {
     let dialog = this.dialog.open(ConfirmDialogComponent);
     dialog.afterClosed().subscribe((response) => {
       if (response == 'true') {
         this.service.deleteByUser().subscribe(
           (response) => {
             this.toast.success('Dispositivos deletados com sucesso!','SUCESSO');
             this.findDevices()
           },
           (ex) => {
             this.toast.error(ex.error.error, 'ERRO');
           }
         );
       }
         return;
     });
   }

   deleteById(id: string): void {
     let dialog = this.dialog.open(ConfirmDialogComponent);
     dialog.afterClosed().subscribe((response) => {
       if (response == 'true') {
         this.service.deleteById(id).subscribe(
           (response) => {
             this.toast.success('Dispositivo deletado com sucesso!','SUCESSO');
             this.findDevices()
           },
           (ex) => {
             this.toast.error(ex.error.error, 'ERRO');
           }
         );
       }
         return;
     });
   }

   updateById(id: string): void {
     let dialog = this.dialog.open(UpdateMeasuringDeviceComponent, {data:{id}})
     dialog.afterClosed().subscribe(response => {
       this.findDevices()
     })
   }
}
