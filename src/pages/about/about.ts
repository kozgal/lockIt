import { Component } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  wallets;

  constructor(private nativeStorage: NativeStorage) {
    setTimeout(this.updateWallets.bind(this));
    setInterval(this.updateWallets.bind(this), 1000);
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
}
