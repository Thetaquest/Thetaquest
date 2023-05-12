import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}
  title = 'quizzards-client';
  public userData;

  logout() {
    console.log("in logout")
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userData = this.authService.getUserData();
    }
  }
}
