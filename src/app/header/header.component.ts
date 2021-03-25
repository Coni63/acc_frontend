import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Assetto Corsa Competizione';

  constructor(public _userService: UserService, private router: Router) { }
  
  ngOnInit(): void { }

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
