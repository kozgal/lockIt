import { Component } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";
import { ModalController } from "ionic-angular";
import { PaymentComponent } from "../payment/payment";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private updateInterval;
  wallets;

  constructor(private nativeStorage: NativeStorage,
              private modalCtrl: ModalController) {
    setTimeout(this.updateWallets.bind(this));
    this.updateInterval = setInterval(this.updateWallets.bind(this), 1000);
  }

  updateWallets() {
    this.nativeStorage.getItem('wallets')
      .then(
        (data) => {
          if (data) {
            this.wallets = data
          }
        }
      );
  }

  pickWallet(wallet) {
    clearInterval(this.updateInterval);

    let paymentModal = this.modalCtrl.create(PaymentComponent, {wallet: wallet});

    paymentModal.onDidDismiss((data) => {
      if (data) {
        let index = this.wallets.indexOf(wallet);

        this.wallets[index].transactions.push(data);
        this.wallets[index].availableBalance = this.wallets[index].availableBalance - data.amount;

        this.nativeStorage.setItem('wallets', this.wallets).then(() => {
          this.updateInterval = setInterval(this.updateWallets.bind(this), 1000);
        });
      }
    });

    paymentModal.present();
  }
}
