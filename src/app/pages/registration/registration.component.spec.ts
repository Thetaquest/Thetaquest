import { BgColorService } from 'src/app/services/bg-color.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { AuthService } from 'src/app/services/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
fdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [AuthService,HttpClient],
      imports: [FormsModule,ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether the Authservice service is obtained', () => {
    let testbedauthservice=TestBed.inject(AuthService);
    expect(testbedauthservice instanceof AuthService).toBeTruthy();
  });

  it('should check whether the BgColorService service is obtained', () => {
    let testbedbgcolorservice=TestBed.inject(BgColorService);
    expect(testbedbgcolorservice instanceof BgColorService).toBeTruthy();
  });

  it('Email is valid', () => {
    let email=component.registrationForm.controls.inputEmail;
    expect(email).toBeTruthy;
  });

  it('Username is valid', () => {
    let username=component.registrationForm.controls.inputUsername;
    expect(username).toBeTruthy;
  });

  it('Wallet Address is valid', () => {
    const walletAddress = component.registrationForm.controls.inputWalletAddress;
    expect(walletAddress).toBeTruthy();
  });



  // it('Email is Invalid', () => {
  //   let email=component.registrationForm.controls.inputEmail;
  //   expect(component).toBeTruthy();
  //   expect(email.errors['required']).toBeTruthy();
  //   email.setValue('abcgmail');
  //   expect(email.errors['email']).toBeTruthy();
  // });


});
