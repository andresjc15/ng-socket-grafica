import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  public lineChartType: ChartType = 'line';
  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.escucharSockets();
  }

  getData() {
    this.http.get('http://localhost:5000/grafica')
      .subscribe( (data: any) => {
        this.lineChartData = data;
      });
  }

  escucharSockets() {
    this.wsService.listen('cambio-grafica')
      .subscribe( (data: any) => {
        console.log('socket', data);
        this.lineChartData = data;
      });
  }

}
