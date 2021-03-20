import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  step1Form = new FormGroup({
    email: new FormControl("", [ Validators.required, Validators.email ])
  });


  step2Form = new FormGroup({
    uid           : new FormControl( null ),
    token         : new FormControl( null ),
    new_password1 : new FormControl( null, [ Validators.required ]),
    new_password2 : new FormControl( null, [ Validators.required ]),
  });

  
  hide: boolean = true;
  step2: boolean = false;
  message: string = "";

  constructor(private route: ActivatedRoute, public _userService: UserService) { }

  ngOnInit(): void {

    this.route.data.subscribe(params => this.step2 = params["step2"]);
    this.route.params.subscribe( params => {
      if (Object.keys(params).length === 2) {
        this.step2Form.setValue({
          uid : params["uid"],
          token: params["token"],
          new_password1 : "",
          new_password2 : ""
        });
      }
    });
  }

  public resetPasswordEmail() {
    if (this.step1Form.valid) {
      this._userService.resetPasswordEmail(this.step1Form.value).then(
        res => {
          this.message = res["detail"];
        },
        err => {
          Object.keys(err).forEach((k) => {
            this.step1Form.controls[k].setErrors({
              'incorrect': { message : err[k] }
            });
          });
        }
      );
    } 
  }

  public resetPasswordConfirmation() {
    if (this.step2Form.valid) {
      this._userService.resetPasswordConfirmation(this.step2Form.value).then(
        res => {
          this.message = res["detail"];
        },
        err => {
          Object.keys(err).forEach((k) => {
            this.step2Form.controls[k].setErrors({
              'incorrect': { message : err[k] }
            });
          });
        }
      );
    }
  }
}
