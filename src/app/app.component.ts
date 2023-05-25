import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthService } from './services/auth.service';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  title = 'quizzards-client';
  public userData;
  public walletAddress: string;
  public walletBalance: number;

  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userData = this.authService.getUserData();
      await this.initializeWeb3();
    }
  }

  async initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);
      this.walletAddress = (await provider.eth.getAccounts())[0];
      this.getWalletBalance(provider);
    } else {
      console.log('Please install MetaMask or a compatible Web3 wallet.');
    }
  }

  async getWalletBalance(provider: Web3) {
    const balance = await provider.eth.getBalance(this.walletAddress);
    this.walletBalance = parseFloat(provider.utils.fromWei(balance, 'ether'));
  }
  
  logout() {
    console.log("in logout")
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
