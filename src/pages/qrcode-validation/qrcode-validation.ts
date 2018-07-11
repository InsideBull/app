import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';

import { QrcodeValidationProvider } from '../../providers/qrcode-validation/qrcode-validation';

import { QRCodeValidation } from '../../models/qrcode-validation.model';


/**
 * Generated class for the QrcodeValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode-validation',
  templateUrl: 'qrcode-validation.html',
})
export class QrcodeValidationPage {

  user: any;
  constructor(private qrcvProvider: QrcodeValidationProvider, private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.facebookProvider.getUser().then((user)=>{
    	this.user = user;
    })
  }

  getQrcode(){

  	let data = {
  		key: this.user.id,
  		name: this.user.name
  	}

  	let qrcv = new QRCodeValidation(data);
  	this.qrcvProvider.save(qrcv,this.user.id);
  }

}
