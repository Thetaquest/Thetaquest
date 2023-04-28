import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent implements OnInit {
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
