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
  toAddress: string;

  constructor(public authService: AuthService, private router: Router) {}

  title = 'quizzards-client';
  public userData;
  public walletAddress: string;
  public walletBalance: number;
  public contractABI: any; // Add a variable to hold the contract ABI

  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userData = this.authService.getUserData();
      await this.initializeWeb3();
      await this.loadContractABI(); // Load the contract ABI
    }
  }

  async initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);
      this.web3 = provider;
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

  async loadContractABI() {
    const response = await fetch('/build/contracts/ERC20.json'); // Adjust the path to match the location of your quizfactory.json file
    const data = await response.json();
    this.contractABI = data.abi;
  }

  async transferTokens(): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    const fromAddress = accounts[0];

    try {
      const contractAddress = '0xCE285e9B397DF00889e3BF681eCc3bbf4170d243';
      const contract = new this.web3.eth.Contract(this.contractABI, contractAddress);

      const transaction = {
        from: fromAddress,
        to: contractAddress,
        data: contract.methods.transfer(this.toAddress, this.amount).encodeABI()
      };

      await this.web3.eth.sendTransaction(transaction);
      console.log('Tokens transferred successfully.');
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
