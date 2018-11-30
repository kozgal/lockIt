import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { WalletCreationComponent } from "../walletCreation/walletCreation";
import { Wallet, WalletDetailsComponent } from "../walletDetail/walletDetails";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  baseAccount = {
    currency: 'DKK',
    balance: 28332
  };

  wallets: Wallet[] = [];

  constructor(private modalCtrl: ModalController,
              private nativeStorage: NativeStorage) {
    setTimeout(() => {
      this.nativeStorage.getItem('wallets')
        .then(
          (data) => {
            if (data && data.length) {
              this.wallets = data;

              setInterval(this.loadWallet.bind(this), 100);
            } else {
              this.wallets = [
                {
                  currency: 'NOK',
                  totalBalance: 20000,
                  availableBalance: 4036,
                  daysLeft: 28,
                  transactions: [
                    {headline: 'Conf tickets', date: '29/11/18', amount: 466},
                    {headline: 'TNW deposit', date: '27/11/18', amount: 1039},
                    {headline: 'Steel shipment', date: '27/11/18', amount: 1699},
                    {headline: 'Voodoo Lounge', date: '26/11/18', amount: 25},
                    {headline: 'BDash*Bar', date: '26/11/18', amount: 839},
                    {headline: 'TransferWayGroupLtd', date: '24/11/18', amount: 2499},
                    {headline: 'Office Desk', date: '22/11/18', amount: 1479}]
                },
                {
                  currency: 'EUR',
                  totalBalance: 6000,
                  availableBalance: 5000,
                  daysLeft: 4,
                  transactions: []
                },
                {
                  currency: 'SEK',
                  totalBalance: 15000,
                  availableBalance: 12000,
                  daysLeft: 12,
                  transactions: []
                },
                {
                  currency: 'USD',
                  totalBalance: 30000,
                  availableBalance: 20000,
                  daysLeft: 50,
                  transactions: []
                }
              ];

              this.nativeStorage.setItem('wallets', this.wallets).then(() => {
                setInterval(this.loadWallet.bind(this), 100);
              });
            }
          }, () => {
            this.wallets = [
              {
                currency: 'NOK',
                totalBalance: 20000,
                availableBalance: 4036,
                daysLeft: 28,
                transactions: [
                  {headline: 'Conf tickets', date: '29/11/18', amount: 466},
                  {headline: 'TNW deposit', date: '27/11/18', amount: 1039},
                  {headline: 'Steel shipment', date: '27/11/18', amount: 1699},
                  {headline: 'Voodoo Lounge', date: '26/11/18', amount: 25},
                  {headline: 'BDash*Bar', date: '26/11/18', amount: 839},
                  {headline: 'TransferWayGroupLtd', date: '24/11/18', amount: 2499},
                  {headline: 'Office Desk', date: '22/11/18', amount: 1479}]
              },
              {
                currency: 'EUR',
                totalBalance: 6000,
                availableBalance: 5000,
                daysLeft: 4,
                transactions: []
              },
              {
                currency: 'SEK',
                totalBalance: 15000,
                availableBalance: 12000,
                daysLeft: 12,
                transactions: []
              },
              {
                currency: 'USD',
                totalBalance: 30000,
                availableBalance: 20000,
                daysLeft: 50,
                transactions: []
              }
            ];

            this.nativeStorage.setItem('wallets', this.wallets).then(() => {
              setInterval(this.loadWallet.bind(this), 100);
            });
          });
    },100);
  }

  loadWallet() {
    this.nativeStorage.getItem('wallets')
      .then(
        (data) => {

          if (data) {
            this.wallets = data;
          }
        }
      );
  }

  openWalletModal() {
    let walletInfoModal = this.modalCtrl.create(WalletCreationComponent);

    walletInfoModal.onDidDismiss((data) => {
      if (data){
        this.wallets.push({
          currency: data.currency,
          totalBalance: data.balance,
          availableBalance: data.balance,
          daysLeft: data.duration,
          transactions: []
        });

        setTimeout(() => {this.nativeStorage.setItem('wallets', this.wallets)});
      }
    });

    walletInfoModal.present();
  }

  openWalletDetails(wallet, index) {
    let walletDetailsModal = this.modalCtrl.create(WalletDetailsComponent, {wallet: wallet});

    walletDetailsModal.onDidDismiss((data) => {
      if (data === 'delete') {
        this.wallets.splice(index, 1);

        setTimeout(() => {this.nativeStorage.setItem('wallets', this.wallets)});
      }
    });

    walletDetailsModal.present();
  }
}
