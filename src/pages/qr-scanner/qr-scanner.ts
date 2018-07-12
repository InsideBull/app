import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QrScannerProvider } from '../../providers/qr-scanner/qr-scanner';

import { ConfirmationPage } from '../confirmation/confirmation';


/**
 * Generated class for the QrScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrscannerProvider: QrScannerProvider) {
  }

  ionViewDidLoad() {
    this.prepareScanner();
  }

  prepareScanner(){
  	this.qrscannerProvider.openScaner(ConfirmationPage);
  }

}
