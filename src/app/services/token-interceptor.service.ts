import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _authService:AuthService) { }

  intercept(request, next){
    if(this._authService.isLoggedIn()){
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this._authService.getJWTToken()}`
        }
      });
    }
    return next.handle(request)
  }
}
