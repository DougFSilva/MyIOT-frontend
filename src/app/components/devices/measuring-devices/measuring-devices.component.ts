import {
  Chart,
  ChartConfiguration,
  ChartDataset,
  ChartEvent,
  ChartType,
  TimeScale,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MeasuredValue } from 'src/app/models/Measuredvalue';
import { UpdateMeasuringDeviceComponent } from './update-measuring-device/update-measuring-device.component';
import { CreateMeasuringDeviceComponent } from './create-measuring-device/create-measuring-device.component';
import { MeasuringDeviceService } from 'src/app/services/measuring-device.service';
import { MeasuredValueService } from 'src/app/services/measured-value.service';
import { MeasuringDevice } from 'src/app/models/MeasuringDevice';
import { DateFilter } from 'src/app/models/DateFilter';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-measuring-devices',
  templateUrl: './measuring-devices.component.html',
  styleUrls: ['./measuring-devices.component.css'],
})
export class MeasuringDevicesComponent implements OnInit {
  devices: MeasuringDevice[] = [];
  initialDateTime: string;
  finalDateTime: string;
  measurementLimit:number;
  measuredValue: MeasuredValue = {
    id: '',
    deviceId: '',
    timestamp: new Date(),
    values: null,
  };
  public stompClient;
  // Gráfico
  public lineChartColor = [
    {
      backgroundColor: 'rgba(92, 255, 130, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'lightGreen',
      pointBorderColor: 'green',
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: 'red',
    },
    {
      backgroundColor: 'rgba(255, 153, 0, 0.2)',
      borderColor: 'coral',
      pointBackgroundColor: 'lightCoral',
      pointBorderColor: 'coral',
      pointHoverBackgroundColor: 'coral',
      pointHoverBorderColor: 'red',
    },
    {
      backgroundColor: 'rgba(0, 120, 255, 0.2)',
      borderColor: 'skyBlue',
      pointBackgroundColor: 'lightSkyBlue',
      pointBorderColor: 'skyBlue',
      pointHoverBackgroundColor: 'skyBlue',
      pointHoverBorderColor: 'red',
    },
    {
      backgroundColor: 'rgba(127, 0, 132, 0.2)',
      borderColor: 'blueViolet',
      pointBackgroundColor: 'violet',
      pointBorderColor: 'blueViolet',
      pointHoverBackgroundColor: 'blueViolet',
      pointHoverBorderColor: 'red',
    },
  ];
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        display: 'auto',
        ticks: {
          autoSkip: true,
          minRotation: 90,
          maxRotation: 90,
        }
      },
      'y-axis-0': {
        position: 'left',
      },
    },
  };

  //Tabela
  ELEMENT_DATA: MeasuringDevice[] = [];
  displayedColumns: string[] = ['timestamp', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private service: MeasuringDeviceService,
    private measuredValueService: MeasuredValueService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenResize()
}

  ngOnInit(): void {
    this.screenResize()
    this.devices = this.route.snapshot.data['devices'];
    this.measurementLimit=100
    this.webSocketConnect();
  }

  ngOnDestroy(): void {
    this.webSocketDisconnect();
  }

  screenResize(): void {
    if(window.innerWidth < 900){
      this.lineChartOptions.scales['x'].display = false
    }else {
      this.lineChartOptions.scales['x'].display = 'auto'
    }
  }

  webSocketConnect(): void {
    if (this.stompClient) {
      this.toast.info('Já conectado!', 'INFO');
      return;
    }
    const socket = new SockJS(
      `${API_CONFIG.baseUrl}/myiot-websocket/?token=` +
        localStorage.getItem('token')
    );
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(
        '/user/queue/message/measuring-device',
        function (message) {
          that.measuredValue = JSON.parse(message.body);
          const index = that.devices
            .map((device) => device.id)
            .indexOf(that.measuredValue.deviceId);
          that.devices[index].values.push(that.measuredValue);
        }
      );
    });
  }

  webSocketDisconnect(): void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  findDevices(): void {
    this.service.findAllByUser(this.measurementLimit).subscribe(
      (response) => {
        this.devices = response;
      },
      (ex) => {
        this.toast.error(ex.error.error, 'ERRO');
      }
    );
  }

  findDevicesByTimeRange(initialDate: string, finalDate: string, initialTime:string, finalTime:string ): void{
    const filter = new DateFilter(initialDate, finalDate, initialTime, finalTime)
    this.service.findAllByUserAndTimeRange(this.measurementLimit, filter).subscribe(response => {
      this.devices = response
      this.toast.success("Dados atualizados", 'SUCESSO')
    }, (ex) => {
      this.toast.error(ex.error.error, "ERRO")
    })
  }

  dataUpdate(): void {
    this.service.findAllByUser(this.measurementLimit).subscribe((response) => {
      this.devices = response;
      this.toast.success('Dados atualizados!', 'SUCESSO');
    });
  }

  create(): void {
    let dialog = this.dialog.open(CreateMeasuringDeviceComponent);
    dialog.afterClosed().subscribe((response) => {
      this.findDevices();
    });
  }

  deleteAll(): void {
    let dialog = this.dialog.open(ConfirmDialogComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.service.deleteByUser().subscribe(
          (response) => {
            this.toast.success('Dispositivos deletados com sucesso!','SUCESSO');
            this.findDevices();
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
            this.toast.success('Dispositivo deletado com sucesso!', 'SUCESSO');
            this.findDevices();
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
    let dialog = this.dialog.open(UpdateMeasuringDeviceComponent, {data: { id },});
    dialog.afterClosed().subscribe((response) => {
      this.findDevices();
    });
  }

  deleteAllMeasuredValues(deviceId: string): void {
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.measuredValueService.deleteAllByDevice(deviceId).subscribe(response => {
          this.toast.success("Medições deletadas com sucesso!", "SUCESSO")
          this.findDevices()
        },(ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
    })
  }

  deleteMeasuredValue(deviceId: string, id: string): void{
    let dialog = this.dialog.open(ConfirmDialogComponent)
    dialog.afterClosed().subscribe(response => {
      if(response == "true"){
        this.measuredValueService.deleteById(deviceId, id).subscribe(response => {
          this.toast.success("Medição deletada com sucesso!", "SUCESSO")
          this.findDevices()
        },(ex) => {
          this.toast.error(ex.error.error, "ERRO")
        })
      }
    })
  }

  getChartConfiguration(device: MeasuringDevice): ChartConfiguration['data'] {
    let lineChartData: ChartConfiguration['data'] = {
      datasets: [],
      labels: [],
    };
    for (let index = 0; index < device.keyNames.length; index++) {
      let chartData: ChartDataset = {
        data: [],
        label: device.keyNames[index],
        backgroundColor: this.lineChartColor[index].backgroundColor,
        borderColor: this.lineChartColor[index].borderColor,
        pointBackgroundColor: this.lineChartColor[index].pointBackgroundColor,
        pointBorderColor: this.lineChartColor[index].pointBorderColor,
        pointStyle:'line',
        pointHoverBackgroundColor:
        this.lineChartColor[index].pointHoverBackgroundColor,
        pointHoverBorderColor: this.lineChartColor[index].pointHoverBorderColor,
        fill: 'origin',
        spanGaps: true,
        animation: false,
      };
      device.values.forEach((measuredValue) => {
      chartData.data.push(measuredValue.values[index]);
      });
      lineChartData.datasets.push(chartData);
    }
    device.values.forEach((measuredValue) => {
    lineChartData.labels.push(measuredValue.timestamp.toLocaleString().substring(2,19));
    });
    return lineChartData;
  }

  public chartClicked({event,active,}: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({event,active,}: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  dateTimeFilter() {
    const initialDateTime = new Date(this.initialDateTime)
    const finalDateTime = new Date(this.finalDateTime)
    this.findDevicesByTimeRange(
      initialDateTime.toLocaleDateString('fr-CA'),
      finalDateTime.toLocaleDateString('fr-CA'),
      initialDateTime.toLocaleTimeString(),
      finalDateTime.toLocaleTimeString()
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  copySucessfully(): void {
    this.toast.success("Tópico copiado para área de transferência", "SUCESSO")
  }
}
