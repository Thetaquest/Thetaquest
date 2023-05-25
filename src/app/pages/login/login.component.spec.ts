import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service'
import { LoginComponent } from './login.component';
import { BgColorService } from 'src/app/services/bg-color.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService,HttpClient],
      imports: [FormsModule,ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  it('Wallet address is valid', () => {
    let walletAddress = component.loginForm.controls.walletAddress;
    expect(walletAddress.valid).toBeTruthy();
  });
  
  it('Wallet address is required', () => {
    let walletAddress = component.loginForm.controls.walletAddress;
    walletAddress.setValue('');
    expect(walletAddress.hasError('required')).toBeTruthy();
  });
  
  // it('form invalid when empty', () => {
  //   expect(component.loginForm.valid).toBeFalsy();
  // });
});
