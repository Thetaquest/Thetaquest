import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Web3 from 'web3';
import * as theta from "@thetalabs/theta-js";

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent {
  // theta: Theta;
  walletAddress: string;
  theta: any;
  web3: any;
  amount: any;
  receiverAddress: string;

  constructor(public authService: AuthService, private router: Router) {
    this.theta = new theta('https://eth-rpc-api-testnet.thetatoken.org/rpc'); // Replace the URL with the appropriate Theta RPC endpoint
  }

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

  async getWalletBalance(provider: Web3) {
    const balance = await provider.eth.getBalance(this.walletAddress);
    this.walletBalance = parseFloat(provider.utils.fromWei(balance, 'ether'));
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

  async transferCoins(receiverAddress: string, amount: number) {
    try {
      const response = await this.theta.TransferCoins(this.walletAddress, receiverAddress, amount);
      console.log('Transfer successful:', response);
    } catch (error) {
      console.error('Error transferring coins:', error);
    }
  }

  onFormSubmit(form: any) {
    const receiverAddress = form.receiverAddress;
    const amount = form.amount;

    this.transferCoins(receiverAddress, amount);
  }
}
