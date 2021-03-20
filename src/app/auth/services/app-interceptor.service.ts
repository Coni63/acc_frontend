import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor(private _userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this._userService.token;
    if (token) {
      req = req.clone({
        url:  req.url,
        setHeaders: {
          "Authorization": `JWT ${token}`,
          "Content-Type": 'application/json'
        }
      });
    } else {
      req = req.clone({
        url:  req.url,
        setHeaders: {
          "Content-Type": 'application/json'
        }
      });
    }
    return next.handle(req);
  }
  
}
