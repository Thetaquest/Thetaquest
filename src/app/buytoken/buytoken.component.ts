import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buytoken',
  templateUrl: './buytoken.component.html',
  styleUrls: ['./buytoken.component.scss']
})
export class BuytokenComponent implements OnInit {
  _authService: any;
  _router: any;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/'])
  }
  
}
