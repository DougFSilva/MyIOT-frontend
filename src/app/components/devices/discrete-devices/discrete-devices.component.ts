import { CreateDiscreteDeviceComponent } from './create-discrete-device/create-discrete-device.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ActivatedRoute } from '@angular/router';

import { DiscreteDeviceService } from 'src/app/services/discrete-device.service';
import { DiscreteDevice } from 'src/app/models/DiscreteDevice';
import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { UpdateDiscreteDeviceComponent } from './update-discrete-device/update-discrete-device.component';

@Component({
  selector: 'app-discrete-devices',
  templateUrl: './discrete-devices.component.html',
  styleUrls: ['./discrete-devices.component.css']
})
export class DiscreteDevicesComponent implements OnInit, OnDestroy {
  devices: DiscreteDevice[]=[];
  deviceUpdated: DiscreteDevice = {
    id: "",
    userId: "",
    location: "",
    name: "",
    status: false
  }
  public stompClient;
  constructor(
    private service: DiscreteDeviceService,
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
       that.stompClient.subscribe('/user/queue/message/discrete-device', function (message) {
         that.deviceUpdated = JSON.parse(message.body);
         const index = that.devices.map(device => device.id).indexOf(that.deviceUpdated.id)
         that.devices[index] = that.deviceUpdated
         that.toast.info("Dispositivo atualizado!", "INFORMAÇÂO")
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
      this.toast.success("Dados atualizados!", "SUCESSO")
    })
   }

   create(): void {
     let dialog = this.dialog.open(CreateDiscreteDeviceComponent);
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
     let dialog = this.dialog.open(UpdateDiscreteDeviceComponent, {data:{id}})
     dialog.afterClosed().subscribe(response => {
      if(response == false){
        return
      }
       this.findDevices()
     })
   }

   updateStatus(id: string, status: boolean): void {
     this.service.publishStatusOnBrokerMqtt(id, status).subscribe(
       (response) => {
         this.toast.success('Comando publicado com sucesso!', 'SUCESSO');
       },
       (ex) => {
         this.toast.error(ex.error.error, 'ERRO');
       }
     );
   }

   copySucessfully(): void {
    this.toast.success("Tópico copiado para área de transferência", "SUCESSO")
  }

}
