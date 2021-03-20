import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Rating, HistAPI } from '../interfaces/interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private httpOptions: any;

  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getRatings() {
      return this.http.get<Rating[]>(environment.base_api_url + 'api/ratings/me');
  }

  setRatings(data) {
    this.http.post(environment.base_api_url + 'api/ratings/me', JSON.stringify(data), this.httpOptions).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAverageRatings() {
    return this.http.get<Rating>(environment.base_api_url + 'api/ratings/average');
  }

  getHistogramRatings() {
    return this.http.get<HistAPI>(environment.base_api_url + 'api/ratings/distribution');
  }
}
