import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatNumber } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

export interface Result {
  lap: number;
  time_elapsed: string;
  time_remaining: string;
  fuel_remaining: string;
}

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss']
})
export class SimulationTableComponent implements OnInit {

  @Input() total_fuel: number;
  @Input() race_time: number;
  @Input() lap_time: number;
  @Input() consumption: number;
  @Input() total_laps: number;

  displayedColumns: string[] = ['lap', 'time_elapsed', 'time_remaining', 'fuel_remaining'];
  dataSource = new MatTableDataSource<Result>();
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.computeResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.computeResults();
  }

  secondToHHMMSS(t): string {
    if (t<0){
      return `Finished for ${ this.secondToHHMMSS(-t) }s`;
    }

    if (Math.floor(t)==0){
      return "0s";
    }

    let ms = Math.round((t%1)*1000);
    t -= (t%1);
    let s = Math.round(t%60);
    t -= s;
    let m = Math.round((t%3600)/60);
    t -= m*60;
    let h = Math.round(t/3600);
    
    let ans = ""
    if (h > 0){
      ans = formatNumber(h, "en-US", "1.0") + ":" + formatNumber(m, "en-US", "2.0") + ":" + formatNumber(s, "en-US", "2.0");
    } else if ( m > 0 ){
      ans =  formatNumber(m, "en-US", "1.0") + ":" + formatNumber(s, "en-US", "2.0");
    } else {
      ans =  formatNumber(s, "en-US", "2.0");
    }

    if (ms > 0){
      ans += "." + formatNumber(ms, "en-US", "1.0-3");
    }

    return ans;
  }

  private computeResults(): Result[]{
    let results: Result[] = [];
    for (let lap=0; lap<=this.total_laps; lap++){
      results.push({
        lap: lap,
        time_elapsed: this.secondToHHMMSS(lap * this.lap_time),
        time_remaining: this.secondToHHMMSS(this.race_time - lap * this.lap_time),
        fuel_remaining: formatNumber(this.total_fuel - lap * this.consumption, "en-US", "1.0-2")
      });
    } 
    console.log(results);
    return results;
  }
}
