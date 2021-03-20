import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string;
  public username: string;
  public email: string;
  public first_name: string;
  public last_name: string;
  public jwtHelper: JwtHelperService = new JwtHelperService();
 
  constructor(private http: HttpClient, private _authStorageService: LocalStorageService ) { }

  public login(user): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/login/', JSON.stringify(user)).subscribe(
        data => {
          console.log(data);
          this._authStorageService.set("auth", JSON.stringify(data));
          this.setValue(data);
          resolve("OK");
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }
 
  public refreshToken() {
    this.http.post(environment.base_api_url + 'auth/api-token-refresh/', {token: this.token}).subscribe(
      data => {
        this.token = data['token'];
      },
      err => {
        this.token = null;
      }
    );
  }

  public verifyToken() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/api-token-verify/', {token: this.token}).subscribe(
        data => {
          resolve(true);
        },
        err => {
          reject(false);
        }
      );
    });
  }

  public signup(data): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/registration/', data).subscribe(
        data => {
          this.token = data['token'];
          resolve( data["detail"]);
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }

  public confirmEmail(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/registration/verify-email/', {key: token}).subscribe(
        data => {
          console.log(data);
          resolve("OK");
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }
 
  public logout(local_only=false): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resetValue();
      this._authStorageService.remove("auth");

      if (!local_only) {
        this.http.post(environment.base_api_url + 'auth/logout/', {}).subscribe(
          data => {
            resolve("OK");
          },
          err => {
            reject(err['error']);
        });
      }
    });
  }

  public changePassword(data): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/password/change/', data).subscribe(
        data => {
          this.token = data['token'];
          resolve("OK");
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }

  public setUserData(data): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.patch(environment.base_api_url + 'auth/user/', data).subscribe(
        data => {
          this.first_name = data["first_name"];
          this.last_name = data["last_name"];
          this.username = data["username"];
          resolve("OK");
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }

  public resetPasswordEmail(data): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/password/reset/', data).subscribe(
        data => {
          resolve(data["detail"]);
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }

  public resetPasswordConfirmation(data): Promise<string>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.base_api_url + 'auth/password/reset/confirm/', data).subscribe(
        data => {
          resolve(data["detail"]);
        },
        err => {
          reject(err['error']);
        }
      );
    });
  }

  public isAuthenticated(): boolean {
    // not sure about what to check yet in addition of expire time
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  public loadFromStorage(){
    let data = this._authStorageService.get("auth");
    if (data){
      let parse_data = JSON.parse(data);
      if (this.jwtHelper.isTokenExpired(parse_data["token"])){
        this._authStorageService.remove("auth");
      } else {
        this.setValue(parse_data);
      }
    }
  }

  private setValue(data) {
    this.token = data['token'];
    this.username = data["user"]["username"];
    this.first_name = data["user"]["first_name"];
    this.last_name = data["user"]["last_name"];
    this.email = data["user"]["email"];
  }

  private resetValue() {
    this.token = null;
    this.username = null;
    this.email = null;
    this.first_name = null;
    this.last_name = null;
  }
}