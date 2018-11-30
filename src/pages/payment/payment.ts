import { Component } from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';

@Component({
  selector: 'payment',
  templateUrl: 'payment.html'
})
export class PaymentComponent {

  chosen: string;
  payment: any = {};

  constructor(params: NavParams,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController) {
  }

  payCard() {
    this.chosen = 'card';
  }

  payInvoice() {
    this.chosen = 'invoice';
  }

  doPayment() {
    const date = this.payment.date;
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const days = date.substr(8, 2);

    const formattedDate = days + '/' + month + '/' + year;

    const toast = this.toastCtrl.create({
      message: 'Payment successful',
      duration: 1500,
      closeButtonText: 'dismiss',
      showCloseButton: true,
      position: 'top'
    });
    toast.present();

    this.viewCtrl.dismiss({headline: this.payment && this.payment.headline, date: formattedDate, amount: this.payment.amount});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
