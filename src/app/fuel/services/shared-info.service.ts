import { Injectable } from '@angular/core';
import { Track, Result } from '../interfaces/interface';
import { formatNumber } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedInfoService {

  valid = new BehaviorSubject<boolean>(false);
  race_time: number;
  lap_time: number;
  consumption: number;
  track: Track;
  total_fuel: number;
  total_laps: number;
  total_fuel_safe: number;
  total_km: number;
  fuel_per_min: number;
  fuel_per_km: number;
  average_speed: number;
  simulation: Result[];

  constructor() { }

  resetResults(){
    this.valid.next(false);
    this.total_laps = null;
    this.total_fuel = null;
    this.total_fuel_safe = null;
    this.total_km = null;
    this.average_speed = null;
    this.fuel_per_min = null;
    this.fuel_per_km = null;
  }

  computeResults(){
    this.total_laps = Math.ceil(this.race_time / this.lap_time);
    this.total_fuel = Math.ceil(this.consumption * this.total_laps);
    this.total_fuel_safe = Math.ceil(this.total_fuel * 1.004 + this.consumption);
    this.fuel_per_min = 60 * this.consumption / this.lap_time;

    if (this.track){
      this.total_km = this.total_laps * this.track.distance / 1000;
      this.average_speed = this.track.distance * 3.6 / this.lap_time;
      this.fuel_per_km = 1000 * this.consumption / this.track.distance;
    }

    this.computeLaps();
  }

  computeLaps(){
    this.simulation = [];
    for (let lap=0; lap<=this.total_laps; lap++){
      this.simulation.push({
        lap: lap,
        time_elapsed: this.secondToHHMMSS(lap * this.lap_time),
        time_remaining: this.secondToHHMMSS(this.race_time - lap * this.lap_time),
        fuel_remaining: formatNumber(this.total_fuel_safe - lap * this.consumption, "en-US", "1.0-2")
      });
    } 
    this.valid.next(true);
  }

  getFormState(): Observable<boolean> {
    return this.valid.asObservable();
  }

  private secondToHHMMSS(t): string {
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
  
}
