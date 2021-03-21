import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Track, Car } from '../../interfaces/interface';
import { FuelService } from '../../services/fuel.service';
import { SharedInfoService } from '../../services/shared-info.service';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit {

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
    // this.validLapDuration(),
    // this.validRaceDuration()
  ]);

  constructor(private _fuelService: FuelService, private data: SharedInfoService) { }

  ngOnInit(): void {
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

    this.config.statusChanges.subscribe( (status) => {
      if (status == "VALID"){
        this.data.consumption = this.config.get("car_consumption").value;
        this.data.race_time = this.getRaceTime();
        this.data.lap_time = this.getLapTime();
        this.data.track = this.config.get("track").value;
        this.data.computeResults();
      } else {
        this.data.resetResults();
      }
    })

  }

  onTrackChange(ob) {
    console.log('Track changed => ' +  ob.value);
    this.data.resetResults();
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
    this.data.resetResults();
    this.config.patchValue({
      car: ob.value,
    });
    this.getFuel();
  }

  getFuel(){
    this.data.resetResults();
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
          this.data.computeResults();
        }, err => {
          this.config.patchValue({
            car_consumption: 0,
          });
        }
      );
    }
  }

  getRaceTime(): number {
    return this.config.controls['race_hours'].value * 3600
          + this.config.controls['race_minutes'].value * 60
          + this.config.controls['race_seconds'].value;
  }

  getLapTime(): number {
    return this.config.controls['lap_minutes'].value * 60
          + this.config.controls['lap_seconds'].value
          + this.config.controls['lap_milliseconds'].value / 1000;
  }

  private validRaceDuration() : ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let race_time = this.getRaceTime();
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
      let lap_time = this.getLapTime();
      if (lap_time <= 0) {
        return {"incorrect": {
          message : ["Lap duration cannot be negative or null"]
        }};
      }
      return;
    }
  }

}
