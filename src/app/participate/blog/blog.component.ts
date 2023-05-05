import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
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
