import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _authService: AuthService) {}
  title = 'quizzards-client';
  public userData;

  // constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this.userData = this._authService.getUserData();
    }
  }
}

