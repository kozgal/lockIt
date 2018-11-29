import { Component } from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';

export interface Wallet {
  currency: string,
    totalBalance: number,
    availableBalance: number,
    daysLeft: number,
    transactions?: {date: string, headline: string, amount: number}[]
}

@Component({
  selector: 'wallet-details',
  templateUrl: 'walletDetails.html'
})
export class WalletDetailsComponent {

  wallet: Wallet | {} = {};

  constructor(params: NavParams,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {
    this.wallet = params.get('wallet');
  }

  deleteWallet() {
    const toast = this.toastCtrl.create({
      message: 'Wallet deleted',
      duration: 1500,
      closeButtonText: 'dismiss',
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
    this.viewCtrl.dismiss('delete');
  }

  back() {
    this.viewCtrl.dismiss();
  }
}
