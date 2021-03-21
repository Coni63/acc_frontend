import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    "username" : new FormControl("nmine", [ Validators.required, Validators.minLength(5), Validators.maxLength(25) ]),
    "password" : new FormControl("azertyuiop111", [ Validators.required,  Validators.minLength(8)])
  });
  hide: boolean = true;
  errors: string = null;

  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let params = this.route.snapshot.queryParams;

    this._userService.login(this.LoginForm.value).then(
      data => {
        if (params['redirectURL']) {
          this.router.navigate([params['redirectURL']]);
        } else {
          this.router.navigate(["auth/register"]);
        }
      },
      error => {
        if (error.hasOwnProperty("non_field_errors")) {
          this.errors = error["non_field_errors"][0];
        }
      }
    );
  }

}
