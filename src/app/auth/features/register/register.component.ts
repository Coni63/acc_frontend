import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    username  : new FormControl("", [ Validators.required, Validators.minLength(5), Validators.maxLength(25) ]),
    email     : new FormControl("", [ Validators.required, Validators.email ]),
    password1 : new FormControl("", [ Validators.required, Validators.minLength(8) ]),
    password2 : new FormControl("", [ Validators.required, Validators.minLength(8) ]),
  });

  hide = true;
  confirm_email: boolean = false;

  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.route.data.subscribe(params => this.confirm_email = params["confirm_email"]);

    this.route.params.subscribe( params => {
      if (Object.keys(params).length === 1) {
        this._userService.confirmEmail(params["token"]);
      }
    });
  }

  register() {
    if (this.signUpForm.valid) {
      this._userService.signup(this.signUpForm.value).then(
        res => {
          this.router.navigate(['auth/account']);
        },
        err => {
          console.log(err);
          Object.keys(err).forEach((k) => {
            this.signUpForm.controls[k].setErrors({
              'incorrect': { message : err[k] }
            });
          });
        }
      );
    }
  }

}
