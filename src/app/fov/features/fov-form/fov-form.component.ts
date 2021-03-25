import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fov-form',
  templateUrl: './fov-form.component.html',
  styleUrls: ['./fov-form.component.scss']
})
export class FovFormComponent implements OnInit {
  ratios = ["16/9", "16/10", "21/9", "32/9", "5/4", "4/3"];
  units = ["cm", "in"]

  config = new FormGroup({
    screen_ratio     : new FormControl("16/9"),
    screen_size      : new FormControl(27,    [ Validators.min(8), Validators.max(999),  Validators.required ]),
    screen_size_unit : new FormControl("in",  [ Validators.min(8), Validators.max(999),  Validators.required ]),
    screen_dist      : new FormControl(75,    [ Validators.min(0), Validators.max(999),  Validators.required ]),
    screen_dist_unit : new FormControl("cm",  [ Validators.min(0), Validators.max(999),  Validators.required ]),
    triple_screen    : new FormControl(false, [ Validators.required ]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  updateScreenText(): string {
    return this.config.controls["triple_screen"].value ? "Triple Screen" : "Single Screen";
  }

}
