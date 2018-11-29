import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { WalletCreationComponent } from "../walletCreation/walletCreation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  baseAccount = {
    currency: 'DKK',
    balance: 28332
  };

  wallets = [
    {
      currency: 'NOK',
      totalBalance: 20000,
      availableBalance: 5000,
      daysLeft: 28
    },
    {
      currency: 'EUR',
      totalBalance: 6000,
      availableBalance: 5000,
      daysLeft: 4
    },
    {
      currency: 'SEK',
      totalBalance: 15000,
      availableBalance: 12000,
      daysLeft: 12
    },
    {
      currency: 'USD',
      totalBalance: 30000,
      availableBalance: 20000,
      daysLeft: 50
    }
  ];

  constructor(public modalCtrl: ModalController) {
  }

  openWalletModal() {
    let walletInfoModal = this.modalCtrl.create(WalletCreationComponent);

    walletInfoModal.onDidDismiss((data) => {
      if (data){
        this.wallets.push({
          currency: data.currency,
          totalBalance: data.balance,
          availableBalance: data.balance,
          daysLeft: data.duration
        });
      }
    });

    walletInfoModal.present();
  }
}
