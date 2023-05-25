import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import Web3 from 'web3';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public walletAddressValue: string;
  public error_message;
  public registration_successful;
  public isWalletConnected = false;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _router: Router, private _bgColorService: BgColorService) { this.walletAddressValue = ''; }


  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    walletAddress: ['', [Validators.required]],
    role: ['student', [Validators.required]]
  });

  connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            const walletAddress = accounts[0];
            this.registrationForm.patchValue({ walletAddress });
          } else {
            console.error('No accounts found');
          }
        })
        .catch((error) => {
          console.error('Error connecting wallet:', error);
        });
    } else {
      console.error('MetaMask not installed');
    }
  }

  

  ngOnInit(): void {
    // Change page color dynamically
    this._bgColorService.updateBodyClass('qz-bg-blue');
    // Check if user already logged in, redirect them based on roles
    try {
      if (this._authService.isLoggedIn()) {
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

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get walletAddress() {
    return this.registrationForm.get('walletAddress');
  }

  get role() {
    return this.registrationForm.get('role');
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    const userData = {
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.username,
      walletAddress: this.registrationForm.value.walletAddress,
      role: this.registrationForm.value.role
    };

    // Check if MetaMask is installed and enabled
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);

      // Request user's permission to access their accounts
      window.ethereum.enable()
        .then(() => {
          // Use the selected address
          web3.eth.defaultAccount = window.ethereum.selectedAddress;

          // Example: Retrieve the user's ETH balance
          web3.eth.getBalance(userData.walletAddress)
            .then((balance) => {
              console.log('ETH Balance:', web3.utils.fromWei(balance, 'ether'));
            })
            .catch((error) => {
              console.error('Error retrieving balance:', error);
            });

          this._authService.register(userData).subscribe(
            (res) => {
              console.log("sucsess");
              console.log(res);
              this.registration_successful = true;
              this.error_message = null;
              // this will redirect to login after 3 seconds
              setTimeout(() => {
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
        })
        .catch((error) => {
          console.error('Error enabling MetaMask:', error);
        });
    } else {
      console.error('MetaMask not installed');
    }

    this._authService.register(userData).subscribe(
      (res) => {
        console.log("sucsess");
        console.log(res);
        this.registration_successful = true;
        this.error_message = null;
        // this will redirect to login after 3 seconds
        setTimeout(() => {
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
