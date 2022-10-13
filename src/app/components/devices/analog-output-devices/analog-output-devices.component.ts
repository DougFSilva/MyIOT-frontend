import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { AnalogOutputDeviceService } from 'src/app/services/analog-output-device.service';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { CreateAnalogOutputDeviceComponent } from 'src/app/components/devices/analog-output-devices/create-analog-output-device/create-analog-output-device.component';
import { UpdateAnalogOutputDeviceComponent } from './update-analog-output-device/update-analog-output-device.component';

@Component({
  selector: 'app-analog-output-devices',
  templateUrl: './analog-output-devices.component.html',
  styleUrls: ['./analog-output-devices.component.css'],
})
export class AnalogOutputDevicesComponent implements OnInit {
  devices: AnalogOutputDevice[] = [];
  private stompClient;
  public websocketComponent: AnalogOutputDevicesComponent;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 256;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical = false;
  tickInterval = 1;

  constructor(
    private service: AnalogOutputDeviceService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findDevices();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/myiot-websocket/?token=' + localStorage.getItem("token"));
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/user/queue/message', function (hello) {
        _this.addMessages(JSON.parse(hello.body).payload);
      });
    });
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
    this.dialog.open(CreateAnalogOutputDeviceComponent);
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
      } else {
        return;
      }
    });
  }

  deleteById(id: string) {
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
      } else {
        return;
      }
    });
  }

  updateById(id: string) {
    this.dialog.open(UpdateAnalogOutputDeviceComponent, {data:{id:id}})
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
