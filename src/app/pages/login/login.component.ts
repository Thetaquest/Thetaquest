import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error_message;
  role: any;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _router: Router, private _bgColorService: BgColorService) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  ngOnInit(): void {
    // Change page color dynamically
    this._bgColorService.updateBodyClass('qz-bg-blue');
    // Check if user already logged in, redirect them based on roles
    try {
      if(this._authService.isLoggedIn()){
        let userData = this._authService.getUserData();
        if (userData['role'] == "teacher")
            this._router.navigate(['/teacherdashboard/quiztable']);
        else
            this._router.navigate(['/studentdashboard/studentchallengetable']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // tslint:disable-next-line: typedef
  get email() {
    return this.loginForm.get('email');
  }

  // tslint:disable-next-line: typedef
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this._authService.login(this.loginForm.value)
      .subscribe((res) => {
        console.log("LOGIN : success");
        console.log(res);
        // for accessing data passed in json 
        this.role = JSON.parse(JSON.stringify(res));
        // console.log(this.role.data.user.role);
        const myRole = this.role.data.user.role;
        // redirection based on role
        if (myRole == "teacher")
          this._router.navigate(['/teacherdashboard/quiztable']);
        else
          this._router.navigate(['/studentdashboard/studentchallengetable']);

      },
        (err) => {
          console.log("LOGIN : Failed");
          console.log(err);
          this.error_message = err.error?.error?.message;
          if (err.error instanceof ErrorEvent) {
            // client-side error
            this.error_message = `${err.error.message}`;
          }
          if (!this.error_message) {
            //console.log(err.status);

            if (err.status == 0 || err.status == 500) {
              this.error_message = "Something wrong at server side. Sorry for inconvenience!"
            }
            if (!this.error_message) {
              this.error_message = err.message;
            }
          }
        }
      )
  }
}
