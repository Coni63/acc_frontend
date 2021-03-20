import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

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

  config = new FormGroup({
    car              : new FormControl(null),
    track            : new FormControl(null),
    lap_minutes      : new FormControl(2,  [ Validators.min(0), Validators.max(59),  Validators.required ]),
    lap_seconds      : new FormControl(0,  [ Validators.min(0), Validators.max(59),  Validators.required ]),
    lap_milliseconds : new FormControl(0,  [ Validators.min(0), Validators.max(999), Validators.required ]),
    race_hours       : new FormControl(0,  [ Validators.min(0), Validators.max(24),  Validators.required ]),
    race_minutes     : new FormControl(30, [ Validators.min(0), Validators.max(59),  Validators.required ]),
    race_seconds     : new FormControl(0,  [ Validators.min(0), Validators.max(59),  Validators.required ]),
    car_consumption  : new FormControl(null,  [ Validators.required, Validators.min(0.01) ]),
  }, [
    this.validLapDuration(),
    this.validRaceDuration()
  ]);
  
  total_laps: number;
  total_fuel: number;

  constructor(private _fuelService: FuelService) {
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

  ngOnInit(): void { }

  onTrackChange(ob) {
    console.log('Track changed => ' +  ob.value);
    this.config.patchValue({
      track: ob.value,
      lap_minutes: Math.floor(ob.value.lap_time / 60),
      lap_seconds: Math.floor(ob.value.lap_time % 60),
      lap_milliseconds: Math.floor(1000 * (ob.value.lap_time % 1)),
    });
    this.getFuel()
  }

  onCarChange(ob) {
    console.log('Car changed =>' + ob.value);
    this.config.patchValue({
      car: ob.value,
    });
    this.getFuel();
  }

  getFuel(){
    let car = this.config.controls["car"].value;
    let track = this.config.controls["track"].value;
    if (car && track){
      this._fuelService.getConsumption(car.id, track.id).subscribe(
        data => {
          if (data.length > 0){
            this.config.patchValue({
              car_consumption: data[0].fuel,
            });
          } else {
            this.config.patchValue({
              car_consumption: 0,
            });
          }
        }, err => {
          this.config.patchValue({
            car_consumption: 0,
          });
        }
      );
    }
  }

  getResults(){
    let race_time = this.config.controls['race_hours'].value * 3600
                  + this.config.controls['race_minutes'].value * 60
                  + this.config.controls['race_seconds'].value;

    let lap_time = this.config.controls['lap_minutes'].value * 60
                 + this.config.controls['lap_seconds'].value
                 + this.config.controls['lap_milliseconds'].value / 1000;

    this.total_laps = Math.ceil(race_time / lap_time);
    this.total_fuel = Math.ceil(this.config.controls['car_consumption'].value * this.total_laps);
  }

  private validRaceDuration() : ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let race_time = group.controls['race_hours'].value * 3600
                    + group.controls['race_minutes'].value * 60
                    + group.controls['race_seconds'].value;

      if (race_time <= 0) {
        return {"incorrect": {
          message : ["Race duration cannot be negative or null"]
        }};
      }
      return;
    }
  }

  private validLapDuration() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      let lap_time = group.controls['lap_minutes'].value * 60
                   + group.controls['lap_seconds'].value
                   + group.controls['lap_milliseconds'].value / 1000;
      if (lap_time <= 0) {
        return {"incorrect": {
          message : ["Lap duration cannot be negative or null"]
        }};
      }
      return;
    }
  }

}
