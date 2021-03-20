import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { Rating } from '../../interfaces/interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() data: Rating[];

  public keys: string[] = ["total", "TR", "CN", "CC", "PC",  "SA",  "RC", "CP"];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: string[];
  public lineChartOptions: any = { 
    legend: { 
      display: true, 
      labels: { 
        fontColor: 'black' 
      } 
    },
    // scales : {
    //   yAxes: [{
    //      ticks: {
    //         steps : 10,
    //         stepValue : 10,
    //         max : 100,
    //         min: 0
    //       }
    //   }]
    // }
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
    // if (category == "total") {
    //   this.lineChartOptions.scales.yAxes[0].ticks.max = 10000;
    //   console.log(this.lineChartOptions);
    // } else {
    //   this.lineChartOptions.scales.yAxes[0].ticks.max = 100;
    //   console.log(this.lineChartOptions);
    // }


    let x: string[] = [];
    let y: number[] = [];
    this.lineChartLabels
    this.data.forEach(element => {
      x.push(new Date(element.datetime).toLocaleDateString());
      y.push(element[category])
    });



    while (x.length < 10){
      x.push("N/A");
      y.push(0);
    }

    x.reverse();
    y.reverse();

    this.lineChartLabels = x;
    this.lineChartData = [
      { data: y, label: category }
    ];
  }

}