import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private _bgColorService:BgColorService, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-blue-light')
  }

  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/'])
  }
}
