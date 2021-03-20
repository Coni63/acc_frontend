import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { Histogram } from '../../interfaces/interface';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  @Input() data: Histogram;

  public keys: string[] = ["total", "TR", "CN", "CC", "PC",  "SA",  "RC", "CP"];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: any = { 
    legend: { 
      display: true, 
      labels: { 
        fontColor: 'black' 
      } 
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    this.display("CC");
  }

  onChange(ob){
    this.display(ob.value);
  }

  display(category: string){
    this.lineChartLabels = this.data[category].x;
    this.lineChartData = [
      { data: this.data[category].y, label: category }
    ];
  }

}
