import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  private _authService: any;
  private _router: any;

  constructor() { }

  ngOnInit(): void {
  }

  
  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/'])
  }

}
