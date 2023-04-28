import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = "http://localhost:3000"
  private registerURL = this.API_URL+"/api/v1/user/register";
  private loginURL = this.API_URL+"/api/v1/user/login";
  constructor(private _http: HttpClient) { }

  register(userData) {
     return this._http.post(this.registerURL,userData);
  }

  login(data){
    return this._http.post(this.loginURL,data)
    .pipe(map(response => {
      if(response['success']){
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', response['data']['token']);
        this.saveUserData(JSON.stringify(response['data']['user']))
        return response;
      } 
    }));
  } 

  saveUserData(user){
    localStorage.setItem('userData',user);
  }

  getUserData(){
    return JSON.parse(localStorage.getItem('userData'));
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getJWTToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token')
  }

}
