import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { AnalogOutputDeviceService } from 'src/app/services/analog-output-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { CreateAnalogOutputDeviceComponent } from 'src/app/components/devices/analog-output-devices/create-analog-output-device/create-analog-output-device.component';
import { UpdateAnalogOutputDeviceComponent } from './update-analog-output-device/update-analog-output-device.component';
import { API_CONFIG } from 'src/app/config/API_CONFIG';

@Component({
  selector: 'app-analog-output-devices',
  templateUrl: './analog-output-devices.component.html',
  styleUrls: ['./analog-output-devices.component.css'],
})
export class AnalogOutputDevicesComponent implements OnInit, OnDestroy {
  devices: AnalogOutputDevice[] = [];
  deviceUpdated: AnalogOutputDevice = {
    id: "",
    userId: "",
    location: "",
    name: "",
    output: 0
  }
  output: number = 0;
  public stompClient;

  //Slider properties
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 256;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  tickInterval = 1;

  constructor(
    private service: AnalogOutputDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.devices = this.route.snapshot.data["devices"]
    this.webSocketConnect()
  }

  ngOnDestroy() : void {
    this.webSocketDisconnect()
  }

  webSocketConnect(): void {
   if(!this.stompClient){
    const socket = new SockJS(`${API_CONFIG.baseUrl}/myiot-websocket/?token=` + localStorage.getItem("token"));
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/user/queue/message/analog-output-device', function (message) {
        that.deviceUpdated = JSON.parse(message.body);
        const index = that.devices.map(device => device.id).indexOf(that.deviceUpdated.id)
        that.devices[index] = that.deviceUpdated
      });
    });
   }
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
        this.toast.error(ex.error.error, 'ERROR');
      }
    );
  }

  create(): void {
    let dialog = this.dialog.open(CreateAnalogOutputDeviceComponent);
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
            this.toast.error(ex.error.error, 'ERROR');
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
            this.toast.error(ex.error.error, 'ERROR');
          }
        );
      }
        return;
    });
  }

  updateById(id: string): void {
    let dialog = this.dialog.open(UpdateAnalogOutputDeviceComponent, {data:{id}})
    dialog.afterClosed().subscribe(response => {
      this.findDevices()
    })
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

  updateOutput(id: string, output: number): void {
    this.service.publishOutputOnBrokerMqtt(id, output).subscribe(
      (response) => {
        this.toast.success('Comando publicado com sucesso!', 'SUCESSO');
      },
      (ex) => {
        this.toast.error(ex.error.error, 'ERROR');
      }
    );
  }
}
