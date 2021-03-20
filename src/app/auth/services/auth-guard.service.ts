import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from './user.service';

// https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._userService.token){
      this._userService.loadFromStorage();
    }

    if (!this._userService.isAuthenticated()) {
      this.router.navigate(['auth/login'], { queryParams: { 'redirectURL':state.url }} );
      return false;
    }
    return true;
  }

}