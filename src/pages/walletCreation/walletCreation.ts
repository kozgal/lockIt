import { Component } from '@angular/core';
import {LoadingController, ToastController, ViewController} from 'ionic-angular';

@Component({
  selector: 'wallet-creation',
  templateUrl: 'walletCreation.html'
})
export class WalletCreationComponent {
  walletData: {
    currency: string,
    balance: number,
    duration: number
  } | {} = {};

  showPrice = false;
  showForm = true;

  constructor(public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
  }

  addWallet() {
    const toast = this.toastCtrl.create({
      message: 'Wallet added successfully',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'dismiss',
      position: 'top'
    });
    toast.present();
    this.viewCtrl.dismiss(this.walletData);
  }

  requestPrice() {
    this.showForm = false;

    const loader = this.loadingCtrl.create({
      content: "Fetching your rate...",
      duration: 1500
    });
    loader.present();
    setTimeout(() => {this.showPrice = true}, 1800)
  }

  reject() {
    const toast = this.toastCtrl.create({
      message: 'Rate rejected',
      duration: 1500,
      closeButtonText: 'dismiss',
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
