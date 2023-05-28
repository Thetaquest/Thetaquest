import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Web3 from 'web3';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent implements OnInit {
  web3: any;
  amount: any;
  toAddress: string; // Added: variable to hold the recipient address

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
      this.web3 = provider; // Added: assign the provider to the web3 variable
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

  async transferCoins(): Promise<void> { // Modified: removed toAddress parameter
    const accounts = await this.web3.eth.getAccounts();
    const fromAddress = accounts[0];

    try {
      const transaction = {
        from: fromAddress,
        to: this.toAddress, // Modified: use the toAddress variable
        value: this.web3.utils.toWei(this.amount.toString(), 'ether'),
      };

      await this.web3.eth.sendTransaction(transaction);
      console.log('Coins transferred successfully.');
    } catch (error) {
      console.error('Error transferring coins:', error);
    }
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
