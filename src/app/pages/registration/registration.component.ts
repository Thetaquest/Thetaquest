import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ConfirmPasswordValidator } from '../../shared/confirm-password.validator'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public error_message;
  public registration_successful;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _router: Router, private _bgColorService:BgColorService) { }

  registrationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email] ],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    role: ['',Validators.required]
  }, {validators : ConfirmPasswordValidator});

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
            this._router.navigate(['/studentdashboard/challengetable']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // tslint:disable-next-line: typedef
  get username(){
    return this.registrationForm.get('username');
  }

  // tslint:disable-next-line: typedef
  get email(){
    return this.registrationForm.get('email');
  }

  // tslint:disable-next-line: typedef
  get password(){
    return this.registrationForm.get('password');
  }

  // tslint:disable-next-line: typedef
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  // tslint:disable-next-line: typedef
  get role(){
    return this.registrationForm.get('role');
  }


  onSubmit(){
    console.log(this.registrationForm.value);
    var userData = {
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      role: this.registrationForm.value.role
    }
    this._authService.register(userData).subscribe(
      (res) => {
        console.log("sucsess");
        console.log(res);
        this.registration_successful=true;
        this.error_message = null;
        // this will redirect to login after 3 seconds
        setTimeout(() => 
        {
            this._router.navigate(['/login']);
        },
        3000);
      },
      (err) => {
        console.log("Error");
        console.log(err);
        this.error_message = err.error?.error?.message;
        if (err.error instanceof ErrorEvent) {
          // client-side error
          this.error_message = `${err.error.message}`;
        }
        if(!this.error_message){
          //console.log(err.status);
          
          if(err.status == 0 || err.status == 500){
            this.error_message = "Something wrong at server side. Sorry for inconvenience!"
          }
          if(!this.error_message){
            this.error_message = err.message;
          }
        }
      }
    )
  }

}
