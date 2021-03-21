import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Track } from '../../interfaces/interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() race_time: number;
  @Input() lap_time: number;
  @Input() consumption: number;
  @Input() track: Track = null;

  total_laps:number;
  total_fuel: number;
  total_fuel_safe: number;
  total_km: number;
  fuel_per_min: number;
  fuel_per_km: number;
  average_speed: number;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.consumption);
    this.total_laps = Math.ceil(this.race_time / this.lap_time);
    this.total_fuel = Math.ceil(this.consumption * this.total_laps);
    this.total_fuel_safe = Math.ceil(this.total_fuel * 1.004 + this.consumption);

    if (this.track != null){
      this.total_km = this.total_laps * this.track.distance / 1000;
      this.average_speed = this.track.distance * 3.6 / this.lap_time;
      this.fuel_per_min = 60 * this.consumption / this.lap_time;
      this.fuel_per_km = 1000 * this.consumption / this.track.distance;
    }
  }

}
