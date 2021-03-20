import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RatingsService } from '../../services/ratings.service';
import { Rating, Histogram, Histograms } from '../../interfaces/interface'

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  my_ratings: Rating[];
  avg_ratings: Rating;

  hist_ratings: Histograms;
  // total_ratings: Histogram;
  // TR_ratings: Histogram;
  // CN_ratings: Histogram;
  // CC_ratings: Histogram;
  // PC_ratings: Histogram;
  // SA_ratings: Histogram;
  // RC_ratings: Histogram;
  // CP_ratings: Histogram;

  ratingForm: FormGroup;
  totalControl = new FormControl(0, [Validators.min(0), Validators.max(9999), Validators.required]);
  trackControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  consistencyControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  carControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  paceControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  safetyControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  racecraftControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);
  competitionControl = new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]);

  constructor(fb: FormBuilder, private _ratingService: RatingsService) {

    this.ratingForm = fb.group({
      total: this.totalControl,
      TR: this.trackControl,
      CN: this.consistencyControl,
      CC: this.carControl,
      PC: this.paceControl,
      SA: this.safetyControl,
      RC: this.racecraftControl,
      CP: this.competitionControl,
    });

  }

  ngOnInit(): void {
    this._ratingService.getRatings().subscribe(
      data => {
        this.my_ratings = data;
        this.displayResults();
      }, err => {
        console.log(err);
      }
    );

    this._ratingService.getAverageRatings().subscribe(
      data => {
        this.avg_ratings = data;
      }, err => {
        console.log(err);
      }
    );

    this._ratingService.getHistogramRatings().subscribe(
      data => {
        this.hist_ratings = {
          total: null,
          TR: null,
          CN: null,
          CC: null,
          PC: null,
          SA: null,
          RC: null,
          CP: null,
        }

        console.log(data);
        this.hist_ratings["total"] = this.to_hist(data.total, "total");
        this.hist_ratings["TR"] = this.to_hist(data.TR, "TR");
        this.hist_ratings["CN"] = this.to_hist(data.CN, "CN");
        this.hist_ratings["CC"] = this.to_hist(data.CC, "CC");
        this.hist_ratings["PC"] = this.to_hist(data.PC, "PC");
        this.hist_ratings["SA"] = this.to_hist(data.SA, "SA");
        this.hist_ratings["RC"] = this.to_hist(data.RC, "RC");
        this.hist_ratings["CP"] = this.to_hist(data.CP, "CP");
        console.log(this.hist_ratings);
        // this.total_ratings = this.to_hist(data.total, "total");
        // this.TR_ratings = this.to_hist(data.TR, "TR");
        // this.CN_ratings = this.to_hist(data.CN, "CN");
        // this.CC_ratings = this.to_hist(data.CC, "CC");
        // this.PC_ratings = this.to_hist(data.PC, "PC");
        // this.SA_ratings = this.to_hist(data.SA, "SA");
        // this.RC_ratings = this.to_hist(data.RC, "RC");
        // this.CP_ratings = this.to_hist(data.CP, "CP");
      }, err => {
        console.log(err);
      }
    );

  }

  saveResults() {
    if (this.ratingForm.valid) {
      this._ratingService.setRatings(this.ratingForm.value);
    }
  }

  displayResults() {
    if (this.my_ratings.length > 0) {
      this.totalControl.setValue(this.my_ratings[0].total);
      this.trackControl.setValue(this.my_ratings[0].TR);
      this.consistencyControl.setValue(this.my_ratings[0].CN);
      this.carControl.setValue(this.my_ratings[0].CC);
      this.paceControl.setValue(this.my_ratings[0].PC);
      this.safetyControl.setValue(this.my_ratings[0].SA);
      this.racecraftControl.setValue(this.my_ratings[0].RC);
      this.competitionControl.setValue(this.my_ratings[0].CP);
    }
  }

  to_hist(obj, key){
    let ans = {
      x: [],
      y: []
    }
    obj.forEach(element => {
      ans.x.push(element.bin);
      ans.y.push(element[key]);
    });
    return ans
  }

}
