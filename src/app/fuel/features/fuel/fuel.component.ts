import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuelService } from '../../services/fuel.service';
import { Car, Track, Consumption } from '../../interfaces/interface';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit {
  tracks: Track[];
  cars: Car[];

  selected_car: Car;
  selected_track: Track;

  options: FormGroup;
  trackControl            = new FormControl(null, Validators.required);
  carControl              = new FormControl(null, Validators.required);
  lap_minutesControl      = new FormControl(2,  [ Validators.min(1), Validators.max(3),   Validators.required ]);
  lap_secondsControl      = new FormControl(0,  [ Validators.min(0), Validators.max(59),  Validators.required ]);
  lap_millisecondsControl = new FormControl(0,  [ Validators.min(0), Validators.max(999), Validators.required ]);
  race_hoursControl       = new FormControl(0,  [ Validators.min(0), Validators.max(24),  Validators.required ]);
  race_minutesControl     = new FormControl(30, [ Validators.min(0), Validators.max(59),  Validators.required ]);
  race_secondsControl     = new FormControl(0,  [ Validators.min(0), Validators.max(59),  Validators.required ]);
  car_consumptionControl  = new FormControl(null,  [ Validators.required ]);

  show_result: boolean = false;
  total_lap: number;
  total_fuel: number;

  constructor(fb: FormBuilder, private _fuelService: FuelService) {

    this.options = fb.group({
      track: this.trackControl,
      car: this.carControl,
      lap_minutes: this.lap_minutesControl,
      lap_seconds: this.lap_secondsControl,
      lap_milliseconds: this.lap_millisecondsControl,
      race_hours: this.race_hoursControl,
      race_minutes: this.race_minutesControl,
      race_seconds: this.race_secondsControl,
      car_consumption: this.car_consumptionControl,
    });

    this._fuelService.getTracks().subscribe(
      data => {
        this.tracks = data;
      }, err => {
        console.log(err);
      }
    );
    this._fuelService.getCars().subscribe(
      data => {
        this.cars = data;
      }, err => {
        console.log(err);
      }
    );

  }

  ngOnInit(): void {

  }

  hideResult() {
    this.show_result = false;
  }

  onTrackChange(ob) {
    this.hideResult();
    this.selected_track = ob.value;
    console.log('Track changed...');
    console.log(this.selected_track);
    this.options.patchValue({
      lap_minutes: Math.floor(this.selected_track.lap_time / 60),
      lap_seconds: Math.floor(this.selected_track.lap_time % 60),
      lap_milliseconds: Math.floor(1000 * (this.selected_track.lap_time % 1)),
    });
    this.getFuel()
  }

  onCarChange(ob) {
    this.hideResult();
    this.selected_car = ob.value;
    console.log('Car changed...');
    console.log(this.selected_car);
    this.getFuel();
  }

  async getFuel(){
    if (this.selected_car && this.selected_track){
      this._fuelService.getConsumption(this.selected_car.id, this.selected_track.id).subscribe(
        data => {
          if (data.length > 0){
            this.options.patchValue({
              car_consumption: data[0].fuel,
            });
          } else {
            this.options.patchValue({
              car_consumption: null,
            });
          }
        }, err => {
          console.log(err);
        }
      );
    }
  }

  getResults(){
    let race_time = this.options.controls['race_hours'].value * 3600
                  + this.options.controls['race_minutes'].value * 60
                  + this.options.controls['race_seconds'].value;

    let lap_time = this.options.controls['lap_minutes'].value * 60
                 + this.options.controls['lap_seconds'].value
                 + this.options.controls['lap_milliseconds'].value / 1000;

    this.total_lap = Math.ceil(race_time / lap_time);
    this.total_fuel = Math.ceil(this.options.controls['car_consumption'].value * this.total_lap);
    this.show_result = true;
  }



}
