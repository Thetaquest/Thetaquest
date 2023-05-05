import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  _router: any;
  _authService: any;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/'])
  }

}
