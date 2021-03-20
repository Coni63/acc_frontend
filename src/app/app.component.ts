import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './auth/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assetto Corsa Competizione';

  constructor(public _userService: UserService, private router: Router) { }

  isAuthenticated(){
    return this._userService.isAuthenticated();
  }

  getUsername(): string{
    return this.isAuthenticated() ? this._userService.username : "Login";
  }

  logout() {
    this._userService.logout().then(
      success => {
        this.router.navigate(['/login'])
      },
      error => {
        console.log(error);
      }
    );
  }

}
