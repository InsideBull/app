import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FacebookProvider } from '../../providers/facebook/facebook';
import { QrcodeValidationProvider } from '../../providers/qrcode-validation/qrcode-validation';

import { QRCodeValidation } from '../../models/qrcode-validation.model';

import { QrScannerPage } from '../qr-scanner/qr-scanner';

import { Administrator } from '../../models/administrator.model';

import { AdministratorProvider } from '../../providers/administrator/administrator';

/**
 * Generated class for the ValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-validation',
 	templateUrl: 'validation.html',
 })
 export class ValidationPage {

 	user: any;
 	constructor(private adminProvider: AdministratorProvider, private facebookProvider: FacebookProvider, private qrcvProvider: QrcodeValidationProvider, public navCtrl: NavController, public navParams: NavParams) {
 		
 	}

 	ionViewWillEnter() {
 		
 		this.facebookProvider.getUser().then((user)=>{
 			this.user = user;
 		})
 	}

 	getQrcode(){

 		if(this.user){

 			let qrcv = {
 				key: this.user['id'],
 				name: this.user['name'],
 				status: false

 			}

 			let validation = new QRCodeValidation(qrcv);
 			this.verifyValidation(validation); 			
 		}

 	}


 	verifyValidation(qrcv: QRCodeValidation){

 		this.qrcvProvider.fetch(qrcv.key).then((validation)=>{
 			if(!validation){
 				this.qrcvProvider.save(qrcv, this.user['id']);
 			}
 		})
 	}

 	qrScanner(){
 		this.navCtrl.push(QrScannerPage);
 	}

 }


