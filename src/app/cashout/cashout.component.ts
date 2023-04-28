import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent implements OnInit {
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
