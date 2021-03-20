import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
 
import { Car, Track, Consumption } from '../interfaces/interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class FuelService {
  public cars: Car[];
  public tracks: Track[];
  public consumption: Consumption[];

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]>{
      return this.http.get<Track[]>(environment.base_api_url + 'api/fuel/track');
  }

  getCars(): Observable<Car[]> {
      return this.http.get<Car[]>(environment.base_api_url + 'api/fuel/car');
  }

  getConsumption(car_id: number, track_id: number): Observable<Consumption[]> {
      return this.http.get<Consumption[]>(environment.base_api_url + 'api/fuel/consumption?car=' + car_id + '&track=' + track_id);
  }

}