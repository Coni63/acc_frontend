import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  username: string;
  email: string;
  first_name: string;
  last_name: string;
  hide = true;

  updateInfoForm = new FormGroup({
    username   : new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(25) ]),
    first_name : new FormControl(null, [ Validators.required ]),
    last_name  : new FormControl(null, [ Validators.required ]),
  });

  changePasswordForm = new FormGroup({
    old_password  : new FormControl("", [ Validators.required ]),
    new_password1 : new FormControl("", [ Validators.required, Validators.minLength(8) ]),
    new_password2 : new FormControl("", [ Validators.required, Validators.minLength(8) ]),
  });

  constructor(public _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.updateInfoForm.setValue({
      "first_name"       : this._userService.first_name,
      "last_name"        : this._userService.last_name,
      "username"         : this._userService.username,
    });

    this.username=this._userService.username;
    this.email=this._userService.email;
    this.first_name=this._userService.first_name;
    this.last_name=this._userService.last_name;
  }

  updateInfo() {
    if (this.updateInfoForm.valid) {
      this._userService.setUserData(this.updateInfoForm.value).then(
        res => {
          console.log("Profile updated");
          if (this.updateInfoForm.get('username').dirty) { // if the user change, requires to logout to delete the token
            this._userService.logout(true);
            this.router.navigate(["auth/login"]);
          }
        },
        err => {
          Object.keys(err).forEach( (k) => {
            this.updateInfoForm.controls[k].setErrors({
              'incorrect': { message : err[k] }
            });
          });
        }
      );
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this._userService.changePassword(this.changePasswordForm.value).then(
        res => {
          console.log("Password changed");
        },
        err => {
          Object.keys(err).forEach( (k) => {
            this.updateInfoForm.controls[k].setErrors({
              'incorrect': { message : err[k]}
            });
          });
        }
      );
    }
  }

}
