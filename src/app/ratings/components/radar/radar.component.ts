import { Component, OnInit, Input } from '@angular/core';
import { Rating } from '../../interfaces/interface';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

  @Input() my_ratings: Rating;
  @Input() avg_ratings: Rating;

  // Radar
  public demoradarChartLabels: string[] = ['TR', 'CN', 'CC', 'PC', 'SA', 'RC', 'CP'];

  public demoradarChartData: any;
  public radarChartType: string = 'radar';
  public radarChartOptions: any = { 
    legend: { 
      display: true, 
      labels: { 
        fontColor: 'black' 
      } 
    },
    scale: {
      ticks: {
          beginAtZero: true,
          max: 100
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.demoradarChartData = [
      {
        data: [
          this.my_ratings.TR,
          this.my_ratings.CN,
          this.my_ratings.CC,
          this.my_ratings.PC,
          this.my_ratings.SA,
          this.my_ratings.RC,
          this.my_ratings.CP
        ], label: 'You'
      },
      {
        data: [
          this.avg_ratings.TR,
          this.avg_ratings.CN,
          this.avg_ratings.CC,
          this.avg_ratings.PC,
          this.avg_ratings.SA,
          this.avg_ratings.RC,
          this.avg_ratings.CP
        ], label: 'Average'
      }
    ];
  }

}
