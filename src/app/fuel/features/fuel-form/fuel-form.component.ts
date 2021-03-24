import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Track, Car } from '../../interfaces/interface';
import { FuelService } from '../../services/fuel.service';
import { SharedInfoService } from '../../services/shared-info.service';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss']
})
export class FuelFormComponent implements OnInit {

  tracks: Track[];
  cars: Car[];
  isLoggedIn: boolean;

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
  });

  constructor(private _fuelService: FuelService, private _data: SharedInfoService, private _user: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this._user.isAuthenticated();

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
        this._data.consumption = this.config.get("car_consumption").value;
        this._data.race_time = this.getRaceTime();
        this._data.lap_time = this.getLapTime();
        this._data.track = this.config.get("track").value;
        this._data.computeResults();
      } else {
        this._data.resetResults();
      }
    })

  }

  onTrackChange(ob) {
    console.log('Track changed => ' +  ob.value);
    this._data.resetResults();
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
    this._data.resetResults();
    this.config.patchValue({
      car: ob.value,
    });
    this.getFuel();
  }

  getFuel(){
    this._data.resetResults();
    let car = this.config.controls["car"].value;
    let track = this.config.controls["track"].value;
    if (car && track){
      this._fuelService.getConsumption(car.id, track.id).subscribe(
        data => {
          this.config.patchValue({
            car_consumption: data.fuel,
          });
          this._data.computeResults();
        }, err => {
          this.config.patchValue({
            car_consumption: 0,
          });
        }
      );
    }
  }

  private getRaceTime(): number {
    return this.config.controls['race_hours'].value * 3600
          + this.config.controls['race_minutes'].value * 60
          + this.config.controls['race_seconds'].value;
  }

  private getLapTime(): number {
    return this.config.controls['lap_minutes'].value * 60
          + this.config.controls['lap_seconds'].value
          + this.config.controls['lap_milliseconds'].value / 1000;
  }

  canSubmit(){
    return (this.config.controls['track'].value != null) 
          && (this.config.controls['car'].value != null) 
          && (this.config.controls['car_consumption'].value != null) 
  }

  saveMyConsumption(){
    let data = {
      track: this.config.controls['track'].value.id,
      car: this.config.controls['car'].value.id,
      fuel: this.config.controls['car_consumption'].value,
    };
    this._fuelService.saveConsumption(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
